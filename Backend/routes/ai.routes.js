import { Router } from "express";
import {
    aiStatus, 
    leadSummary,
    generateEmailDraft, 
    salesInsights,
} from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protect);

router.post("/status", aiStatus);
router.post("/lead-summary", leadSummary);
router.get("/generate-email", generateEmailDraft);
router.put("/sales-insights", salesInsights);

export default router;