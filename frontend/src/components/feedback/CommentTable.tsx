interface CommentFile {
    id: string;
    source: string;
    fileName: string;
    uploadedAt: string;
    status: string;
  }
  
  const CommentTable = ({ files }: { files: CommentFile[] }) => {
    return (
      <div className="overflow-x-auto bg-white dark:bg-gray-900 shadow rounded-lg">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3">File Name</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Uploaded At</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3">{file.fileName}</td>
                <td className="px-4 py-3">{file.source}</td>
                <td className="px-4 py-3">{file.uploadedAt}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold
                    ${file.status === "Processed" ? "bg-green-100 text-green-700" :
                      "bg-yellow-100 text-yellow-700"}`}>
                    {file.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CommentTable;
  