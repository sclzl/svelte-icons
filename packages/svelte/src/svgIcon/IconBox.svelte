<script lang="ts">
    export let size: number | string = 16;
    export let color = "";
    export let style = "";
    let className = "";
    export {className as class}
    
    const checkSize = (size: number | string) => {
        if (typeof size === "number") {
            return `font-size:${size}px;`;
        }else if (typeof size === "string") {
            return `font-size:${size};`;
        }
        return "";
    }

    $: colors = color ? `color:${color};` : '';
    $: sizes = checkSize(size);

</script>

<i class="sv-icon {className}" style="{colors}{sizes}{style}" {...$$restProps} on:click>
    <slot></slot>
</i>

<style>
    :global(.sv-icon) {
        display: inline-block;
        width: 1em;
        height: 1em;
        color: inherit;
        fill: currentColor;
    }
    :global(.sv-icon svg) {
        width: 1em;
        height: 1em;
    }
</style>