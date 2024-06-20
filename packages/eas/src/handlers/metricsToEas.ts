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
	UID: z.string().optional(),
});

type Metric = z.infer<typeof MetricSchema>;

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
	options: { force?: boolean },
) => {
	const { force } = options;
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
	const batchSize = 10;
	const numBatches = Math.ceil(metrics.length / batchSize);

	const _newFile: Metric[] = [];

	for (let i = 0; i < numBatches; i++) {
		// Get the next batch of metrics
		const batch = metrics.slice(i * batchSize, (i + 1) * batchSize);

		const attestationToCreate = [];

		// Iterate over the array and store each metric using the EAS service if it doesn't have a UID
		for (const metric of batch) {
			// Skip if the metric already has a UID
			if (metric.UID !== undefined && !force) {
				console.log("Skipping metric with UID", metric.UID);
				continue;
			}
			const { composedData, encodedData } = composeData(schema, metric);

			attestationToCreate.push({
				metric,
				attestationRequest: {
					recipient: ZERO_ADDRESS,
					expirationTime: 0n,
					revocable: false, // Be aware that if your schema is not revocable, this MUST be false
					data: encodedData,
				},
			});
		}

		if (attestationToCreate.length === 0) {
			console.log("No new metrics to attest in batch", i + 1, "of", numBatches);
			_newFile.push(...batch);
			continue;
		}

		console.log(
			`Attesting to ${attestationToCreate.length} new metrics in batch (${
				i + 1
			} of ${numBatches})`,
		);

		const tx = await _easSigner.multiAttest([
			{
				schema: easSchemaId,
				data: Object.values(attestationToCreate).map(
					(attestationToCreate) => attestationToCreate.attestationRequest,
				),
			},
		]);

		const createdUids = await tx.wait();

		// Add the UID to the metrics
		attestationToCreate.map((attestation, index) => {
			attestation.metric.UID = createdUids[index];
		});

		console.log(createdUids);

		updated = true;

		console.log(
			"Updated metrics",
			attestationToCreate.map((attestation) => attestation.metric),
		);

		const updatedRecords = batch.map((metric) => {
			const updatedMetric = attestationToCreate.find((attestation) =>
				Object.keys(metric).every(
					(key) => key === "UID" || metric[key] === attestation.metric[key],
				),
			);
			return updatedMetric ? { ...metric, ...updatedMetric.metric } : metric;
		});

		_newFile.push(...updatedRecords);
	}

	// Write the updated metrics back to the JSON file
	if (updated) {
		console.log("Writing updated metrics to file");
		fs.writeFileSync(file, JSON.stringify(_newFile, null, 2));
	}
};
