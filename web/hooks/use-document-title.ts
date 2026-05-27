'use client'
import { useQuery } from '@tanstack/react-query'
import { useFavicon, useTitle } from 'ahooks'
import { useEffect } from 'react'
import { systemFeaturesQueryOptions } from '@/service/system-features'
import { defaultSystemFeatures } from '@/types/feature'
import { basePath } from '@/utils/var'

export default function useDocumentTitle(title: string) {
  const { data, isPending } = useQuery(systemFeaturesQueryOptions())
  const systemFeatures = data ?? defaultSystemFeatures
  const prefix = title ? `${title} - ` : ''
  // Default IMMEDIATELY (avoid '' which keeps stale title from prior PWA/cache)
  let titleStr = `${prefix}Amábile AI`
  let favicon = `${basePath}/favicon.ico`
  if (isPending === false) {
    if (systemFeatures.branding.enabled && systemFeatures.branding.application_title) {
      titleStr = `${prefix}${systemFeatures.branding.application_title}`
      favicon = systemFeatures.branding.favicon || favicon
    }
  }
  useTitle(titleStr)
  useEffect(() => {
    let apple: HTMLLinkElement | null = null
    if (systemFeatures.branding.favicon) {
      document
        .querySelectorAll(
          'link[rel=\'icon\'], link[rel=\'shortcut icon\'], link[rel=\'apple-touch-icon\'], link[rel=\'mask-icon\']',
        )
        .forEach(n => n.parentNode?.removeChild(n))

      apple = document.createElement('link')
      apple.rel = 'apple-touch-icon'
      apple.href = systemFeatures.branding.favicon
      document.head.appendChild(apple)
    }

    return () => {
      apple?.remove()
    }
  }, [systemFeatures.branding.favicon])
  useFavicon(favicon)
}
