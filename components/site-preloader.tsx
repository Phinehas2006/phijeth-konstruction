'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function SitePreloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 900)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] grid place-items-center bg-[#081425]"
        >
          <div className="text-center">
            <div className="relative mx-auto h-28 w-28">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-4 border-white/10 border-t-accent"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                className="absolute inset-5 rounded-md border-2 border-white/30 bg-white/10"
              />
              <div className="absolute inset-0 grid place-items-center">
                <div className="h-2 w-16 rounded-full bg-accent shadow-[0_0_24px_rgba(255,122,0,0.65)]" />
              </div>
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.24em] text-white/70">
              Building the experience
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
