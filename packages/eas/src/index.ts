import "dotenv/config";
import { metricsToEas } from "./handlers/metricsToEas";
import { schemasToEas } from "./handlers/schemasToEas";
import { program } from "commander";

program
	.name("eas-upload-util")
	.description("Batch upload data to EAS")
	.version("0.0.1");

program
	.name("eas-upload-util")
	.command("metrics-to-eas")
	.description("Upload metrics to EAS")
	.argument(
		"[file]",
		"Path to the file containing the metrics",
		"./src/resources/impact_metrics.json",
	)
	.argument(
		"[schemaId]",
		"ID of the schema to which the metrics belong",
		"0xdd56b1a5da612085133234cdd66bb28056e2eab9aa951c7fb0d90709f78f9436",
	)
	.option('-f, --force <boolean>', "Force upload", false)
	.action(async (file, schemaId, force) => {
		await metricsToEas(file, schemaId, force);
	});

console.log(process.cwd());
program
	.name("eas-upload-util")
	.command("schemas-to-eas")
	.description("Upload schemas to EAS")
	.argument(
		"[file]",
		"Path to the file containing the metrics",
		"/resources/schemas.json",
	)
	.option('-f, --force <boolean>', "Force upload", false)
	.action(async (file, force) => {
		await schemasToEas(file, force);
	});

program.parse();
