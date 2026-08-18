import { useState } from 'react'
import {
  Card,
  Button,
  CircleProgress,
  Badge,
  ProgressBar,
  Tag,
  Section,
  Divider
} from '../components/ui'
import type { Page } from '../App'
import styles from './ResumePage.module.css'

type SubPage = 'overview' | 'check' | 'suggestions' | 'ats'

function ResumePage({
  onNavigate
}: {
  onNavigate: (p: Page) => void
}) {
  const [sub, setSub] = useState<SubPage>('overview')

  if (sub === 'overview') {
    return <ResumeOverview onSub={setSub} />
  }

  if (sub === 'check') {
    return (
      <ResumeCheck
        onBack={() => setSub('overview')}
        onGoSuggestions={() => setSub('suggestions')}
      />
    )
  }

  if (sub === 'suggestions') {
    return <ResumeSuggestions onBack={() => setSub('overview')} />
  }

  if (sub === 'ats') {
    return <ATSChecker onBack={() => setSub('overview')} />
  }

  return null
}

/* =========================================================
   RESUME OVERVIEW
========================================================= */

function ResumeOverview({
  onSub
}: {
  onSub: (s: SubPage) => void
}) {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>My Resume</h1>

      <Card className={styles.resumeCard}>
        <div className={styles.resumeHeader}>
          <div className={styles.pdfIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#EF4444"
              strokeWidth="2"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>

          <div className={styles.resumeInfo}>
            <p className={styles.resumeName}>
              Sai_Sindhu_Resume.pdf
            </p>

            <p className={styles.resumeDate}>
              Uploaded on 20 May 2024
            </p>
          </div>

          <Button variant="secondary" size="sm">
            Replace Resume
          </Button>
        </div>
      </Card>

      <div>
        <h2 className={styles.sectionTitle}>
          Choose what you want to do
        </h2>

        <div className={styles.actionList}>
          {[
            {
              icon: '✅',
              title: 'Resume Check (Match with JD)',
              sub: 'check' as SubPage,
              desc: 'Check how well your resume matches a job description.',
              color: 'indigo'
            },
            {
              icon: '✏️',
              title: 'Resume Suggestions',
              sub: 'suggestions' as SubPage,
              desc: 'Get AI-powered suggestions to improve your resume based on the job.',
              color: 'emerald'
            },
            {
              icon: '🎯',
              title: 'ATS Score Checker',
              sub: 'ats' as SubPage,
              desc: 'Check your resume ATS score and get improvement tips.',
              color: 'violet'
            }
          ].map(item => (
            <button
              key={item.title}
              onClick={() => onSub(item.sub)}
              className={`${styles.actionCard} ${styles[`action-${item.color}`]}`}
            >
              <span className={styles.actionIcon}>
                {item.icon}
              </span>

              <div className={styles.actionContent}>
                <p className={styles.actionTitle}>
                  {item.title}
                </p>

                <p className={styles.actionDescription}>
                  {item.desc}
                </p>
              </div>

              <svg
                className={styles.arrow}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tip}>
        <span className={styles.tipIcon}>💡</span>

        <p>
          Tip: Add a job description to get the most accurate results.
        </p>
      </div>
    </div>
  )
}

/* =========================================================
   RESUME CHECK
========================================================= */

function ResumeCheck({
  onBack,
  onGoSuggestions
}: {
  onBack: () => void
  onGoSuggestions: () => void
}) {
  const [jd, setJd] = useState('')
  const [analyzed, setAnalyzed] = useState(false)
  const [loading, setLoading] = useState(false)

  const analyze = () => {
    if (!jd.trim()) return

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setAnalyzed(true)
    }, 1200)
  }

  return (
    <div className={styles.page}>
      <div className={styles.backHeader}>
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

        <h1 className={styles.pageTitle}>
          Resume Check
        </h1>
      </div>

      <Card className={styles.cardPadding}>
        <div className={styles.jdHeader}>
          <p className={styles.cardTitle}>
            Frontend Developer
          </p>

          <button className={styles.editJd}>
            Edit JD
          </button>
        </div>

        <div className={styles.pillRow}>
          {['Resume', 'Resume Check'].map((t, i) => (
            <span
              key={t}
              className={`${styles.pill} ${
                i === 1
                  ? styles.pillActive
                  : styles.pillInactive
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {!analyzed && (
          <>
            <textarea
              value={jd}
              onChange={e => setJd(e.target.value)}
              placeholder="Paste job description here..."
              className={styles.textarea}
            />

            <Button
              variant="primary"
              className={styles.fullButton}
              onClick={analyze}
              disabled={loading || !jd.trim()}
            >
              {loading ? 'Analyzing...' : 'Analyze Match'}
            </Button>
          </>
        )}
      </Card>

      {analyzed && (
        <>
          <div className={styles.scoreGrid}>
            <Card className={styles.scoreCard}>
              <p className={styles.scoreLabel}>
                Overall Match
              </p>

              <CircleProgress
                value={92}
                size={80}
                color="#059669"
              />

              <p className={styles.greatMatch}>
                Great Match! 🔥
              </p>

              <p className={styles.scoreDescription}>
                Your resume is well aligned
              </p>
            </Card>

            <div className={styles.smallScoreList}>
              {[
                {
                  label: 'Experience Match',
                  value: 90,
                  color: '#4338CA'
                },
                {
                  label: 'Skills Match',
                  value: 93,
                  color: '#7C3AED'
                },
                {
                  label: 'Education Match',
                  value: 100,
                  color: '#059669'
                }
              ].map(m => (
                <Card
                  key={m.label}
                  className={styles.smallScoreCard}
                >
                  <CircleProgress
                    value={m.value}
                    size={44}
                    color={m.color}
                  />

                  <p className={styles.smallScoreLabel}>
                    {m.label}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          <Card className={styles.cardPadding}>
            <h3 className={styles.cardHeading}>
              Key Strengths
            </h3>

            <div className={styles.strengthList}>
              {[
                'React',
                'JavaScript',
                'HTML/CSS',
                'REST APIs',
                'Git & GitHub'
              ].map(s => (
                <div
                  key={s}
                  className={styles.strengthItem}
                >
                  <svg
                    className={styles.checkIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>

                  <span>{s}</span>
                </div>
              ))}

              <div className={styles.moreLink}>
                + 4 more
              </div>
            </div>
          </Card>

          <Card className={styles.cardPadding}>
            <h3 className={styles.cardHeading}>
              What's Next?
            </h3>

            <p className={styles.nextDescription}>
              Your resume has a great match! You can still
              improve some skills to make it even better.
            </p>

            <Button
              variant="primary"
              size="sm"
              onClick={onGoSuggestions}
            >
              View Suggestions
            </Button>
          </Card>
        </>
      )}
    </div>
  )
}

/* =========================================================
   RESUME SUGGESTIONS
========================================================= */

function ResumeSuggestions({
  onBack
}: {
  onBack: () => void
}) {
  const [activeFilter, setActiveFilter] =
    useState('All Suggestions')

  const filters = [
    'All Suggestions (8)',
    'Content (5)',
    'Skills (2)',
    'Formatting (2)'
  ]

  const suggestions = [
    {
      id: 1,
      priority: 'High',
      title: 'Improve Project Description',
      current:
        'Built a web application using React.',
      suggested:
        'Built a responsive web application using React that improved user engagement by 30%.',
      impact: 'high'
    },
    {
      id: 2,
      priority: 'Medium',
      title: 'Add Missing Skills',
      desc:
        'Consider adding these skills if you have experience:',
      skills: [
        'TypeScript',
        'Redux Toolkit',
        'Jest',
        'Next.js'
      ],
      impact: 'medium'
    },
    {
      id: 3,
      priority: 'Medium',
      title: 'Enhance Summary',
      desc:
        'Make your summary more role-specific.',
      impact: 'medium'
    }
  ]

  return (
    <div className={styles.page}>
      <div className={styles.backHeader}>
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

        <h1 className={styles.pageTitle}>
          Resume Suggestions
        </h1>
      </div>

      <div className={styles.filterRow}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`${styles.filterButton} ${
              activeFilter === f
                ? styles.filterActive
                : styles.filterInactive
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className={styles.suggestionList}>
        {suggestions.map((s, idx) => (
          <Card
            key={s.id}
            className={styles.cardPadding}
          >
            <div className={styles.suggestionHeader}>
              <div className={styles.suggestionTitle}>
                <span className={styles.numberCircle}>
                  {idx + 1}
                </span>

                <p>{s.title}</p>
              </div>

              <span
                className={`${styles.impact} ${
                  s.impact === 'high'
                    ? styles.highImpact
                    : styles.mediumImpact
                }`}
              >
                {s.priority} Impact
              </span>
            </div>

            {s.current && (
              <>
                <div className={styles.currentBox}>
                  <p className={styles.currentLabel}>
                    Current
                  </p>

                  <p className={styles.boxText}>
                    {s.current}
                  </p>
                </div>

                <div className={styles.suggestedBox}>
                  <p className={styles.suggestedLabel}>
                    Suggested
                  </p>

                  <p className={styles.boxText}>
                    {s.suggested}
                  </p>
                </div>
              </>
            )}

            {s.skills && (
              <div className={styles.skillTags}>
                {s.skills.map(sk => (
                  <span
                    key={sk}
                    className={styles.skillTag}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            )}

            {s.desc && !s.skills && (
              <p className={styles.suggestionDescription}>
                {s.desc}
              </p>
            )}

            <div className={styles.buttonRow}>
              <Button
                variant="primary"
                size="sm"
              >
                Apply
              </Button>

              <Button
                variant="ghost"
                size="sm"
              >
                Ignore
              </Button>
            </div>
          </Card>
        ))}

        <button className={styles.viewAll}>
          View all suggestions →
        </button>
      </div>
    </div>
  )
}

/* =========================================================
   ATS CHECKER
========================================================= */

function ATSChecker({
  onBack
}: {
  onBack: () => void
}) {
  const breakdown = [
    {
      label: 'Keywords',
      value: 88,
      color: styles.indigoBar
    },
    {
      label: 'Formatting',
      value: 82,
      color: styles.violetBar
    },
    {
      label: 'Skills',
      value: 80,
      color: styles.blueBar
    },
    {
      label: 'Readability',
      value: 85,
      color: styles.emeraldBar
    },
    {
      label: 'Experience',
      value: 84,
      color: styles.amberBar
    }
  ]

  const issues = [
    {
      icon: '⚠️',
      text:
        'Use of icons and multiple columns may confuse ATS systems.'
    },
    {
      icon: '💡',
      text:
        'Add more relevant keywords from the job description.'
    },
    {
      icon: '📋',
      text:
        'Ensure consistent date formats.'
    }
  ]

  return (
    <div className={styles.page}>
      <div className={styles.backHeader}>
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

        <h1 className={styles.pageTitle}>
          ATS Score Checker
        </h1>
      </div>

      <div className={styles.atsGrid}>
        <Card className={styles.atsScoreCard}>
          <p className={styles.atsTitle}>
            Your ATS Score
          </p>

          <CircleProgress
            value={84}
            size={96}
            color="#4338CA"
          />

          <p className={styles.atsGood}>
            Good
          </p>

          <p className={styles.atsDescription}>
            Your resume is ATS-friendly. A few improvements
            can make it even better.
          </p>
        </Card>

        <Card className={styles.atsBreakdown}>
          <p className={styles.cardHeading}>
            Score Breakdown
          </p>

          <div className={styles.breakdownList}>
            {breakdown.map(b => (
              <div key={b.label}>
                <div className={styles.breakdownHeader}>
                  <span>{b.label}</span>
                  <span>{b.value}/100</span>
                </div>

                <div className={styles.progressTrack}>
                  <div
                    className={`${styles.progressBar} ${b.color}`}
                    style={{
                      width: `${b.value}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className={styles.cardPadding}>
        <h3 className={styles.cardHeading}>
          Issues Found
        </h3>

        <div className={styles.issueList}>
          {issues.map((iss, i) => (
            <div
              key={i}
              className={styles.issue}
            >
              <span>{iss.icon}</span>

              <p>{iss.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className={styles.cardPadding}>
        <h3 className={styles.cardHeading}>
          Improve Your Score
        </h3>

        <div className={styles.buttonRow}>
          <Button
            variant="primary"
            size="sm"
          >
            View Suggestions
          </Button>

          <Button
            variant="secondary"
            size="sm"
          >
            Re-check Score
          </Button>
        </div>

        <p className={styles.atsTip}>
          💡 Keep your resume simple and keyword-rich for
          better results.
        </p>
      </Card>
    </div>
  )
}

export default ResumePage