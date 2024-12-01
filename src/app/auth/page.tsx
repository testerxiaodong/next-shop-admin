'use client'

import { authenticate } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export default function Auth() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const router = useRouter()

  const onSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
    setIsAuthenticating(true)

    try {
      const error = await authenticate(email, password)
      // 返回值不为空，提示登录失败
      if (error) {
        toast.error('Invalid email or password', {
          position: 'top-right',
        })
      } else {
        // 登录成功，提示登录成功 并跳转到后台管理页面
        toast.success('Logged in successfully', {
          position: 'top-right',
        })
        router.push('/admin')
      }
    } catch (error) {
      // 捕获到异常，提示异常中的错误信息
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred while authenticating')
      }
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <div className="flex h-svh items-center justify-center">
      <div className="mx-auto grid w-[350px] gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      {...field}
                      disabled={isAuthenticating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-2">
                  <div className="flex items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      disabled={isAuthenticating}
                      id="password"
                      type="password"
                      {...field}
                    />
                  </FormControl>{' '}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isAuthenticating}
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
