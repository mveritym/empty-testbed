const {
  events, Job, Group
} = require("brigadier")

events.on("push", function(e, project) {
  console.log("===> Building " + project.repo.cloneURL + " " + e.commit)

  var node = new Job("node-runner")
  node.image = "node:8"
  node.tasks = [
    "cd /src/hello",
    "npm install",
    "node index.js"
  ]

  node.run()
})
