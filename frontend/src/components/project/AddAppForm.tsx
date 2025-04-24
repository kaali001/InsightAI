import { useForm } from "react-hook-form";

const AddAppForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log("App Data:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-gray-900 p-6 shadow rounded-lg">
      <div>
        <label className="block mb-1 font-medium">App Name</label>
        <input {...register("name")} className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Platform</label>
        <select {...register("platform")} className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white">
          <option value="android">Android</option>
          <option value="ios">iOS</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <input {...register("category")} className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Play Store / App Store Link</label>
        <input {...register("storeLink")} className="w-full px-4 py-2 border rounded dark:bg-gray-800 dark:text-white" />
      </div>
      <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90">
        Add Project
      </button>
    </form>
  );
};

export default AddAppForm;
