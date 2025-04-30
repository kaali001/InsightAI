import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { loginSchema } from '../../lib/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { AuthCard } from './AuthCard';
import { AuthLayout } from './AuthLayout';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await login(data.email, data.password);
  };

  return (
    <AuthLayout bgGradient="from-blue-500 via-indigo-500 to-purple-600">
      <AuthCard 
        title="Welcome back" 
        subtitle="Unlock the power of AI"
        footer={
          <>
            <p className="text-center">
              <Link to="/reset-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Forgot Password?</Link>
            </p>
            <p className="mt-2 text-center">
              Don't have an account? <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Sign Up</Link>
            </p>
          </>
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
          
          <Input 
            label="Password" 
            type="password" 
            {...register('password')} 
            error={errors.password?.message}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            loading={isSubmitting}
          >
            Sign In
          </Button>
        </form>
        
   
      </AuthCard>
    </AuthLayout>
  );
};

export default Login;