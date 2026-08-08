import { z } from "zod";

export const createTeacherNoteSchema = z.object({
  body: z.object({
    studentId: z.string().uuid("Geçersiz öğrenci kimliği."),
    note: z.string().trim().min(3, "Not en az 3 karakter olmalı.").max(2000),
  }),
});
