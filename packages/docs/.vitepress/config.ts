import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "Migration",
	description: "A cross-provider Node.js database migration tool.",
	base: "/migration/",
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
		],

		sidebar: [],

		socialLinks: [
			{
				ariaLabel: "GitHub repository",
				icon: "github",
				link: "https://github.com/migrationjs/migration",
			},
		],
	},
});
