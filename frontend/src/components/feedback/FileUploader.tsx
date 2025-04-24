import { useRef } from "react";

const FileUploader = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Uploading:", file.name);
      // You can pass this to your FastAPI backend here
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow w-full">
      <input
        type="file"
        ref={fileRef}
        accept=".csv,.json"
        onChange={handleUpload}
        className="mb-4"
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90"
      >
        Choose File
      </button>
    </div>
  );
};

export default FileUploader;
