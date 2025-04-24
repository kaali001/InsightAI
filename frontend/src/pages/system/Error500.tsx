

const Error500 = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">500 - Internal Server Error</h1>
        <p className="text-gray-600 mb-6">Oops! Something went wrong on our end. Please try again later.</p>
        <a href="/" className="text-blue-600 hover:underline">Go to Home</a>
      </div>
    </div>
  );
};

export default Error500;
