import { cn } from '@utils/client'
import Image from 'next/image'

import Button from '~/components/ui/button'
import { relink } from '../_actions/relink'
import { update } from '../_actions/update'
import UpdateButton from './update-button'

import pick from 'lodash/pick'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { cookies, headers } from 'next/headers'
import type { Tables } from '~/types/supabase'
import Options from './options'

interface AvatarInfoProps {
	user: Tables<'users'>
	type: 'osu' | 'discord'
	children?: React.ReactNode
	className?: string
}

export default async function AvatarInfo({
	user,
	type,
	children,
	className
}: AvatarInfoProps) {
	const headerList = await headers()
	const cookiesList = await cookies()
	const pathname = headerList.get('x-pathname') ?? '/profile'
	const csrfToken = headerList.get('X-CSRF-Token') ?? 'missing'
	const locale = cookiesList.get('NEXT_LOCALE')?.value ?? 'en'
	const t = await getTranslations('ProfilePage.Buttons')
	const messages = await getMessages()

	return (
		<div className={cn('flex gap-2', className)}>
			<div className=''>
				<Image
					width={123}
					height={123}
					sizes='(min-width: 768px) 123px, 96px'
					src={type === 'osu' ? user.osu_avatar : (user.discord_avatar ?? '')}
					alt={
						type === 'osu'
							? `${user.osu_name}'s pfp`
							: `${user.discord_name}'s pfp`
					}
					className={cn(
						'mb-4 size-24 border-2 border-milky-white md:size-[123px]',
						type === 'discord' && 'xs:flex hidden'
					)}
				/>
				<div
					className={cn(
						type === 'osu' && 'flex w-24 gap-1 md:w-[123px]',
						type === 'discord' &&
							'max-xs:padding max-xs:absolute max-xs:bottom-0 max-xs:left-28'
					)}
				>
					<NextIntlClientProvider
						locale={locale}
						messages={pick(messages, 'ProfilePage.Options')}
					>
						{type === 'osu' && <Options />}
					</NextIntlClientProvider>
					<form action={type === 'discord' ? relink : update} className='grow'>
						<input name='csrf_token' defaultValue={csrfToken} hidden />
						<input name='pathname' defaultValue={pathname} hidden />
						{type === 'osu' ? (
							<UpdateButton
								text={t('Update.text')}
								loadingText={t('Update.loadingText')}
							/>
						) : (
							<Button className='w-24 md:w-[123px]'>{t('relink')}</Button>
						)}
					</form>
				</div>
			</div>

			<div
				className={cn(
					'flex h-24 flex-col justify-between text-sm md:h-[123px]',
					type === 'discord' && 'xs:flex hidden'
				)}
			>
				<div className='font-extrabold text-lg uppercase md:mb-1 md:text-xl'>
					{type === 'osu' ? user.osu_name : user.discord_name}
				</div>

				<div className='flex h-[123px] flex-col justify-between text-xs md:text-sm'>
					{children}
				</div>
			</div>
		</div>
	)
}
