// const { getClient } = require("./db/conn");

const createUser = async () => {
  const userTable = `CREATE TABLE person (id SERIAL PRIMARY KEY, name VARCHAR(30) NOT NULL, email VARCHAR(30) UNIQUE NOT NULL, gender VARCHAR(9), phone VARCHAR(12), password VARCHAR NOT NULL, CHECK (gender in ('Male', 'Female', 'Unknown')));`;

  const client = await getClient();
  await client.query(userTable);

  
  const addressTable = `CREATE TABLE address (id SERIAL PRIMARY KEY, person_id INT, street VARCHAR, city VARCHAR NOT NULL, country VARCHAR NOT NULL, pincode BIGINT NOT NULL, FOREIGN KEY (person_id) REFERENCES person(id) ON DELETE CASCADE);`

  await client.query(addressTable);

  console.log("table created");
};

createUser()
