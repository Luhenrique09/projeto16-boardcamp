import {Router} from "express";
import { create, findAll, finalize, deleteRental } from "../controllers/rentals.controller.js";

const router = Router();

router.post("/rentals", create);
router.get("/rentals", findAll);
router.post("/rentals/:id/return", finalize);
router.delete("/rentals/:id", deleteRental);

export default router;