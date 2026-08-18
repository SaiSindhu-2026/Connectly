import { useState } from 'react'
import React from 'react'

import HomePage from './Home/HomePage'
import ProfilePage from './Profile/ProfilePage'
import ResumePage from './Resume/ResumePage'
import InterviewPage from './Interview/InterviewPage'

import ExperiencesPage, {
  INITIAL_EXPERIENCES,
} from './Experiences/ExperiencesPage'

import type { Experience } from './Experiences/ExperiencesPage'

import BookmarkPage from './Bookmark/BookmarkPage'

import RoadmapsPage from './Roadmaps/RoadmapsPage'
import CoursesPage from './Courses/CoursesPage'

export type Page =
  | 'home'
  | 'profile'
  | 'resume'
  | 'interview'
  | 'experiences'
  | 'bookmarked'
  | 'roadmaps'
  | 'courses'
  | 'experience-detail'

const NAV: {
  id: Page
  label: string
  icon: (a: boolean) => React.ReactElement
}[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (a) => <HomeIco active={a} />,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: (a) => <ProfileIco active={a} />,
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: (a) => <ResumeIco active={a} />,
  },
  {
    id: 'interview',
    label: 'Interview Prep',
    icon: (a) => <InterviewIco active={a} />,
  },
  {
    id: 'experiences',
    label: 'Experiences',
    icon: (a) => <ExpIco active={a} />,
  },
  {
    id: 'roadmaps',
    label: 'Roadmaps',
    icon: (a) => <MapIco active={a} />,
  },
  {
    id: 'courses',
    label: 'Suggested Courses',
    icon: (a) => <CourseIco active={a} />,
  },
  {
    id: 'bookmarked',
    label: 'Bookmarks',
    icon: (a) => <BookmarkIco active={a} />,
  },
]

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const [mobileOpen, setMobileOpen] =
    useState(false)

  const [experiences, setExperiences] =
    useState<Experience[]>(INITIAL_EXPERIENCES)

  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null)

  const navigate = (p: Page) => {
    setPage(p)
    setMobileOpen(false)
  }

  const openExperience = (experience: Experience) => {
    setSelectedExperience(experience)
    setPage('experience-detail')
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: '#F4F6FB' }}
    >
      {/* Mobile overlay */}

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`fixed lg:relative z-30 top-0 left-0 h-full w-56 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ${
          mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}

        <div className="px-5 py-5 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
            >
              <circle
                cx="10"
                cy="10"
                r="4"
                fill="white"
              />

              <circle
                cx="10"
                cy="10"
                r="8"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
            </svg>
          </div>

          <span className="text-[17px] font-extrabold text-gray-900 tracking-tight">
            Connectly
          </span>
        </div>

        {/* Navigation */}

        <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
          {NAV.map(({ id, label, icon }) => {
            const active = page === id

            return (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  active
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`}
              >
                {icon(active)}

                <span>{label}</span>

                {active && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Profile */}

        <div className="px-4 py-4 border-t border-gray-100">
          <button
            onClick={() => navigate('profile')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors group"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              S
            </div>

            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-bold text-gray-800 truncate">
                Sai Sindhu
              </p>

              <p className="text-[11px] text-gray-400 truncate">
                Frontend Developer
              </p>
            </div>
          </button>

          <div className="mt-2 flex gap-1">
            <button className="flex-1 flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50">
              Settings
            </button>

            <button className="flex-1 flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-red-50 hover:text-red-500">
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}

      <main className="flex-1 overflow-y-auto relative">
        {/* Mobile header */}

        <div className="lg:hidden sticky top-0 z-10 bg-white border-b border-gray-100 flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600"
          >
            ☰
          </button>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center">
              <span className="text-white text-xs">
                C
              </span>
            </div>

            <span className="font-extrabold text-gray-900 text-sm">
              Connectly
            </span>
          </div>
        </div>

        <div
          className="animate-in fade-in duration-200"
          key={page}
        >
          {page === 'home' && (
            <HomePage onNavigate={navigate} />
          )}

          {page === 'profile' && (
            <ProfilePage />
          )}

          {page === 'resume' && (
            <ResumePage onNavigate={navigate} />
          )}

          {page === 'interview' && (
            <InterviewPage />
          )}

          {page === 'experiences' && (
            <ExperiencesPage
              experiences={experiences}
              setExperiences={setExperiences}
              onOpenExperience={openExperience}
            />
          )}

          {page === 'bookmarked' && (
            <ExperiencesPage
              experiences={experiences}
              setExperiences={setExperiences}
              bookmarkedOnly
              onOpenExperience={openExperience}
              onViewAll={() => navigate('experiences')}
            />
          )}

          {page === 'experience-detail' &&
            selectedExperience && (
              <BookmarkPage
                experience={
                  experiences.find(
                    (item) =>
                      item.id ===
                      selectedExperience.id
                  ) ?? selectedExperience
                }
                setExperiences={setExperiences}
                onBack={() =>
                  navigate('experiences')
                }
              />
            )}

          {page === 'roadmaps' && (
            <RoadmapsPage />
          )}

          {page === 'courses' && (
            <CoursesPage />
          )}
        </div>
      </main>
    </div>
  )
}

/* Navigation Icons */

function NavSvg({
  d,
  active,
  size = 18,
}: {
  d: string | string[]
  active: boolean
  size?: number
}) {
  const paths = Array.isArray(d)
    ? d
    : [d]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={
        active
          ? '#4338CA'
          : '#9CA3AF'
      }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="flex-shrink-0"
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p}
        />
      ))}
    </svg>
  )
}

function HomeIco({
  active,
}: {
  active: boolean
}) {
  return (
    <NavSvg
      active={active}
      d={[
        'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
        'M9 22V12h6v10',
      ]}
    />
  )
}

function ProfileIco({
  active,
}: {
  active: boolean
}) {
  return (
    <NavSvg
      active={active}
      d={[
        'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2',
        'M12 11a4 4 0 100-8 4 4 0 000 8z',
      ]}
    />
  )
}

function ResumeIco({
  active,
}: {
  active: boolean
}) {
  return (
    <NavSvg
      active={active}
      d={[
        'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z',
        'M14 2v6h6',
        'M16 13H8',
        'M16 17H8',
        'M10 9H8',
      ]}
    />
  )
}

function InterviewIco({
  active,
}: {
  active: boolean
}) {
  return (
    <NavSvg
      active={active}
      d={[
        'M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z',
        'M19 10v2a7 7 0 01-14 0v-2',
        'M12 19v4',
        'M8 23h8',
      ]}
    />
  )
}

function ExpIco({
  active,
}: {
  active: boolean
}) {
  return (
    <NavSvg
      active={active}
      d={[
        'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',
      ]}
    />
  )
}

function MapIco({
  active,
}: {
  active: boolean
}) {
  return (
    <NavSvg
      active={active}
      d={[
        'M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z',
        'M8 2v16',
        'M16 6v16',
      ]}
    />
  )
}

function CourseIco({
  active,
}: {
  active: boolean
}) {
  return (
    <NavSvg
      active={active}
      d={[
        'M22 10v6M2 10l10-5 10 5-10 5z',
        'M6 12v5c3 3 9 3 12 0v-5',
      ]}
    />
  )
}

function BookmarkIco({
  active,
}: {
  active: boolean
}) {
  return (
    <NavSvg
      active={active}
      d={[
        'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
      ]}
    />
  )
}