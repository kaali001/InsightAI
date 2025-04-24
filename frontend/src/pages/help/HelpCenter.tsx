

const HelpCenter = () => {
  return (
    <div className="mt-14 p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Help Center</h1>
      <p className="text-gray-600 mb-4">Find answers to common questions and get assistance with any issues you're facing.</p>
      <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">How do I reset my password?</h3>
          <p className="text-gray-700">To reset your password, click the "Forgot Password" link on the login page and follow the instructions.</p>
        </div>
        <div>
          <h3 className="font-semibold">How do I update my profile?</h3>
          <p className="text-gray-700">You can update your profile information in the "Settings" section of your account.</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
