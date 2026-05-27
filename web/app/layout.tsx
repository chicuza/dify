import type { Metadata, Viewport } from '@/next'
import { ToastHost } from '@langgenius/dify-ui/toast'
import { TooltipProvider } from '@langgenius/dify-ui/tooltip'
import { Provider as JotaiProvider } from 'jotai/react'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { IS_PROD } from '@/config'
import { TanstackQueryInitializer } from '@/context/query-client'
import { getDatasetMap } from '@/env'
import { getLocaleOnServer } from '@/i18n-config/server'
import { headers } from '@/next/headers'
import PartnerStackCookieRecorder from './components/billing/partner-stack/cookie-recorder'
import CreateAppAttributionBootstrap from './components/create-app-attribution-bootstrap'
import { AgentationLoader } from './components/devtools/agentation-loader'
import { ReactScanLoader } from './components/devtools/react-scan/loader'
import { I18nServerProvider } from './components/provider/i18n-server'
import RoutePrefixHandle from './routePrefixHandle'
import './styles/globals.css'
import './styles/markdown.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false,
}

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  const datasetMap = getDatasetMap()
  const nonce = IS_PROD ? (await headers()).get('x-nonce') ?? undefined : undefined

  return (
    <html lang={locale ?? 'pt-BR'} className="h-full" data-theme="light" suppressHydrationWarning style={{ colorScheme: 'light', backgroundColor: '#FFFFFF' }}>
      <head>
        <title>Amábile AI</title>
        <meta name="description" content="Plataforma Amábile AI — IA nativa para empresas" />
        <meta name="application-name" content="Amábile AI" />
        <meta property="og:title" content="Amábile AI" />
        <meta property="og:description" content="Plataforma Amábile AI — IA nativa para empresas" />
        <meta property="og:image" content="/og-image.png?v=amabile-2" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Amábile AI" />
        <meta name="twitter:image" content="/og-image.png?v=amabile-2" />
        <link rel="manifest" href="/manifest.json?v=amabile-2" />
        <meta name="theme-color" content="#A78BFA" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Amábile AI" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=amabile-2" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=amabile-2" />
        <link rel="shortcut icon" href="/favicon.ico?v=amabile-2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=amabile-2" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=amabile-2" />
        <meta name="msapplication-TileColor" content="#A78BFA" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        <CreateAppAttributionBootstrap />
        {/* <ReactGrabLoader /> */}
        <ReactScanLoader />
      </head>
      <body
        className="h-full select-auto bg-white text-text-primary"
        style={{ backgroundColor: '#FFFFFF', colorScheme: 'light' }}
        {...datasetMap}
      >
        <div className="isolate h-full">
          <JotaiProvider>
            <ThemeProvider
              attribute="data-theme"
              defaultTheme="light"
              forcedTheme="light"
              enableSystem={false}
              disableTransitionOnChange
              nonce={nonce}
            >
              <NuqsAdapter>
                <TanstackQueryInitializer>
                  <I18nServerProvider>
                    <ToastHost timeout={5000} limit={3} />
                    <PartnerStackCookieRecorder />
                    <TooltipProvider delay={300} closeDelay={200}>
                      {children}
                    </TooltipProvider>
                  </I18nServerProvider>
                </TanstackQueryInitializer>
              </NuqsAdapter>
            </ThemeProvider>
          </JotaiProvider>
          <RoutePrefixHandle />
          <AgentationLoader />
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
