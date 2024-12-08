import { createMetadata } from '@metadata'
import { getTranslations } from 'next-intl/server'
import { serialize } from 'next-mdx-remote/serialize'

import Background from '~/components/ui/background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'

import type { MetadataProps } from '@types'
import CustomMDX from './_components/custom-mdx'
import MappoolTable from './_components/mappool-table'

export async function generateMetadata(props: MetadataProps) {
	const params = await props.params

	const { locale } = params

	const t = await getTranslations({ locale, namespace: 'Metadata' })
	return createMetadata({
		locale,
		title: t('PageTitles.info'),
		description: t('description')
	})
}

export default async function InfoPage() {
	const t = await getTranslations('InfoPage')

	// this is really really bad but it should load faster than before
	// this page really just needs to be redone
	const [
		generalInfo,
		schedule,
		registrations,
		generalConduct,
		scheduling,
		gameProcedures,
		qualifiers,
		match,
		mappoolInfo,
		prizePool
	] = await Promise.all([
		serialize(`
- ${t('GeneralInfo.1')}
- ${t('GeneralInfo.2')}
- ${t('GeneralInfo.3')}
- ${t('GeneralInfo.4')}
- ${t('GeneralInfo.5')}
- ${t('GeneralInfo.6')}
- ${t('GeneralInfo.7')}
- ${t('GeneralInfo.8')}
- ${t('GeneralInfo.9', { sublist_alpha: '\n1.' })}
					`),
		serialize(`
${t('GeneralInfo.Schedule.1')}\n
${t('GeneralInfo.Schedule.2')}\n
${t('GeneralInfo.Schedule.3')}\n
${t('GeneralInfo.Schedule.4')}\n
${t('GeneralInfo.Schedule.5')}\n
${t('GeneralInfo.Schedule.6')}\n
${t('GeneralInfo.Schedule.7')}\n
${t('GeneralInfo.Schedule.8')}\n
${t('GeneralInfo.Schedule.9')}
					`),
		serialize(`
- ${t('Registrations.1')}
- ${t('Registrations.2')}
- ${t('Registrations.3')}
- ${t('Registrations.4')}
- ${t('Registrations.5')}
					`),
		serialize(`
- ${t('GeneralConduct.1')}
- ${t('GeneralConduct.2', { sublist_alpha: '\n1.' })}
- ${t('GeneralConduct.3')}
- ${t('GeneralConduct.4', { sublist_alpha: '\n1.' })}
- ${t('GeneralConduct.5')}
- ${t('GeneralConduct.6')}
- ${t('GeneralConduct.7')}
- ${t('GeneralConduct.8')}
- ${t('GeneralConduct.9')}
- ${t('GeneralConduct.10')}
- ${t('GeneralConduct.11')}
					`),
		serialize(`
- ${t('Scheduling.1')}
- ${t('Scheduling.2')}
- ${t('Scheduling.3')}
- ${t('Scheduling.4')}
					`),
		serialize(`
- ${t('GameProcedures.1')}
- ${t('GameProcedures.2')}
- ${t('GameProcedures.3', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.4')}
					`),
		serialize(`
- ${t('GameProcedures.Qualifiers.1')}
- ${t('GameProcedures.Qualifiers.2', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Qualifiers.3')}
- ${t('GameProcedures.Qualifiers.4')}
					`),
		serialize(`
- ${t('GameProcedures.Match.1')}
- ${t('GameProcedures.Match.2')}
- ${t('GameProcedures.Match.3', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.4', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.5', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.6', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.7')}
- ${t('GameProcedures.Match.8', { sublist_alpha: '\n1.' })}
- ${t('GameProcedures.Match.9')}
- ${t('GameProcedures.Match.10')}
- ${t('GameProcedures.Match.11')}
- ${t('GameProcedures.Match.12')}
- ${t('GameProcedures.Match.13')}
- ${t('GameProcedures.Match.14')}
					`),
		serialize(`
- ${t('MappoolInfo.1')}
- ${t('MappoolInfo.2')}
					`),
		serialize(`
- ${t('PrizePool.1', { sublist_alpha: '\n1.' })}
- ${t('PrizePool.2', { sublist_alpha: '\n1.' })}
- ${t('PrizePool.3', { sublist_alpha: '\n1.' })}
- ${t('PrizePool.4', { sublist_alpha: '\n1.' })}
					`)
	])

	return (
		<div>
			<Background className='py-10' imageClassName='brightness-95'>
				<Heading>{t('GeneralInfo.heading')}</Heading>
				<Divider />

				<CustomMDX {...generalInfo} />

				<Divider variant='single' />

				<Heading sub>{t('GeneralInfo.Schedule.heading')}</Heading>
				<div className='padding'>
					<div className='px-7 md:px-9 lg:px-11'>
						<CustomMDX {...schedule} />
					</div>
				</div>
			</Background>

			<Background className='py-10 text-light-blue' gradient={false}>
				<Heading>{t('Registrations.heading')}</Heading>
				<Divider className='bg-light-blue' />
				<div className='text-blue'>
					<CustomMDX {...registrations} />
				</div>
			</Background>

			<Background className='py-10' imageClassName='brightness-95'>
				<Heading>{t('GeneralConduct.heading')}</Heading>
				<Divider />
				<CustomMDX {...generalConduct} />
			</Background>

			<Background className='py-10 text-light-blue' gradient={false}>
				<Heading>{t('Scheduling.heading')}</Heading>
				<Divider className='bg-light-blue' />
				<div className='text-blue'>
					<CustomMDX {...scheduling} />
				</div>
			</Background>

			<Background className='py-10' imageClassName='brightness-95'>
				<Heading>{t('GameProcedures.heading')}</Heading>
				<Divider />
				<CustomMDX {...gameProcedures} />

				<Divider variant='single' />

				<Heading sub>{t('GameProcedures.Qualifiers.heading')}</Heading>
				<div className='px-7 md:px-9 lg:px-11'>
					<CustomMDX {...qualifiers} />
				</div>

				<Divider variant='single' />

				<Heading sub>{t('GameProcedures.Match.heading')}</Heading>
				<div className='px-7 md:px-9 lg:px-11'>
					<CustomMDX {...match} />
				</div>
			</Background>

			<Background className='py-10 text-light-blue' gradient={false}>
				<Heading>{t('MappoolInfo.heading')}</Heading>
				<Divider className='bg-light-blue' />

				<div className='padding mb-5 overflow-x-scroll'>
					<MappoolTable />
				</div>

				<div className='text-blue'>
					<CustomMDX {...mappoolInfo} />
				</div>
			</Background>

			<Background className='py-10' imageClassName='brightness-95'>
				<Heading>{t('PrizePool.heading')}</Heading>
				<Divider />
				<CustomMDX {...prizePool} />
			</Background>
		</div>
	)
}
