import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resetPasswordSchema } from '../../lib/auth';
import  Input  from '../../components/ui/Input';
import  Button  from '../../components/ui/Button';

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    // Implement reset password logic
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl font-bold text-center">Reset Password</h2>
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Button type="submit" className="w-full mt-4">Send Reset Link</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
