import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const validateDto =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: error });
    }
  };
