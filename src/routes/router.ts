import { Application } from "express";
import main from "./main";
export default function router(app: Application): void {
  /**
   * Every source are specifed here
   */
  app.use(main);
}
