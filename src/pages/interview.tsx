import { useState } from 'react'
import { Card, Button, Badge, Tag, CircleProgress } from '../components/ui'

type Sub = 'overview' | 'mockExam' | 'mockInterview' | 'feedback'

export default function InterviewPage() {
  const [sub, setSub] = useState<Sub>('overview')

  if (sub === 'overview') return <InterviewOverview onSub={setSub} />
  if (sub === 'mockExam') return <MockExam onBack={() => setSub('overview')} />
  if (sub === 'mockInterview') return <MockInterview onBack={() => setSub('overview')} />
  if (sub === 'feedback') return <Feedback onBack={() => setSub('overview')} />
  return null
}

function InterviewOverview({ onSub }: { onSub: (s: Sub) => void }) {
  const recent = [
    { title: 'Mock Interview – Frontend Developer', score: 78, date: '2 days ago', sub: 'mockInterview' as Sub },
    { title: 'Mock Exam – React Basics', score: 82, date: '5 days ago', sub: 'mockExam' as Sub },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-6">
      <div>
        <h1 className="text-lg font-bold text-gray-900">Interview Prep</h1>
        <p className="text-sm text-gray-500 mt-0.5">Practice and improve your interview skills.</p>
      </div>

      <div className="space-y-3">
        {[
          { icon: '📋', title: 'Mock Exams', sub: 'mockExam' as Sub, desc: 'Practice DSA, JavaScript, React and other concepts.', color: 'text-indigo-600 bg-indigo-50' },
          { icon: '🎤', title: 'Mock Interviews', sub: 'mockInterview' as Sub, desc: '1:1 AI interviews based on your target role and experience.', color: 'text-violet-600 bg-violet-50' },
          { icon: '📊', title: 'Feedback', sub: 'feedback' as Sub, desc: 'View your performance and get AI-powered improvement tips.', color: 'text-emerald-600 bg-emerald-50' },
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

      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3">Your Recent Activity</h2>
        <Card className="divide-y divide-gray-100">
          {recent.map(r => (
            <div key={r.title} className="flex items-center gap-4 p-4">
              <CircleProgress value={r.score} size={48} color={r.score >= 80 ? '#059669' : '#4338CA'} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{r.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">Score: {r.score}% · {r.date}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onSub(r.sub)}>View</Button>
            </div>
          ))}
          <div className="p-4 text-center">
            <button className="text-sm text-indigo-600 font-semibold hover:underline">View all activity →</button>
          </div>
        </Card>
      </div>
    </div>
  )
}

function MockExam({ onBack }: { onBack: () => void }) {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number|null>(null)
  const [submitted, setSubmitted] = useState(false)

  const questions = [
    {
      q: 'Which hook is used to manage side effects in React?',
      opts: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correct: 1
    },
    {
      q: 'What does the "key" prop help React identify?',
      opts: ['Component type', 'DOM elements uniquely', 'Props changes', 'State updates'],
      correct: 1
    },
  ]

  const q = questions[current]

  if (!started) return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Mock Exam</h1>
      </div>
      <Card className="p-6">
        <div className="text-center">
          <span className="text-5xl">📋</span>
          <h2 className="text-lg font-bold text-gray-900 mt-4">React Fundamentals</h2>
          <p className="text-sm text-gray-500 mt-2">20 questions · 30 minutes · Multiple choice</p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[['Questions','20'],['Time','30 min'],['Topics','React, JS']].map(([l,v])=>(
              <div key={l} className="bg-indigo-50 rounded-xl p-3">
                <p className="text-lg font-bold text-indigo-600">{v}</p>
                <p className="text-xs text-gray-500 mt-0.5">{l}</p>
              </div>
            ))}
          </div>
          <Button variant="primary" className="mt-6 w-full justify-center" size="lg" onClick={() => setStarted(true)}>
            Start Exam
          </Button>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <span className="text-sm font-semibold text-gray-600">Question {current+1} of {questions.length}</span>
        </div>
        <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">28:45</span>
      </div>

      {/* Progress */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 rounded-full transition-all" style={{width:`${((current+1)/questions.length)*100}%`}}/>
      </div>

      <Card className="p-6">
        <p className="text-base font-semibold text-gray-900 leading-relaxed mb-5">{q.q}</p>
        <div className="space-y-3">
          {q.opts.map((opt, i) => {
            let cls = 'border border-gray-200 text-gray-700 hover:border-indigo-400 hover:bg-indigo-50'
            if (submitted && i === q.correct) cls = 'border-emerald-400 bg-emerald-50 text-emerald-700'
            else if (submitted && selected === i && i !== q.correct) cls = 'border-red-400 bg-red-50 text-red-600'
            else if (!submitted && selected === i) cls = 'border-indigo-500 bg-indigo-50 text-indigo-700'
            return (
              <button key={i} onClick={() => !submitted && setSelected(i)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${cls}`}>
                <span className="font-bold mr-2">{String.fromCharCode(65+i)}.</span>{opt}
              </button>
            )
          })}
        </div>
        <div className="flex justify-between mt-6">
          {!submitted ? (
            <Button variant="primary" disabled={selected === null} onClick={() => setSubmitted(true)}>Submit Answer</Button>
          ) : (
            <Button variant="primary" onClick={() => {
              if (current < questions.length - 1) { setCurrent(c=>c+1); setSelected(null); setSubmitted(false) }
              else onBack()
            }}>
              {current < questions.length - 1 ? 'Next Question' : 'Finish Exam'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

function MockInterview({ onBack }: { onBack: () => void }) {
  const [started, setStarted] = useState(false)
  const [qIdx, setQIdx] = useState(0)
  const [answer, setAnswer] = useState('')

  const questions = [
    'Tell me about yourself and your experience with React.',
    'How do you handle state management in large React applications?',
    'Describe a challenging project you worked on and how you overcame obstacles.',
  ]

  if (!started) return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">Mock Interview</h1>
      </div>
      <Card className="p-6 text-center">
        <span className="text-5xl">🎤</span>
        <h2 className="text-lg font-bold text-gray-900 mt-4">Frontend Developer Interview</h2>
        <p className="text-sm text-gray-500 mt-2">AI-powered · 1:1 Interview simulation · {questions.length} questions</p>
        <div className="mt-5 p-4 bg-indigo-50 rounded-xl text-left">
          <p className="text-sm font-semibold text-indigo-800 mb-2">Topics covered:</p>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'JavaScript', 'Problem Solving', 'System Design', 'Behavioral'].map(t=>(
              <span key={t} className="text-xs bg-white text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded-lg font-medium">{t}</span>
            ))}
          </div>
        </div>
        <Button variant="primary" className="mt-5 w-full justify-center" size="lg" onClick={() => setStarted(true)}>
          Start Interview
        </Button>
      </Card>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <span className="text-sm font-semibold text-gray-600">Question {qIdx+1} of {questions.length}</span>
        </div>
        <span className="text-xs bg-red-50 text-red-500 font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"/>LIVE
        </span>
      </div>

      {/* AI avatar */}
      <Card className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">AI</div>
          <div className="flex-1 bg-indigo-50 rounded-2xl p-4">
            <p className="text-sm text-gray-800 leading-relaxed">{questions[qIdx]}</p>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <p className="text-xs font-semibold text-gray-500 mb-2">Your answer</p>
        <textarea value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Type your answer here, or use voice input..."
          className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 h-32"/>
        <div className="flex justify-between items-center mt-3">
          <button className="flex items-center gap-2 text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
            Use voice
          </button>
          <Button variant="primary" disabled={!answer.trim()} onClick={() => {
            if (qIdx < questions.length - 1) { setQIdx(q=>q+1); setAnswer('') } else onBack()
          }}>
            {qIdx < questions.length - 1 ? 'Submit & Next' : 'Finish Interview'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

function Feedback({ onBack }: { onBack: () => void }) {
  const metrics = [
    { label: 'Communication', value: 82, color: 'from-indigo-400 to-indigo-600' },
    { label: 'Technical Depth', value: 74, color: 'from-violet-400 to-violet-600' },
    { label: 'Problem Solving', value: 88, color: 'from-blue-400 to-blue-600' },
    { label: 'Confidence', value: 76, color: 'from-emerald-400 to-emerald-600' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        </button>
        <h1 className="text-lg font-bold text-gray-900">AI Feedback</h1>
      </div>

      <Card className="p-5 text-center">
        <CircleProgress value={78} size={88} color="#4338CA"/>
        <p className="text-xl font-bold text-gray-900 mt-3">Overall Score: 78%</p>
        <p className="text-sm text-gray-500 mt-1">Mock Interview – Frontend Developer · 2 days ago</p>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4">Performance Breakdown</h3>
        <div className="space-y-4">
          {metrics.map(m => (
            <div key={m.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="font-semibold text-gray-700">{m.label}</span>
                <span className="text-gray-400">{m.value}%</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${m.color} rounded-full`} style={{width:`${m.value}%`}}/>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-3">AI Recommendations</h3>
        <div className="space-y-2.5">
          {[
            { icon: '✅', text: 'Strong React fundamentals demonstrated with clear component examples.' },
            { icon: '💡', text: 'Practice explaining state management with more concrete use cases.' },
            { icon: '📈', text: 'Work on system design vocabulary — mention scalability patterns.' },
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
              <span className="text-base flex-shrink-0">{tip.icon}</span>
              <p className="text-xs text-gray-700">{tip.text}</p>
            </div>
          ))}
        </div>
        <Button variant="primary" className="mt-4 w-full justify-center" size="sm">Practice Again</Button>
      </Card>
    </div>
  )
}
