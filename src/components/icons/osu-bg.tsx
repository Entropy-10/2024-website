import type { SVGProps } from 'react'

import { cn } from '@utils/client'

interface OsuBgIconProps extends SVGProps<SVGSVGElement> {
	className?: string
}

export default function OsuBgIcon({ className, ...props }: OsuBgIconProps) {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='30'
			height='30'
			viewBox='0 0 1000 1000'
			className={cn('transition-all duration-200 ease-in-out', className)}
			{...props}
		>
			<circle cx='500' cy='500' r='450' fill='#FF66AB' id='circle105' />
			<circle
				cx='500'
				cy='500'
				r='450'
				fill='url(#paint0_linear_34_23)'
				fillOpacity='0.2'
				id='circle107'
			/>
			<mask
				id='mask0_34_23'
				style={{ maskType: 'alpha' }}
				maskUnits='userSpaceOnUse'
				x='50'
				y='50'
				width='900'
				height='900'
			>
				<circle cx='500' cy='500' r='450' fill='#FF66AB' id='circle109' />
				<circle
					cx='500'
					cy='500'
					r='450'
					fill='url(#paint1_linear_34_23)'
					fillOpacity='0.2'
					id='circle111'
				/>
			</mask>
			<g mask='url(#mask0_34_23)' id='g116'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M394.438 139.1L273.829 348.001L220.638 255.872L37.1974 573.6H121.472L-0.821655 785.418H332.083L289.75 858.74H656.631L564.127 698.518H744.632L724.25 733.822H1091.13L1047.23 657.784H1235.06L1051.62 340.056L957.704 502.72L907.69 416.094L872.586 476.896L723.028 217.853L562.888 495.222L540.721 456.828H577.878L394.438 139.1ZM749.828 698.518L732.044 729.322H1083.34L1042.03 657.784H868.178L955.106 507.22L907.69 425.094L875.184 481.396L906.468 535.581H843.9L803.707 605.197L857.587 698.518H749.828ZM801.109 609.697L849.792 694.018H752.426L801.109 609.697ZM798.511 605.197L747.23 694.018H561.529L530.014 639.434L530.395 638.775H645.768L588.082 538.859L589.974 535.581H758.319L798.511 605.197ZM801.109 600.697L838.704 535.581H763.515L801.109 600.697ZM760.917 531.081H841.302L869.988 481.396L723.028 226.853L565.486 499.722L583.591 531.081H587.376L674.146 380.791L760.917 531.081ZM592.572 531.081H755.721L674.146 389.791L592.572 531.081ZM582.886 538.859L580.993 535.581H539.587L560.29 499.722L535.525 456.828H389.131L362.895 502.269L404.078 573.6H321.713L286.682 634.275H419.346L473.191 541.012L527.036 634.275H527.797L582.886 538.859ZM532.993 634.275H637.974L585.484 543.359L532.993 634.275ZM524.818 639.434L524.437 638.775H421.944L351.669 760.494L366.059 785.418H337.279L297.544 854.24H648.837L558.931 698.518H490.706L524.818 639.434ZM556.333 694.018L527.416 643.934L498.5 694.018H556.333ZM578.395 531.081L562.888 504.222L547.382 531.081H578.395ZM846.498 531.081L872.586 485.896L898.674 531.081H846.498ZM220.638 264.872L271.23 352.501L210.997 456.828H331.464L357.699 502.269L319.114 569.1H241.167L182.619 467.69L124.07 569.1H44.9916L220.638 264.872ZM273.829 357.001L218.791 452.328H328.866L273.829 357.001ZM276.427 352.501L334.062 452.328H386.533L462.328 321.047L538.123 452.328H570.084L394.438 148.1L276.427 352.501ZM360.297 497.769L336.66 456.828H383.935L360.297 497.769ZM462.328 330.047L532.927 452.328H391.729L462.328 330.047ZM126.668 573.6L6.97257 780.918H334.681L346.473 760.494L238.569 573.6H126.668ZM235.971 569.1H129.266L182.619 476.69L235.971 569.1ZM243.765 573.6L280.141 636.604L316.516 573.6H243.765ZM360.297 506.769L324.311 569.1H396.284L360.297 506.769ZM349.071 755.994L281.394 638.775H416.747L349.071 755.994ZM349.071 764.994L339.877 780.918H358.265L349.071 764.994ZM424.542 634.275L473.191 550.012L521.839 634.275H424.542ZM957.704 511.72L875.972 653.284H1039.44L957.704 511.72ZM1044.63 653.284L960.302 507.22L1051.62 349.056L1227.26 653.284H1044.63Z'
					fill='url(#paint2_linear_34_23)'
					id='path114'
				/>
			</g>
			<defs id='defs202'>
				<filter
					id='filter0_d_34_23'
					x='170.75'
					y='354.714'
					width='658.571'
					height='283.661'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'
						id='feFlood136'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
						id='feColorMatrix138'
					/>
					<feOffset dy='10.7249' id='feOffset140' />
					<feGaussianBlur stdDeviation='10.7249' id='feGaussianBlur142' />
					<feComposite in2='hardAlpha' operator='out' id='feComposite144' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
						id='feColorMatrix146'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_34_23'
						id='feBlend148'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_34_23'
						result='shape'
						id='feBlend150'
					/>
				</filter>
				<filter
					id='filter1_d_34_23'
					x='32'
					y='41'
					width='936'
					height='936'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'
						id='feFlood153'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
						id='feColorMatrix155'
					/>
					<feOffset dy='9' id='feOffset157' />
					<feGaussianBlur stdDeviation='9' id='feGaussianBlur159' />
					<feComposite in2='hardAlpha' operator='out' id='feComposite161' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
						id='feColorMatrix163'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_34_23'
						id='feBlend165'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_34_23'
						result='shape'
						id='feBlend167'
					/>
				</filter>
				<filter
					id='filter2_d_34_23'
					x='236.45'
					y='475.775'
					width='98.3216'
					height='97.9616'
					filterUnits='userSpaceOnUse'
					colorInterpolationFilters='sRGB'
				>
					<feFlood
						floodOpacity='0'
						result='BackgroundImageFix'
						id='feFlood170'
					/>
					<feColorMatrix
						in='SourceAlpha'
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
						result='hardAlpha'
						id='feColorMatrix172'
					/>
					<feOffset dy='10.7249' id='feOffset174' />
					<feGaussianBlur stdDeviation='10.7249' id='feGaussianBlur176' />
					<feComposite in2='hardAlpha' operator='out' id='feComposite178' />
					<feColorMatrix
						type='matrix'
						values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
						id='feColorMatrix180'
					/>
					<feBlend
						mode='normal'
						in2='BackgroundImageFix'
						result='effect1_dropShadow_34_23'
						id='feBlend182'
					/>
					<feBlend
						mode='normal'
						in='SourceGraphic'
						in2='effect1_dropShadow_34_23'
						result='shape'
						id='feBlend184'
					/>
				</filter>
				<linearGradient
					id='paint0_linear_34_23'
					x1='500'
					y1='50'
					x2='500'
					y2='950'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopOpacity='0' id='stop187' />
					<stop offset='1' id='stop189' />
				</linearGradient>
				<linearGradient
					id='paint1_linear_34_23'
					x1='500'
					y1='50'
					x2='500'
					y2='950'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopOpacity='0' id='stop192' />
					<stop offset='1' id='stop194' />
				</linearGradient>
				<linearGradient
					id='paint2_linear_34_23'
					x1='617.118'
					y1='139.1'
					x2='617.118'
					y2='858.74'
					gradientUnits='userSpaceOnUse'
				>
					<stop stopColor='#F964A7' id='stop197' />
					<stop offset='1' stopColor='#B6346F' id='stop199' />
				</linearGradient>
			</defs>
		</svg>
	)
}
