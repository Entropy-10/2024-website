'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { SearchIcon, X } from 'lucide-react'

import { createClient } from '@supabase/client'

import ErrorModal from '~/components/error-modal'
import { invite } from '../_actions/invite'
import InviteButton from './invite-button'

interface SearchProps {
	teamId: number
	inviteButtonText: string
	placeholderText: string
	closeButtonText: string
}

export default function Search({
	teamId,
	inviteButtonText,
	placeholderText,
	closeButtonText
}: SearchProps) {
	const [debounce, setDebounce] = useState<Timer>()
	const [results, setResults] = useState<UserResult[] | string>([])
	const [selectedUser, setSelectedUser] = useState<UserResult | null>(null)
	const [csrfToken, setCsrfToken] = useState<string>('loading...')
	const supabase = createClient()

	useEffect(() => {
		const el = document.querySelector(
			'meta[name="x-csrf-token"]'
		) as HTMLMetaElement | null
		if (el) setCsrfToken(el.content)
		else setCsrfToken('missing')
	}, [])

	function handleSearch(term: string | null) {
		if (debounce) clearTimeout(debounce)

		setDebounce(
			setTimeout(async () => {
				if (!term) return setResults([])

				const { data, error } = await supabase
					.from('users')
					.select('osu_id, osu_avatar, osu_name')
					.ilike('osu_name', `%${term}%`)
					.limit(5)

				if (error) return console.error(error)
				setResults(data.length === 0 ? 'none' : data)
			}, 250)
		)
	}

	function handleSelect(result: UserResult) {
		setSelectedUser(result)
		setResults([])
	}

	return (
		<div className='padding pt-3'>
			<ErrorModal text={closeButtonText} />
			<form
				onSubmit={() => setSelectedUser(null)}
				action={invite}
				className='flex gap-3'
			>
				<InviteButton text={inviteButtonText} disabled={!selectedUser} />
				<input name='csrf_token' value={csrfToken} hidden readOnly />
				<input name='team_id' defaultValue={teamId} hidden />
				<input name='user_id' defaultValue={selectedUser?.osu_id} hidden />

				<div className='relative max-w-80 grow'>
					{selectedUser ? (
						<>
							<div className='flex h-[32px] w-full items-center gap-1 border-[1.5px] border-dark-blue px-1'>
								<Image
									width={25}
									height={25}
									src={selectedUser.osu_avatar}
									alt={`${selectedUser.osu_avatar}'s pfp`}
									className='size-[25px]'
								/>
								{selectedUser.osu_name}
							</div>
							<button
								type='button'
								onClick={() => setSelectedUser(null)}
								className='absolute top-[6px] right-1.5 focus:outline-hidden'
							>
								<X
									size={20}
									className='stroke-dark-blue hover:stroke-red-400'
								/>
							</button>
						</>
					) : (
						<>
							<input
								onChange={e => handleSearch(e.currentTarget.value)}
								placeholder={placeholderText}
								className='focus:-outline-offset-2 h-[32px] w-full border-[1.5px] border-dark-blue pr-[30px] pl-1.5 text-dark-blue placeholder:text-dark-blue/55'
							/>
							<SearchIcon
								size={20}
								className='absolute top-[5px] right-1.5 stroke-dark-blue'
							/>
						</>
					)}

					{results.length > 0 && (
						<div className='absolute z-30 mt-1 w-full border-[1.5px] border-dark-blue bg-milky-white'>
							{!Array.isArray(results) && (
								<span className='p-0.5 text-medium-blue'>
									No results found!
								</span>
							)}
							{Array.isArray(results) &&
								results.map(result => (
									<button
										type='button'
										onClick={() => handleSelect(result)}
										key={result.osu_id}
										className='flex w-full items-center gap-1 p-0.5 text-dark-blue hover:bg-light-blue/10 hover:text-light-blue focus:outline-hidden'
									>
										<Image
											width={25}
											height={25}
											src={result.osu_avatar}
											alt={`${result.osu_avatar}'s pfp`}
											className='size-[25px]'
										/>
										{result.osu_name}
									</button>
								))}
						</div>
					)}
				</div>
			</form>
		</div>
	)
}

interface UserResult {
	osu_id: string
	osu_avatar: string
	osu_name: string
}
