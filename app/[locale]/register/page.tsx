import { redirect } from 'next/navigation'
import { getSession } from '@utils/server'
import { getTranslations } from 'next-intl/server'
import { createMetadata } from '@metadata'

import Background from '~/components/ui/Background'
import Divider from '~/components/ui/divider'
import Heading from '~/components/ui/heading'
import CreateTeamForm from './_components/create-team-form'

import type { MetadataProps } from '@types'

export async function generateMetadata({ params: { locale } }: MetadataProps) {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return createMetadata({
    locale,
    title: t('PageTitles.register'),
    description: t('description')
  })
}

export default function RegisterPage() {
  const session = getSession()
  if (!session) redirect('/unauthorized')

  return (
    <Background className='relative flex min-h-screen items-center justify-center'>
      <div className='absolute left-0 top-10'>
        <Heading>TEAM REGISTRATION</Heading>
        <Divider />
      </div>

      <CreateTeamForm userId={session.sub} />
    </Background>
  )
}
