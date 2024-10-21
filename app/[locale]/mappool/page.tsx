import { createMetadata } from '@metadata'
import { getMessages, getTranslations } from 'next-intl/server'

import type { MetadataProps } from '@types'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import Background from '~/components/ui/background'
import HeaderDivider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import MappoolContainer from './_components/mappool-container'

export async function generateMetadata(props: MetadataProps) {
	const params = await props.params

	const { locale } = params

	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.mappool'),
		description: t('description')
	})
}

export default async function MappoolPage() {
	const t = await getTranslations('MappoolPage')
	const messages = await getMessages()
	// TODO: fix this
	const defaultRound = 'grand finals'

	return (
		<div className='relative'>
			<Background className='py-8'>
				<Heading>{t('heading')}</Heading>
				<HeaderDivider className='max-w-[180px] sm:max-w-[280px] md:max-w-[310px] lg:max-w-[360px]' />
			</Background>

			<NextIntlClientProvider messages={pick(messages, 'MappoolPage')}>
				<MappoolContainer defaultRound={defaultRound} />
			</NextIntlClientProvider>
		</div>
	)
}
