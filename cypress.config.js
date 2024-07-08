const { defineConfig } = require('cypress');
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      installLogsPrinter(on);
      return config;
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: false,
      json: true,
  },
  experimentalRunAllSpecs:true,
  experimentalWebKitSupport: true
}
});
