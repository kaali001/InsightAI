import React from 'react';

const VerifyEmail: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-bold text-center">Email Verification</h2>
        <p className="text-center">Please check your email to verify your account.</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
