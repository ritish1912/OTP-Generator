import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  console.log(randomNum);
  res.json({ otp: randomNum });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
