import fs from "node:fs";
import {easSigner} from "../services/eas";
import {z} from "zod";
import {SchemaEncoder,} from "@ethereum-attestation-service/eas-sdk";
import type {EasSchema} from "./schemasToEas";
import schemaJson from "../resources/schemas.json";

const MetricSchema = z.object({
	Name: z.string().nullable(),
	Description: z.string().nullable(),
	Importance: z.string().nullable(),
	Rationale: z.string().nullable(),
	Keyword: z.string().nullable(),
	Term: z.string().nullable(),
	Category: z.string().nullable(),
});

type Metric = z.infer<typeof MetricSchema> & { UID?: string };

export const metricsToEas = async (
	file: string,
	easSchemaId: string,
	force?: boolean,
) => {
	const _easSigner = easSigner();
	// Read the JSON file
	const data = fs.readFileSync(file, "utf-8");

	const schema = schemaJson.find(
		(schema: EasSchema) => schema.UID === easSchemaId,
	);

	if (!schema) {
		throw new Error(`Schema with UID ${easSchemaId} not found`);
	}

	// Parse the file content into an array of Metric objects
	const metrics: Metric[] = JSON.parse(data).map((metric: unknown) => {
		MetricSchema.parse(metric);
		return metric;
	});

	let updated = false;

	// Iterate over the array and store each metric using the EAS service
	const updatedMetrics = await Promise.all(
		metrics.map(async (metric) => {
			// Skip if the metric already has a UID
			if (!force && schema?.UID) {
				return;
			}
			// Initialize SchemaEncoder with the schema string
			const schemaEncoder = new SchemaEncoder(schema.parsed);

			const composedData = schema.values.map(({ type, name }) => {
				const value = Object.entries(metric).find(
					([key]) => key.toLowerCase() === name.toLowerCase(),
				);

				if (!value) {
					throw new Error(`Value for ${name} not found in metric`);
				}

				const parsedValue = value[1] ?? "";
				return {
					type,
					name,
					value: parsedValue,
				};
			});

			const encodedData = schemaEncoder.encodeData(composedData);

			const tx = await _easSigner.attest({
				schema: easSchemaId,
				data: {
					recipient: "0x475db4e7c8976fd243d3d6fa444fda524cefbaf9",
					expirationTime: 0n,
					revocable: false, // Be aware that if your schema is not revocable, this MUST be false
					data: encodedData,
				},
			});

			metric.UID = await tx.wait(); // Attach the UID to the metric object

			console.log(`Stored metric with UID ${metric.UID}`);

			updated = true;
			return metric;
		}),
	);

	// Write the updated metrics back to the JSON file
	if (updated) fs.writeFileSync(file, JSON.stringify(updatedMetrics, null, 2));
};
