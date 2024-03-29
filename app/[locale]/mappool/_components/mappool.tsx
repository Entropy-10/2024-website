import type { Tables } from '~/types/supabase'
import MappoolMap from './mappool-map'

interface MappoolProps {
	maps?: Tables<'maps'>[]
}

export default function Mappool({ maps }: MappoolProps) {
	if (!maps || maps.length === 0) return

	const sortedMaps = maps.sort((a, b) => {
		return Number(a.slot.slice(-1)) - Number(b.slot.slice(-1))
	})

	return (
		<>
			<ModPoolContainer>
				{sortedMaps
					.filter(map => map.mod === 'LM')
					.map(map => (
						<MappoolMap key={map.beatmap_id} map={map} />
					))}
			</ModPoolContainer>

			<Divider />

			<ModPoolContainer>
				{sortedMaps
					.filter(map => map.mod === 'NM')
					.map(map => (
						<MappoolMap key={map.beatmap_id} map={map} />
					))}
			</ModPoolContainer>

			<Divider />

			<ModPoolContainer>
				{sortedMaps
					.filter(map => map.mod === 'HD')
					.map(map => (
						<MappoolMap key={map.beatmap_id} map={map} />
					))}
			</ModPoolContainer>

			<Divider />

			<ModPoolContainer>
				{sortedMaps
					.filter(map => map.mod === 'HR')
					.map(map => (
						<MappoolMap key={map.beatmap_id} map={map} />
					))}
			</ModPoolContainer>

			<Divider />

			<ModPoolContainer>
				{sortedMaps
					.filter(map => map.mod === 'DT')
					.map(map => (
						<MappoolMap key={map.beatmap_id} map={map} />
					))}
			</ModPoolContainer>
		</>
	)
}

function ModPoolContainer({ children }: { children: React.ReactNode }) {
	return (
		<div className='padding flex flex-wrap justify-center gap-5 py-8'>
			{children}
		</div>
	)
}

function Divider() {
	return (
		<div className='flex flex-row-reverse'>
			<div className='h-[4px] w-[65%] bg-gradient-to-l from-light-blue via-salmon to-[#FDC094]' />
		</div>
	)
}
