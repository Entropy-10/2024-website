'use server'

import sharp from 'sharp'

import { env } from '@env'
import { createClient } from '@supabase/server'

export default async function uploadImage(formData: FormData) {
	try {
		const teamName = formData.get('team_name')?.toString()
		const oldFlagPath = formData.get('old_flag_path')?.toString()
		const imageType = formData.get('file_type')?.toString()
		const image = await (
			formData.get('file') as Blob | undefined
		)?.arrayBuffer()

		if (!teamName || !oldFlagPath || !image || !imageType) {
			throw new Error('Missing team name or file')
		}

		const isGif = imageType.endsWith('gif')
		const sharpImage = sharp(image, { animated: isGif }).resize(666, 296)

		if (isGif) sharpImage.gif({ interFrameMaxError: 25 })
		else sharpImage.jpeg({ quality: 100 })

		const {
			data: flag,
			info: { format }
		} = await sharpImage.toBuffer({ resolveWithObject: true })

		const supabase = await createClient()
		const { error: deleteError } = await supabase.storage
			.from('flags')
			.remove([oldFlagPath])

		if (deleteError) throw deleteError

		const { data, error: uploadError } = await supabase.storage
			.from('flags')
			.upload(
				`${teamName}/flag-${Date.now()}.${format}`,
				new File([flag], `flag.${format}`, { type: `image/${format}` }),
				{ upsert: true }
			)

		if (uploadError) throw uploadError

		return {
			url: `${env.SUPABASE_STORAGE_URL}/flags/${data.path}`,
			error: null
		}
	} catch (err) {
		return { error: { type: 'default', message: '' } }
	}
}
