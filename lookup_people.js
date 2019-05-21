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
client.query("SELECT * FROM famous_people WHERE (first_name =$1 OR last_name =$1)", [queryType], (err, res) => {
  if (err) {
    console.log("ERR:", err)
      return false
  }
  console.log('Searching...')
  let j = 1;
  for (let i = 0; i < res.rows.length; i++) {
    console.log(`- ${j}: ${res.rows[i].first_name},${res.rows[i].last_name} born ${res.rows[i].birthdate} `);
    j++;
    
  }
  //console.log(`- 1: ${res.rows[0].first_name},${res.rows[0].Last_name}`);
  client.end()
})

