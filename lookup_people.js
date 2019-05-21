const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect();

const queryType = process.argv.slice(2)[0];
let id = null
if (queryType === "read" || queryType === "delete" || queryType === "update") {
  id = process.argv.slice(2)[1]
}

if (queryType === "list") {
  client.query("SELECT * FROM famous_people", (err, res) => {
    if (err) {

      console.log("ERR:", err)
        return false
      }
    console.log(res.rows)
      client.end()
  })
}
