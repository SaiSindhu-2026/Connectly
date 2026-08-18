import { useState } from 'react'
import { Card, Button, Avatar, Tag, Badge } from '../components/ui'

const EXPERIENCES = [
  {
    id: 1, author: 'Gopal R', time: '3 days ago', tag: 'General Discussion',
    title: 'Frontend Developer Interview Experience',
    body: 'Round 1: Online Assessment – Round 2: Technical – Coding – Round 3: HR Interview',
    helpful: 125, comments: 5, saved: false, color: 'emerald',
  },
  {
    id: 2, author: 'Meena S', time: '5 days ago', tag: 'General Discussion',
    title: 'React Developer Interview Experience',
    body: 'They asked mostly about React hooks, state management, component lifecycle and some real-world scenarios.',
    helpful: 96, comments: 2, saved: false, color: 'blue',
  },
  {
    id: 3, author: 'Arjun K', time: '1 week ago', tag: 'General Discussion',
    title: 'Frontend Developer Interview Experience',
    body: 'Questions on JavaScript, DOM, CSS Flexbox, and a small coding problem.',
    helpful: 74, comments: 3, saved: false, color: 'amber',
  },
]

const FILTER_TABS = ['Latest', 'Most Helpful', 'By Company', 'By Role']

export default function ExperiencesPage() {
  const [filter, setFilter] = useState('Latest')
  const [search, setSearch] = useState('')
  const [experiences, setExperiences] = useState(EXPERIENCES)
  const [showShare, setShowShare] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', body: '' })

  const filtered = experiences.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.body.toLowerCase().includes(search.toLowerCase())
  )

  const toggleSave = (id: number) => setExperiences(prev => prev.map(e => e.id === id ? {...e, saved: !e.saved} : e))
  const toggleHelpful = (id: number) => setExperiences(prev => prev.map(e => e.id === id ? {...e, helpful: e.helpful + 1} : e))

  const submitPost = () => {
    if (!newPost.title.trim()) return
    setExperiences(prev => [{
      id: prev.length + 1, author: 'Sai Sindhu', time: 'Just now', tag: 'General Discussion',
      title: newPost.title, body: newPost.body, helpful: 0, comments: 0, saved: false, color: 'indigo'
    }, ...prev])
    setNewPost({ title: '', body: '' })
    setShowShare(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Interview Experiences</h1>
          <p className="text-sm text-gray-500 mt-0.5">Real experiences shared by candidates</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowShare(!showShare)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Share
        </Button>
      </div>

      {showShare && (
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-3">Share Your Experience</h3>
          <input value={newPost.title} onChange={e => setNewPost(p=>({...p, title: e.target.value}))}
            placeholder="Title: e.g. 'Frontend Developer at Google'"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-3"/>
          <textarea value={newPost.body} onChange={e => setNewPost(p=>({...p, body: e.target.value}))}
            placeholder="Share your interview process, questions asked, tips..."
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none h-24 mb-3"/>
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={submitPost} disabled={!newPost.title.trim()}>Post</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowShare(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* Search & filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search company or role..."
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Filters
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {FILTER_TABS.map(t => (
          <button key={t} onClick={() => setFilter(t)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${filter === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Experience cards */}
      <div className="space-y-4">
        {filtered.map(exp => (
          <Card key={exp.id} className="p-5 hover:border-indigo-100 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar name={exp.author} color={exp.color as any}/>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{exp.author}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Tag color="indigo">{exp.tag}</Tag>
                    <span className="text-[11px] text-gray-400">{exp.time}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => toggleSave(exp.id)} className="text-gray-400 hover:text-indigo-600 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill={exp.saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={exp.saved ? 'text-indigo-600' : ''}>
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                </svg>
              </button>
            </div>
            <p className="text-sm font-bold text-gray-900 mb-1.5">{exp.title}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{exp.body}</p>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <button onClick={() => toggleHelpful(exp.id)} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 transition-colors font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>
                Helpful · {exp.helpful}
              </button>
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 transition-colors font-medium">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                {exp.comments} Comments
              </button>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">🔍</span>
            <p className="text-sm text-gray-500 mt-3">No experiences found for "{search}"</p>
          </div>
        )}
      </div>

      <button className="w-full text-center text-sm text-indigo-600 font-semibold hover:underline">View all experiences →</button>
    </div>
  )
}
