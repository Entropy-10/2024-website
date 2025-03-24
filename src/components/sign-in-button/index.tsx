import { headers } from 'next/headers'
import { useTranslations } from 'next-intl'
import type { VariantProps } from 'class-variance-authority'

import Button, { type buttonVariants } from '../ui/button'
import { signIn } from './actions'

interface SignInButtonProps extends VariantProps<typeof buttonVariants> {
	className?: string
}

export default async function SignInButton({
	className,
	variant
}: SignInButtonProps) {
	const t = useTranslations('Buttons')
	const headersList = await headers()
	const pathname = headersList.get('x-pathname') ?? '/'
	const csrfToken = headersList.get('X-CSRF-Token') ?? 'missing'

	return (
		<form action={signIn}>
			<input name='csrf_token' defaultValue={csrfToken} hidden />
			<input name='return-path' defaultValue={pathname} hidden />
			<Button variant={variant ?? 'primary'} className={className}>
				{t('signIn')}
			</Button>
		</form>
	)
}
