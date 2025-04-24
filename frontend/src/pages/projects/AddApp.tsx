import AddAppForm from "../../components/project/AddAppForm";

const AddApp = () => {
  return (
    <div className="mt-16 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Add a New App Project
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Enter your app details to begin tracking and analyzing feedback.
      </p>
      <AddAppForm />
    </div>
  );
};

export default AddApp;
