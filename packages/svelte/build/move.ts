import fs from "fs";
import { resolve } from "path";
import consola from 'consola';
import chalk from 'chalk';
import {execSync} from 'child_process';

export {}

const distPath = resolve("./dist");
const srcPath = resolve("./src/types");
const typesPath = resolve(distPath, "types");

const copyFiles = (oringinPath: string, targetPath: string) => {
    if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath);
    }
    const files = fs.readdirSync(oringinPath, {withFileTypes:true});
    files.forEach(file => {
        if (file.isDirectory()) {
            fs.mkdirSync(resolve(targetPath, file.name));
            copyFiles(resolve(oringinPath, file.name), resolve(targetPath, file.name));
        }else {
            fs.copyFileSync(resolve(oringinPath, file.name), resolve(targetPath, file.name));
        }
    });
}

consola.info(chalk.blue('generating svelte components...'));

copyFiles(srcPath, typesPath);
execSync(`rm -rf ${srcPath}`);

consola.info(chalk.blue('svelte components is ended'));