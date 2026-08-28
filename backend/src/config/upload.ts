import multer, { FileFilterCallback } from "multer";
import path from "path";
import fs from "fs";
import { ApiError } from "../utils/apiResponse";

const IS_VERCEL = Boolean(process.env.VERCEL);

// Vercel'de /var/task yazılabilir değildir.
// Geçici dosyalar için /tmp kullanıyoruz.
// Yerel çalışmada mevcut uploads klasörü kullanılmaya devam eder.
const UPLOAD_ROOT = IS_VERCEL
  ? "/tmp/uploads"
  : path.resolve(__dirname, "../../../uploads");

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const ALLOWED_IMAGE_MIME = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
];

const ALLOWED_VIDEO_MIME = [
  "video/mp4",
  "video/webm",
  "video/ogg",
];

const ALLOWED_PDF_MIME = ["application/pdf"];

function storageFor(
  subfolder: "avatars" | "topics" | "videos" | "pdfs"
) {
  const dir = path.join(UPLOAD_ROOT, subfolder);

  ensureDir(dir);

  return multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const uniqueName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${ext}`;

      cb(null, uniqueName);
    },
  });
}

function fileFilterFor(
  allowedMime: string[],
  readableTypes: string
) {
  return (
    _req: unknown,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (!allowedMime.includes(file.mimetype)) {
      return cb(
        new ApiError(
          415,
          `Yalnızca ${readableTypes} dosyaları yüklenebilir.`
        )
      );
    }

    cb(null, true);
  };
}

export const uploadAvatar = multer({
  storage: storageFor("avatars"),
  fileFilter: fileFilterFor(
    ALLOWED_IMAGE_MIME,
    "PNG, JPEG, WEBP veya GIF"
  ),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

export const uploadTopicImage = multer({
  // Konu görselleri Cloudinary’ye buffer olarak gönderilir.
  // Vercel’de geçici disk yolu kullanmak yerine bellekte tutuyoruz.
  storage: multer.memoryStorage(),
  fileFilter: fileFilterFor(
    ALLOWED_IMAGE_MIME,
    "PNG, JPEG, WEBP veya GIF"
  ),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const uploadTopicVideo = multer({
  // Video rotası da Cloudinary’ye buffer gönderdiği için bellekte tutulur.
  storage: multer.memoryStorage(),
  fileFilter: fileFilterFor(
    ALLOWED_VIDEO_MIME,
    "MP4, WEBM veya OGG"
  ),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

export const uploadTopicPdf = multer({
  // PDF route’u dosyayı Cloudinary’ye buffer olarak gönderir.
  // Vercel’de yerel dosya yolları kalıcı olmadığı için diskStorage kullanılmaz.
  storage: multer.memoryStorage(),
  fileFilter: fileFilterFor(
    ALLOWED_PDF_MIME,
    "PDF"
  ),
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

// Excel / CSV dosyaları bellekte işlenir.
const ALLOWED_IMPORT_MIME = [
  "text/csv",
  "text/plain",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export const uploadQuestionImportFile = multer({
  storage: multer.memoryStorage(),
  fileFilter: fileFilterFor(
    ALLOWED_IMPORT_MIME,
    "CSV veya XLSX"
  ),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
