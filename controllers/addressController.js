const {
  selectAddressByIdText,
  selectAllAddressText,
  deleteAddressText,
  updatAddressText,
} = require("../query/addressQuery");
const { getClient } = require("../db/conn");

const getAllAddress = async (req, res) => {
  try {
    const client = await getClient();
    const result = await client.query(selectAllAddressText);
    return res.status(200).json({ success: true, adresses: result.rows });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in fetching all addresses" });
  }
};
const getAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await getClient();
    const result = await client.query(selectAddressByIdText, [id]);
    return res.status(200).json({ success: true, address: result.rows[0] });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in fetching address data" });
  }
};

const deleteAddressById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await getClient();
    const result = await client.query(deleteAddressText, [id]);
    if (result.rowCount == 1) {
      return res
        .status(200)
        .json({ success: true, msg: "Address deleted successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in deleting address" });
  }
};

const updateAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const { street, city, country, pincode } = req.body;
    const client = await getClient();
    const result = await client.query(updatAddressText, [
      street,
      city,
      country,
      pincode,
      id,
    ]);
    if (result.rowCount == 1) {
      return res
        .status(200)
        .json({ success: true, msg: "Address updated successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in updating address" });
  }
};

module.exports = {
  getAllAddress,
  getAddressById,
  deleteAddressById,
  updateAddress,
};
