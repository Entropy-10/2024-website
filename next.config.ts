import { fileURLToPath } from 'node:url'

import createNextIntlPlugin from 'next-intl/plugin'
import { createJiti } from 'jiti'
import ReactComponentName from 'react-scan/react-component-name/webpack'

const jiti = createJiti(fileURLToPath(import.meta.url))
jiti.esmResolve('./src/env')

const withNextIntl = createNextIntlPlugin()

export default withNextIntl({
	experimental: {
		mdxRs: true,
		serverActions: { bodySizeLimit: '5mb' },
		reactCompiler: true
	},
	transpilePackages: ['next-mdx-remote'],
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
	},
	webpack: config => {
		config.plugins.push(ReactComponentName({}))
		return config
	}
})
