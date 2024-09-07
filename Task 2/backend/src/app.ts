import express, { Request, Response } from "express";
import cors from "cors";
import apiV1 from "./routes/api-v1";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "server is up and running ..." });
});

app.use("/api/v1", apiV1);
