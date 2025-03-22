import { env } from '@env'
import { createServerClient } from '@supabase/ssr'

import { cookies } from 'next/headers'
import type { Database } from '~/types/supabase'

export async function createClient(serviceKey?: string) {
	const cookieStore = await cookies()

	return createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL,
		serviceKey ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll()
				},
				setAll(cookiesToSet) {
					for (const { name, value, options } of cookiesToSet) {
						cookieStore.set(name, value, options)
					}
				}
			}
		}
	)
}
