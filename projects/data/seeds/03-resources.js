exports.seed = function(knex) {
  return knex("resource").insert([
    { resource_name: "green", description: "yep thats me!" },
    { resource_name: "blue", description: "yep thats me!" },
    { resource_name: "yellow", description: "yep thats me!" },
    { resource_name: "lime green", description: "yep thats me!" }
  ]);
};
