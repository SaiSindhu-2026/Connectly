import { useState } from 'react'
import { Card, Button, StarRating, Tag, Badge } from '../components/ui'

const ROLES = ['React Developer', 'Full Stack', 'Frontend', 'Backend', 'DevOps']

const COURSES = [
  {
    id: 1, emoji: '⚛️', title: 'React – The Complete Guide', provider: 'Udemy', level: 'Beginner to Advanced',
    hours: 48, rating: 4.8, color: 'bg-gray-900 text-white', tag: 'Top Pick',
  },
  {
    id: 2, emoji: '🔢', title: 'JavaScript Algorithms and Data Structures', provider: 'BootCamp', level: 'Intermediate',
    hours: 300, rating: 4.8, color: 'bg-yellow-400 text-gray-900', tag: 'Popular',
  },
  {
    id: 3, emoji: '⚡', title: 'React Query – The Complete Guide', provider: 'Udemy', level: 'Intermediate',
    hours: 12, rating: 4.5, color: 'bg-violet-500 text-white', tag: null,
  },
  {
    id: 4, emoji: '🌿', title: 'Node.js – Basics to Advanced', provider: 'Coursera', level: 'Beginner',
    hours: 24, rating: 4.6, color: 'bg-emerald-500 text-white', tag: 'New',
  },
  {
    id: 5, emoji: '🎨', title: 'CSS Mastery: Flexbox & Grid', provider: 'Frontend Masters', level: 'Intermediate',
    hours: 8, rating: 4.7, color: 'bg-pink-500 text-white', tag: null,
  },
]

export default function CoursesPage() {
  const [role, setRole] = useState('React Developer')
  const [tab, setTab] = useState<'forYou'|'all'>('forYou')
  const [saved, setSaved] = useState<Set<number>>(new Set())

  const toggle = (id: number) => setSaved(prev => {
    const n = new Set(prev)
    n.has(id) ? n.delete(id) : n.add(id)
    return n
  })

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Suggested Courses</h1>
          <p className="text-sm text-gray-500 mt-0.5">Courses recommended to build the right skills</p>
        </div>
        <select value={role} onChange={e => setRole(e.target.value)}
          className="text-sm text-indigo-600 font-semibold border border-indigo-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-indigo-50 appearance-none pr-7">
          {ROLES.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(['forYou', 'all'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-1.5 text-sm font-semibold rounded-lg transition-all ${tab === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t === 'forYou' ? 'For You' : 'Browse All'}
          </button>
        ))}
      </div>

      {/* Course list */}
      <div className="space-y-4">
        {COURSES.map(course => (
          <Card key={course.id} className="p-4 hover:border-indigo-200 transition-all hover:shadow-md group">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl ${course.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-sm`}>
                {course.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-700 transition-colors leading-snug">{course.title}</p>
                  <button onClick={() => toggle(course.id)} className="flex-shrink-0 text-gray-400 hover:text-indigo-600 transition-colors mt-0.5">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={saved.has(course.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={saved.has(course.id) ? 'text-indigo-600' : ''}>
                      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-gray-500">{course.provider}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-500">{course.level}</span>
                  <span className="text-gray-300">·</span>
                  <span className="text-xs text-gray-500">{course.hours} hours</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <StarRating rating={course.rating}/>
                  <span className="text-xs font-bold text-gray-700">{course.rating}</span>
                  {course.tag && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      course.tag === 'Top Pick' ? 'bg-amber-50 text-amber-600' :
                      course.tag === 'Popular' ? 'bg-indigo-50 text-indigo-600' :
                      'bg-emerald-50 text-emerald-600'
                    }`}>{course.tag}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button variant="secondary" size="sm">View Course</Button>
            </div>
          </Card>
        ))}
      </div>

      <button className="w-full text-center text-sm text-indigo-600 font-semibold hover:underline">View more courses →</button>
    </div>
  )
}
