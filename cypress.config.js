const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "gz5ooj",
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    video: true,
    
  },
})
