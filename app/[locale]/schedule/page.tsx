import { createMetadata } from '@metadata'
import { getTranslations } from 'next-intl/server'

import { createClient } from '@supabase/server'
import type { MetadataProps } from '@types'
import { cookies } from 'next/headers'
import Background from '~/components/ui/background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import Lobby from './_components/lobby'

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

	const { data: lobbies } = await supabase
		.from('lobbies')
		.select('*,teams(*)')
		.order('id')

	return (
		<div className='relative'>
			<Background className='py-8'>
				<Heading>{t('heading')}</Heading>
				<Divider className='max-w-[190px] lg:max-w-[370px] md:max-w-[320px] sm:max-w-[290px]' />
			</Background>

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
		</div>
	)
}
