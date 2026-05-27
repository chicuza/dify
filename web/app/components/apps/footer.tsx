import * as React from 'react'
import Link from '@/next/link'

const Footer = () => {
  return (
    <footer className="relative shrink-0 grow-0 px-12 py-2">
      <p className="system-sm-regular text-text-tertiary">
        &copy; {new Date().getFullYear()}{' '}
        <Link
          href="https://amabile.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-accent hover:underline"
        >
          Amábile AI
        </Link>
      </p>
    </footer>
  )
}

export default React.memo(Footer)
