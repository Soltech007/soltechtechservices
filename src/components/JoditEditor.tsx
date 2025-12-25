"use client";
import { useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/api/admin";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-96 bg-slate-50 rounded-lg">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-600">Loading editor...</p>
            </div>
        </div>
    ),
});

interface Props {
    value: string;
    onChange: (content: string) => void;
}

export default function JoditEditorComponent({ value, onChange }: Props) {
    const editor = useRef<any>(null);

    const config = useMemo(
        () => ({
            readonly: false,
            height: 550,
            language: "en",
            toolbarButtonSize: "medium",
            toolbarAdaptive: false,
            spellcheck: true,
            showCharsCounter: true,
            showWordsCounter: true,
            showXPathInStatusbar: false,
            askBeforePasteHTML: false,
            askBeforePasteFromWord: false,
            placeholder: "Start writing your amazing blog here… ✍️",
            // ⭐ FULL TOOLBAR (all TinyMCE-style options)
            buttons: [
                "source",
                "|",
                "undo",
                "redo",
                "|",
                "cut",
                "copy",
                "paste",
                "|",
                "selectall",
                "|",
                "search",
                "|",
                "paragraph",
                "fontsize",
                "font",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "brush",
                "superscript",
                "subscript",
                "|",
                "left",
                "center",
                "right",
                "justify",
                "|",
                "ol",
                "ul",
                "outdent",
                "indent",
                "|",
                "imageUploadCustom",
                "video",
                "table",
                "link",
                "unlink",
                "|",
                "hr",
                "symbol",
                "emoji",
                "|",
                "copyformat",
                "fullsize",
                "preview",
                "print",
                "source",
            ],

            // ⭐ Custom “Upload Image” Button
            controls: {
                imageUploadCustom: {
                    name: "imageUploadCustom",
                    tooltip: "Insert Image (Upload / URL)",
                    iconURL: "https://www.svgrepo.com/show/535454/image.svg",
                    exec: async (editorInstance: any) => {
                        const fileInput = document.createElement("input");
                        fileInput.type = "file";
                        fileInput.accept = "image/*";
                        fileInput.onchange = async () => {
                            const file = fileInput.files?.[0];
                            if (!file) return;
                            const toastId = toast.loading("Uploading image...");
                            try {
                                const { data: url, error } = await uploadImage(file, "blogs");
                                if (error) throw error;
                                editorInstance.selection.insertImage(url);
                                toast.success("Image inserted!", { id: toastId });
                            } catch (err: any) {
                                toast.error(err.message || "Upload failed", { id: toastId });
                            }
                        };
                        fileInput.click();
                    },
                },
            },

            uploader: {
                insertImageAsBase64URI: false,
            },

            // ⭐ Handle drag‑drop / paste for convenience
            events: {
                afterInit: (editor: any) => {
                    // paste image
                    editor.events.on("paste", async (event: ClipboardEvent) => {
                        const items = event.clipboardData?.items;
                        if (!items) return;
                        for (const item of items) {
                            if (item.kind === "file") {
                                const file = item.getAsFile();
                                if (!file) continue;
                                event.preventDefault();
                                const toastId = toast.loading("Uploading pasted image...");
                                try {
                                    const { data: url, error } = await uploadImage(file, "blogs");
                                    if (error) throw error;
                                    editor.selection.insertImage(url);
                                    toast.success("Image pasted!", { id: toastId });
                                } catch (err: any) {
                                    toast.error(err.message || "Upload failed", { id: toastId });
                                }
                            }
                        }
                    });
                    // drag/drop
                    editor.events.on("drop", async (event: DragEvent) => {
                        const files = event.dataTransfer?.files;
                        if (!files || !files[0]) return;
                        const file = files[0];
                        if (!file.type.startsWith("image/")) return;
                        event.preventDefault();
                        const toastId = toast.loading("Uploading dropped image...");
                        try {
                            const { data: url, error } = await uploadImage(file, "blogs");
                            if (error) throw error;
                            editor.selection.insertImage(url);
                            toast.success("Image dropped!", { id: toastId });
                        } catch (err: any) {
                            toast.error(err.message || "Upload failed", { id: toastId });
                        }
                    });
                },
            },
            colors: {
                greyscale: [
                    "#000",
                    "#434343",
                    "#666",
                    "#999",
                    "#B7B7B7",
                    "#CCC",
                    "#D9D9D9",
                    "#EFEFEF",
                    "#F3F3F3",
                    "#FFF",
                ],
                palette: [
                    "#980000",
                    "#FF0000",
                    "#FF9900",
                    "#FFFF00",
                    "#00F0F0",
                    "#00FFFF",
                    "#4A86E8",
                    "#0000FF",
                    "#9900FF",
                    "#FF00FF",
                ],
            },
        }),
        []
    );

    return (
        <div>
            <JoditEditor
                ref={editor}
                value={value}
                config={config}
                onBlur={(newContent) => onChange(newContent)}
                onChange={() => { }}
            />

            <style jsx global>{`
        .jodit-container {
          border: 2px solid #e5e7eb !important;
          border-radius: 0.75rem !important;
        }
        .jodit-toolbar__box {
          background: #f9fafb !important;
          border-bottom: 1px solid #e5e7eb !important;
        }
        .jodit-wysiwyg {
          font-family: system-ui, sans-serif !important;
          font-size: 16px !important;
          line-height: 1.6 !important;
          color: #1f2937 !important;
          padding: 20px !important;
        }
        .jodit-wysiwyg img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 8px !important;
          margin: 12px 0 !important;
        }
      `}</style>
        </div>
    );
}