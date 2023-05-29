import cors from "cors";
import express, { Application, Request, Response } from "express";
import databaseConnect from "./utilities/server";
const app: Application = express();

// middle were calling
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// global error handling
app.get("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: "Your route not found",
  });
});

// database calling
databaseConnect();

export default app;
