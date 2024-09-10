/// <reference path="../.astro/types.d.ts" />
/// <reference types="unplugin-icons/types/astro" />

declare namespace use {
	export function load(): ReturnType<
		(typeof import('@tensorflow-models/universal-sentence-encoder'))['load']
	>;
}
