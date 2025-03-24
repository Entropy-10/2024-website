import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

import { locales } from '@siteConfig'

export const routing = defineRouting({
	locales,
	localePrefix: 'as-needed',
	defaultLocale: 'en'
})

export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing)
