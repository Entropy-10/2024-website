import { getTranslations } from 'next-intl/server'

import { createClient } from '@supabase/server'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '~/components/carousel'
import Invite from './invite'

interface InvitesProps {
	teamId: number
	isCaptain: boolean
}

export default async function Invites({ teamId, isCaptain }: InvitesProps) {
	const t = await getTranslations('TeamPage.Invites')
	const supabase = await createClient()
	const { data: invites, error } = await supabase
		.from('invites')
		.select('*, users(osu_avatar, osu_name, rank, discord_tag)')
		.eq('team_id', teamId)
		.neq('status', 'accepted')

	if (error) console.log(error)
	if (!invites || invites.length === 0) {
		return (
			<div className='flex h-[311px] items-center justify-center'>
				<p className='max-w-96 text-center'>{t('none')}</p>
			</div>
		)
	}

	return (
		<div className='padding my-5 flex w-full gap-5'>
			<Carousel className='w-full'>
				<CarouselContent className='-ml-4'>
					{invites.map(invite => (
						<CarouselItem
							key={invite.id}
							className='ml-4 basis-[200px] md:basis-[250px]'
						>
							<Invite invite={invite} isCaptain={isCaptain} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}
