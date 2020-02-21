// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./projects/data/projects.db3"
    },

    useNullAsDefault: true,
    migrations: {
      directory: "./projects/data/migrations"
    },
    seeds: {
      directory: "./projects/data/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  }
};
