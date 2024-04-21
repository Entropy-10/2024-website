'use server'

import { getSession } from '@session'
import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function updateAvailability(formData: FormData) {
	const session = await getSession()
	if (!session) redirect('/unauthorized')

	const startingTime = formData.get('startingTime')?.toString()
	const endingTime = formData.get('endingTime')?.toString()
	const supabase = createClient(cookies())

	const { data: player, error: playerError } = await supabase
		.from('players')
		.select('team_id,role')
		.eq('user_id', session.sub)
		.maybeSingle()

	if (!player || playerError) return { error: updateFailedError }

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
		.update({ available_starting: startingTime, available_ending: endingTime })
		.eq('id', player.team_id)

	if (teamError) return { error: updateFailedError }

	return { error: null }
}

const updateFailedError = {
	title: 'FAILED TO UPDATE AVAILABILITY.',
	message:
		'Sorry, but we were unable to update your availability. Please try again and see if that helps.'
}
