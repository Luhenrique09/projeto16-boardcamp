import { Router } from "express";
import { create, findAll} from "../controllers/categories.controllers.js";

const router = Router();

router.post("/categories", create);
router.get("/categories", findAll);

export default router;
