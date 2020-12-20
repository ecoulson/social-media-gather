import router from "express";
import SearchPlaceholder from "./SearchPlaceholder";

router.use("/placeholder", SearchPlaceholder);

export default router;