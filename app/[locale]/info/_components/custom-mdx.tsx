'use client'

import type { MDXProvider } from '@mdx-js/react'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'

const components = {
	h1: props => (
		<h1 {...props} className='text-red-500'>
			{props.children}
		</h1>
	),
	a: props => (
		<a {...props} className='underline focus:outline-hidden'>
			{props.children}
		</a>
	),
	ul: props => (
		<ul
			{...props}
			className='padding list-inside list-disc font-medium text-sm leading-6 sm:text-base sm:leading-8'
		>
			{props.children}
		</ul>
	),
	ol: props => (
		<ol
			{...props}
			className='padding list-inside list-disc font-medium text-sm leading-6 sm:text-base sm:leading-8'
		>
			<div className='px-7 md:px-9 lg:px-11'>{props.children}</div>
		</ol>
	)
} satisfies React.ComponentProps<typeof MDXProvider>['components']

export default function CustomMDX(props: MDXRemoteSerializeResult) {
	return <MDXRemote {...props} components={components} />
}
