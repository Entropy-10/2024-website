import { createMetadata } from '@metadata'
import { getTranslations } from 'next-intl/server'

import type { MetadataProps } from '@types'
import Background from '~/components/ui/background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import Qualifiers from './_components/qualifiers'

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

	return (
		<div className='relative'>
			<Background className='py-8'>
				<Heading>{t('heading')}</Heading>
				<Divider className='max-w-[190px] lg:max-w-[370px] md:max-w-[320px] sm:max-w-[290px]' />
			</Background>

			<Qualifiers />
		</div>
	)
}
