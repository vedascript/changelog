import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handelePayloadErrors } from "./modules/middlewares";

const router = Router();

// product routes
router.get("/product", () => {});

router.post(
  "/product",
  body("name").isString(),
  handelePayloadErrors,
  (req, res) => {}
);

router.get("/product/:id", (req, res) => {});
router.delete("/product/:id", () => {});

router.put(
  "/product/:id",
  body("name").isString(),
  handelePayloadErrors,
  (req, res) => {}
);

// update routes
router.get("/update", () => {});
router.get("/update/:id", () => {});
router.delete("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("asset").optional(),
  body("status").isIn(["IN_PROGRESS", "DEPRECATED", "COMPLETED"]),
  () => {}
);

router.post("/update", body("title").exists(), body("body").exists(), () => {});

// update-point routes
router.get("/updatepoint", () => {});
router.get("/updatepoint/:id", () => {});

router.put(
  "/updatepoint/:id",
  body("name").optional(),
  body("description").optional(),
  () => {}
);

router.delete("/updatepoint/:id", () => {});

router.post(
  "/updatepoint",
  body("name").exists(),
  body("description").exists(),
  body("updateId").exists(),
  () => {}
);

export default router;
