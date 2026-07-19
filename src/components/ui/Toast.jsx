import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../../context/ToastContext'
import { HiCheckCircle, HiExclamationTriangle, HiInformationCircle, HiXCircle, HiXMark } from 'react-icons/hi2'

const icons = {
  success: HiCheckCircle,
  error: HiXCircle,
  warning: HiExclamationTriangle,
  info: HiInformationCircle,
}

const colors = {
  success: 'border-green/30 bg-green/5',
  error: 'border-red/30 bg-red/5',
  warning: 'border-orange/30 bg-orange/5',
  info: 'border-primary/30 bg-primary/5',
}

const iconColors = {
  success: 'text-green',
  error: 'text-red',
  warning: 'text-orange',
  info: 'text-primary',
}

export default function Toast() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || icons.info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl ${colors[toast.type]}`}
            >
              <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColors[toast.type]}`} />
              <p className="text-sm text-text flex-1">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-muted hover:text-text transition-colors flex-shrink-0"
              >
                <HiXMark className="w-4 h-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
