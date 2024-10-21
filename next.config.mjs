import './env.mjs'

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

export default withNextIntl({
	experimental: {
		mdxRs: true,
		serverActions: { bodySizeLimit: '5mb' },
		reactCompiler: true
	},
	pageExtensions: ['mdx', 'ts', 'tsx'],
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'a.ppy.sh' },
			{ protocol: 'https', hostname: 'assets.ppy.sh' },
			{ protocol: 'https', hostname: 'osu.ppy.sh' },
			{ protocol: 'https', hostname: 'cdn.discordapp.com' },
			{ protocol: 'https', hostname: 'flagsapi.com' },
			{ protocol: 'https', hostname: 'dtoyeiqtecliyympsgji.supabase.co' },
			{ protocol: 'https', hostname: 'avxmlbhyydzgmiwadyja.supabase.co' }
		]
	}
})
