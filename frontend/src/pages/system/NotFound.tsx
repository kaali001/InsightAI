

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="text-blue-600 hover:underline">Go to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
