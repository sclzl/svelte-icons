import svelte from 'rollup-plugin-svelte'
import autoPreprocess from 'svelte-preprocess'
import resolve from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import dts from 'rollup-plugin-dts'
import css from 'rollup-plugin-css-only'

export default [
    {
        input: './src/index.js',
        output: [
            { file: "dist/index.js", format: 'umd', name: "SvIcon" },
            { file: "dist/index.mjs", format: 'es' },
        ],
        plugins: [
            svelte({
                preprocess: autoPreprocess(),
            }),
            resolve(),
            commonjs(),
            esbuild({
              target: 'node14',
              minify: true
            }),
            css({output: 'index.css'})
            // terser(),
        ],
    },
    // {
    //     input: './src/types/index.d.ts',
    //     output: [{ file: "dist/es/index.d.ts", format: 'es' }],
    //     plugins: [
    //         dts()
    //     ],
    // },
]