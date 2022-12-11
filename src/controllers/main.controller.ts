import { Request, Response } from "express";
import mainService, { createShortSchema } from "../service/main.service";

class MainController {
  async redirect(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const data = await mainService.findBySlug(slug);

      if (!data) {
        res.json({ message: "URL not found" });
      } else {
        res.redirect(data.url);
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Error",
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const value = await createShortSchema.validateAsync(req.body);

      const response = await mainService.create(value);

      res.status(200).json(response);
    } catch (error) {
      console.log(
        "🔰 > file: main.controller.ts:13 > MainController > create > error",
        error
      );
      res.status(500).json({
        message: "Internal Error",
      });
    }
  }
}

export default new MainController();
