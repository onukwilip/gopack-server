import { Router } from "express";
import { eventsController } from "../controllers/events";
const eventsRouter = Router();

eventsRouter.use("", eventsController);

export default eventsRouter;
