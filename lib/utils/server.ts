import type { NamespaceKeys, NestedKeyOf } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import 'server-only'

export async function getServerTranslations<
	NestedKey extends NamespaceKeys<
		IntlMessages,
		NestedKeyOf<IntlMessages>
	> = never
>(namespace?: NestedKey) {
	const locale = await getLocale()
	return await getTranslations({ locale, namespace })
}
