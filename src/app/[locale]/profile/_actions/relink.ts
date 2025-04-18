'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getDiscordAuthUrl } from '@discord'
import { getBaseUrl } from '@utils/client'

export async function relink(formData: FormData) {
	const pathname = formData.get('pathname')?.toString()
	const cookiesList = await cookies()
	cookiesList.set('return-url', `${getBaseUrl()}${pathname ?? '/profile'}`)
	redirect(getDiscordAuthUrl(`${getBaseUrl()}/api/auth/relink/discord`))
}
