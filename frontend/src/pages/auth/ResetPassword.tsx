import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resetPasswordSchema } from '../../lib/auth';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { AuthCard } from './AuthCard';
import { AuthLayout } from './AuthLayout';

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: z.infer<typeof resetPasswordSchema>) => {
    // Implement reset password logic
    console.log("Reset password data:", data);
  };

  return (
    <AuthLayout bgGradient="from-purple-500 via-pink-500 to-red-500">
      <AuthCard 
        title="Reset Password" 
        subtitle="We'll send you a link to reset your password"
        footer={
          <p className="mt-4 text-center">
            Remembered your password? <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300">Login</Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Email" 
            type="email" 
            {...register('email')} 
            error={errors.email?.message}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>}
          />
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            // loading={isSubmitting}
          >
            Send Reset Link
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default ResetPassword;