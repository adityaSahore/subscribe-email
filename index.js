const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  express.static("public", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);

mongoose.connect(
  "mongodb+srv://adityasahore:2m7btg845Yhr8hyY@subscribe.wxfumsj.mongodb.net/?retryWrites=true&w=majority&appName=subscribe"
);
// mongoose.connect("mongodb://0.0.0.0:27017/mydatabase");
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error connecting to Database:", err);
});

db.on("connected", () => {
  console.log("Connected to Database");
});

app.post("/subscribe", (req, res) => {
  var data = {
    email: req.body.email,
  };

  db.collection("subscribe").insertOne(data, (err, result) => {
    if (err) {
      console.error("Error inserting subscription:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log("Email Received");
    return res.redirect("success.html");
  });
});

// const PORT = 3000;
const PORT = 8080;
app.get("/", (req, res) => {
  res.set({ "Allow-access-Allow-origin": "*" });
  //res.send(`Server is running on port ${PORT}!!!`);
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
