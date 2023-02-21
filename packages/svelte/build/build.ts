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
            data = data.replace("<svg", "<svg {...$$$restProps}");
            fs.writeFile(path.join(componentsPath, `${filename}.svelte`), data, "utf-8", ()=> {
                resolve("");
            });
        });
    })
}

const createIndexFile = (files: string[]) => {
    let content = "";
    let componentTypes = "import type { ComponentType } from 'svelte';\n";
    let indexContent = 'export * from "./components";\nimport * as icons from "./components";\nexport { icons }';
    files.forEach((file, index) => {
        const { filename, componentname } = getName(file);
        content += `export { default as ${componentname} } from './${filename}.svelte'\n`;
        componentTypes += `export const ${componentname}: ComponentType;\n`;
    });
    fs.writeFileSync(path.join(componentsPath, "index.js"), content, "utf-8");
    fs.writeFileSync(path.join(srcPath, "index.js"), indexContent, "utf-8");
    fs.writeFileSync(path.join(typesComponentsPath, "index.d.ts"), componentTypes, "utf-8");
    fs.writeFileSync(path.join(typesPath, "index.d.ts"), indexContent, "utf-8");
}

consola.info(chalk.blue('generating svelte components types...'));

checkDir(componentsPath);

const files =  await getSvgFiles();

checkDir(typesPath);
checkDir(typesComponentsPath);

await Promise.all(files.map(file => transformComponent(file)));

createIndexFile(files);

consola.info(chalk.blue('svelte components types generation completed'));