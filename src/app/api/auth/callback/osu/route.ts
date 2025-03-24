import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'

import { getDiscordAuthUrl } from '@discord'
import { osuAuth } from '@osu'
import { encrypt } from '@session'
import { isProd } from '@utils/client'

import { authError } from '../../utils'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const locale = searchParams.get('locale') ?? 'en'
	const code = searchParams.get('code')
	const url = new URL(request.url)

	const t = await getTranslations({ locale, namespace: 'APICallbacks' })
	if (!code) return authError(url, t('Errors.missingCode'))

	try {
		;(await cookies()).delete('session')
		const tokens = await osuAuth.requestToken(code)
		const cookiesList = await cookies()
		cookiesList.set('osu-tokens', await encrypt(tokens, '10 mins from now'), {
			sameSite: 'lax',
			httpOnly: true,
			secure: isProd
		})
	} catch (err) {
		console.error(err)
		return authError(url)
	}

	return NextResponse.redirect(getDiscordAuthUrl())
}
