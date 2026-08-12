"use client"

interface BlobBackgroundProps {
  variant?: "dark" | "light"
  className?: string
}

export function BlobBackground({
  variant = "dark",
  className = "",
}: BlobBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`blob-bg blob-bg--${variant} ${className}`}
    >
      <div className="blob-bg__blob blob-bg__blob--top-right" />
      <div className="blob-bg__blob blob-bg__blob--bottom-left" />
      <div className="blob-bg__blob blob-bg__blob--drift" />
    </div>
  )
}
