exports.seed = function(knex) {
  return knex("task").insert([
    {
      task_description: "skye",
      project_id: 1,
      notes: "hi",
      completed: true
    },
    {
      task_description: "is",
      project_id: 2,
      notes: "hi",
      completed: true
    },
    {
      task_description: "the",
      project_id: 3,
      notes: "hi",
      completed: true
    },
    {
      task_description: "best",
      project_id: 4,
      notes: "hi",
      completed: true
    }
  ]);
};
