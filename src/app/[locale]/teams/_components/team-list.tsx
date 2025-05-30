import Image from 'next/image'
import Link from 'next/link'

import { createClient } from '@supabase/server'

export default async function TeamList() {
	const supabase = await createClient()
	const { data: teams } = await supabase
		.from('teams')
		.select('*, players(role, users(osu_id,osu_avatar, osu_name, rank))')
		.order('role', { referencedTable: 'players' })

	if (!teams) return null

	return (
		<div className='padding flex flex-wrap justify-center gap-5 py-8'>
			{teams.map(team => (
				<div
					key={team.id}
					className='group relative h-[190px] w-[340px] border-2 border-milky-white text-light-blue shadow-[0px_4px_15px_0px_rgba(94,114,235,0.45)]'
				>
					<Image
						height={151}
						width={340}
						src={team.flag}
						alt={`${team.name}'s flag`}
						className='h-[151px] w-[340px] select-none'
					/>

					<div className='absolute top-0 h-full w-full bg-fade opacity-100 transition-all sm:opacity-0 sm:group-hover:opacity-100' />
					<div className='absolute bottom-0 h-full w-full bg-linear-to-t from-30% from-milky-white to-50% to-transparent'>
						<div className='relative h-full w-full'>
							<div className='grid w-full grid-cols-2 gap-2 p-2 opacity-100 transition-all sm:opacity-0 sm:group-hover:opacity-100'>
								{team.players.map(({ users: user }) => (
									<Link
										key={user?.osu_id}
										target='_blank'
										href={`https://osu.ppy.sh/users/${user?.osu_id}`}
										className='flex gap-2 focus:outline-hidden'
									>
										<Image
											height={32}
											width={32}
											src={user?.osu_avatar ?? ''}
											alt={`${user?.osu_name}'s pfp`}
											className='size-[32px]'
										/>

										<div className='flex w-full flex-col justify-center'>
											<div className='w-[120px] overflow-hidden truncate font-extrabold text-sm/3'>
												{user?.osu_name}
											</div>
											<div className='text-xs'>
												#{user?.rank?.toLocaleString()}
											</div>
										</div>
									</Link>
								))}
							</div>

							<div className='absolute bottom-0 w-full px-2 py-1'>
								<div className='font-extrabold text-xl'>{team.name}</div>

								<div className='flex justify-between'>
									<div>{team.acronym}</div>
									<div>{team.timezone}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
