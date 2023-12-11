import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.status(200);
  res.json({ data: "vedansh" });
});

export default app;
