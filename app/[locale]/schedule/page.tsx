import { createMetadata } from '@metadata'
import { getTranslations } from 'next-intl/server'

import { createClient } from '@supabase/server'
import type { MetadataProps } from '@types'
import { cn } from '@utils/client'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Background from '~/components/ui/background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import type { Tables } from '~/types/supabase'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.schedule'),
		description: t('description')
	})
}

export default async function SchedulePage() {
	const t = await getTranslations('SchedulePage')

	const supabase = createClient(cookies())
	const { data: matches } = await supabase
		.from('matches')
		.select(
			'*, team1_id(*, players(*,users(rank))), team2_id(*, players(*,users(rank)))'
		)
		.order('match_id')
		.eq('round', 'round of 16')

	type TeamWithPlayerAndUser = Tables<'teams'> & {
		players: Tables<'players'> & { users: Pick<Tables<'users'>, 'rank'> }[]
	}

	return (
		<div className='relative'>
			<Background className='py-8'>
				<Heading>{t('heading')}</Heading>
				<Divider className='max-w-[190px] lg:max-w-[370px] md:max-w-[320px] sm:max-w-[290px]' />
			</Background>

			{/* <Qualifiers /> */}
			<div className='padding flex flex-col gap-3 py-8'>
				{matches?.map(match => {
					const team1 = match.team1_id as unknown as TeamWithPlayerAndUser
					const team2 = match.team2_id as unknown as TeamWithPlayerAndUser

					return (
						<div
							key={match.match_id}
							className='flex flex-col justify-center md:flex-row md:items-center md:gap-3'
						>
							<div
								className={cn(
									'no-bottom-shadow flex h-[90px] w-full items-center justify-center gap-3 md:w-[250px]',
									match.type === 'winner' &&
										'text-light-blue shadow-[0px_0px_15px_0px_rgba(94,114,235,0.45)] md:shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]',
									match.type === 'loser' &&
										'text-[#FF9190] shadow-[0px_0px_15px_0px_rgba(255,145,144,0.45)] md:shadow-[0px_4px_15px_0px_rgba(255,145,144,0.45)]',
									match.type === 'loser2' &&
										'text-[#FDC094] shadow-[0px_0px_15px_0px_rgba(253,192,148,0.45)] md:shadow-[0px_4px_15px_0px_rgba(253,192,148,0.45)]'
								)}
							>
								<div className='font-extrabold text-5xl'>{match.match_id}</div>
								<div>
									<div className='font-extrabold font-sm'>
										{match.date} | {match.time}
									</div>
									<div className='text-xs'>
										<span className='font-extrabold'>REFEREE: </span>
										{match.referee}
									</div>
								</div>
							</div>

							<div
								className={cn(
									'no-top-shadow relative flex grow justify-between',
									match.type === 'winner' &&
										'shadow-[0px_0px_15px_0px_rgba(94,114,235,0.45)] md:shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]',
									match.type === 'loser' &&
										'shadow-[0px_0px_15px_0px_rgba(255,145,144,0.45)] md:shadow-[0px_4px_15px_0px_rgba(255,145,144,0.45)]',
									match.type === 'loser2' &&
										'shadow-[0px_0px_15px_0px_rgba(253,192,148,0.45)] md:shadow-[0px_4px_15px_0px_rgba(253,192,148,0.45)]'
								)}
							>
								<div className='relative'>
									<Image
										width={230}
										height={90}
										src={team1.flag}
										alt='team flag'
										className='h-[90px]'
									/>
									<div className='absolute top-0 right-0 h-full w-full bg-gradient-to-r from-transparent to-60% to-milky-white' />
								</div>

								<div className='padding absolute top-0 left-0 z-20 flex h-full w-full items-center justify-between'>
									<div className='text-light-blue'>
										<div className='text-left font-extrabold text-lg lg:text-xl'>
											{team1.name}
										</div>
										<div className='font-medium text-xs lg:text-sm'>
											AVG RANK: #
											{team1.players
												.reduce(
													(acc, player) => acc + (player.users.rank ?? 0),
													0
												)
												.toLocaleString()}
										</div>
									</div>

									<div className='flex gap-1 font-extrabold text-[#CECBF5] text-xl lg:text-3xl'>
										<div
											className={cn(
												match.team1_score > match.team2_score && 'text-blue'
											)}
										>
											{match.team1_score}
										</div>
										<div>-</div>
										<div
											className={cn(
												match.team1_score < match.team2_score && 'text-blue'
											)}
										>
											{match.team2_score}
										</div>
									</div>

									<div className='text-[#FF9190]'>
										<div className='text-right font-extrabold text-lg lg:text-xl'>
											{team2.name}
										</div>
										<div className='text-right font-medium text-xs lg:text-sm'>
											AVG RANK: #
											{team1.players
												.reduce(
													(acc, player) => acc + (player.users.rank ?? 0),
													0
												)
												.toLocaleString()}
										</div>
									</div>
								</div>

								<div className='relative'>
									<div className='absolute top-0 left-0 h-full w-full bg-gradient-to-l from-transparent to-60% to-milky-white' />

									<Image
										width={230}
										height={90}
										src={team2.flag}
										alt='team flag'
										className='h-[90px]'
									/>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
