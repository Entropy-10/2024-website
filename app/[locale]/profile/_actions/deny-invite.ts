'use server'

import { createClient } from '@supabase/server'
import { getTranslations } from 'next-intl/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function denyInvite(formData: FormData) {
	const inviteId = formData.get('invite_id')?.toString()
	if (!inviteId) return

	const t = await getTranslations('ProfilePage.Errors')
	const supabase = await createClient()

	const { error } = await supabase
		.from('invites')
		.update({ status: 'denied' })
		.eq('id', Number(inviteId))

	if (error) {
		redirect(
			`/profile?title=${t('FailedInvite.title', {
				type: t('FailedInvite.Types.deny')
			})}&message=${t('FailedInvite.message', {
				type: t('FailedInvite.Types.deny')
			})}`
		)
	}
	revalidatePath('/profile')
}
