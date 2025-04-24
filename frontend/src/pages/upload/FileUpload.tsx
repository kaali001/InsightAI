import FileUploader from "../../components/feedback/FileUploader";

const FileUpload = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Upload Feedback File
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Upload CSV or JSON files of user reviews collected from your website or social media.
      </p>
      <FileUploader />
    </div>
  );
};

export default FileUpload;
