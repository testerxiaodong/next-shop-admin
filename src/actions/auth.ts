'use server'

import { createClient } from '@/supabase/server'
import { AuthError } from '@supabase/supabase-js'

export const authenticate = async (email: string, password: string) => {
  const supabase = await createClient()
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    // 登陆失败，返回error
    if (error instanceof AuthError) return error
  } catch (error) {
    // 其他错误，抛出error
    throw new Error(`Error authenticating: ${error}`)
  }
}

export const getLatestUsers = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('id, email, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) throw new Error(`Error fetching latest users: ${error.message}`)

  return data.map(
    (user: { id: string; email: string; created_at: string | null }) => ({
      id: user.id,
      email: user.email,
      date: user.created_at,
    })
  )
}
