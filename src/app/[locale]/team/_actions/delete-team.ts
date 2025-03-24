'use server'

import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { createClient } from '@supabase/server'
import { getFlagPathFromUrl } from '@utils/client'

export async function deleteTeam(formData: FormData) {
	const teamId = formData.get('team_id')?.toString()
	const teamFlag = formData.get('team_flag')?.toString()
	const userId = formData.get('user_id')?.toString()
	if (!teamId || !teamFlag || !userId) return

	const t = await getTranslations('TeamPage.Errors')
	const supabase = await createClient()

	const { count } = await supabase
		.from('players')
		.select('*', { count: 'exact' })
		.eq('team_id', Number(teamId))
		.neq('user_id', userId)

	if (count && count > 0) {
		redirect(
			`/team?title=${t('PlayersOnTeam.title')}&message=${t(
				'PlayersOnTeam.message'
			)}`
		)
	}

	const { error: teamError } = await supabase
		.from('teams')
		.delete()
		.eq('id', Number(teamId))

	const flagInfo = getFlagPathFromUrl(teamFlag)
	if (flagInfo) {
		await supabase.storage
			.from('flags')
			.remove([`${flagInfo.folder}/${flagInfo.filename}`])
	}

	if (teamError) {
		redirect(
			`/team?title=${t('DeleteTeamFailed.title')}&message=${t(
				'DeleteTeamFailed.message'
			)}`
		)
	}

	redirect('/')
}
