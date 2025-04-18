'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getSession } from '@session'
import { createClient } from '@supabase/server'

export async function invite(formData: FormData) {
	const teamId = formData.get('team_id')?.toString()
	const userId = formData.get('user_id')?.toString()
	const session = await getSession()
	const t = await getTranslations('TeamPage.Errors')

	if (session?.sub === userId) {
		redirect(
			`/team?title=${t('InvitedSelf.title')}&message=${t(
				'InvitedSelf.message'
			)}`
		)
	}

	if (!teamId || !userId) return

	const supabase = await createClient()

	const { data: player } = await supabase
		.from('players')
		.select()
		.eq('team_id', Number(teamId))
		.eq('user_id', userId)
		.maybeSingle()

	if (player) {
		redirect(
			`/team?title=${t('PlayerOnTeam.title')}&message=${t(
				'PlayerOnTeam.message'
			)}`
		)
	}

	const { error: inviteError } = await supabase.from('invites').insert({
		team_id: Number.parseInt(teamId),
		user_id: userId,
		updated_at: new Date().toISOString()
	})

	if (inviteError?.code === '23505') {
		redirect(
			`/team?title=${t('AlreadyInvited.title')}&message=${t(
				'AlreadyInvited.message'
			)}`
		)
	} else if (inviteError) {
		redirect(
			`/team?title=${t('InviteFailed.title')}&message=${t(
				'InviteFailed.message'
			)}`
		)
	}

	revalidatePath('/team')
}
