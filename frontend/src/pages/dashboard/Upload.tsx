import React from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card, CardTitle } from "@/components/ui/Card";

const Upload: React.FC = () => {
  return (
    <div className="p-6">
      <Card className=" p-4 w-1/2" >
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">  <UploadCloud className="w-5 h-5" />  Upload Feedback File</CardTitle>
        <p className="mb-4 text-sm text-muted-foreground">
          Upload CSV or JSON files containing user feedback from app stores, forms, or exports.
        </p>
        <form className="space-y-4">
          <Input type="file" accept=".csv,.json" />
          <Button type="submit">Upload</Button>
        </form>
      </Card>
    </div>
  );
};

export default Upload;
