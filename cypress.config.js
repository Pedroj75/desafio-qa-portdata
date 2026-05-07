require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://github.com",
    allowCypressEnv: true,
    setupNodeEvents(on, config) {
      config.env.GITHUB_EMAIL = process.env.GITHUB_EMAIL;
      config.env.GITHUB_PASSWORD = process.env.GITHUB_PASSWORD;
      config.env.GITHUB_USERNAME = process.env.GITHUB_USERNAME;
      config.env.GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME;
      return config;
    },
  },
});