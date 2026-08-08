import { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Async controller fonksiyonlarını sarmalar, oluşan hataları
 * otomatik olarak Express'in error middleware'ine iletir.
 */
export function catchAsync(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
