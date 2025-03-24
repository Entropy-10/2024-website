import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/react'
import { Monitoring } from 'react-scan/monitoring/next'

import { env } from '@env'
import { genOgTwitterImage } from '@metadata'
import { routing } from '@navigation'
import { createClient } from '@supabase/server'
import { cn, getBaseUrl, inter, isPreview } from '@utils/client'
import '~/styles/globals.css'

import Footer from './_components/footer'
import Header from './_components/header'
import PreviewWarning from './_components/preview-warning'
import UpdateScopes from './_components/update-scopes'

export async function generateMetadata() {
	const locale = await getLocale()

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
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
	const locale = await getLocale()
	if (!hasLocale(routing.locales, locale)) notFound()

	const supabase = await createClient()
	const { data: tokenState } = await supabase
		.from('tokens')
		.select('old')
		.maybeSingle()

	return (
		<html lang={locale} className='scroll-smooth!'>
			<head>
				<Script
					src='https://unpkg.com/react-scan/dist/install-hook.global.js'
					strategy='beforeInteractive'
				/>
			</head>

			<body
				className={cn(
					'flex min-h-screen flex-col overflow-x-hidden',
					inter.className
				)}
			>
				<Monitoring
					apiKey={env.REACT_SCAN_API_KEY}
					url='https://monitoring.react-scan.com/api/v1/ingest'
					commit={env.VERCEL_GIT_COMMIT_SHA}
					branch={env.VERCEL_GIT_COMMIT_REF}
				/>
				<NextIntlClientProvider>
					<Header />
					{isPreview && <PreviewWarning />}
					{tokenState?.old && <UpdateScopes />}
					<main className='flex-1'>{children}</main>
					<Footer />
					<Analytics />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
