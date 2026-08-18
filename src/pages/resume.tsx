import { useState } from 'react'
import { Card, Button, CircleProgress, Badge, ProgressBar, Tag, Section, Divider } from '../components/ui'
import type { Page } from '../App'

type SubPage = 'overview' | 'check' | 'suggestions' | 'ats'

export default function ResumePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [sub, setSub] = useState<SubPage>('overview')
  const [jd, setJd] = useState('')
  const [jdSubmitted, setJdSubmitted] = useState(false)

  if (sub === 'overview') return <ResumeOverview onSub={setSub} />
  if (sub === 'check') return <ResumeCheck onBack={() => setSub('overview')} onGoSuggestions={() => setSub('suggestions')} />
  if (sub === 'suggestions') return <ResumeSuggestions onBack={() => setSub('overview')} />
  if (sub === 'ats') return <ATSChecker onBack={() => setSub('overview')} />
  return null
}

function ResumeOverview({ onSub }: { onSub: (s: SubPage) => void }) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-6">
      <h1 className="text-lg font-bold text-gray-900">My Resume</h1>

      <Card className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Sai_Sindhu_Resume.pdf</p>
            <p className="text-xs text-gray-400 mt-0.5">Uploaded on 20 May 2024</p>
          </div>
          <Button variant="secondary" size="sm">Replace Resume</Button>
        </div>
      </Card>

      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3">Choose what you want to do</h2>
        <div className="space-y-3">
          {[
            {
              icon: '✅', title: 'Resume Check (Match with JD)', sub: 'check' as SubPage,
              desc: 'Check how well your resume matches a job description.',
              color: 'text-indigo-600 bg-indigo-50'
            },
            {
              icon: '✏️', title: 'Resume Suggestions', sub: 'suggestions' as SubPage,
              desc: 'Get AI-powered suggestions to improve your resume based on the job.',
              color: 'text-emerald-600 bg-emerald-50'
            },
            {
              icon: '🎯', title: 'ATS Score Checker', sub: 'ats' as SubPage,
              desc: 'Check your resume ATS score and get improvement tips.',
              color: 'text-violet-600 bg-violet-50'
            },
          ].map(item => (
            <button key={item.title} onClick={() => onSub(item.sub)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all text-left group">
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${item.color} flex-shrink-0`}>{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3">
        <span className="text-lg mt-0.5">💡</span>
        <p className="text-sm text-indigo-700">Tip: Add a job description to get the most accurate results.</p>
      </div>
    </div>
  )
}

function ResumeCheck({ onBack, onGoSuggestions }: { onBack: () => void; onGoSuggestions: () => void }) {
  const [jd, setJd] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)

  const analyze = () => {
    if (!jd.trim()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setAnalyzed(true) }, 1200)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Resume Check</h1>
      </div>

      {/* JD Input */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-gray-800">Frontend Developer</p>
          <button className="text-xs text-indigo-600 font-semibold hover:underline">Edit JD</button>
        </div>
        <div className="flex gap-2 mb-2">
          {['Resume', 'Resume Check'].map((t,i) => (
            <span key={t} className={`text-xs px-3 py-1 rounded-full font-semibold ${i===1 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{t}</span>
          ))}
        </div>
        {!analyzed && (
          <>
            <textarea value={jd} onChange={e => setJd(e.target.value)} placeholder="Paste job description here..."
              className="w-full mt-3 p-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 h-28" />
            <Button variant="primary" className="mt-3 w-full justify-center" onClick={analyze} disabled={loading || !jd.trim()}>
              {loading ? 'Analyzing...' : 'Analyze Match'}
            </Button>
          </>
        )}
      </Card>

      {analyzed && (
        <>
          {/* Score overview */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-5 text-center">
              <p className="text-xs text-gray-400 mb-2 font-medium">Overall Match</p>
              <CircleProgress value={92} size={80} color="#059669"/>
              <p className="text-sm font-bold text-emerald-600 mt-2">Great Match! 🔥</p>
              <p className="text-xs text-gray-500 mt-1">Your resume is well aligned</p>
            </Card>
            <div className="space-y-3">
              {[
                { label: 'Experience Match', value: 90, color: '#4338CA' },
                { label: 'Skills Match', value: 93, color: '#7C3AED' },
                { label: 'Education Match', value: 100, color: '#059669' },
              ].map(m => (
                <Card key={m.label} className="p-3 text-center">
                  <CircleProgress value={m.value} size={44} color={m.color}/>
                  <p className="text-[10px] text-gray-400 mt-1 font-medium">{m.label}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Key Strengths */}
          <Card className="p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Key Strengths</h3>
            <div className="space-y-2">
              {['React', 'JavaScript', 'HTML/CSS', 'REST APIs', 'Git & GitHub'].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  <span className="text-sm text-gray-700">{s}</span>
                </div>
              ))}
              <div className="text-xs text-indigo-600 font-semibold mt-1">+ 4 more</div>
            </div>
          </Card>

          {/* What's next */}
          <Card className="p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-2">What's Next?</h3>
            <p className="text-sm text-gray-500 mb-4">Your resume has a great match! You can still improve some skills to make it even better.</p>
            <Button variant="primary" size="sm" onClick={onGoSuggestions}>View Suggestions</Button>
          </Card>
        </>
      )}
    </div>
  )
}

function ResumeSuggestions({ onBack }: { onBack: () => void }) {
  const [activeFilter, setActiveFilter] = useState('All Suggestions')
  const filters = ['All Suggestions (8)', 'Content (5)', 'Skills (2)', 'Formatting (2)']
  const suggestions = [
    { id: 1, priority: 'High', title: 'Improve Project Description', current: 'Built a web application using React.', suggested: 'Built a responsive web application using React that improved user engagement by 30%.', impact: 'high' },
    { id: 2, priority: 'Medium', title: 'Add Missing Skills', desc: 'Consider adding these skills if you have experience:', skills: ['TypeScript', 'Redux Toolkit', 'Jest', 'Next.js'], impact: 'medium' },
    { id: 3, priority: 'Medium', title: 'Enhance Summary', desc: 'Make your summary more role-specific.', impact: 'medium' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Resume Suggestions</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeFilter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {suggestions.map((s, idx) => (
          <Card key={s.id} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center">{idx+1}</span>
                <p className="text-sm font-bold text-gray-900">{s.title}</p>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${s.impact === 'high' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                {s.priority} Impact
              </span>
            </div>
            {s.current && (
              <>
                <div className="p-3 bg-red-50 rounded-xl border border-red-100 mb-2">
                  <p className="text-[11px] text-red-500 font-semibold mb-1">Current</p>
                  <p className="text-xs text-gray-600">{s.current}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 mb-3">
                  <p className="text-[11px] text-emerald-600 font-semibold mb-1">Suggested</p>
                  <p className="text-xs text-gray-600">{s.suggested}</p>
                </div>
              </>
            )}
            {s.skills && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {s.skills.map(sk => <span key={sk} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-lg font-medium">{sk}</span>)}
              </div>
            )}
            {s.desc && !s.skills && <p className="text-xs text-gray-500 mb-3">{s.desc}</p>}
            <div className="flex gap-2">
              <Button variant="primary" size="sm">Apply</Button>
              <Button variant="ghost" size="sm">Ignore</Button>
            </div>
          </Card>
        ))}
        <button className="text-sm text-indigo-600 font-semibold hover:underline">View all suggestions →</button>
      </div>
    </div>
  )
}

function ATSChecker({ onBack }: { onBack: () => void }) {
  const breakdown = [
    { label: 'Keywords', value: 88, color: 'bg-indigo-500' },
    { label: 'Formatting', value: 82, color: 'bg-violet-500' },
    { label: 'Skills', value: 80, color: 'bg-blue-500' },
    { label: 'Readability', value: 85, color: 'bg-emerald-500' },
    { label: 'Experience', value: 84, color: 'bg-amber-500' },
  ]
  const issues = [
    { icon: '⚠️', text: 'Use of icons and multiple columns may confuse ATS systems.' },
    { icon: '💡', text: 'Add more relevant keywords from the job description.' },
    { icon: '📋', text: 'Ensure consistent date formats.' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">ATS Score Checker</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 text-center">
          <p className="text-sm font-semibold text-gray-600 mb-3">Your ATS Score</p>
          <CircleProgress value={84} size={96} color="#4338CA"/>
          <p className="text-lg font-bold text-indigo-600 mt-2">Good</p>
          <p className="text-xs text-gray-400 mt-1">Your resume is ATS-friendly. A few improvements can make it even better.</p>
        </Card>

        <Card className="p-5">
          <p className="text-sm font-bold text-gray-800 mb-4">Score Breakdown</p>
          <div className="space-y-3">
            {breakdown.map(b => (
              <div key={b.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{b.label}</span>
                  <span className="text-gray-400 font-semibold">{b.value}/100</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${b.color} rounded-full`} style={{width:`${b.value}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Issues Found</h3>
        <div className="space-y-2.5">
          {issues.map((iss, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
              <span className="text-sm mt-0.5">{iss.icon}</span>
              <p className="text-xs text-gray-600">{iss.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">Improve Your Score</h3>
        <div className="flex gap-2">
          <Button variant="primary" size="sm">View Suggestions</Button>
          <Button variant="secondary" size="sm">Re-check Score</Button>
        </div>
        <p className="text-[11px] text-gray-400 mt-3">💡 Keep your resume simple and keyword-rich for better results.</p>
      </Card>
    </div>
  )
}
