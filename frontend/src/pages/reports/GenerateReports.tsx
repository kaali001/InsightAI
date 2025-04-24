

const GenerateReports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Generate Reports</h1>
      <p className="text-gray-600 mb-6">Generate detailed issue and feedback reports over custom time periods.</p>
      <div className="bg-white p-6 rounded shadow">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Date Range</label>
            <input type="date" className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Report Type</label>
            <select className="mt-1 block w-full border rounded px-3 py-2">
              <option>Summary</option>
              <option>Cluster Insights</option>
              <option>Full Detail</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Generate</button>
        </form>
      </div>
    </div>
  );
};

export default GenerateReports;
