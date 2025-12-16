import React, { useState } from "react";
import { UploadCloud, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card, CardTitle } from "@/components/ui/Card";
import { uploadFeedbackCsv } from "@/lib/api";
import { toast } from "sonner";

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.name.endsWith('.csv')) {
        toast.error('Please select a CSV file');
        return;
      }
      
      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (selectedFile.size > maxSize) {
        toast.error('File size must be less than 10MB');
        return;
      }
      
      setFile(selectedFile);
      toast.success(`Selected: ${selectedFile.name}`);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    try {
      setUploading(true);
      const result = await uploadFeedbackCsv(file);
      toast.success(result.message);
      setFile(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      toast.error(message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <Card className="p-6 max-w-2xl mx-auto">
        <CardTitle className="flex items-center gap-2 text-xl font-semibold mb-4">
          <UploadCloud className="w-5 h-5" />
          Upload Feedback File
        </CardTitle>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">CSV Format Requirements:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Must contain a column with feedback text</li>
                <li>Optional columns: rating, date, platform</li>
                <li>Maximum file size: 10MB</li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <Input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              disabled={uploading}
              className="cursor-pointer"
            />
            {file && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <FileText className="w-4 h-4" />
                <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={!file || uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Uploading...
              </>
            ) : (
              <>
                <UploadCloud className="w-4 h-4 mr-2" />
                Upload File
              </>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Upload;
