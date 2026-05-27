'use client'

import { cn } from '@langgenius/dify-ui/cn'
import { useTranslation } from 'react-i18next'
import './style.css'

type ILoadingProps = {
  type?: 'area' | 'app'
  className?: string
}

const Loading = (props?: ILoadingProps) => {
  const { type = 'area', className } = props || {}
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center',
        type === 'app' && 'h-full',
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={t('loading', { ns: 'appApi' })}
    >
      <img
        src="/logo/logo-site.png"
        alt="Amábile AI"
        width={32}
        height={32}
        className="spin-animation"
        style={{ filter: 'drop-shadow(0 0 4px rgba(167, 139, 250, 0.4))' }}
      />

    </div>
  )
}

export default Loading
