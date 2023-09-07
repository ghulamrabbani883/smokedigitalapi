const insertUserText = `INSERT INTO person (name, email, gender, phone, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

const selectAllUserText = `SELECT * FROM person;`;

const selectUSerByIdText = `SELECT * FROM person WHERE id=$1;`;

const selectUserswithAddressText = `SELECT * FROM person JOIN address on person.id = address.person_id;`;

const deleteUserText = `DELETE FROM person WHERE id=$1;`;

const updatUserText = `UPDATE person SET name=$1, email=$2, gender=$3, phone=$4, password=$5 WHERE id=$6;`;

module.exports = {
  insertUserText,
  selectUSerByIdText,
  selectAllUserText,
  deleteUserText,
  selectUserswithAddressText,
  updatUserText,
};
