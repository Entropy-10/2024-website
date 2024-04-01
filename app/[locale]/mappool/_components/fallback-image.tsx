import Image from 'next/image'
import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useState } from 'react'

interface FallbackImageProps extends ComponentPropsWithoutRef<typeof Image> {
	fallbackSrc: string
}

export default function FallbackImage({
	src,
	fallbackSrc,
	...rest
}: FallbackImageProps) {
	const [imgSrc, setImgSrc] = useState(src)
	useEffect(() => setImgSrc(src), [src])
	return <Image {...rest} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />
}
