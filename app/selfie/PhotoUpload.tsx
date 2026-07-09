"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

export interface PhotoUploadHandle {
  open: () => void;
}

interface PhotoUploadProps {
  onSelect: (base64DataUrl: string) => void;
  onError: (message: string) => void;
}

const PhotoUpload = forwardRef<PhotoUploadHandle, PhotoUploadProps>(
  function PhotoUpload({ onSelect, onError }, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => inputRef.current?.click(),
    }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      // reset so selecting the same file twice still fires onChange
      e.target.value = "";
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        onError("File must be an image");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        onError("Image must be under 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => onSelect(reader.result as string);
      reader.onerror = () => onError("Could not read file");
      reader.readAsDataURL(file);
    };

    return (
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    );
  },
);

export default PhotoUpload;
