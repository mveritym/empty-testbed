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

events.on("push_many", function(e, project) {
  console.log("===> Building " + project.repo.cloneURL + " " + e.commit)

  function makeJob(i) {
    var job = new Job(`node-runner-${i}`);
    job.image = "node:8";
    job.tasks = [
      "cd /src/hello",
      "npm install",
      "node index.js"
    ];
    return job;
  }

  job1 = makeJob(1);
  job2 = makeJob(2);
  job3 = makeJob(3);

  Group.runAll([job1, job2, job3]).then(() => {
    console.log("Completed all jobs")
  });
})
