

const APIKeys = () => {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">API Keys</h1>
      <p className="text-gray-600 mb-2">Manage your API keys for external access to InsightAI data.</p>
      <div className="bg-gray-100 p-4 rounded mb-4">
        <p className="text-sm">Current Key: <code>abc123xyz456</code></p>
        <button className="mt-2 text-sm text-blue-600 hover:underline">Regenerate Key</button>
      </div>
    </div>
  );
};

export default APIKeys;
