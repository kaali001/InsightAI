import React from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle } from "@/components/ui/Card";

const Export: React.FC = () => {
  return (
    <div className="p-6">
      <Card className="p-4 w-1/2"
       
      >
        <CardTitle className="flex items-center gap-2 text-xl font-semibold"> <FileDown className="w-5 h-5" />
        Export Reports</CardTitle>
        <p className="mb-4 text-sm text-muted-foreground">
          Download your AI-analyzed reports in PDF or Excel format for internal sharing and review.
        </p>
        <div className="flex gap-4">
          <Button >Download PDF</Button>
          <Button >Download Excel</Button>
        </div>
      </Card>
    </div>
  );
};

export default Export;
