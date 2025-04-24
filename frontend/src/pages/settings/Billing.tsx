

const Billing = () => {
  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Billing & Subscription</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <p className="text-gray-600">Current Plan: <strong>Pro</strong></p>
        <p className="text-gray-600">Next Billing Date: <strong>May 10, 2025</strong></p>
      </div>
      <button className="bg-red-500 text-white px-4 py-2 rounded">Cancel Subscription</button>
    </div>
  );
};

export default Billing;
