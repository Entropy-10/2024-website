import type { Feature, NavItems } from '@types'

export const locales = [
	'en',
	'fr',
	'es',
	'ru',
	'ko',
	'ja',
	'zh',
	'de',
	'tl',
	'pl',
	'pt-br'
]

export const localesMetadata = [
	{ code: 'en', name: 'English', flag: 'en.svg' },
	{ code: 'fr', name: 'Français', flag: 'fr.svg' },
	{ code: 'es', name: 'Español', flag: 'es.svg' },
	{ code: 'ru', name: 'Русский', flag: 'ru.svg' },
	{ code: 'ko', name: '한국어', flag: 'ko.svg' },
	{ code: 'ja', name: '日本語', flag: 'ja.svg' },
	{ code: 'zh', editorCode: 'zhcn', name: '中文', flag: 'zh.svg' },
	{ code: 'de', name: 'Deutsch', flag: 'de.svg' },
	{ code: 'tl', name: 'Tagalog', flag: 'tl.svg' },
	{ code: 'pl', name: 'Polski', flag: 'pl.svg' },
	{ code: 'pt-br', editorCode: 'ptbr', name: 'Português', flag: 'pt-br.svg' }
]

const sheetLink =
	'https://docs.google.com/spreadsheets/d/1kmZCOJL5KCPT-Xd0X2AO8s_rV736RhKnJ5Bw_4HztXc/edit?usp=sharing'

export const links = {
	sheet: sheetLink,
	forumPost: 'https://osu.ppy.sh/community/forums/topics/1889282?n=1',
	challonge: 'https://challonge.com/test_open_2024',
	album:
		'https://www.youtube.com/playlist?list=PLmOGTyAkZ1vMNjmCmK8DivdPdwAbuKWAp',
	socials: {
		twitch: 'https://www.twitch.tv/test_open',
		youtube: 'https://www.youtube.com/@TEST_Open',
		x: 'https://twitter.com/TESTOpenOsu',
		discord: 'https://discord.com/invite/nZnQZMvEhq'
	},
	hosts: {
		entropy: 'https://osu.ppy.sh/users/10396090',
		teddy: 'https://osu.ppy.sh/users/15262410',
		sora: 'https://osu.ppy.sh/users/18156655'
	}
}

export const navItems: NavItems = [
	{ link: '/', text: 'home' },
	{ link: '/mappool', text: 'mappool' },
	{ link: '/schedule', text: 'schedule' },
	{ link: '/teams', text: 'teams' },
	{ link: '/info', text: 'info' },
	{ link: sheetLink, text: 'sheet' }
]

export const features: Feature[] = [
	{
		name: 'mappool',
		link: '/info'
	},
	{
		name: 'format',
		link: '/info',
		className: 'bg-feature2'
	},
	{
		name: 'schedule',
		link: '/schedule',
		className: 'bg-[#807EE1]'
	}
]

export const songs = [
	{
		id: 0,
		link: 'https://youtu.be/8aXTqEKd1Eg',
		name: 'Twilight of the Abyss',
		artist: 'Kanemiko'
	},
	{
		id: 1,
		link: 'https://youtu.be/3hu96E-cEDI',
		name: 'Phoenix',
		artist: 'Aethral'
	},
	{
		id: 2,
		link: 'https://youtu.be/90CZ-Bpuw8o',
		name: 'Cyber Surge',
		artist: 'Aethral'
	},
	{
		id: 3,
		link: 'https://youtu.be/PeVR2XaXYXo',
		name: 'RE_generate:fractal',
		artist: 'Kou!'
	},
	{
		id: 4,
		link: 'https://youtu.be/k_gnDiJ_7bo',
		name: 'Fermion Amplification',
		artist: 'Kou!'
	}
]

export const utcOptions = [
	'UTC-12',
	'UTC-11',
	'UTC-10',
	'UTC-9',
	'UTC-8',
	'UTC-7',
	'UTC-6',
	'UTC-5',
	'UTC-4',
	'UTC-3',
	'UTC-2',
	'UTC-1',
	'UTC+0',
	'UTC+1',
	'UTC+2',
	'UTC+3',
	'UTC+4',
	'UTC+5',
	'UTC+6',
	'UTC+7',
	'UTC+8',
	'UTC+9',
	'UTC+10',
	'UTC+11',
	'UTC+12',
	'UTC+13',
	'UTC+14'
]

export const utcTimes = [
	'0 UTC',
	'1 UTC',
	'2 UTC',
	'3 UTC',
	'4 UTC',
	'5 UTC',
	'6 UTC',
	'7 UTC',
	'8 UTC',
	'9 UTC',
	'10 UTC',
	'11 UTC',
	'12 UTC',
	'13 UTC',
	'14 UTC',
	'15 UTC',
	'16 UTC',
	'17 UTC',
	'18 UTC',
	'19 UTC',
	'20 UTC',
	'21 UTC',
	'22 UTC',
	'23 UTC'
]

export const rounds = [
	'qualifiers',
	'round of 32',
	'round of 16',
	'quarterfinals',
	'semifinals',
	'finals',
	'grand finals'
]
