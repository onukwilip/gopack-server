import { Router } from "express";
import { getReadmeFile } from "../controllers/readme";
const readmeRouter = Router();

readmeRouter.get("/", getReadmeFile);

export default readmeRouter;
