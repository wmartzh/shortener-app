import { Router } from "express";
import mainController from "../controllers/main.controller";
//Definition of every endpoint from source
export default Router()
  .post("/", (req, res) => mainController.create(req, res))
  .get("/:slug", (req, res) => mainController.redirect(req, res));
