import { Router } from "express";
import * as simulationController from "../controllers/simulation.controller";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/role";
import { validate } from "../middleware/validate";
import { createSimulationSchema, updateSimulationSchema } from "../validators/simulation.validator";

const router = Router();
const staff = [requireAuth, requireRole("ADMIN", "TEACHER")];

router.get("/", simulationController.listSimulations);
router.get("/:slug", simulationController.getSimulationBySlug);

router.post("/", ...staff, validate(createSimulationSchema), simulationController.createSimulation);
router.put("/:id", ...staff, validate(updateSimulationSchema), simulationController.updateSimulation);
router.delete("/:id", requireAuth, requireRole("ADMIN"), simulationController.deleteSimulation);

export default router;
