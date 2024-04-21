'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { availabilityForm } from '@schemas'
import { useForm } from 'react-hook-form'

import Button from '~/components/ui/button'
import UtcPicker from '~/components/utc-picker'

import { utcTimes } from '@siteConfig'
import type { ModalError } from '@types'
import { useState } from 'react'
import type { z } from 'zod'
import MessageBox from '~/components/message-box'
import TextModal from '~/components/text-modal'
import Heading from '~/components/ui/heading'
import { updateAvailability } from '../_actions/update-availability'
import InputError from './input-error'
import Label from './label'

interface CreateTeamFormProps {
	osuId: string
	discordId: string
}

export default function AvailabilityForm() {
	const [success, setSuccess] = useState(false)
	const [error, setError] = useState<ModalError | null>(null)
	const [open, setOpen] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }
	} = useForm<z.infer<typeof availabilityForm>>({
		resolver: zodResolver(availabilityForm)
	})

	async function onSubmit(data: z.infer<typeof availabilityForm>) {
		const csrfResp = await fetch('/csrf-token')
		const { csrfToken } = await csrfResp.json()

		const availabilityForm = new FormData()
		availabilityForm.append('startingTime', data.startingTime)
		availabilityForm.append('endingTime', data.endingTime)
		availabilityForm.append('csrf_token', csrfToken)

		const { error } = await updateAvailability(availabilityForm)

		if (error) {
			setError({
				title: error.title,
				message: error.message
			})
			return setOpen(true)
		}

		setSuccess(true)
	}

	return !success ? (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-3 bg-milky-white px-6 py-4'
		>
			<Heading className='text-light-blue sm:text-md' padding={false} sub>
				YOUR AVAILABILITY.
			</Heading>

			<div className='group'>
				<Label htmlFor='timezone'>*Starting Time</Label>
				<UtcPicker
					{...register('startingTime')}
					values={utcTimes}
					className={{ trigger: 'w-full' }}
				/>
				{errors.startingTime?.message && (
					<InputError message={errors.startingTime.message} />
				)}
			</div>

			<div className='group'>
				<Label htmlFor='timezone'>*Ending Time</Label>
				<UtcPicker
					{...register('endingTime')}
					values={utcTimes}
					className={{ trigger: 'w-full' }}
				/>
				{errors.endingTime?.message && (
					<InputError message={errors.endingTime.message} />
				)}
			</div>

			<Button
				loading={isSubmitting}
				type='submit'
				className='mt-2 w-full'
				variant='invertedOutline'
			>
				{isSubmitting ? 'SUBMITTING' : 'SUBMIT'}
			</Button>

			{error && (
				<TextModal
					open={open}
					setOpen={() => setOpen(!open)}
					title={error.title}
					message={error.message}
				/>
			)}
		</form>
	) : (
		<MessageBox
			title='AVAILABILITY UPDATED!'
			message="Your team's availability has been updated. This will be used for all future default schedules."
		>
			<Button href='/team' variant='outline'>
				TEAM MANAGEMENT
			</Button>
		</MessageBox>
	)
}
