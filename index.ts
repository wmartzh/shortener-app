import Server from "./src/server";
import router from "./src/routes/router";
import { json } from "express";
import morgan from "morgan";
import helmet from "helmet";

const PORT = parseInt(process.env.PORT || "8001");
const HOSTNAME = process.env.HOST || "localhost";
export default new Server()
  .applyGlobalMiddleware([json(), morgan("short"), helmet()])
  .router(router)
  .listen(PORT, HOSTNAME);
