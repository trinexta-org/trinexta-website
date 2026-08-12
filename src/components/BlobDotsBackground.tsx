"use client"

interface BlobDotsBackgroundProps {
  className?: string
}

export function BlobDotsBackground({ className = "" }: BlobDotsBackgroundProps) {
  return (
    <div aria-hidden="true" className={`blob-dots-bg ${className}`}>
      <div className="blob-dots-bg__blob blob-dots-bg__blob--top-right" />
      <div className="blob-dots-bg__blob blob-dots-bg__blob--bottom-left" />
      <div className="blob-dots-bg__blob blob-dots-bg__blob--drift" />

      <svg className="blob-dots-bg__grid blob-dots-bg__grid--large" width="140" height="90">
        <circle cx="10" cy="10" r="2.5" /><circle cx="30" cy="10" r="2.5" /><circle cx="50" cy="10" r="2.5" />
        <circle cx="10" cy="30" r="2.5" /><circle cx="30" cy="30" r="2.5" /><circle cx="50" cy="30" r="2.5" />
        <circle cx="10" cy="50" r="2.5" /><circle cx="30" cy="50" r="2.5" /><circle cx="50" cy="50" r="2.5" />
        <circle cx="10" cy="70" r="2.5" /><circle cx="30" cy="70" r="2.5" /><circle cx="50" cy="70" r="2.5" />
      </svg>

      <svg className="blob-dots-bg__grid blob-dots-bg__grid--small" width="80" height="80">
        <circle cx="10" cy="10" r="2.5" /><circle cx="30" cy="10" r="2.5" />
        <circle cx="10" cy="30" r="2.5" /><circle cx="30" cy="30" r="2.5" />
        <circle cx="10" cy="50" r="2.5" /><circle cx="30" cy="50" r="2.5" />
        <circle cx="10" cy="70" r="2.5" /><circle cx="30" cy="70" r="2.5" />
      </svg>
    </div>
  )
}
