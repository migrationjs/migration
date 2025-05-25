#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, resolve } from "node:path";

const INHERIT = [
	"author",
	"bugs",
	"engines",
	"funding",
	"homepage",
	"license",
	"repository",
];

const {
	npm_command: command,
	npm_config_init_version: version,
	npm_config_local_prefix: rootDir,
	npm_config_scope: scope,
	npm_package_json: targetFile,
} = process.env;

if (command !== "init" || scope !== "migration") {
	throw new Error(
		"usage: npm init --scope migration --workspace packages/<name> --yes migration-package",
	);
}

const workspaceDir = resolve(targetFile, "..");
const name = basename(workspaceDir);
const rootPackage = JSON.parse(
	await readFile(resolve(rootDir, "package.json"), "utf-8"),
);

const workspacePackage = {
	name: `@migration/${name}`,
	version,
	type: "module",
	description: "",
	main: "lib/index.js",
	types: "lib/index.d.ts",
	files: ["lib/"],
	scripts: {
		build: "tsc --project ./tsconfig.build.json",
	},
	publishConfig: {
		access: "public",
		registry: "https://registry.npmjs.org/",
	},
	...Object.fromEntries(
		Object.entries(rootPackage).filter(([key]) => INHERIT.includes(key)),
	),
};

await writeFile(
	targetFile,
	JSON.stringify(workspacePackage, null, "\t"),
	"utf-8",
);
await writeFile(
	resolve(workspaceDir, "tsconfig.build.json"),
	JSON.stringify(
		{
			extends: "../../tsconfig.json",
			compilerOptions: {
				declaration: true,
				outDir: "lib",
				types: ["node"],
			},
			include: ["src/**/*.ts"],
			exclude: ["*.test.ts"],
		},
		null,
		"\t",
	),
	"utf-8",
);
await mkdir(resolve(workspaceDir, "src"));
await writeFile(
	resolve(workspaceDir, "src", "index.ts"),
	"export default {};",
	"utf-8",
);
