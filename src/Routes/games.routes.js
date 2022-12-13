import {Router} from "express";
import {create, findAll} from "../controllers/games.controller.js";

const router = Router();

router.post("/games", create);
router.get("/games", findAll);

export default router;