export * from "./components";
import * as icons from "./components";
import { SVGAttributes, HTMLAttributes } from 'svelte/elements';
import type { ComponentType, SvelteComponentTyped } from 'svelte';
export const SvgIcon: ComponentType<SvelteComponentTyped<{color?: string;size?: string | number; data: string;}&SVGAttributes<any>>>
export const IconBox: ComponentType<SvelteComponentTyped<{color?: string;size?: string | number;}&HTMLAttributes<any>>>
export { icons }