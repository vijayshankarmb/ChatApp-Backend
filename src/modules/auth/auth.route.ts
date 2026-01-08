import { Router } from "express";
import { register, login, logout, getMe } from "./auth.controller";
import { validateSchema } from "../../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "./auth.schema";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);

export default router;