import { hasLocale } from 'next-intl'
import { getRequestConfig } from 'next-intl/server'
import deepmerge from 'deepmerge'

import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
	const requestedLocale = await requestLocale
	const locale = hasLocale(routing.locales, requestedLocale)
		? requestedLocale
		: routing.defaultLocale

	const userMessages = (await import(`../messages/${locale}.json`)).default
	const defaultMessages = (await import('../messages/en.json')).default

	return {
		locale,
		messages: deepmerge(defaultMessages, userMessages)
	}
})
