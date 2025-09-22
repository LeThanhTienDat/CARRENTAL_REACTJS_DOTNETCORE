import { useState } from "react";

export default function ImageUploadPreview() {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  return (
    <div className="relative inline-block">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block"
      />

      {preview && (
        <div className="group relative mt-2 inline-block">
          <img
            src={preview}
            alt="preview"
            className="h-16 w-16 object-cover rounded cursor-pointer border"
          />

          {/* Hover dialog */}
          <div className="absolute left-20 top-0 hidden group-hover:block z-50">
            <div className="p-2 bg-white rounded shadow-lg border">
              <img
                src={preview}
                alt="big preview"
                className="h-48 w-48 object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
