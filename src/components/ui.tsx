import type { ReactNode, CSSProperties } from 'react'

export function CircleProgress({ value, size = 64, color = '#4338CA', trackColor = '#E5E7EB', showLabel = true }: {
  value: number; size?: number; color?: string; trackColor?: string; showLabel?: boolean
}) {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  const fs = size < 50 ? 9 : size < 64 ? 11 : 13
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={trackColor} strokeWidth="5"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`} style={{transition:'stroke-dashoffset 0.6s ease'}}/>
      {showLabel && <text x={size/2} y={size/2+fs/3} textAnchor="middle" fontSize={fs} fontWeight="700" fill={color}>{value}%</text>}
    </svg>
  )
}

export function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5 items-center">
      {Array.from({length: max}, (_, i) => {
        const filled = i + 1 <= Math.floor(rating)
        const half = !filled && i < rating
        return (
          <svg key={i} width="12" height="12" viewBox="0 0 24 24">
            {half && <defs><linearGradient id={`h${i}`}><stop offset="50%" stopColor="#FBBF24"/><stop offset="50%" stopColor="#E5E7EB"/></linearGradient></defs>}
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={filled ? '#FBBF24' : half ? `url(#h${i})` : '#E5E7EB'}/>
          </svg>
        )
      })}
    </div>
  )
}

export function Badge({ children, variant = 'default' }: { children: ReactNode; variant?: 'default'|'success'|'warning'|'info'|'danger' }) {
  const cls = {
    default: 'bg-gray-100 text-gray-600',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border border-amber-100',
    info: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    danger: 'bg-red-50 text-red-600 border border-red-100',
  }[variant]
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${cls}`}>{children}</span>
}

export function Button({ children, onClick, variant = 'primary', size = 'md', className = '', disabled = false }: {
  children: ReactNode; onClick?: () => void; variant?: 'primary'|'secondary'|'ghost'|'danger'; size?: 'sm'|'md'|'lg'; className?: string; disabled?: boolean
}) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-[0.98]'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm shadow-indigo-200',
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 focus:ring-indigo-300',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
    danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 focus:ring-red-300',
  }[variant]
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2 text-sm', lg: 'px-6 py-3 text-base' }[size]
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${base} ${variants} ${sizes} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      {children}
    </button>
  )
}

export function Card({ children, className = '', hover = false }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${hover ? 'hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function ProgressBar({ value, color = 'bg-indigo-500', label }: { value: number; color?: string; label?: string }) {
  return (
    <div>
      {label && <div className="flex justify-between text-xs mb-1"><span className="text-gray-600 font-medium">{label}</span><span className="text-gray-400">{value}/100</span></div>}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{width:`${value}%`}}/>
      </div>
    </div>
  )
}

export function Section({ title, action, onAction, children }: { title: string; action?: string; onAction?: () => void; children: ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {action && <button onClick={onAction} className="text-sm text-indigo-600 font-medium hover:text-indigo-800 transition-colors">{action}</button>}
      </div>
      {children}
    </div>
  )
}

export function EmptyState({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="text-5xl mb-3">{icon}</span>
      <p className="font-semibold text-gray-700">{title}</p>
      <p className="text-sm text-gray-400 mt-1 max-w-xs">{desc}</p>
    </div>
  )
}

export function Chip({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
      {children}
    </button>
  )
}

export function Tag({ children, color = 'gray' }: { children: ReactNode; color?: string }) {
  const colors: Record<string,string> = {
    gray: 'bg-gray-100 text-gray-700',
    indigo: 'bg-indigo-50 text-indigo-700',
    emerald: 'bg-emerald-50 text-emerald-700',
    amber: 'bg-amber-50 text-amber-700',
    blue: 'bg-blue-50 text-blue-700',
    violet: 'bg-violet-50 text-violet-700',
    red: 'bg-red-50 text-red-600',
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${colors[color] ?? colors.gray}`}>{children}</span>
}

export function Divider() {
  return <div className="border-t border-gray-100 my-4"/>
}

export function Tooltip({ children, tip }: { children: ReactNode; tip: string }) {
  return (
    <div className="relative group inline-flex">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        {tip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"/>
      </div>
    </div>
  )
}

export function Avatar({ name, size = 'md', color = 'indigo' }: { name: string; size?: 'sm'|'md'|'lg'; color?: string }) {
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase()
  const sizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' }[size]
  const colors: Record<string,string> = {
    indigo: 'bg-indigo-100 text-indigo-700',
    blue: 'bg-blue-100 text-blue-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    violet: 'bg-violet-100 text-violet-700',
    red: 'bg-red-100 text-red-700',
  }
  return (
    <div className={`${sizes} rounded-full ${colors[color]??colors.indigo} flex items-center justify-center font-bold flex-shrink-0`}>
      {initials}
    </div>
  )
}
