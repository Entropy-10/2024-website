import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@utils/client'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/api'
		},
		sitemap: `${getBaseUrl()}/sitemap.xml`
	}
}
