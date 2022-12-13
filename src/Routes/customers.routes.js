import {Router} from "express";
import { create, findAll, findById, updateCustomer } from "../controllers/customers.controller.js";

const router = Router();

router.post("/customers", create);
router.get("/customers", findAll);
router.get("/customers/:id", findById);
router.put("/customers/:id", updateCustomer);

export default router;