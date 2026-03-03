const express = require("express");
const app = express();

app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@gmail.com" && password === "1234") {
    res.json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});