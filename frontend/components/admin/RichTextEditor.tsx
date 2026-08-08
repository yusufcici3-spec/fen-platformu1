"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// react-quill, tarayıcı API'lerine (document vb.) ihtiyaç duyduğu için
// sunucu tarafında render edilmemeli (SSR kapalı, dinamik import).
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TOOLBAR_OPTIONS = [
  [{ header: [2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "link"],
  ["clean"],
];

/** Konu içeriği için zengin metin editörü (HTML üretir). */
export function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="rounded-lg border border-lab-paperLine bg-white dark:border-white/10 dark:bg-lab-inkSoft [&_.ql-toolbar]:rounded-t-lg [&_.ql-container]:rounded-b-lg [&_.ql-container]:min-h-[160px]">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{ toolbar: TOOLBAR_OPTIONS }}
        placeholder={placeholder}
      />
    </div>
  );
}
