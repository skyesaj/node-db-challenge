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

function getProjectById() {
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

function addTask(taskData) {
  return db("task").insert(taskData);
}

function getTask() {
  return db("task")
    .join("project", "project.id", "task.id")
    .select("*");
}

function getTaskById(id) {
  return db("task")
    .where({ id })
    .first();
}

module.exports = {
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
