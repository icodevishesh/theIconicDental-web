'use client';
import { useState, useRef, type DragEvent } from 'react';

type Props = {
  /** Current image URL (controlled). */
  value?: string;
  /** Called with the uploaded Cloudinary URL, or "" when cleared. */
  onChange?: (url: string) => void;
};

export default function ImageUploader({ value, onChange }: Props) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const preview = localPreview ?? value ?? null;

  const handleFile = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }

    setError(null);
    setLocalPreview(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      onChange?.(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setLocalPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const clear = () => {
    setLocalPreview(null);
    setError(null);
    onChange?.('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-8 text-center text-sm transition-colors ${
          dragActive
            ? 'border-teal bg-teal/5 text-teal'
            : 'border-slate-300 bg-slate-50 text-slate-500 hover:border-teal/60'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <p>
          <span className="font-semibold text-teal">Click to upload</span> or drag &amp; drop an image
        </p>
        <p className="mt-1 text-xs text-slate-400">PNG, JPG, WebP</p>
      </div>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

      {preview && (
        <div className="mt-3 flex items-start gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Thumbnail preview"
            className="h-24 w-32 rounded-md border border-slate-200 object-cover"
          />
          <div className="flex flex-col gap-1 text-xs">
            <span className={uploading ? 'text-slate-500' : 'text-emerald-600'}>
              {uploading ? 'Uploading…' : 'Uploaded'}
            </span>
            {!uploading && (
              <button
                type="button"
                onClick={clear}
                className="w-fit font-medium text-red-600 hover:underline"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
