const r = require('./db');

function seedDB () {
  r.db('ironman').table_list().run()
      .then(clearDB)
      .then(createModels);
}

// This won't work if there are multiple dbs
function clearDB (tables) {
  for (let table of tables) {
    return r.table_drop(table).run();
  }
}

function createModels() {
  return r.tableCreate('users').run();
}

module.exports = seedDB;