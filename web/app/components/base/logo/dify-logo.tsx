'use client'
import type { FC } from 'react'
import { cn } from '@langgenius/dify-ui/cn'
import useTheme from '@/hooks/use-theme'
import { basePath } from '@/utils/var'

export type LogoStyle = 'default' | 'monochromeWhite'

// Two assets per style:
//  - full: wordmark + symbol (512×128) — used at "large" size (login, install, hero)
//  - mark: symbol only (128×128) — used at "medium"/"small" sizes (sidebar, header, dropdown)
const logoFullMap: Record<LogoStyle, string> = {
  default: '/logo/logo.png',
  monochromeWhite: '/logo/logo.png',
}

const logoMarkMap: Record<LogoStyle, string> = {
  default: '/logo/logo-site.png',
  monochromeWhite: '/logo/logo-site.png',
}

export const logoPathMap: Record<LogoStyle, string> = logoFullMap

export type LogoSize = 'large' | 'medium' | 'small'

export const logoSizeMap: Record<LogoSize, string> = {
  large: 'w-40 h-10',     // 160×40 (4:1 aspect ratio — fits 512×128 wordmark)
  medium: 'h-8 w-8',      // 32×32 (1:1 — symbol only)
  small: 'h-7 w-7',       // 28×28 (1:1 — symbol only)
}

type DifyLogoProps = {
  style?: LogoStyle
  size?: LogoSize
  className?: string
}

const DifyLogo: FC<DifyLogoProps> = ({
  style = 'default',
  size = 'medium',
  className,
}) => {
  const { theme } = useTheme()
  const themedStyle = (theme === 'dark' && style === 'default') ? 'monochromeWhite' : style

  // Use full wordmark for "large", symbol-only mark for "medium"/"small"
  const assetMap = size === 'large' ? logoFullMap : logoMarkMap
  const src = `${basePath}${assetMap[themedStyle]}`

  return (
    <img
      src={src}
      className={cn('block object-contain', logoSizeMap[size], className)}
      alt="Amábile AI"
    />
  )
}

export default DifyLogo
