const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');

module.exports = (on, config) => {
  installLogsPrinter(on);
  return config;
};
