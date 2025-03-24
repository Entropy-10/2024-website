'use client'

import type { VariantProps } from 'class-variance-authority'
import { useFormStatus } from 'react-dom'

import { cn } from '@utils/client'

import Button, { type buttonVariants } from '~/components/ui/button'

interface DeleteButtonProps extends VariantProps<typeof buttonVariants> {
	text: string
	className?: string
}

export default function DeleteButton({
	text,
	variant,
	className
}: DeleteButtonProps) {
	const { pending } = useFormStatus()

	return (
		<Button
			className={cn('w-full', className)}
			variant={variant}
			loading={pending}
		>
			{text}
		</Button>
	)
}
