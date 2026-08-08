import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

/**
 * Verilen Zod şemasına göre req.body/query/params doğrular.
 * Hatalıysa ZodError fırlatır, errorHandler bunu 422 olarak döner.
 */
export function validate(schema: AnyZodObject) {
  return (req: Request, _res: Response, next: NextFunction) => {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  };
}
