import { headers } from 'next/headers'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import dayjs from 'dayjs'

import Button from '~/components/ui/button'
import type { Tables } from '~/types/supabase'
import { denyInvite } from '../_actions/deny-invite'

interface InviteProps {
	invite: Tables<'invites'> & {
		teams: {
			id: number
			flag: string
			name: string
			timezone: string
		} | null
	}
}

export default async function Invite({ invite }: InviteProps) {
	if (!invite.teams) return null
	const team = invite.teams
	const headerList = await headers()
	const csrfToken = headerList.get('X-CSRF-Token') ?? 'missing'
	const t = await getTranslations('ProfilePage.Invites.Invite')

	return (
		<div className='w-[200px] bg-linear-to-r from-light-blue to-lavender p-4 md:w-[250px]'>
			<div className='mb-1.5 flex flex-col items-center uppercase md:mb-3'>
				<Image
					className='h-[60px] w-[135px] md:h-[72px] md:w-[162px]'
					width={162}
					height={72}
					sizes='(min-width: 768px) 162px, 135px'
					src={team.flag}
					alt={`${team.flag}'s flag`}
				/>
				<div className='font-extrabold text-lg text-milky-white md:text-xl'>
					{team.name}
				</div>
			</div>

			<div className='mb-4 text-dark-blue text-xs md:mb-8 md:text-sm'>
				<div>
					<span className='font-extrabold'>{t('timezone')}:</span>{' '}
					{team.timezone}
				</div>
				<div>
					<span className='font-extrabold'>{t('invited')}:</span>{' '}
					{dayjs(invite.created_at).format('MMMM D, YYYY')}
				</div>
			</div>

			<div>
				{/* <form action={acceptInvite}>
					<input name='csrf_token' defaultValue={csrfToken} hidden />
					<input name='team_id' defaultValue={team.id} hidden />
					<input name='invite_id' defaultValue={invite.id} hidden />
					<Button className='w-full md:w-[100px]'>{t('Buttons.accept')}</Button>
				</form> */}
				<form action={denyInvite}>
					<input name='csrf_token' defaultValue={csrfToken} hidden />
					<input name='invite_id' defaultValue={invite.id} hidden />
					<Button variant='outline' className='w-full'>
						{t('Buttons.deny')}
					</Button>
				</form>
			</div>
		</div>
	)
}
