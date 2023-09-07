const express = require("express");
const path = require('path');
const dotenv = require("dotenv");
const smokeRoute = require("./Routes/smokeRoute");
dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.port;
require("./db/conn");

// Serving fstatic files for UI
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


app.use("/", smokeRoute);

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);


