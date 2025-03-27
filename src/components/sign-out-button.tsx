'use client'

import { useEffect, useState } from 'react'

import { cn } from '@utils/client'

import { signOut } from '~/lib/actions'

interface SignOutButtonProps {
	className?: string
	text: string
}

export default function SignOutButton({ className, text }: SignOutButtonProps) {
	const [csrfToken, setCsrfToken] = useState<string>('loading...')

	useEffect(() => {
		const el = document.querySelector(
			'meta[name="x-csrf-token"]'
		) as HTMLMetaElement | null
		if (el) setCsrfToken(el.content)
		else setCsrfToken('missing')
	}, [])

	return (
		<button
			className={cn('text-left text-red-400', className)}
			type='button'
			onClick={() => signOut(csrfToken)}
		>
			{text}
		</button>
	)
}
