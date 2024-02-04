'use client'

import { useEffect } from 'react'

import Button from '~/components/ui/Button'

interface ErrorProps {
	error: Error & { digest?: string }
	reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className='flex min-h-screen flex-col items-center justify-center space-y-4 text-medium-blue'>
			<h1 className='font-bold text-3xl'>Something Went Wrong!</h1>
			<div className='flex space-x-3'>
				<Button variant='invertedOutline' onClick={() => reset()}>
					Try Again
				</Button>

				<Button href='/' variant='invertedOutline'>
					Go Home
				</Button>
			</div>
		</div>
	)
}
