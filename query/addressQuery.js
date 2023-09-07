const insertAddressText = `INSERT INTO address (person_id, street, city, country, pincode) VALUES($1, $2, $3, $4, $5) RETURNING *;`;

const selectAddressByIdText = `SELECT * FROM address WHERE id=$1;`;

const selectAddressByPersonIdText = `SELECT * FROM address WHERE person_id=$1;`;

const selectAllAddressText = `SELECT * FROM address;`;

const deleteAddressText = `DELETE FROM address WHERE id=$1;`;

const updatAddressText = `UPDATE address SET street=$1, city=$2, country=$3, pincode=$4 WHERE person_id=$5;`;

module.exports = {
  insertAddressText,
  selectAddressByIdText,
  selectAllAddressText,
  deleteAddressText,
  selectAddressByPersonIdText,
  updatAddressText,
};
