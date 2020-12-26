import { Router } from "express";
import SearchPlaceholder from "./SearchPlaceholder";

const router = Router();

router.use("/placeholder", SearchPlaceholder);

export default router;
