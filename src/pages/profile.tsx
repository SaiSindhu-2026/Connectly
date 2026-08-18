import { useState } from 'react'
import { Card, StarRating, Badge, Button, CircleProgress, Tag, Divider } from '../components/ui'

type Tab = 'about' | 'skills' | 'experience' | 'education' | 'projects'

const TABS: Tab[] = ['about', 'skills', 'experience', 'education', 'projects']

const SKILLS = ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'REST API']

const SKILL_RATINGS = [
  { name: 'React', rating: 4.5 },
  { name: 'JavaScript', rating: 4.5 },
  { name: 'TypeScript', rating: 4.0 },
  { name: 'HTML/CSS', rating: 5.0 },
  { name: 'REST APIs', rating: 4.0 },
]

export default function ProfilePage() {
  const [tab, setTab] = useState<Tab>('about')
  const [editing, setEditing] = useState(false)

  return (
    <div className="max-w-2xl mx-auto px-6 py-7 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
        <Button variant="secondary" size="sm" onClick={() => setEditing(!editing)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          {editing ? 'Done' : 'Edit Profile'}
        </Button>
      </div>

      {/* Profile card */}
      <Card className="overflow-hidden">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-indigo-700 via-indigo-500 to-violet-500 relative">
          <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)'}}/>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 border-4 border-white shadow-lg flex items-center justify-center text-xl font-bold text-indigo-700 flex-shrink-0">
              S
            </div>
            <div className="flex items-center gap-3 mb-1">
              <div className="text-right">
                <p className="text-[11px] text-gray-400">Profile Strength</p>
                <div className="flex items-center gap-2 justify-end">
                  <CircleProgress value={36} size={44} />
                  <div>
                    <p className="text-lg font-bold text-indigo-600">36%</p>
                    <p className="text-[11px] text-amber-500 font-semibold">Good</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-900">Sai Sindhu</h2>
              <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <p className="text-sm text-indigo-600 font-medium mt-0.5">Frontend Developer</p>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Hyderabad, India
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              sai.sindhu@email.com
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.67a19.79 19.79 0 01-3.07-8.72A2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              +91 98765 43210
            </div>
          </div>

          <div className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-sm text-gray-600 leading-relaxed">
              Passionate frontend developer with strong problem-solving skills and love for building beautiful and user-friendly web applications.
            </p>
          </div>

          {editing && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              💡 Complete your profile to increase your visibility to recruiters!
            </div>
          )}
        </div>
      </Card>

      {/* Strength progress bar */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-800">Profile Strength</h3>
          <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded-full">Good</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700" style={{width:'36%'}}/>
        </div>
        <p className="text-xs text-gray-400 mt-2">Add skills and experience to reach <span className="font-semibold text-indigo-600">Expert</span> status.</p>
      </Card>

      {/* Tabs */}
      <Card className="overflow-hidden">
        <div className="flex border-b border-gray-100 overflow-x-auto no-scrollbar">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-[1px] capitalize ${tab === t ? 'text-indigo-600 border-indigo-600' : 'text-gray-500 border-transparent hover:text-gray-700'}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === 'about' && <AboutTab />}
          {tab === 'skills' && <SkillsTab />}
          {tab === 'experience' && <ExperienceTab />}
          {tab === 'education' && <EducationTab />}
          {tab === 'projects' && <ProjectsTab />}
        </div>
      </Card>
    </div>
  )
}

function AboutTab() {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(s => (
            <span key={s} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-lg border border-indigo-100">{s}</span>
          ))}
        </div>
      </div>
      <Divider/>
      <div>
        <h3 className="text-sm font-bold text-gray-800 mb-3">Skill Ratings</h3>
        <div className="space-y-3">
          {SKILL_RATINGS.map(s => (
            <div key={s.name} className="flex items-center justify-between">
              <p className="text-sm text-gray-700">{s.name}</p>
              <div className="flex items-center gap-2">
                <StarRating rating={s.rating}/>
                <span className="text-xs text-gray-400 w-6">{s.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SkillsTab() {
  const skills = [
    { name: 'React', level: 90, color: 'from-indigo-400 to-indigo-600' },
    { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-amber-500' },
    { name: 'TypeScript', level: 72, color: 'from-blue-400 to-blue-600' },
    { name: 'HTML/CSS', level: 95, color: 'from-orange-400 to-red-500' },
    { name: 'Tailwind CSS', level: 88, color: 'from-cyan-400 to-teal-500' },
    { name: 'REST APIs', level: 80, color: 'from-violet-400 to-violet-600' },
  ]
  return (
    <div className="space-y-5">
      {skills.map(s => (
        <div key={s.name}>
          <div className="flex justify-between mb-1.5">
            <span className="text-sm font-semibold text-gray-700">{s.name}</span>
            <span className="text-xs text-gray-400 font-medium">{s.level}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-700`} style={{width:`${s.level}%`}}/>
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperienceTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-base flex-shrink-0 font-bold text-blue-600">A</div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">Frontend Developer Intern</p>
              <p className="text-xs text-gray-500 mt-0.5">XYZ Startup</p>
            </div>
            <Tag color="gray">Jun 2023 – Dec 2023</Tag>
          </div>
          <ul className="mt-3 space-y-1.5 text-xs text-gray-600">
            <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">▸</span>Built responsive web applications using React and Tailwind CSS</li>
            <li className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">▸</span>Worked on REST APIs and state management</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function EducationTab() {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-base flex-shrink-0 font-bold text-indigo-600">U</div>
      <div>
        <p className="text-sm font-bold text-gray-900">B.Tech in Computer Science</p>
        <p className="text-xs text-gray-500 mt-0.5">ABC University</p>
        <Tag color="gray" >2020 – 2024</Tag>
      </div>
    </div>
  )
}

function ProjectsTab() {
  const projects = [
    { name: 'Portfolio Website', tech: 'React · CSS', desc: 'Personal portfolio showcasing projects and skills.' },
    { name: 'Todo App', tech: 'React · Firebase', desc: 'Full-stack task manager with authentication.' },
  ]
  return (
    <div className="space-y-4">
      {projects.map(p => (
        <div key={p.name} className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors">
          <div className="flex items-start justify-between">
            <p className="text-sm font-bold text-gray-900">{p.name}</p>
            <Tag color="indigo">{p.tech}</Tag>
          </div>
          <p className="text-xs text-gray-500 mt-1.5">{p.desc}</p>
        </div>
      ))}
    </div>
  )
}
