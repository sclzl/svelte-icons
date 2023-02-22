<script lang="ts">
    export let data = "";
    export let viewBox = "";
    export let size: number | string = 16;
    export let style = "";
    export let color = "";

    const getViewBox = (viewBox: string, data: string) => {
        if (viewBox) return viewBox;
        const r = data.match(/viewBox=\"(.*?)\"/);
        if (r) return r[1];
        return "0 0 20 20";
    };

    const checkSize = (size: number | string) => {
        if (typeof size === "number") {
            return `width:${size}px;height:${size}px;`;
        } else if (typeof size === "string") {
            return `width:${size};height:${size};`;
        }
        return "width:16px;height:16px;";
    };

    $: path = data.replace(/<svg ([^>]*)>/, "").replace(/<\/svg>/, "");
    $: viewBoxs = getViewBox(viewBox, data);
    $: colors = color ? `color:${color};` : "";
    $: sizes = checkSize(size);
</script>

<svg
    style="{sizes}{colors}{style}"
    version="1.1"
    viewBox={viewBoxs}
    xmlns="http://www.w3.org/2000/svg"
    {...$$restProps}
    on:click
>
    {@html path}
</svg>
