import Loglib from '@loglib/tracker/react'
import { genOgTwitterImage } from '@metadata'
import { routing } from '@navigation'
import { createClient } from '@supabase/server'
import type { MetadataProps } from '@types'
import { cn, getBaseUrl, inter, isPreview } from '@utils/client'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import '~/styles/globals.css'
import Footer from './_components/footer'
import Header from './_components/header'
import PreviewWarning from './_components/preview-warning'
import UpdateScopes from './_components/update-scopes'

export async function generateMetadata(props: MetadataProps) {
	const params = await props.params
	const { locale } = params

	const t = await getTranslations({ locale, namespace: 'Metadata' })
	const csrfToken = (await headers()).get('X-CSRF-Token') || 'missing'

	return {
		metadataBase: new URL(getBaseUrl()),
		title: {
			template: '%s • TEST Open',
			default: 'TEST Open'
		},
		description: t('description'),
		...genOgTwitterImage({
			title: {
				template: '%s',
				default: 'TEST Open'
			},
			description: t('description'),
			locale
		}),
		other: { 'x-csrf-token': csrfToken }
	} satisfies Metadata
}

interface LocaleLayoutProps {
	children: ReactNode
	params: Promise<{ locale: string }>
}

export default async function LocaleLayout({
	children,
	params
}: LocaleLayoutProps) {
	const { locale } = await params
	if (!routing.locales.includes(locale)) {
		notFound()
	}
	const messages = await getMessages()

	const supabase = createClient(await cookies())
	const { data: tokenState } = await supabase
		.from('tokens')
		.select('old')
		.maybeSingle()

	return (
		<html lang={locale} className='scroll-smooth!'>
			<body
				className={cn(
					'flex min-h-screen flex-col overflow-x-hidden',
					inter.className
				)}
			>
				<NextIntlClientProvider messages={messages}>
					<Header />
					{isPreview && <PreviewWarning />}
					{tokenState?.old && <UpdateScopes />}
					<main className='flex-1'>{children}</main>
					<Footer />
				</NextIntlClientProvider>
				<Loglib config={{ id: 'test-open' }} />
			</body>
		</html>
	)
}
