import { useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';

export function AddPhotoButton({
  onFiles,
  busy,
}: {
  onFiles: (files: FileList | File[]) => void;
  busy: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
      }}
      className={`flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed p-3 text-center transition ${
        dragOver
          ? 'border-slate-500 bg-slate-100'
          : 'border-slate-300 bg-slate-50 hover:border-slate-400'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          if (e.target.files?.length) onFiles(e.target.files);
          e.target.value = '';
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="flex flex-col items-center gap-1.5 text-slate-600 disabled:opacity-60"
        aria-label="Add photo"
      >
        {busy ? (
          <Loader2 className="h-7 w-7 animate-spin" />
        ) : (
          <ImagePlus className="h-7 w-7" />
        )}
        <span className="text-xs font-semibold">
          {busy ? 'Adding…' : 'Add photo'}
        </span>
        <span className="hidden text-[11px] text-slate-400 sm:block">
          tap or drop
        </span>
      </button>
    </div>
  );
}
