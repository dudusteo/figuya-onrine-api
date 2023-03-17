const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');

const db = [{
  email: "admin", 
  password: "admin",
  firstName: "admin",
  lastName: "admin",
}]

// Set up Global configuration access
dotenv.config();

let PORT = process.env.PORT || 5000;
const app = express();

app.options("*", cors())

const corsOptions = {
  origin: process.env.APP_URL,
  optionsSuccessStatus: 200,
}

app.use(bodyParser.json());
app.use(cors(corsOptions))

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT} ...`);
});

app.post("/auth/register", (req, res) => {
  // Create User here

  const {email, password, firstName, lastName} = req.body;

  console.log(db);

  db.push({email, password, firstName, lastName})
})

// Main Code Here  //
// Generating JWT
app.post("/auth/login", (req, res) => {
  // Validate User Here
  // Then generate JWT Token

  const { email, password } = req.body;

  db.forEach(element => {
    if(element.email === email && element.password === password)
      console.log("logged in");
  });

  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  const token = jwt.sign({ email }, jwtSecretKey, {expiresIn: '7d'});

  res.send({email, token});
});

// Verification of JWT
app.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in header of request
  // Due to security reasons.

  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const token = req.header(tokenHeaderKey);

    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return res.send("Successfully Verified");
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    // Access Denied
    return res.status(401).send(error);
  }
});
