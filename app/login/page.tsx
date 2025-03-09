import Link from 'next/link';
import { ArrowLeft, LockKeyhole } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='container flex flex-1 items-center justify-center py-12'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1 text-center'>
            <div className='flex justify-center mb-4'>
              <div className='h-12 w-12 rounded-full bg-primary flex items-center justify-center'>
                <LockKeyhole className='h-6 w-6 text-primary-foreground' />
              </div>
            </div>
            <CardTitle className='text-2xl'>Welcome back</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='username'>Username or Email</Label>
              <Input id='username' placeholder='Enter your username or email' />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='password'>Password</Label>
                <Link
                  href='/forgot-password'
                  className='text-xs text-primary hover:underline'
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id='password'
                type='password'
                placeholder='Enter your password'
              />
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='remember' />
              <Label htmlFor='remember' className='text-sm font-normal'>
                Remember me for 30 days
              </Label>
            </div>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            <Button className='w-full'>Sign In</Button>
            <div className='text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link href='/register' className='text-primary hover:underline'>
                Sign up
              </Link>
            </div>
            <Link
              href='/'
              className='flex items-center justify-center text-sm text-muted-foreground hover:text-foreground'
            >
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
