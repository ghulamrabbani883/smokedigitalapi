const express = require("express");
const {
  createUser,
  getAllUsers,
  getAllUsersWithAddress,
  getUserDetailById,
  deleteUserById,
  updateUser,
} = require("../controllers/userController");
const {
  getAllAddress,
  getAddressById,
  deleteAddressById,
  updateAddress,
} = require("../controllers/addressController");

const smokeRoute = express.Router();

//Creating new user with address
smokeRoute.post("/register", createUser);

// Get all address
smokeRoute.get("/addresses", getAllAddress);

// Get all users
smokeRoute.get("/users", getAllUsers);

// Get all users with address
smokeRoute.get("/all", getAllUsersWithAddress);

//Get users detail with address by id
smokeRoute.get("/user/:id", getUserDetailById);

//Get adress by id
smokeRoute.get("/address/:id", getAddressById);

//Deleting users byid
smokeRoute.delete("/user/:id", deleteUserById);

//Deleting address by id
smokeRoute.delete("/address/:id", deleteAddressById);

//Updating address by person_id
smokeRoute.put("/address/:id", updateAddress);

//Updating users byid
smokeRoute.put("/user/:id", updateUser);

module.exports = smokeRoute;
