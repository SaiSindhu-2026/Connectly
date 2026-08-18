import { useEffect, useState } from 'react'
import {
  Card,
  Section,
  CircleProgress,
  Button,
} from '../components/ui'
import type { Page } from '../App'
import styles from './HomePage.module.css'

type Theme = 'light' | 'dark'

type Profile = {
  name?: string
  role?: string
  avatar?: string | null
}

type AuthMode = 'login' | 'signup' | null

const EXPLORE_ITEMS = [
  {
    icon: '📄',
    title: 'Resume Check',
    desc: 'Check your resume against any job description',
    page: 'resume' as Page,
    color: 'indigo',
  },
  {
    icon: '💬',
    title: 'Interview Experiences',
    desc: 'Learn from real interview experiences',
    page: 'experiences' as Page,
    color: 'violet',
  },
  {
    icon: '🗺️',
    title: 'Roadmaps',
    desc: 'Follow a personalized path to your target role',
    page: 'roadmaps' as Page,
    color: 'blue',
  },
  {
    icon: '📚',
    title: 'Suggested Courses',
    desc: 'Discover courses recommended for your skills',
    page: 'courses' as Page,
    color: 'emerald',
  },
]

const PROGRESS_ITEMS = [
  {
    label: 'Resumes',
    value: '1',
    sub: 'Active',
    icon: '📄',
    color: '#4338CA',
    page: 'resume' as Page,
  },
  {
    label: 'Mock Interviews',
    value: '3',
    sub: 'Completed',
    icon: '🎤',
    color: '#7C3AED',
    page: 'interview' as Page,
  },
  {
    label: 'Exams',
    value: '2',
    sub: 'Completed',
    icon: '📋',
    color: '#059669',
    page: 'interview' as Page,
  },
]

function HomePage({
  onNavigate,
}: {
  onNavigate: (p: Page) => void
}) {
  const [authenticated, setAuthenticated] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>(null)

  const [profile, setProfile] = useState<Profile>({
    name: 'Sai',
    role: 'Frontend Developer',
    avatar: null,
  })

  const [resumeScore] = useState(76)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(
      'connectly-theme'
    ) as Theme | null

    return savedTheme || 'light'
  })

  /* =========================
     AUTHENTICATION
  ========================= */

  useEffect(() => {
    const savedAuth = localStorage.getItem(
      'connectly-authenticated'
    )

    setAuthenticated(savedAuth === 'true')
  }, [])

  const handleAuth = () => {
    localStorage.setItem(
      'connectly-authenticated',
      'true'
    )

    setAuthenticated(true)
    setAuthMode(null)
  }

  /* =========================
     PROFILE
  ========================= */

  const loadProfile = () => {
    const savedProfile =
      localStorage.getItem('connectly-profile')

    if (!savedProfile) return

    try {
      const parsedProfile = JSON.parse(savedProfile)

      setProfile({
        name: parsedProfile.name || 'Sai',
        role:
          parsedProfile.role ||
          'Frontend Developer',
        avatar: parsedProfile.avatar || null,
      })
    } catch {
      console.error('Unable to load profile')
    }
  }

  useEffect(() => {
    loadProfile()

    const handleProfileUpdate = () => {
      loadProfile()
    }

    window.addEventListener(
      'connectly-profile-updated',
      handleProfileUpdate
    )

    window.addEventListener(
      'storage',
      handleProfileUpdate
    )

    return () => {
      window.removeEventListener(
        'connectly-profile-updated',
        handleProfileUpdate
      )

      window.removeEventListener(
        'storage',
        handleProfileUpdate
      )
    }
  }, [])

  /* =========================
     DARK MODE
  ========================= */

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme
    )

    localStorage.setItem(
      'connectly-theme',
      theme
    )
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) =>
      current === 'light' ? 'dark' : 'light'
    )
  }

  /* =========================
     ACCOUNT ACTIONS
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem(
      'connectly-authenticated'
    )

    setAuthenticated(false)
    setShowProfileMenu(false)
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete your Connectly account? This action cannot be undone.'
    )

    if (!confirmed) return

    localStorage.clear()

    setAuthenticated(false)
    setShowProfileMenu(false)
  }

  /* =========================
     WELCOME PAGE
  ========================= */

  if (!authenticated) {
    return (
      <div className={styles.welcomePage}>
        <div className={styles.welcomeContainer}>

          {/* BRAND */}
          <div className={styles.welcomeHeader}>
            <div className={styles.brandMark}>
              C
            </div>

            <div>
              <span className={styles.brandName}>
                Connectly
              </span>

              <span className={styles.brandTagline}>
                Your career, connected.
              </span>
            </div>
          </div>

          {/* HERO */}
          <div className={styles.welcomeContent}>

            <div className={styles.welcomeText}>

              <div className={styles.welcomeBadge}>
                <span>✦</span>
                Your career, connected.
              </div>

              <h1>
                Build your career
                <br />
                <span>with confidence.</span>
              </h1>

              <p>
                Connectly brings your resume,
                interview preparation, career roadmap,
                coding profiles and opportunities
                together in one place.
              </p>

              <div className={styles.authButtons}>

                <Button
                  variant="primary"
                  onClick={() =>
                    setAuthMode('signup')
                  }
                >
                  Create Account
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                    setAuthMode('login')
                  }
                >
                  Log In
                </Button>

              </div>
            </div>

            {/* DASHBOARD PREVIEW */}
            <div className={styles.welcomePreview}>

              <div className={styles.previewGlow} />

              <div className={styles.previewHeader}>
                <div>
                  <span>
                    Career Dashboard
                  </span>

                  <strong>
                    Everything in one place
                  </strong>
                </div>

                <div className={styles.previewAvatar}>
                  S
                </div>
              </div>

              <div className={styles.previewProgress}>

                <div className={styles.previewProgressTop}>
                  <span>
                    Resume Score
                  </span>

                  <strong>
                    76%
                  </strong>
                </div>

                <div className={styles.previewProgressBar}>
                  <span />
                </div>
              </div>

              <div className={styles.previewGrid}>

                <div className={styles.previewItem}>
                  <span className={styles.previewItemIcon}>
                    📄
                  </span>

                  <div>
                    <strong>
                      Resume
                    </strong>

                    <small>
                      ATS Check
                    </small>
                  </div>
                </div>

                <div className={styles.previewItem}>
                  <span className={styles.previewItemIcon}>
                    🎤
                  </span>

                  <div>
                    <strong>
                      Interviews
                    </strong>

                    <small>
                      AI Practice
                    </small>
                  </div>
                </div>

                <div className={styles.previewItem}>
                  <span className={styles.previewItemIcon}>
                    🗺️
                  </span>

                  <div>
                    <strong>
                      Roadmaps
                    </strong>

                    <small>
                      Career Path
                    </small>
                  </div>
                </div>

                <div className={styles.previewItem}>
                  <span className={styles.previewItemIcon}>
                    💬
                  </span>

                  <div>
                    <strong>
                      Experiences
                    </strong>

                    <small>
                      Real Candidates
                    </small>
                  </div>
                </div>

              </div>

              <div className={styles.previewBottom}>
                <span>✓ Resume & ATS analysis</span>
                <span>✓ AI interview preparation</span>
              </div>

            </div>
          </div>

          {/* FEATURES */}
          <div className={styles.welcomeFeatures}>

            <div>
              <span>✓</span>
              Resume & ATS analysis
            </div>

            <div>
              <span>✓</span>
              AI interview preparation
            </div>

            <div>
              <span>✓</span>
              Personalized career roadmap
            </div>

            <div>
              <span>✓</span>
              Real candidate experiences
            </div>

          </div>
        </div>

        {/* AUTH MODAL */}
        {authMode && (
          <AuthModal
            mode={authMode}
            onClose={() => setAuthMode(null)}
            onSwitchMode={(mode) =>
              setAuthMode(mode)
            }
            onSuccess={handleAuth}
          />
        )}
      </div>
    )
  }

  /* =========================
     AUTHENTICATED HOME
  ========================= */

  return (
    <div className={styles.page}>

      {/* HEADER */}
      <div className={styles.header}>

        <div>
          <p className={styles.eyebrow}>
            PERSONAL DASHBOARD
          </p>

          <h1 className={styles.greeting}>
            Hello,{' '}
            {profile.name?.split(' ')[0] || 'there'}! 👋
          </h1>

          <p className={styles.subtitle}>
            Let's take a step closer to your dream role.
          </p>
        </div>

        <div className={styles.headerActions}>

          {/* NOTIFICATION */}
          <button
            type="button"
            className={styles.notificationButton}
            aria-label="Notifications"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>

            <span
              className={styles.notificationDot}
            />
          </button>

          {/* PROFILE */}
          <div className={styles.profileMenuWrapper}>

            <button
              type="button"
              onClick={() =>
                setShowProfileMenu(
                  (current) => !current
                )
              }
              className={styles.profileButton}
              aria-label="Open profile menu"
            >
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.name || 'Profile'}
                />
              ) : (
                profile.name
                  ?.charAt(0)
                  .toUpperCase() || 'S'
              )}
            </button>

            {showProfileMenu && (
              <div
                className={styles.profileDropdown}
              >

                <div
                  className={
                    styles.dropdownProfile
                  }
                >
                  <div
                    className={
                      styles.dropdownAvatar
                    }
                  >
                    {profile.avatar ? (
                      <img
                        src={profile.avatar}
                        alt={profile.name || 'Profile'}
                      />
                    ) : (
                      profile.name
                        ?.charAt(0)
                        .toUpperCase() || 'S'
                    )}
                  </div>

                  <div>
                    <strong>
                      {profile.name}
                    </strong>

                    <span>
                      {profile.role}
                    </span>
                  </div>
                </div>

                <div
                  className={
                    styles.dropdownDivider
                  }
                />

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false)
                    onNavigate('profile')
                  }}
                  className={
                    styles.dropdownItem
                  }
                >
                  <span>👤</span>
                  Profile
                </button>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className={
                    styles.dropdownItem
                  }
                >
                  <span>
                    {theme === 'light'
                      ? '🌙'
                      : '☀️'}
                  </span>

                  {theme === 'light'
                    ? 'Dark Mode'
                    : 'Light Mode'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false)
                    window.alert(
                      'Settings page will be connected here.'
                    )
                  }}
                  className={
                    styles.dropdownItem
                  }
                >
                  <span>⚙️</span>
                  Settings
                </button>

                <div
                  className={
                    styles.dropdownDivider
                  }
                />

                <button
                  type="button"
                  onClick={handleLogout}
                  className={
                    styles.dropdownItem
                  }
                >
                  <span>↪</span>
                  Log Out
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={
                    styles.dropdownItem
                  }
                >
                  <span>⇥</span>
                  Sign Out
                </button>

                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className={`${styles.dropdownItem} ${styles.dangerItem}`}
                >
                  <span>🗑️</span>
                  Delete Account
                </button>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* CONTINUE PREPARATION */}
      <Section title="Continue your preparation">

        <Card className={styles.preparationCard}>

          <div className={styles.preparationHeader}>

            <div>
              <span
                className={
                  styles.preparationEyebrow
                }
              >
                LAST ACTIVITY
              </span>

              <h2>
                Mock Interview
              </h2>

              <p>
                Frontend Developer
              </p>
            </div>

            <div
              className={
                styles.preparationStatus
              }
            >
              In Progress
            </div>

          </div>

          <div
            className={
              styles.preparationContent
            }
          >

            <div className={styles.scoreSection}>

              <CircleProgress
                value={resumeScore}
                size={84}
              />

              <div>
                <span>
                  Last score
                </span>

                <strong>
                  {resumeScore}%
                </strong>
              </div>

            </div>

            <div
              className={
                styles.preparationDetails
              }
            >

              <p
                className={
                  styles.preparationDescription
                }
              >
                Continue your interview preparation
                and improve your performance with
                personalized feedback.
              </p>

              <div
                className={
                  styles.skillChips
                }
              >
                <span>React</span>
                <span>JavaScript</span>
                <span>CSS</span>
                <span>Node.js</span>
              </div>

              <div
                className={
                  styles.preparationButtons
                }
              >

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    onNavigate('interview')
                  }
                >
                  Continue Interview →
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    onNavigate('interview')
                  }
                >
                  View Feedback
                </Button>

              </div>
            </div>
          </div>

          <div
            className={
              styles.preparationFooter
            }
          >
            <span>
              Last attempted recently
            </span>

            <button
              type="button"
              onClick={() =>
                onNavigate('interview')
              }
            >
              View all interview activity →
            </button>
          </div>

        </Card>
      </Section>

      {/* PROGRESS */}
      <Section title="Your progress">

        <div className={styles.statsGrid}>

          {PROGRESS_ITEMS.map((stat) => (
            <button
              key={stat.label}
              type="button"
              className={styles.statCardButton}
              onClick={() =>
                onNavigate(stat.page)
              }
            >
              <Card
                className={styles.statCard}
              >

                <div
                  className={
                    styles.statTop
                  }
                >
                  <span
                    className={
                      styles.statIcon
                    }
                  >
                    {stat.icon}
                  </span>

                  <span
                    className={
                      styles.statArrow
                    }
                  >
                    →
                  </span>
                </div>

                <p
                  className={styles.statValue}
                  style={{
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </p>

                <p
                  className={
                    styles.statLabel
                  }
                >
                  {stat.label}
                </p>

                <p
                  className={styles.statSub}
                >
                  {stat.sub}
                </p>

              </Card>
            </button>
          ))}

        </div>
      </Section>

      {/* EXPLORE */}
      <Section title="Explore">

        <Card className={styles.exploreCard}>

          {EXPLORE_ITEMS.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() =>
                onNavigate(item.page)
              }
              className={styles.exploreItem}
            >

              <span
                className={`${styles.exploreIcon} ${
                  styles[item.color]
                }`}
              >
                {item.icon}
              </span>

              <div
                className={styles.exploreText}
              >
                <p
                  className={
                    styles.exploreTitle
                  }
                >
                  {item.title}
                </p>

                <p
                  className={
                    styles.exploreDescription
                  }
                >
                  {item.desc}
                </p>
              </div>

              <svg
                className={
                  styles.exploreArrow
                }
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>

            </button>
          ))}

        </Card>
      </Section>

    </div>
  )
}

/* =========================
   AUTH MODAL
========================= */

function AuthModal({
  mode,
  onClose,
  onSwitchMode,
  onSuccess,
}: {
  mode: 'login' | 'signup'
  onClose: () => void
  onSwitchMode: (mode: 'login' | 'signup') => void
  onSuccess: () => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (
    event: React.FormEvent
  ) => {
    event.preventDefault()

    if (
      mode === 'signup' &&
      !name.trim()
    ) {
      return
    }

    if (
      !email.trim() ||
      !password.trim()
    ) {
      return
    }

    onSuccess()
  }

  return (
    <div
      className={styles.authOverlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >

      <div
        className={styles.authModal}
        role="dialog"
        aria-modal="true"
      >

        <button
          type="button"
          className={styles.authClose}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className={styles.authIcon}>
          C
        </div>

        <h2>
          {mode === 'signup'
            ? 'Create your Connectly account'
            : 'Welcome back'}
        </h2>

        <p className={styles.authDescription}>
          {mode === 'signup'
            ? 'Start building your career with Connectly.'
            : 'Log in to continue your career journey.'}
        </p>

        <form
          onSubmit={handleSubmit}
          className={styles.authForm}
        >

          {mode === 'signup' && (
            <label className={styles.authField}>
              <span>Full Name</span>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
          )}

          <label className={styles.authField}>
            <span>Email</span>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className={styles.authField}>
            <span>Password</span>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              autoComplete={
                mode === 'signup'
                  ? 'new-password'
                  : 'current-password'
              }
            />
          </label>

          <button
            type="submit"
            className={styles.authSubmit}
          >
            {mode === 'signup'
              ? 'Create Account'
              : 'Log In'}
          </button>

        </form>

        <p
          className={
            styles.authDisclaimer
          }
        >
          {mode === 'signup'
            ? 'Already have an account? '
            : "Don't have an account? "}

          <button
            type="button"
            onClick={() =>
              onSwitchMode(
                mode === 'signup'
                  ? 'login'
                  : 'signup'
              )
            }
          >
            {mode === 'signup'
              ? 'Log in'
              : 'Sign up'}
          </button>
        </p>

      </div>
    </div>
  )
}

export default HomePage