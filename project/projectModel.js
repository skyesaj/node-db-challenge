const db = require("../projects/data/db-Config");

function getResource() {
  return db("resource");
}

function getResourceById() {
  return db("resource")
    .where({ id })
    .first();
}

function getProject() {
  return db("project");
}

function getProjectById(id) {
  return db("resource")
    .where({ id })
    .first();
}

function addResource(resourceData) {
  return db("resource").insert(resourceData);
}

function addProject(projectData) {
  return db("project").insert(projectData);
}

function addTask(taskData, id) {
  return db("task").insert(taskData);
}

function getTask(id) {
  return db("task")
    .join("project", "project.id", "task.project_id")
    .select("*")
    .where("task.project_id", id);
}

function getResourceProj(id) {
  return db("project_resource as pr")
    .join("resource as r", "r.id", "pr.resource_id")
    .join("project as p", "p.id", "pr.project_id")
    .select("r.*")
    .where("pr.project_id", id);
}

function getTaskById(id) {
  return db("task")
    .where({ id })
    .first();
}

module.exports = {
  getResourceProj,
  getResource,
  getProjectById,
  getResourceById,
  getProject,
  getTask,
  getTaskById,
  addProject,
  addResource,
  addTask
};
