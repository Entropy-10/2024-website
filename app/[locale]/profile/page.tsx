import { createMetadata } from '@metadata'
import { getSession } from '@session'
import { createClient } from '@supabase/server'
import type { MetadataProps } from '@types'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'
import ErrorModal from '~/components/error-modal'
import SectionLoader from '~/components/section-loader'
import Background from '~/components/ui/background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import AvatarInfo from './_components/avatar-info'
import Invites from './_components/invites'
import Team from './_components/team'

export async function generateMetadata(props: MetadataProps) {
	const params = await props.params
	const { locale } = params

	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.profile'),
		description: t('description')
	})
}

export default async function ProfilePage() {
	const session = await getSession()
	if (!session) redirect('/unauthorized')

	const t = await getTranslations('ProfilePage')
	const buttonT = await getTranslations('Buttons')
	const supabase = await createClient()

	const { data: user } = await supabase
		.from('users')
		.select('*')
		.eq('osu_id', session.sub)
		.maybeSingle()

	if (!user) notFound()

	return (
		<div>
			<ErrorModal text={buttonT('close')} />
			<Background className='py-8'>
				<Heading>{t('Headings.profile')}</Heading>
				<Divider />

				<section className='padding relative flex gap-6 md:gap-20'>
					<AvatarInfo user={user} type='osu'>
						<div className='space-y-1'>
							<div>
								<span className='font-extrabold'>{t('Osu.rank')}:</span> #
								{user.rank ? user.rank.toLocaleString() : t('Errors.noRank')}
							</div>

							<div>
								<span className='font-extrabold'>{t('Osu.countryRank')}:</span>{' '}
								#
								{user.country_rank
									? user.country_rank.toLocaleString()
									: t('Errors.noRank')}
							</div>
						</div>

						<div className='flex items-center gap-1'>
							<Image
								width={30}
								height={30}
								src={`https://flagsapi.com/${user.country_code}/flat/64.png`}
								alt={`${user.country} flag`}
							/>
							{user.country}
						</div>
					</AvatarInfo>

					<AvatarInfo user={user} type='discord'>
						<div className='font-extrabold uppercase'>@{user.discord_tag}</div>
					</AvatarInfo>
				</section>
			</Background>

			<section className='py-8 text-light-blue'>
				<Heading>{t('Headings.team')}</Heading>
				<Divider className='bg-light-blue' />
				<Heading sub>{t('Team.heading')}</Heading>

				<Suspense fallback={<SectionLoader />}>
					<Team userId={session.sub} />
				</Suspense>

				<Divider variant='single' className='bg-light-blue' />
				<Heading id='invites' sub>
					{t('Invites.heading')}
				</Heading>

				<Suspense fallback={<SectionLoader className='h-[311px]' />}>
					<Invites userId={session.sub} />
				</Suspense>
			</section>
		</div>
	)
}
