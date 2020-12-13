const { outputFile } = require('fs-extra');

module.exports = (name, address) => outputFile(
  `${process.cwd()}/deployments/${name}.js`,
  `module.exports = "${address}";`,
);
