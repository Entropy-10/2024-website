'use client'

import { rounds } from '@siteConfig'
import { createClient } from '@supabase/client'
import type { ModalError } from '@types'
import { cn } from '@utils/client'
import { Loader2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import ChevronDownIcon from '~/components/icons/chevron-down'
import MessageBox from '~/components/message-box'
import Button from '~/components/ui/button'
import * as Dropdown from '~/components/ui/dropdown'
import type { Tables } from '~/types/supabase'
import Mappool from './mappool'

interface MappoolContainerProps {
	defaultRound?: string
}

export default function MappoolContainer({
	defaultRound
}: MappoolContainerProps) {
	const supabase = createClient()
	const t = useTranslations('MappoolPage')
	const [loading, setLoading] = useState(true)
	const [selectedRound, setSelectedRound] = useState(
		defaultRound ?? 'qualifiers'
	)
	const [maps, setMaps] = useState<Tables<'maps'>[]>([])
	const [mappack, setMappack] = useState<string | null>(null)
	const [error, setError] = useState<ModalError | null>(null)

	useEffect(() => {
		async function getMappool() {
			setLoading(true)
			const { data: mappool } = await supabase
				.from('mappools')
				.select('*,maps(*)')
				.eq('round', selectedRound)
				.maybeSingle()

			if (!mappool) {
				setMaps([])
				setMappack(null)
				setError({
					title: t('Errors.FailedMappool.title'),
					message: t('Errors.FailedMappool.message')
				})
				return setLoading(false)
			}

			if (!mappool.released) {
				setMaps([])
				setMappack(null)
				setError({
					title: t('Errors.NotReleased.title'),
					message: t('Errors.NotReleased.message')
				})
				return setLoading(false)
			}

			setMaps(mappool.maps)
			setMappack(mappool.mappack)
			setError(null)
			setLoading(false)
		}
		getMappool()
	}, [supabase, selectedRound, t])

	return (
		<div>
			<div className='absolute top-[100px] right-0 md:top-[114px]'>
				{/* @ts-expect-error eeee will fix later */}
				<Button target='_blank' href={mappack ?? '/mappool'}>
					DOWNLOAD MAPPACK
				</Button>
			</div>

			<Dropdown.Root>
				<Dropdown.Trigger className='group absolute top-12 right-0 flex h-[45px] w-[200px] items-center gap-3 bg-milky-white px-4 md:h-[61px] lg:w-[400px] md:w-[300px] focus:outline-none'>
					<div className='text-left font-extrabold text-light-blue text-md lg:text-xl md:text-lg'>
						{selectedRound.toUpperCase()}
					</div>
					<ChevronDownIcon className='size-6 text-light-blue transition-all duration-300 md:size-8 group-data-[state=open]:rotate-180' />
				</Dropdown.Trigger>

				<Dropdown.Content
					align='start'
					className='w-[160px] drop-shadow-none md:w-[180px]'
				>
					{rounds.map(round => (
						<Dropdown.Item
							onClick={() => setSelectedRound(round)}
							key={round}
							className={cn(
								selectedRound === round &&
									'bg-light-blue font-bold text-milky-white'
							)}
						>
							{round.toUpperCase()}
						</Dropdown.Item>
					))}
				</Dropdown.Content>
			</Dropdown.Root>

			{error && !loading && (
				<div className='mt-[70px] flex justify-center'>
					<MessageBox title={error.title} message={error.message} />
				</div>
			)}
			{loading ? (
				<Loader2
					size={35}
					strokeWidth={3}
					className='mt-32 flex w-full animate-spin justify-center stroke-light-blue'
				/>
			) : (
				<Mappool maps={maps} />
			)}
		</div>
	)
}
