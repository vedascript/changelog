import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./router.ts";
import { protect } from "./modules/auth.ts";
import { createUser, signin } from "./handlers/users.ts";

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, router);

app.post("/signup", createUser);
app.post("/signin", signin);

export default app;
