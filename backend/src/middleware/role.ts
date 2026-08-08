import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiResponse";
import { RoleName } from "../generated/prisma";

/**
 * Belirtilen rollerden birine sahip olmayan kullanıcıları engeller.
 * Kullanım: router.get("/admin", requireAuth, requireRole("ADMIN"), handler)
 */
export function requireRole(...allowedRoles: RoleName[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(401, "Bu işlem için giriş yapmanız gerekiyor.");
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(403, "Bu işlemi gerçekleştirmek için yetkiniz yok.");
    }
    next();
  };
}
