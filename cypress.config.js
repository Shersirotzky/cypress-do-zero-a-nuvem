const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "73yqw7",
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    video: true,
    
  },
})
