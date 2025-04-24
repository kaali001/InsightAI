import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/authStore';
import { loginSchema } from '../../lib/auth';
import  Input  from '../../components/ui/Input';
import  Button  from '../../components/ui/Button';

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    await login(data.email, data.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl font-bold text-center">Login</h2>
        <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button type="submit" className="w-full mt-4">Login</Button>
      </form>
    </div>
  );
};

export default Login;
