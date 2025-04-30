import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { signupSchema } from '../../lib/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { AuthCard } from './AuthCard';
import { AuthLayout } from './AuthLayout';

const Signup: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const signup = useAuthStore((state) => state.signup);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    await signup(data.name, data.email, data.password);
  };

  return (
    <AuthLayout bgGradient="from-indigo-500 via-purple-500 to-pink-500">
      <AuthCard 
        title="Create your account" 
        // subtitle="Start your AI journey with us"
        footer={
          <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Login</Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Full Name" 
            {...register('name')} 
            error={errors.name?.message}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>}
          />
          
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
          
          <Input 
            label="Confirm Password" 
            type="password" 
            {...register('confirmPassword')} 
            error={errors.confirmPassword?.message}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>}
          />
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Terms</a> and <a href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">Privacy Policy</a>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            loading={isSubmitting}
          >
            Get Started
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default Signup;