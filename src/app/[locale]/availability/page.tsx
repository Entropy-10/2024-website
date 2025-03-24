import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { getSession } from '@session'

import Background from '~/components/ui/background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import AvailabilityForm from './_components/availability-form'

export default async function AvailabilityPage() {
	const session = await getSession()
	if (!session) redirect('/unauthorized')

	const t = await getTranslations('AvailabilityPage')

	return (
		<Background className='relative flex min-h-screen items-center justify-center'>
			<div className='absolute top-10 left-0'>
				<Heading>{t('heading')}</Heading>
				<Divider />
			</div>

			<AvailabilityForm />
		</Background>
	)
}
