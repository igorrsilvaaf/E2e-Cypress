const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'mnohjy',
  e2e: {
    baseUrl: 'https://notes-serverless-app.com/',
    defaultCommandTimeout: 6000,
    setupNodeEvents(on, config) {

    },
  },
})
