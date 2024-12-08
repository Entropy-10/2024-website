import { createMetadata } from '@metadata'
import { createClient } from '@supabase/server'
import { Loader2 } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import Background from '~/components/ui/background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import TeamList from './_components/team-list'

export async function generateMetadata() {
	const locale = await getLocale()

	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.teams'),
		description: t('description')
	})
}

export default async function TeamsPage() {
	const t = await getTranslations('TeamsPage')
	const supabase = await createClient()
	const { count } = await supabase
		.from('teams')
		.select('*', { count: 'exact', head: true })

	return (
		<div>
			<Background className='py-8'>
				<Heading>{t('heading')}</Heading>
				<Divider />
				<div className='padding text-xl'>
					<span className='font-extrabold'>{count ?? 0}</span>{' '}
					{t('teamsRegistered')}
				</div>
			</Background>

			<Suspense
				fallback={
					<Loader2
						size={35}
						strokeWidth={3}
						className='mt-32 flex w-full animate-spin justify-center stroke-light-blue'
					/>
				}
			>
				<TeamList />
			</Suspense>
		</div>
	)
}
