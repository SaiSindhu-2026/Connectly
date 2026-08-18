import { useState } from 'react'
import { Card, Button, Tag, CircleProgress } from '../components/ui'
import styles from './RoadmapsPage.module.css'

type View = 'list' | 'detail'

const ROADMAPS = [
  {
    id: 1,
    title: 'React Developer',
    role: 'React Developer',
    progress: 60,
    color: '#4338CA',
    stages: [
      {
        name: 'Foundations',
        topics: 'HTML, CSS, JavaScript Basics',
        pct: 100,
        status: 'done',
      },
      {
        name: 'Core React',
        topics: 'Components, Props, State, Hooks',
        pct: 30,
        status: 'active',
      },
      {
        name: 'Advanced React',
        topics: 'Context API, Reducer, Custom Hooks',
        pct: 0,
        status: 'pending',
      },
      {
        name: 'State Management',
        topics: 'Redux Toolkit, Zustand',
        pct: 0,
        status: 'pending',
      },
      {
        name: 'Build Projects',
        topics: 'Real-world Projects',
        pct: 0,
        status: 'pending',
      },
    ],
    whatYouGet: [
      'Step-by-step learning path',
      'Curated resources',
      'Project suggestions',
      'Interview preparation',
    ],
    resources: [
      { name: 'React Official Docs', type: 'Docs' },
      { name: 'MDN Web Docs', type: 'Docs' },
      { name: 'FreeCodeCamp', type: 'Video' },
      { name: 'YouTube Playlist', type: 'Video' },
    ],
    practiceProject:
      'Todo App with React\nBuild a simple todo app using React and Redux.',
  },
]

const TOPICS = [
  'All',
  'React Developer',
  'Full Stack',
  'Data Structures',
  'System Design',
]

function RoadmapsPage() {
  const [view, setView] = useState<View>('list')
  const [selected, setSelected] = useState(ROADMAPS[0])
  const [role, setRole] = useState('React Developer')
  const [topic, setTopic] = useState('All')

  if (view === 'detail') {
    return (
      <RoadmapDetail
        roadmap={selected}
        onBack={() => setView('list')}
      />
    )
  }

  return (
    <div className={`${styles.page} max-w-2xl mx-auto px-6 py-7 space-y-6`}>
      <div>
        <h1 className="text-lg font-bold text-gray-900">
          Roadmaps
        </h1>

        <p className="text-sm text-gray-500 mt-0.5">
          Get job-ready with structured roadmaps.
        </p>
      </div>

      {/* Role selector */}
      <div>
        <p className="text-xs font-semibold text-gray-500 mb-2">
          Select your target role
        </p>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={styles.roleSelect}
        >
          {[
            'React Developer',
            'Full Stack Developer',
            'Frontend Developer',
            'Backend Developer',
          ].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      {/* Topic chips */}
      <div className="flex gap-2 flex-wrap">
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => setTopic(t)}
            className={
              topic === t
                ? styles.topicActive
                : styles.topicInactive
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* Roadmap card */}
      {ROADMAPS.map((rm) => (
        <Card key={rm.id} className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">
                {rm.title}
              </h2>

              <p className="text-xs text-gray-500 mt-0.5">
                Role: {rm.role}
              </p>
            </div>

            <CircleProgress
              value={rm.progress}
              size={52}
              color={rm.color}
            />
          </div>

          {/* Overall progress */}
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-500 font-medium">
                Overall Progress
              </span>

              <span className="text-indigo-600 font-bold">
                {rm.progress}%
              </span>
            </div>

            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={styles.progressFill}
                style={{
                  width: `${rm.progress}%`,
                }}
              />
            </div>
          </div>

          {/* Stages */}
          <div className="space-y-2 mb-4">
            {rm.stages.map((stage, i) => (
              <div
                key={i}
                className={`${styles.stage} ${
                  stage.status === 'done'
                    ? styles.stageDone
                    : stage.status === 'active'
                    ? styles.stageActive
                    : styles.stagePending
                }`}
              >
                <div
                  className={`${styles.stageNumber} ${
                    stage.status === 'done'
                      ? styles.stageNumberDone
                      : stage.status === 'active'
                      ? styles.stageNumberActive
                      : styles.stageNumberPending
                  }`}
                >
                  {stage.status === 'done' ? '✓' : i + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-800">
                    {stage.name}
                  </p>

                  <p className="text-[11px] text-gray-500 truncate">
                    {stage.topics}
                  </p>
                </div>

                <span
                  className={`${styles.stagePercentage} ${
                    stage.status === 'done'
                      ? styles.textDone
                      : stage.status === 'active'
                      ? styles.textActive
                      : styles.textPending
                  }`}
                >
                  {stage.pct}%
                </span>
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            className="w-full justify-center"
            onClick={() => {
              setSelected(rm)
              setView('detail')
            }}
          >
            View Roadmap
          </Button>
        </Card>
      ))}
    </div>
  )
}

function RoadmapDetail({
  roadmap,
  onBack,
}: {
  roadmap: typeof ROADMAPS[0]
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState('Overview')

  const tabs = ['Overview', 'Projects', 'Resources']

  const checklistItems = [
    { label: 'Props and State', done: true },
    { label: 'Event Handling', done: true },
    { label: 'Lists and Keys', done: false },
    {
      label: 'Advanced React Hooks (useEffect, useRef)',
      done: false,
    },
    {
      label: 'Conditional Rendering',
      done: false,
    },
  ]

  return (
    <div className={`${styles.page} max-w-2xl mx-auto px-6 py-7 space-y-5`}>
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className={styles.backButton}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>

        <div className="flex-1">
          <h1 className="text-lg font-bold text-gray-900">
            {roadmap.title} Roadmap
          </h1>
        </div>

        <button className={styles.shareButton}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>
      </div>

      {/* Progress */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-gray-800">
            {roadmap.progress}% Completed
          </p>

          <span className="text-xs text-indigo-600 font-semibold">
            In Progress
          </span>
        </div>

        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={styles.detailProgress}
            style={{
              width: `${roadmap.progress}%`,
            }}
          />
        </div>
      </Card>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={
              activeTab === t
                ? styles.tabActive
                : styles.tabInactive
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'Overview' && (
        <>
          <Card className="p-5">
            <h3 className="text-sm font-bold text-gray-800 mb-3">
              What you'll get
            </h3>

            <div className="space-y-2">
              {roadmap.whatYouGet.map((w) => (
                <div
                  key={w}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <svg
                    className="w-4 h-4 text-indigo-500 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>

                  {w}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-800">
                Core React
              </h3>

              <Tag color="indigo">
                In Progress
              </Tag>
            </div>

            <p className="text-xs text-gray-500 mb-4">
              Learn the core concepts of React to build powerful UI.
            </p>

            <div className="space-y-2">
              {checklistItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-3 py-2 text-sm ${
                    item.done
                      ? 'text-gray-400 line-through'
                      : 'text-gray-700'
                  }`}
                >
                  <div
                    className={`${styles.checkCircle} ${
                      item.done
                        ? styles.checkDone
                        : styles.checkPending
                    }`}
                  >
                    {item.done && (
                      <svg
                        className="w-3 h-3 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                  </div>

                  {item.label}

                  {!item.done && (
                    <Tag color="amber">
                      Pending
                    </Tag>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              size="sm"
              className="mt-4"
            >
              Continue
            </Button>
          </Card>
        </>
      )}

      {/* Resources */}
      {activeTab === 'Resources' && (
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-3">
            Resources
          </h3>

          <div className="space-y-3">
            {roadmap.resources.map((r) => (
              <div
                key={r.name}
                className={styles.resource}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">
                    {r.type === 'Docs' ? '📄' : '🎬'}
                  </span>

                  <p className="text-sm font-medium text-gray-700">
                    {r.name}
                  </p>
                </div>

                <Tag
                  color={
                    r.type === 'Docs'
                      ? 'indigo'
                      : 'violet'
                  }
                >
                  {r.type}
                </Tag>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Projects */}
      {activeTab === 'Projects' && (
        <Card className="p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-3">
            Practice Project
          </h3>

          <div className={styles.projectCard}>
            <p className="text-sm font-bold text-gray-900 mb-1">
              Todo App with React
            </p>

            <p className="text-xs text-gray-500 mb-3">
              Build a simple todo app using React and Redux.
            </p>

            <Button
              variant="primary"
              size="sm"
            >
              Start Project
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default RoadmapsPage