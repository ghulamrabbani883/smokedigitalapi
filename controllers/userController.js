const {
  insertUserText,
  deleteUserText,
  selectUSerByIdText,
  selectAllUserText,
  selectUserswithAddressText,
  updatUserText,
} = require("../query/userQuery");
const {
  insertAddressText,
  selectAddressByPersonIdText,
} = require("../query/addressQuery");
const { getClient } = require("../db/conn");

const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      email,
      gender,
      phone,
      password,
      street,
      city,
      country,
      pincode,
    } = req.body;

    //Checking for users required data
    if (!name || !email || !gender || !password) {
      return res.status(403).json({
        success: false,
        msg: `Please provide all user essentials data e.g ${
          (name, email, gender, password)
        }`,
      });
    }
    const client = await getClient();
    const result = await client.query(insertUserText, [
      name,
      email,
      gender,
      phone,
      password,
    ]);
    let address;
    console.log(result.rows);
    //Creating address
    if (result.rows[0]) {
      if (!city || !country || !pincode) {
        await client.query(deleteUserText, [result.rows[0].id]);
        return res.status(403).json({
          success: false,
          msg: `Please provide all address essentials data e.g ${
            (city, country, pincode)
          }`,
        });
      }
      address = await client.query(insertAddressText, [
        result.rows[0].id,
        street,
        city,
        country,
        pincode,
      ]);
    }
    return res.status(200).json({
      success: true,
      userData: result.rows[0],
      address: address.rows[0],
    });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in creating user" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const client = await getClient();
    const result = await client.query(selectAllUserText);
    return res.status(200).json({ success: true, users: result.rows });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in fetching all users" });
  }
};

const getAllUsersWithAddress = async (req, res) => {
  try {
    const client = await getClient();
    const result = await client.query(selectUserswithAddressText);
    return res.status(200).json({ success: true, all: result.rows });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in fetching all Data" });
  }
};

const getUserDetailById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await getClient();
    const result = await client.query(selectUSerByIdText, [id]);
    const address = await client.query(selectAddressByPersonIdText, [id]);
    return res
      .status(200)
      .json({ success: true, user: result.rows[0], address: address.rows[0] });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in fetching users data" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const client = await getClient();
    const result = await client.query(deleteUserText, [id]);
    if (result.rowCount == 1) {
      return res
        .status(200)
        .json({ success: true, msg: "User deleted successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in deleting user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, gender, phone, password } = req.body;
    const client = await getClient();
    const result = await client.query(updatUserText, [
      name,
      email,
      gender,
      phone,
      password,
      id,
    ]);
    console.log(result);
    if (result.rowCount == 1) {
      return res.status(200).json({
        success: true,
        msg: "User updated successfully",
        user: result.rows[0],
      });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, msg: "Error in updating user" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getAllUsersWithAddress,
  getUserDetailById,
  deleteUserById,
  updateUser,
};
