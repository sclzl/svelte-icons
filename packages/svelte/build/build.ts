import fs from "fs";
import path, { resolve } from "path";
import consola from 'consola';
import chalk from 'chalk';
import camelcase from 'camelcase';
import { findWorkspaceDir } from '@pnpm/find-workspace-dir';
import { findWorkspacePackages } from '@pnpm/find-workspace-packages';
import glob from 'fast-glob';

export {}

const srcPath = resolve("./src");
const componentsPath = resolve(srcPath, "components");
const typesPath = resolve(srcPath, "types");
const typesComponentsPath = resolve(typesPath, "components");

const checkDir = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}

const getName = (file: string) => {
    const filename = path.basename(file, ".svg");
    const componentname = camelcase(filename, { pascalCase: true });
    return { filename, componentname }
}

const getSvgFiles = async () => {
    const pkgs = await findWorkspacePackages((await findWorkspaceDir(process.cwd()))!);
    const pkg = pkgs.find((pkg) => pkg.manifest.name === 'svelte3-icons-svg')!;
    return glob('*.svg', { cwd: pkg.dir, absolute: true });
}

const transformComponent = (filepath: string) => {
    return new Promise<string>((resolve) => {
        const { filename } = getName(filepath);
        fs.readFile(filepath, 'utf8', (err, data) => {
            const m = data.match(/<svg ([^>]*)>/);
            const len = m ? m[1].length : 0;
            data = data.slice(0, len+5) + " {...$$restProps}" + data.slice(len+5);
            fs.writeFile(path.join(componentsPath, `${filename}.svelte`), data, "utf-8", ()=> {
                resolve("");
            });
        });
    })
}

const createIndexFile = (files: string[]) => {
    let content = "";
    let componentTypes = `import type { ComponentType, SvelteComponentTyped } from 'svelte';
import { SVGAttributes } from 'svelte/elements';
type SvgProps = ComponentType<SvelteComponentTyped<SVGAttributes<any>>>;
`;
    files.forEach((file) => {
        const { filename, componentname } = getName(file);
        content += `export { default as ${componentname} } from './${filename}.svelte'\n`;
        componentTypes += `export const ${componentname}: SvgProps;\n`;
    });
    fs.writeFileSync(path.join(componentsPath, "index.js"), content, "utf-8");
    fs.writeFileSync(path.join(typesPath, "components.d.ts"), componentTypes, "utf-8");
}

consola.info(chalk.blue('generating svelte components types...'));

checkDir(componentsPath);

const files =  await getSvgFiles();

checkDir(typesPath);

await Promise.all(files.map(file => transformComponent(file)));

createIndexFile(files);

consola.info(chalk.blue('svelte components types generation completed'));