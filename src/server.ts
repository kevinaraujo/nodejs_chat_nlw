import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({
    message: 'Hi nlw 05'
  });
});

app.post("/", (req, res) => {
  return res.json({
    message: "User created successfully!"
  });
});

app.listen(3333, () => console.log('Server is running on port 3333.'))