const express = require("express");

const project = require("./projectModel");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("projects");
// });

router.get("/", (req, res) => {
  project
    .getProject()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Failed" });
    });
});

router.get("/resource", (req, res) => {
  project
    .getResource()
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Failed to get resources" });
    });
});

router.get("/:id/task", (req, res) => {
  project
    .getTask()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Failed to get Tasks" });
    });
});

router.post("/", (req, res) => {
  if (req.body.project_name) {
    project
      .addProject(req.body)
      .then(projects => {
        res.status(201).json(projects);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: "cant post project" });
      });
  } else {
    return res.status(400).json({ error: "field required" });
  }
});

router.post("/resource", (req, res) => {
  if (req.body) {
    project
      .addResource(req.body)
      .then(projects => {
        return res.status(201).json(projects);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ error: "cant add resource" });
      });
  } else {
    return res.status(400).json({ error: "failed" });
  }
});

router.post("/:id/task", (req, res) => {
  const { id } = req.params;
  if (!req.body.task_description) {
    res.status(400).json({ error: "description required" });
  } else {
    const send = {
      ...req.body,
      project_id: id
    };
    project
      .addTask(send)
      .then(task => {
        project.getTaskById(task).then(tasks => {
          res.status(201).json(tasks);
        });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "cant add task" });
      });
  }
});

module.exports = router;
