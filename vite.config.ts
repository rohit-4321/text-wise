import { defineConfig } from "vite";
import ViteRestart from "vite-plugin-restart";
import { viteStaticCopy } from "vite-plugin-static-copy";
export default defineConfig(({ mode }) => ({
	build: {
		sourcemap: true,
		minify: false,
		rollupOptions: {
			input: {
				background: "src/background.ts",
				content: "src/content.ts",
				popup: "src/popup.html",
			},
			output: {
				entryFileNames: (entry) => {
					// Output JavaScript files in the same subdirectories as the source
					if (entry.name === "background") {
						return "src/[name].js";
					}
					if (entry.name === "content") {
						return "src/[name].js";
					}
					return ""; // Default for other files
				},
			},
		},
		watch: {
			include: ["manifest.json", "src/**/*"],
		},
	},
	plugins: [
		viteStaticCopy({
			targets: [
				{
					src: "manifest.json",
					dest: "",
				},
				{
					src: "src/**/*.html", // Copy all HTML files from src folder
					dest: "src", // Retain src folder structure
				},
				{
					src: "src/**/*.css", // Copy all CSS files from src folder
					dest: "src", // Retain src folder structure
				},
				{
					src: "assets/*", // Copy all CSS files from src folder
					dest: "assets", // Retain src folder structure
				},
			],
		}),
		ViteRestart({
			// Watch manifest.json and trigger a server restart when changed
			restart: ["manifest.json"],
		}),
	],
}));
