exports.seed = function(knex) {
  return knex("project").insert([
    { project_name: "skye", description: "test", completed: false },
    { project_name: "that girl", description: "test", completed: false },
    { project_name: "shes the best", description: "test", completed: false },
    { project_name: "shes amazing", description: "test", completed: false }
  ]);
};
