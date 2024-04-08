import { createClient } from '@supabase/server'
import { cookies } from 'next/headers'
import Lobby from './lobby'

export default async function Qualifiers() {
	const supabase = createClient(cookies())

	const { data: lobbies } = await supabase
		.from('lobbies')
		.select('*,teams(*)')
		.order('id')

	return (
		<>
			<div className='padding flex flex-wrap justify-center gap-5 py-8'>
				{lobbies
					?.filter(lobby => lobby.id <= 12)
					.map(lobby => (
						<Lobby key={lobby.id} lobby={lobby} />
					))}
			</div>

			<div className='flex flex-row-reverse'>
				<div className='h-[4px] w-[65%] bg-gradient-to-l from-light-blue via-salmon to-[#FDC094]' />
			</div>

			<div className='padding flex flex-wrap justify-center gap-5 py-8'>
				{lobbies
					?.filter(lobby => lobby.id > 12 && !lobby.lobby_id?.startsWith('EX'))
					.map(lobby => (
						<Lobby key={lobby.id} lobby={lobby} />
					))}
			</div>

			<div className='flex flex-row-reverse'>
				<div className='h-[4px] w-[65%] bg-gradient-to-l from-light-blue via-salmon to-[#FDC094]' />
			</div>

			<div className='padding flex flex-wrap justify-center gap-5 py-8'>
				{lobbies
					?.filter(lobby => lobby.lobby_id?.startsWith('EX'))
					.map(lobby => (
						<Lobby key={lobby.id} lobby={lobby} />
					))}
			</div>
		</>
	)
}
