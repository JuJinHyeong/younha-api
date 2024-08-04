/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Select } from './d1Query';

export default {
	async fetch(request, env: Env): Promise<Response> {
		const url = new URL(request.url);
		const { pathname } = url;
		const method = request.method;

		if (pathname === '/healthcheck') {
			// If you did not use `DB` as your binding name, change it here
			return Response.json("server alive");
		}
		if(method === "GET"){
			if(pathname.startsWith("/api/song")) {
				const availableParams = ["id", "name", "title", "releaseDate", "genre", "author", "composer", "arranger", "albumId", "albumName", "youtubeUrl", "lyrics"];
				if(pathname === "/api/song") {
					const results = await Select("Songs", url, availableParams, env);
					return Response.json(results);
				}
				else if(pathname === "/api/song/key"){
					return Response.json(availableParams);
				}
			}
			else if(pathname.startsWith("/api/album")) {
				const availableParams = ["id", "melonUrl", "title", "type", "release", "genre", "publisher", "agency", "description", "imgUrl"];
				if(pathname === "/api/album") {
					const results = await Select("Albums", url, availableParams, env);
					return Response.json(results);
				}
				else if(pathname === "/api/album/key"){
					return Response.json(availableParams);
				}
			}
		}
		return new Response("Not Found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
