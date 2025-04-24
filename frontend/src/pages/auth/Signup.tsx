import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { signupSchema } from '../../lib/auth';
import Input from '../../components/ui/Input';
import  Button  from '../../components/ui/Button';

const Signup: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });
  const signup = useAuthStore((state) => state.signup);

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    await signup(data.name, data.email, data.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button type="submit" className="w-full mt-4">Sign Up</Button>
      </form>
    </div>
  );
};

export default Signup;
