import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				background: "src/background.ts",
				content: "src/content.ts",
				popup: "src/popup.html",
			},
			output: {
				chunkFileNames: "assets/[name].js",
				assetFileNames: "[name].[ext]",
				entryFileNames: (entry) => {
					// Output JavaScript files in the same subdirectories as the source
					if (entry.name === "background") {
						return "src/[name].js";
					}
					if (entry.name === "content") {
						return "src/[name].js";
					}
					return "[name].js"; // Default for other files
				},
			},
		},
		watch: {
			include: ["src/**/*", "manifest.json"],
		},
	},
	plugins: [
		viteStaticCopy({
			targets: [
				{
					src: "manifest.json",
					dest: "",
				},
			],
		}),
	],
});
