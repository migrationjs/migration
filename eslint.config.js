import cyf from "@codeyourfuture/eslint-config-standard";
import prettier from "eslint-config-prettier";
import globals from "globals";
import { config, configs } from "typescript-eslint";

export default config(
	cyf.configs.standard,
	{
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	configs.stylisticTypeChecked,
	configs.strictTypeChecked,
	{
		files: ["**/*.js"],
		...configs.disableTypeChecked,
	},
	prettier,
	{
		ignores: ["packages/*/lib/"],
	},
);
