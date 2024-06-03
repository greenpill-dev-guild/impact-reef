import fs from "node:fs";
import { easSigner } from "../services/eas";
import { z } from "zod";
import {
	SchemaEncoder,
	ZERO_ADDRESS,
} from "@ethereum-attestation-service/eas-sdk";
import type { EasSchema } from "./schemasToEas";
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

function composeData(
	schema: {
		UID: string;
		description: string;
		name: string;
		parsed: string;
		values: Array<{ name: string; type: string }>;
	},
	metric: Metric,
) {
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
	return { composedData, encodedData };
}

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

	// Calculate the number of batches
	const batchSize = 5;
	const numBatches = Math.ceil(metrics.length / batchSize);

	const _newFile: Metric[] = [];

	for (let i = 0; i < numBatches; i++) {
		// Get the next batch of metrics
		const batch = metrics.slice(i * batchSize, (i + 1) * batchSize);

		const atts = [];

		// TODO: implement logic to skip metrics that already have a UID and write the updated metrics back to the JSON file
		// Iterate over the array and store each metric using the EAS service
		for (const metric of batch) {
			// Skip if the metric already has a UID
			if (!force && schema?.UID) {
				return;
			}
			const { composedData, encodedData } = composeData(schema, metric);

			atts.push({
				recipient: ZERO_ADDRESS,
				expirationTime: 0n,
				revocable: false, // Be aware that if your schema is not revocable, this MUST be false
				data: encodedData,
			});
		}

		const res = await _easSigner.multiAttest([
			{
				schema: easSchemaId,
				data: atts,
			},
		]);

		console.log(res);
	}

	// Write the updated metrics back to the JSON file
	if (updated) fs.writeFileSync(file, JSON.stringify(_newFile, null, 2));
};
