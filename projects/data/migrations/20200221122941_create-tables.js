exports.up = function(knex) {
  return knex.schema
    .createTable("project", tbl => {
      tbl.increments();
      tbl.text("project_name", 128).notNullable();

      tbl.text("description", 255);
      tbl.boolean("completed").defaultTo(false);
    })
    .createTable("resource", tbl => {
      tbl.increments();
      tbl;

      tbl.text("resource_name", 128).notNullable();
      tbl.text("description", 255);
    })
    .createTable("task", tbl => {
      tbl.increments();
      tbl.text("task_description", 255).notNullable();
      tbl.text("notes", 255);
      tbl.boolean("completed").defaultTo(false);

      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("project_resource", tbl => {
      tbl.primary(["project_id", "resource_id"]);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("project")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resource")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resource")
    .dropTableIfExists("task")
    .dropTableIfExists("resource")
    .dropTableIfExists("project");
};
