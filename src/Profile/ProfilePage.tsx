import { ChangeEvent, useEffect, useRef, useState } from 'react'
import {
  Card,
  StarRating,
  Button,
  CircleProgress,
  Tag,
  Divider,
} from '../components/ui'
import styles from './ProfilePage.module.css'

type Tab =
  | 'about'
  | 'skills'
  | 'experience'
  | 'education'
  | 'projects'

type CodingProfile = {
  name: string
  url: string
  rank?: string
}

type ProfileData = {
  name: string
  role: string
  company: string
  location: string
  email: string
  github: string
  leetcode: CodingProfile
  codechef: CodingProfile
  codeforces: CodingProfile
  hackerrank: CodingProfile
  bio: string
  avatar: string | null
  leetcodeRank: string
  hackerrankRank: string
}

type EducationItem = {
  degree: string
  institution: string
  duration: string
  score: string
  type: string
}

type Project = {
  name: string
  description: string
  tech: string
  github: string
}

type Skill = {
  name: string
  level: number
}

type ExamQuestion = {
  question: string
  options: string[]
  answer: number
}

const TABS: Tab[] = [
  'about',
  'skills',
  'experience',
  'education',
  'projects',
]

const DEFAULT_PROFILE: ProfileData = {
  name: 'Sai Sindhu',
  role: 'Frontend Developer',
  company: 'Connectly',
  location: 'Hyderabad, India',
  email: 'sai.sindhu@email.com',
  github: 'https://github.com/',
  leetcode: {
    name: 'LeetCode',
    url: '',
  },
  codechef: {
    name: 'CodeChef',
    url: '',
  },
  codeforces: {
    name: 'Codeforces',
    url: '',
  },
  hackerrank: {
    name: 'HackerRank',
    url: '',
  },
  bio:
    'Passionate frontend developer with strong problem-solving skills and love for building beautiful and user-friendly web applications.',
  avatar: null,
  leetcodeRank: 'Not added',
  hackerrankRank: 'Not added',
}

const DEFAULT_SKILLS: Skill[] = [
  { name: 'React', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'TypeScript', level: 72 },
  { name: 'HTML/CSS', level: 95 },
  { name: 'Tailwind CSS', level: 88 },
  { name: 'REST APIs', level: 80 },
]

const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech in Computer Science',
    institution: 'ABC University',
    duration: '2020 – 2024',
    score: 'CGPA: 8.6',
    type: 'Graduation',
  },
  {
    degree: 'Intermediate / 12th',
    institution: 'ABC Junior College',
    duration: '2018 – 2020',
    score: 'Percentage: 92%',
    type: 'Higher Secondary',
  },
  {
    degree: '10th Standard',
    institution: 'ABC High School',
    duration: '2018',
    score: 'CGPA: 9.4',
    type: 'Secondary School',
  },
]

const PROJECTS: Project[] = [
  {
    name: 'Portfolio Website',
    description:
      'Personal portfolio showcasing projects, technical skills and professional experience.',
    tech: 'React · CSS',
    github: 'https://github.com/',
  },
  {
    name: 'Todo App',
    description:
      'Full-stack task manager with authentication and cloud data storage.',
    tech: 'React · Firebase',
    github: 'https://github.com/',
  },
]

const EXAM_QUESTIONS: Record<string, ExamQuestion[]> = {
  React: [
    {
      question: 'Which hook is used to manage local state in a React component?',
      options: ['useEffect', 'useState', 'useMemo', 'useRef'],
      answer: 1,
    },
    {
      question: 'What is the purpose of React keys when rendering lists?',
      options: [
        'Style list items',
        'Store component state',
        'Help React identify list elements',
        'Create API requests',
      ],
      answer: 2,
    },
    {
      question: 'Which hook is commonly used for side effects?',
      options: ['useState', 'useEffect', 'useContext', 'useId'],
      answer: 1,
    },
  ],

  JavaScript: [
    {
      question: 'Which keyword creates a block-scoped variable?',
      options: ['var', 'let', 'define', 'global'],
      answer: 1,
    },
    {
      question: 'Which method creates a new array containing filtered elements?',
      options: ['map()', 'reduce()', 'filter()', 'sort()'],
      answer: 2,
    },
    {
      question: 'What does === compare?',
      options: [
        'Only values',
        'Only types',
        'Value and type',
        'Object references only',
      ],
      answer: 2,
    },
  ],

  TypeScript: [
    {
      question: 'TypeScript is primarily a superset of which language?',
      options: ['Java', 'JavaScript', 'Python', 'C++'],
      answer: 1,
    },
    {
      question: 'Which keyword defines a custom object type?',
      options: ['type', 'object', 'define', 'shape'],
      answer: 0,
    },
    {
      question: 'Which type represents a value that can be either string or number?',
      options: [
        'Intersection type',
        'Union type',
        'Tuple',
        'Enum',
      ],
      answer: 1,
    },
  ],

  'HTML/CSS': [
    {
      question: 'Which CSS property controls the space inside an element?',
      options: ['margin', 'padding', 'gap', 'spacing'],
      answer: 1,
    },
    {
      question: 'Which HTML element represents the main heading?',
      options: ['<head>', '<title>', '<h1>', '<header>'],
      answer: 2,
    },
    {
      question: 'Which CSS layout system is useful for one-dimensional layouts?',
      options: ['Float', 'Flexbox', 'Table', 'Position'],
      answer: 1,
    },
  ],

  'Tailwind CSS': [
    {
      question: 'What does p-4 generally control in Tailwind?',
      options: [
        'Font size',
        'Padding',
        'Position',
        'Border',
      ],
      answer: 1,
    },
    {
      question: 'Which class creates a flex container?',
      options: ['flex', 'display-flex', 'flexbox', 'd-flex'],
      answer: 0,
    },
    {
      question: 'Which prefix is commonly used for responsive breakpoints?',
      options: ['media:', 'screen:', 'md:', 'responsive:'],
      answer: 2,
    },
  ],

  'REST APIs': [
    {
      question: 'Which HTTP method is commonly used to retrieve data?',
      options: ['POST', 'GET', 'PATCH', 'DELETE'],
      answer: 1,
    },
    {
      question: 'Which status code usually represents a successful request?',
      options: ['404', '500', '200', '301'],
      answer: 2,
    },
    {
      question: 'What format is commonly used for REST API responses?',
      options: ['JSON', 'PSD', 'EXE', 'DLL'],
      answer: 0,
    },
  ],
}

function ProfilePage() {
  const [tab, setTab] = useState<Tab>('about')
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE)
  const [skills, setSkills] = useState<Skill[]>(DEFAULT_SKILLS)

  const [showAvatarMenu, setShowAvatarMenu] = useState(false)
  const [examSkill, setExamSkill] = useState<string | null>(null)
  const [examAnswers, setExamAnswers] = useState<number[]>([])
  const [examFinished, setExamFinished] = useState(false)
  const [examScore, setExamScore] = useState<number | null>(null)

  const uploadInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    const savedProfile = localStorage.getItem(
      'connectly-profile'
    )

    const savedSkills = localStorage.getItem(
      'connectly-profile-skills'
    )

    if (savedProfile) {
      setProfile({
        ...DEFAULT_PROFILE,
        ...JSON.parse(savedProfile),
      })
    }

    if (savedSkills) {
      setSkills(JSON.parse(savedSkills))
    }
  }, [])

  const saveProfile = (updatedProfile: ProfileData) => {
  setProfile(updatedProfile)
  localStorage.setItem(
    'connectly-profile',
    JSON.stringify(updatedProfile)
  )
  window.dispatchEvent(
    new Event('connectly-profile-updated')
  )
}
  const updateProfileField = (
    field: keyof ProfileData,
    value: string
  ) => {
    saveProfile({
      ...profile,
      [field]: value,
    })
  }

  const handleAvatarChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      saveProfile({
        ...profile,
        avatar: reader.result as string,
      })

      setShowAvatarMenu(false)
    }

    reader.readAsDataURL(file)
  }

  const openExam = (skillName: string) => {
    setExamSkill(skillName)
    setExamAnswers(
      new Array(
        EXAM_QUESTIONS[skillName]?.length ?? 0
      ).fill(-1)
    )
    setExamFinished(false)
    setExamScore(null)
  }

  const submitExam = () => {
    if (!examSkill) return

    const questions =
      EXAM_QUESTIONS[examSkill]

    if (!questions) return

    const correctAnswers = questions.reduce(
      (total, question, index) =>
        total +
        (examAnswers[index] === question.answer
          ? 1
          : 0),
      0
    )

    const score = Math.round(
      (correctAnswers / questions.length) * 100
    )

    const rating = convertScoreToRating(score)

    const updatedSkills = skills.map((skill) =>
      skill.name === examSkill
        ? {
            ...skill,
            level: score,
          }
        : skill
    )

    setSkills(updatedSkills)

    localStorage.setItem(
      'connectly-profile-skills',
      JSON.stringify(updatedSkills)
    )

    setExamScore(score)
    setExamFinished(true)

    void rating
  }

  const profileStrength = calculateProfileStrength(
    profile,
    skills
  )

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>
            My Profile
          </h1>

          <p className={styles.pageSubtitle}>
            Build a strong profile to improve your career opportunities.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setEditing(true)}
        >
          ✎ Edit Profile
        </Button>
      </div>

      {/* PROFILE HEADER */}

      <Card className={styles.profileCard}>
        <div className={styles.profileBanner} />

        <div className={styles.profileContent}>
          <div className={styles.profileTop}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className={styles.avatarImage}
                  />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>

              <button
                type="button"
                className={styles.avatarEditButton}
                onClick={() =>
                  setShowAvatarMenu(
                    (current) => !current
                  )
                }
                aria-label="Change profile photo"
              >
                ✎
              </button>

              {showAvatarMenu && (
                <div className={styles.avatarMenu}>
                  <button
                    type="button"
                    onClick={() =>
                      uploadInputRef.current?.click()
                    }
                  >
                    + Upload Photo
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      cameraInputRef.current?.click()
                    }
                  >
                    ◉ Use Camera
                  </button>

                  {profile.avatar && (
                    <button
                      type="button"
                      className={styles.removeAvatar}
                      onClick={() => {
                        saveProfile({
                          ...profile,
                          avatar: null,
                        })
                        setShowAvatarMenu(false)
                      }}
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              )}

              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.hiddenInput}
              />

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                onChange={handleAvatarChange}
                className={styles.hiddenInput}
              />
            </div>

            <div className={styles.profileStrengthSmall}>
              <span className={styles.strengthLabel}>
                Profile Strength
              </span>

              <div className={styles.strengthSmallContent}>
                <CircleProgress
                  value={profileStrength}
                  size={48}
                />

                <div>
                  <p className={styles.strengthPercentage}>
                    {profileStrength}%
                  </p>

                  <p className={styles.strengthStatus}>
                    {getStrengthStatus(
                      profileStrength
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.nameRow}>
            <h2 className={styles.name}>
              {profile.name}
            </h2>

            <span
              className={styles.verifiedBadge}
              title="Verified profile"
            >
              ✓
            </span>
          </div>

          <div className={styles.roleRow}>
            <p className={styles.role}>
              {profile.role}
            </p>

            <span className={styles.roleSeparator}>
              ·
            </span>

            <p className={styles.company}>
              {profile.company}
            </p>
          </div>

          <div className={styles.contactInfo}>
            <span className={styles.contactItem}>
              <span className={styles.contactIcon}>
                ◎
              </span>
              {profile.location}
            </span>

            <span className={styles.contactItem}>
              <span className={styles.contactIcon}>
                @
              </span>
              {profile.email}
            </span>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className={styles.contactLink}
            >
              <span className={styles.contactIcon}>
                ↗
              </span>
              GitHub
            </a>
          </div>

          <div className={styles.bio}>
            <p>{profile.bio}</p>
          </div>
        </div>
      </Card>

      {/* CODING PROFILES */}

      <Card className={styles.codingCard}>
        <div className={styles.sectionHeader}>
          <div>
            <h3>Coding Profiles</h3>
            <p>
              Connect your competitive programming profiles.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing(true)}
          >
            + Add Profiles
          </Button>
        </div>

        <div className={styles.codingGrid}>
          <CodingProfileItem
            profile={profile.leetcode}
            rank={profile.leetcodeRank}
          />

          <CodingProfileItem
            profile={profile.codechef}
          />

          <CodingProfileItem
            profile={profile.codeforces}
          />

          <CodingProfileItem
            profile={profile.hackerrank}
            rank={profile.hackerrankRank}
          />
        </div>
      </Card>

      {/* PROFILE STRENGTH */}

      <Card className={styles.strengthCard}>
        <div className={styles.strengthHeader}>
          <div>
            <h3>Profile Strength</h3>
            <p>
              Complete more sections to improve your profile.
            </p>
          </div>

          <span>
            {getStrengthStatus(profileStrength)}
          </span>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{
              width: `${profileStrength}%`,
            }}
          />
        </div>

        <p className={styles.progressDescription}>
          Add skills, education and professional information to reach{' '}
          <span>Expert</span> status.
        </p>
      </Card>

      {/* TABS */}

      <Card className={styles.tabsCard}>
        <div className={styles.tabs}>
          {TABS.map((currentTab) => (
            <button
              key={currentTab}
              type="button"
              onClick={() =>
                setTab(currentTab)
              }
              className={`${styles.tab} ${
                tab === currentTab
                  ? styles.activeTab
                  : ''
              }`}
            >
              {currentTab}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {tab === 'about' && (
            <AboutTab skills={skills} />
          )}

          {tab === 'skills' && (
            <SkillsTab
              skills={skills}
              onTakeExam={openExam}
            />
          )}

          {tab === 'experience' && (
            <ExperienceTab />
          )}

          {tab === 'education' && (
            <EducationTab />
          )}

          {tab === 'projects' && (
            <ProjectsTab />
          )}
        </div>
      </Card>

      {/* EDIT PROFILE MODAL */}

      {editing && (
        <EditProfileModal
          profile={profile}
          onClose={() => setEditing(false)}
          onSave={(updatedProfile) => {
            saveProfile(updatedProfile)
            setEditing(false)
          }}
        />
      )}

      {/* EXAM MODAL */}

      {examSkill && (
        <ExamModal
          skill={examSkill}
          answers={examAnswers}
          finished={examFinished}
          score={examScore}
          onAnswer={(questionIndex, answer) => {
            setExamAnswers((current) => {
              const updated = [...current]
              updated[questionIndex] = answer
              return updated
            })
          }}
          onSubmit={submitExam}
          onClose={() => {
            setExamSkill(null)
            setExamFinished(false)
            setExamScore(null)
          }}
        />
      )}
    </div>
  )
}

/* =========================
   CODING PROFILE
========================= */

function CodingProfileItem({
  profile,
  rank,
}: {
  profile: CodingProfile
  rank?: string
}) {
  const connected = Boolean(profile.url)

  return (
    <div className={styles.codingProfile}>
      <div className={styles.codingProfileIcon}>
        {profile.name.charAt(0)}
      </div>

      <div className={styles.codingProfileInfo}>
        <p>{profile.name}</p>

        {rank && (
          <span>
            Rank: {rank}
          </span>
        )}
      </div>

      {connected ? (
        <a
          href={profile.url}
          target="_blank"
          rel="noreferrer"
          className={styles.profileLink}
        >
          View ↗
        </a>
      ) : (
        <span className={styles.notAdded}>
          Not added
        </span>
      )}
    </div>
  )
}

/* =========================
   ABOUT TAB
========================= */

function AboutTab({
  skills,
}: {
  skills: Skill[]
}) {
  return (
    <div className={styles.aboutTab}>
      <section>
        <h3 className={styles.sectionTitle}>
          Skills
        </h3>

        <div className={styles.skillTags}>
          {skills.map((skill) => (
            <span
              key={skill.name}
              className={styles.skillTag}
            >
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      <Divider />

      <section>
        <div className={styles.sectionHeadingRow}>
          <h3 className={styles.sectionTitle}>
            Skill Ratings
          </h3>

          <span className={styles.ratingHint}>
            Based on skill assessments
          </span>
        </div>

        <div className={styles.ratingList}>
          {skills.map((skill) => {
            const rating =
              convertScoreToRating(
                skill.level
              )

            return (
              <div
                key={skill.name}
                className={styles.ratingRow}
              >
                <div>
                  <p>{skill.name}</p>
                  <span className={styles.ratingScore}>
                    Assessment score: {skill.level}%
                  </span>
                </div>

                <div className={styles.ratingValue}>
                  <StarRating
                    rating={rating}
                  />
                  <span>
                    {rating.toFixed(1)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

/* =========================
   SKILLS TAB
========================= */

function SkillsTab({
  skills,
  onTakeExam,
}: {
  skills: Skill[]
  onTakeExam: (skillName: string) => void
}) {
  return (
    <div className={styles.skillLevels}>
      {skills.map((skill) => (
        <div
          key={skill.name}
          className={styles.skillLevel}
        >
          <div className={styles.skillLevelHeader}>
            <div>
              <span>{skill.name}</span>

              <small>
                {skill.level}% assessment score
              </small>
            </div>

            <button
              type="button"
              className={styles.examButton}
              onClick={() =>
                onTakeExam(skill.name)
              }
            >
              + Take Exam
            </button>
          </div>

          <div className={styles.levelTrack}>
            <div
              className={styles.levelFill}
              style={{
                width: `${skill.level}%`,
              }}
            />
          </div>

          <div className={styles.skillLevelFooter}>
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* =========================
   EXPERIENCE TAB
========================= */

function ExperienceTab() {
  return (
    <div className={styles.experience}>
      <div className={styles.timelineDot}>
        A
      </div>

      <div className={styles.experienceContent}>
        <div className={styles.experienceHeader}>
          <div>
            <p className={styles.experienceTitle}>
              Frontend Developer Intern
            </p>

            <p className={styles.company}>
              XYZ Startup
            </p>
          </div>

          <Tag color="gray">
            Jun 2023 – Dec 2023
          </Tag>
        </div>

        <ul className={styles.experienceList}>
          <li>
            Built responsive web applications using React and Tailwind CSS.
          </li>

          <li>
            Worked with REST APIs and frontend state management.
          </li>
        </ul>
      </div>
    </div>
  )
}

/* =========================
   EDUCATION TAB
========================= */

function EducationTab() {
  return (
    <div className={styles.educationList}>
      {EDUCATION.map((education) => (
        <div
          key={education.degree}
          className={styles.educationItem}
        >
          <div className={styles.educationIcon}>
            {education.type.charAt(0)}
          </div>

          <div className={styles.educationContent}>
            <div className={styles.educationHeader}>
              <div>
                <p className={styles.educationTitle}>
                  {education.degree}
                </p>

                <p className={styles.university}>
                  {education.institution}
                </p>
              </div>

              <Tag color="gray">
                {education.duration}
              </Tag>
            </div>

            <div className={styles.educationScore}>
              {education.score}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* =========================
   PROJECTS TAB
========================= */

function ProjectsTab() {
  return (
    <div className={styles.projects}>
      {PROJECTS.map((project) => (
        <div
          key={project.name}
          className={styles.project}
        >
          <div className={styles.projectHeader}>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={styles.projectName}
            >
              {project.name} ↗
            </a>

            <Tag color="indigo">
              {project.tech}
            </Tag>
          </div>

          <p className={styles.projectDescription}>
            {project.description}
          </p>
        </div>
      ))}
    </div>
  )
}

/* =========================
   EDIT PROFILE MODAL
========================= */

function EditProfileModal({
  profile,
  onClose,
  onSave,
}: {
  profile: ProfileData
  onClose: () => void
  onSave: (profile: ProfileData) => void
}) {
  const [form, setForm] =
    useState<ProfileData>(profile)

  const updateField = (
    field: keyof ProfileData,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const updateCodingProfile = (
    field:
      | 'leetcode'
      | 'codechef'
      | 'codeforces'
      | 'hackerrank',
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: {
        ...current[field],
        url: value,
      },
    }))
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.editModal}>
        <div className={styles.modalHeader}>
          <div>
            <h2>Edit Profile</h2>
            <p>
              Update your professional information.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.formSection}>
            <h3>Basic Information</h3>

            <div className={styles.formGrid}>
              <label>
                Full Name
                <input
                  value={form.name}
                  onChange={(e) =>
                    updateField(
                      'name',
                      e.target.value
                    )
                  }
                />
              </label>

              <label>
                Role
                <input
                  value={form.role}
                  onChange={(e) =>
                    updateField(
                      'role',
                      e.target.value
                    )
                  }
                />
              </label>

              <label>
                Company
                <input
                  value={form.company}
                  onChange={(e) =>
                    updateField(
                      'company',
                      e.target.value
                    )
                  }
                />
              </label>

              <label>
                Location
                <input
                  value={form.location}
                  onChange={(e) =>
                    updateField(
                      'location',
                      e.target.value
                    )
                  }
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField(
                      'email',
                      e.target.value
                    )
                  }
                />
              </label>

              <label>
                GitHub
                <input
                  value={form.github}
                  onChange={(e) =>
                    updateField(
                      'github',
                      e.target.value
                    )
                  }
                  placeholder="https://github.com/username"
                />
              </label>
            </div>

            <label>
              Professional Bio
              <textarea
                value={form.bio}
                onChange={(e) =>
                  updateField(
                    'bio',
                    e.target.value
                  )
                }
                rows={4}
              />
            </label>
          </div>

          <div className={styles.formSection}>
            <h3>Coding Profiles</h3>

            <div className={styles.formGrid}>
              <label>
                LeetCode
                <input
                  value={form.leetcode.url}
                  onChange={(e) =>
                    updateCodingProfile(
                      'leetcode',
                      e.target.value
                    )
                  }
                  placeholder="LeetCode profile URL"
                />
              </label>

              <label>
                LeetCode Rank
                <input
                  value={form.leetcodeRank}
                  onChange={(e) =>
                    updateField(
                      'leetcodeRank',
                      e.target.value
                    )
                  }
                  placeholder="e.g. Knight"
                />
              </label>

              <label>
                CodeChef
                <input
                  value={form.codechef.url}
                  onChange={(e) =>
                    updateCodingProfile(
                      'codechef',
                      e.target.value
                    )
                  }
                  placeholder="CodeChef profile URL"
                />
              </label>

              <label>
                Codeforces
                <input
                  value={form.codeforces.url}
                  onChange={(e) =>
                    updateCodingProfile(
                      'codeforces',
                      e.target.value
                    )
                  }
                  placeholder="Codeforces profile URL"
                />
              </label>

              <label>
                HackerRank
                <input
                  value={form.hackerrank.url}
                  onChange={(e) =>
                    updateCodingProfile(
                      'hackerrank',
                      e.target.value
                    )
                  }
                  placeholder="HackerRank profile URL"
                />
              </label>

              <label>
                HackerRank Rank
                <input
                  value={form.hackerrankRank}
                  onChange={(e) =>
                    updateField(
                      'hackerrankRank',
                      e.target.value
                    )
                  }
                  placeholder="e.g. 5 Star"
                />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.modalActions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onSave(form)}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

/* =========================
   EXAM MODAL
========================= */

function ExamModal({
  skill,
  answers,
  finished,
  score,
  onAnswer,
  onSubmit,
  onClose,
}: {
  skill: string
  answers: number[]
  finished: boolean
  score: number | null
  onAnswer: (
    questionIndex: number,
    answer: number
  ) => void
  onSubmit: () => void
  onClose: () => void
}) {
  const questions =
    EXAM_QUESTIONS[skill] ?? []

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.examModal}>
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.modalEyebrow}>
              Skill Assessment
            </span>

            <h2>{skill} Exam</h2>

            <p>
              Test your knowledge and update your profile rating.
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {!finished ? (
          <>
            <div className={styles.questions}>
              {questions.map(
                (question, questionIndex) => (
                  <div
                    key={question.question}
                    className={styles.question}
                  >
                    <p>
                      {questionIndex + 1}.{' '}
                      {question.question}
                    </p>

                    <div className={styles.options}>
                      {question.options.map(
                        (option, optionIndex) => (
                          <button
                            type="button"
                            key={option}
                            className={`${styles.option} ${
                              answers[
                                questionIndex
                              ] === optionIndex
                                ? styles.selectedOption
                                : ''
                            }`}
                            onClick={() =>
                              onAnswer(
                                questionIndex,
                                optionIndex
                              )
                            }
                          >
                            <span>
                              {String.fromCharCode(
                                65 + optionIndex
                              )}
                            </span>

                            {option}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>

            <div className={styles.modalActions}>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={onSubmit}
                disabled={answers.some(
                  (answer) => answer === -1
                )}
              >
                Submit Exam
              </Button>
            </div>
          </>
        ) : (
          <div className={styles.examResult}>
            <div className={styles.resultCircle}>
              {score}%
            </div>

            <h3>
              Assessment Completed
            </h3>

            <p>
              Your {skill} skill rating has been updated to{' '}
              <strong>
                {convertScoreToRating(
                  score ?? 0
                ).toFixed(1)} / 5
              </strong>
              .
            </p>

            <Button
              variant="primary"
              size="sm"
              onClick={onClose}
            >
              Done
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/* =========================
   HELPERS
========================= */

function convertScoreToRating(
  score: number
) {
  if (score >= 90) return 5
  if (score >= 75) return 4
  if (score >= 60) return 3
  if (score >= 40) return 2
  return 1
}

function calculateProfileStrength(
  profile: ProfileData,
  skills: Skill[]
) {
  const fields = [
    profile.name,
    profile.role,
    profile.company,
    profile.location,
    profile.email,
    profile.github,
    profile.bio,
    profile.leetcode.url,
    profile.codechef.url,
    profile.codeforces.url,
    profile.hackerrank.url,
  ]

  const completedFields =
    fields.filter(Boolean).length

  const fieldScore =
    (completedFields / fields.length) * 60

  const skillScore =
    skills.length > 0
      ? (skills.reduce(
          (total, skill) =>
            total + skill.level,
          0
        ) /
          skills.length /
          100) *
        40
      : 0

  return Math.min(
    100,
    Math.round(
      fieldScore + skillScore
    )
  )
}

function getStrengthStatus(
  strength: number
) {
  if (strength >= 80) return 'Expert'
  if (strength >= 60) return 'Strong'
  if (strength >= 40) return 'Good'
  return 'Getting Started'
}

export default ProfilePage