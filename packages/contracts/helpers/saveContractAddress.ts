import { outputFile } from 'fs-extra';

export default (name, address) =>
    outputFile(`${process.cwd()}/deployments/${name}.js`, `module.exports = "${address}";`);
