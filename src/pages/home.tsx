import { useState } from 'react'
import { Card, Section, CircleProgress, Button } from '../components/ui'
import type { Page } from '../App'

const EXPLORE_ITEMS = [
  { icon: '📄', title: 'Resume Check', desc: 'Check your resume with any job description', page: 'resume' as Page, color: 'text-indigo-600 bg-indigo-50' },
  { icon: '💬', title: 'Interview Experiences', desc: 'Read real experiences from candidates', page: 'experiences' as Page, color: 'text-violet-600 bg-violet-50' },
  { icon: '🗺️', title: 'Roadmaps', desc: 'Personalized roadmap to crack your target role', page: 'roadmaps' as Page, color: 'text-blue-600 bg-blue-50' },
  { icon: '📚', title: 'Suggested Courses', desc: 'Courses recommended to build your skills', page: 'courses' as Page, color: 'text-emerald-600 bg-emerald-50' },
]

export default function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [resumeScore] = useState(76)

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-gray-900">Hello, Sai! 👋</h1>
          <p className="text-sm text-gray-500 mt-0.5">Let's take a step closer to your dream role.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"/>
          </button>
          <button onClick={() => onNavigate('profile')} className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm hover:bg-indigo-700 transition-colors">
            S
          </button>
        </div>
      </div>

      {/* Continue Preparation */}
      <Section title="Continue your preparation">
        <Card className="overflow-hidden">
          <div className="p-5 flex items-start gap-4 border-b border-gray-100">
            <div className="flex-shrink-0 flex flex-col items-center">
              <CircleProgress value={resumeScore} size={68} />
              <p className="text-[10px] text-gray-400 mt-1.5 font-medium">Last score</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">Mock Interview – Frontend Developer</p>
              <p className="text-xs text-gray-500 mt-0.5 mb-4">React · JavaScript · CSS · Node.js</p>
              <div className="flex gap-2">
                <Button variant="primary" size="sm" onClick={() => onNavigate('interview')}>Continue</Button>
                <Button variant="secondary" size="sm">View Feedback</Button>
              </div>
            </div>
          </div>
          {[
            { icon: '📋', label: 'Take Mock Exam', sub: 'Practice DSA, JS, React', page: 'interview' as Page },
            { icon: '👁️', label: 'View Feedback', sub: 'Improve your performance', page: 'interview' as Page },
          ].map(item => (
            <button key={item.label} onClick={() => onNavigate(item.page)}
              className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-indigo-50/50 transition-colors border-b border-gray-100 last:border-0 text-left group">
              <span className="text-base w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700 transition-colors">{item.label}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </Card>
      </Section>

      {/* Progress Stats */}
      <Section title="Your progress">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Resumes', value: '1', sub: 'Active', icon: '📄', color: '#4338CA' },
            { label: 'Mock Interviews', value: '3', sub: 'Completed', icon: '🎤', color: '#7C3AED' },
            { label: 'Exams', value: '2', sub: 'Completed', icon: '📋', color: '#059669' },
          ].map(s => (
            <Card key={s.label} className="p-4 text-center hover:border-indigo-200 transition-colors">
              <span className="text-2xl">{s.icon}</span>
              <p className="text-2xl font-bold mt-1" style={{color: s.color}}>{s.value}</p>
              <p className="text-[11px] font-semibold text-gray-500">{s.label}</p>
              <p className="text-[11px] text-gray-400">{s.sub}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Explore */}
      <Section title="Explore">
        <Card className="divide-y divide-gray-100">
          {EXPLORE_ITEMS.map(item => (
            <button key={item.title} onClick={() => onNavigate(item.page)}
              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-indigo-50/40 transition-colors text-left group">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${item.color} flex-shrink-0`}>{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">{item.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </Card>
      </Section>
    </div>
  )
}
