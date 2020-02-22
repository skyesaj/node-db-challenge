const express = require("express");

const project = require("./projectModel");

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;
  project
    .getProjectById(id)
    .then(proj => {
      // res.status(200).json(project);
      // console.log(proj, "project");
      project
        .getTask(id)
        .then(task => {
          // console.log(task, "task");
          project
            .getResourceProj(id)
            .then(resource => {
              // console.log(resource, "resource");
              res.status(200).json({
                ...proj,
                task: task,
                resources: resource
              });
            })
            .catch(error => {
              res.status(500).json({ error: "noooo" });
            });
        })
        .catch(error => {
          res.status(500).json({ error: "nooo" });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "couldnt get project id" });
    });
});

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
  const { id } = req.params;
  project
    .getTask(id)
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
        // console.log(task);
        project.getTaskById(task[0]).then(tasks => {
          console.log(tasks);
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
