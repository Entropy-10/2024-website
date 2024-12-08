'use server'

import { getSession } from '@session'
import { createClient } from '@supabase/server'
import type { Availability } from '@types'
import { redirect } from 'next/navigation'

export async function updateAvailability(formData: FormData) {
	const session = await getSession()
	if (!session) redirect('/unauthorized')

	const availability = JSON.parse(
		String(formData.get('availability'))
	) as Availability
	const supabase = await createClient()

	const { data: player, error: playerError } = await supabase
		.from('players')
		.select('team_id,role')
		.eq('user_id', session.sub)
		.maybeSingle()

	if (playerError) return { error: updateFailedError }

	if (!player) {
		return {
			error: {
				title: 'UNABLE TO UPDATE AVAILABILITY.',
				message: 'You must be on a team to update your availability.'
			}
		}
	}

	if (player.role !== 'captain') {
		return {
			error: {
				title: 'UNABLE TO UPDATE AVAILABILITY.',
				message:
					"Only captains are allowed to update their team's availability."
			}
		}
	}

	const { error: teamError } = await supabase
		.from('teams')
		.update({ availability })
		.eq('id', player.team_id)

	if (teamError) return { error: updateFailedError }

	return { error: null }
}

const updateFailedError = {
	title: 'FAILED TO UPDATE AVAILABILITY.',
	message:
		'Sorry, but we were unable to update your availability. Please try again and see if that helps.'
}
