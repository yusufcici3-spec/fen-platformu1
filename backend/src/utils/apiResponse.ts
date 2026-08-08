import { Response } from "express";

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function sendSuccess<T>(
  res: Response,
  data: T,
  message = "İşlem başarılı",
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res: Response,
  message = "Bir hata oluştu",
  statusCode = 500,
  details?: unknown
) {
  return res.status(statusCode).json({
    success: false,
    message,
    details,
  });
}
