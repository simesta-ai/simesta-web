'use client'

import { LoaderCircle } from "lucide-react"

const Loader = ({ size, styles }: { size: number, styles?: string }) => {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle className={`loader animate-spin ${styles}`} size={size} />
    </div>
  )
}

export default Loader