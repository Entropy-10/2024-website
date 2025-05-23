import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'

import { discordAuth } from '@discord'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { getBaseUrl } from '@utils/client'

import { authError, getDiscordAvatarUrl } from '../../utils'

export async function GET(request: NextRequest) {
	const session = await getSession()
	const searchParams = request.nextUrl.searchParams
	const locale = searchParams.get('locale') ?? 'en'
	const code = searchParams.get('code')
	const url = new URL(request.url)

	const t = await getTranslations({ locale, namespace: 'APICallbacks' })

	if (!code) {
		return authError(url, t('Errors.missingCode'))
	}

	if (!session) return NextResponse.redirect(`${getBaseUrl()}/unauthorized`)

	const supabase = await createClient()

	try {
		const tokens = await discordAuth.tokenRequest({
			code,
			scope: ['identify', 'guilds.members.read'],
			grantType: 'authorization_code',
			redirectUri: `${getBaseUrl()}/api/auth/relink/discord`
		})

		const user = await discordAuth.getUser(tokens.access_token)

		const { error: userError } = await supabase
			.from('users')
			.update({
				discord_id: user.id,
				discord_name: user.global_name,
				discord_tag: user.username ?? user.discriminator,
				discord_avatar: user.avatar && getDiscordAvatarUrl(user.id, user.avatar)
			})
			.eq('osu_id', session.sub)

		if (userError) throw userError

		const { error: tokensError } = await supabase
			.from('tokens')
			.update({
				discord_access_token: tokens.access_token,
				discord_refresh_token: tokens.refresh_token,
				old: false
			})
			.eq('osu_id', session.sub)

		if (tokensError) throw tokensError

		const returnUrl = (await cookies()).get('return-url')?.value
		if (returnUrl) (await cookies()).delete('return-url')

		return NextResponse.redirect(returnUrl ?? `${url.origin}/profile`)
	} catch (err) {
		linkingError(url)
	}
}

function linkingError(url: URL, message?: string) {
	return NextResponse.redirect(
		`${url.origin}/profile?title=FAILED TO RELINK!&message=${
			message ?? 'Failed to link new Discord account.'
		}`
	)
}
