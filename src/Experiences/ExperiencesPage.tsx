import { useState } from 'react'
import type {
  Dispatch,
  SetStateAction,
} from 'react'

import {
  Avatar,
  Button,
  Card,
  Tag,
} from '../components/ui'

import styles from './ExperiencesPage.module.css'

export type ExperienceComment = {
  id: number
  author: string
  text: string
  time: string
}

export type Experience = {
  id: number
  author: string
  company: string
  role: string
  datePosted: string
  tag: string
  title: string
  body: string
  helpful: number
  helpfulByMe: boolean
  saved: boolean
  color: string
  comments: ExperienceComment[]
}

export const INITIAL_EXPERIENCES: Experience[] = [
  {
    id: 1,
    author: 'Gopal R',
    company: 'Google',
    role: 'Frontend Developer',
    datePosted: '2026-08-14T10:30:00',
    tag: 'General Discussion',
    title: 'Frontend Developer Interview Experience',
    body:
      'Round 1: Online Assessment – Round 2: Technical & Coding – Round 3: HR Interview. The technical round focused on JavaScript, React and problem solving.',
    helpful: 125,
    helpfulByMe: false,
    saved: false,
    color: 'emerald',
    comments: [
      {
        id: 11,
        author: 'Priya M',
        text: 'Was the coding round based on DSA?',
        time: '2 days ago',
      },
      {
        id: 12,
        author: 'Gopal R',
        text:
          'Yes, mostly arrays, strings and one medium-level problem.',
        time: '2 days ago',
      },
      {
        id: 13,
        author: 'Rahul K',
        text: 'This is really useful. Thanks for sharing!',
        time: '1 day ago',
      },
      {
        id: 14,
        author: 'Anu S',
        text: 'How long did the whole process take?',
        time: '1 day ago',
      },
      {
        id: 15,
        author: 'Gopal R',
        text: 'Around two weeks from OA to HR.',
        time: '20 hours ago',
      },
    ],
  },

  {
    id: 2,
    author: 'Meena S',
    company: 'Microsoft',
    role: 'React Developer',
    datePosted: '2026-08-12T14:00:00',
    tag: 'General Discussion',
    title: 'React Developer Interview Experience',
    body:
      'They asked mostly about React hooks, state management, component lifecycle and real-world scenarios. There was also a small JavaScript coding task.',
    helpful: 96,
    helpfulByMe: false,
    saved: false,
    color: 'blue',
    comments: [
      {
        id: 21,
        author: 'Vivek P',
        text: 'Did they ask Redux?',
        time: '3 days ago',
      },
      {
        id: 22,
        author: 'Meena S',
        text:
          'Yes, basic Redux concepts and when to use it.',
        time: '3 days ago',
      },
    ],
  },

  {
    id: 3,
    author: 'Arjun K',
    company: 'Amazon',
    role: 'Frontend Developer',
    datePosted: '2026-08-10T09:00:00',
    tag: 'General Discussion',
    title: 'Frontend Developer Interview Experience',
    body:
      'Questions on JavaScript, DOM, CSS Flexbox, and a small coding problem. The interviewer also asked about performance optimization and accessibility.',
    helpful: 74,
    helpfulByMe: false,
    saved: false,
    color: 'amber',
    comments: [
      {
        id: 31,
        author: 'Kiran P',
        text: 'Were there system design questions?',
        time: '1 week ago',
      },
      {
        id: 32,
        author: 'Arjun K',
        text:
          'Only a basic frontend architecture discussion.',
        time: '6 days ago',
      },
      {
        id: 33,
        author: 'Neha R',
        text:
          'Thanks, this gives a good idea of what to prepare.',
        time: '5 days ago',
      },
    ],
  },

  {
    id: 4,
    author: 'Divya N',
    company: 'Infosys',
    role: 'Software Engineer',
    datePosted: '2026-08-07T11:00:00',
    tag: 'General Discussion',
    title: 'Software Engineer Interview Experience',
    body:
      'The interview covered Java, SQL, OOP concepts and a few behavioral questions. The coding questions were beginner to intermediate level.',
    helpful: 61,
    helpfulByMe: false,
    saved: false,
    color: 'violet',
    comments: [],
  },

  {
    id: 5,
    author: 'Rahul V',
    company: 'TCS',
    role: 'React Developer',
    datePosted: '2026-08-04T16:15:00',
    tag: 'General Discussion',
    title: 'React Developer Interview Experience at TCS',
    body:
      'The discussion focused on React, JavaScript, REST APIs and basic frontend testing. They also asked how I would structure a production React application.',
    helpful: 48,
    helpfulByMe: false,
    saved: false,
    color: 'red',
    comments: [],
  },
]

type SortMode =
  | 'latest'
  | 'helpful'
  | 'company'
  | 'role'

type ExperiencesPageProps = {
  experiences: Experience[]
  setExperiences: Dispatch<SetStateAction<Experience[]>>
  onOpenExperience: (experience: Experience) => void
  bookmarkedOnly?: boolean
  onViewAll?: () => void
}

export default function ExperiencesPage({
  experiences,
  setExperiences,
  onOpenExperience,
  bookmarkedOnly = false,
  onViewAll,
}: ExperiencesPageProps) {
  const [sortMode, setSortMode] =
    useState<SortMode>('latest')

  const [search, setSearch] = useState('')
  const [companyFilter, setCompanyFilter] =
    useState('All companies')
  const [roleFilter, setRoleFilter] =
    useState('All roles')

  const [showFilters, setShowFilters] =
    useState(false)
  const [showShare, setShowShare] =
    useState(false)

  const [openComments, setOpenComments] =
    useState<number | null>(null)

  const [commentText, setCommentText] =
    useState('')

  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    company: '',
    role: '',
  })

  const companies = Array.from(
    new Set(
      experiences.map(
        (experience) => experience.company
      )
    )
  ).sort()

  const roles = Array.from(
    new Set(
      experiences.map(
        (experience) => experience.role
      )
    )
  ).sort()

  const toggleSave = (id: number) => {
    setExperiences((current) =>
      current.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              saved: !experience.saved,
            }
          : experience
      )
    )
  }

  const toggleHelpful = (id: number) => {
    setExperiences((current) =>
      current.map((experience) => {
        if (experience.id !== id) {
          return experience
        }

        const isHelpful = experience.helpfulByMe

        return {
          ...experience,
          helpful: isHelpful
            ? Math.max(0, experience.helpful - 1)
            : experience.helpful + 1,
          helpfulByMe: !isHelpful,
        }
      })
    )
  }

  const addComment = (experienceId: number) => {
    const text = commentText.trim()

    if (!text) return

    setExperiences((current) =>
      current.map((experience) =>
        experience.id === experienceId
          ? {
              ...experience,
              comments: [
                ...experience.comments,
                {
                  id: Date.now(),
                  author: 'Sai Sindhu',
                  text,
                  time: 'Just now',
                },
              ],
            }
          : experience
      )
    )

    setCommentText('')
  }

  const submitPost = () => {
    const title = newPost.title.trim()
    const company = newPost.company.trim()
    const role = newPost.role.trim()
    const body = newPost.body.trim()

    if (!title || !company || !role) {
      return
    }

    const experience: Experience = {
      id: Date.now(),
      author: 'Sai Sindhu',
      company,
      role,
      datePosted: new Date().toISOString(),
      tag: 'General Discussion',
      title,
      body,
      helpful: 0,
      helpfulByMe: false,
      saved: false,
      color: 'indigo',
      comments: [],
    }

    setExperiences((current) => [
      experience,
      ...current,
    ])

    setNewPost({
      title: '',
      body: '',
      company: '',
      role: '',
    })

    setShowShare(false)
  }

  const filteredExperiences = experiences
    .filter(
      (experience) =>
        !bookmarkedOnly || experience.saved
    )
    .filter(
      (experience) =>
        companyFilter === 'All companies' ||
        experience.company === companyFilter
    )
    .filter(
      (experience) =>
        roleFilter === 'All roles' ||
        experience.role === roleFilter
    )
    .filter((experience) => {
      const query = search.trim().toLowerCase()

      if (!query) {
        return true
      }

      return [
        experience.title,
        experience.body,
        experience.company,
        experience.role,
        experience.author,
      ].some((value) =>
        value.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      switch (sortMode) {
        case 'helpful':
          return b.helpful - a.helpful

        case 'company':
          return a.company.localeCompare(
            b.company
          )

        case 'role':
          return a.role.localeCompare(b.role)

        case 'latest':
        default:
          return (
            new Date(b.datePosted).getTime() -
            new Date(a.datePosted).getTime()
          )
      }
    })

  const sortLabel = {
    latest: 'Date Posted',
    helpful: 'Most Helpful',
    company: 'Company',
    role: 'Role',
  }[sortMode]

  const resetAndViewAll = () => {
    setSearch('')
    setCompanyFilter('All companies')
    setRoleFilter('All roles')
    setSortMode('latest')
    setShowFilters(false)

    onViewAll?.()
  }

  const isPostValid =
    newPost.title.trim() &&
    newPost.company.trim() &&
    newPost.role.trim()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {bookmarkedOnly
              ? 'Bookmarked Experiences'
              : 'Interview Experiences'}
          </h1>

          <p className={styles.subtitle}>
            {bookmarkedOnly
              ? 'Your saved interview experiences'
              : 'Real experiences shared by candidates'}
          </p>
        </div>

        {!bookmarkedOnly && (
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              setShowShare((current) => !current)
            }
          >
            <span>+</span>
            Post
          </Button>
        )}
      </header>

      {!bookmarkedOnly && showShare && (
        <Card className={styles.shareCard}>
          <h3 className={styles.shareTitle}>
            Share Your Experience
          </h3>

          <div className={styles.formGrid}>
            <input
              value={newPost.title}
              onChange={(event) =>
                setNewPost((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              placeholder="Title: e.g. Frontend Developer Interview at Google"
              className={styles.input}
            />

            <input
              value={newPost.company}
              onChange={(event) =>
                setNewPost((current) => ({
                  ...current,
                  company: event.target.value,
                }))
              }
              placeholder="Company: e.g. Google"
              className={styles.input}
            />

            <input
              value={newPost.role}
              onChange={(event) =>
                setNewPost((current) => ({
                  ...current,
                  role: event.target.value,
                }))
              }
              placeholder="Role: e.g. Frontend Developer"
              className={styles.input}
            />
          </div>

          <textarea
            value={newPost.body}
            onChange={(event) =>
              setNewPost((current) => ({
                ...current,
                body: event.target.value,
              }))
            }
            placeholder="Share your interview process, questions asked, tips..."
            className={styles.textarea}
          />

          <div className={styles.shareActions}>
            <Button
              variant="primary"
              size="sm"
              onClick={submitPost}
              disabled={!isPostValid}
            >
              Post
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShare(false)}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      <div className={styles.searchRow}>
        <div className={styles.searchWrapper}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>

          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search company, role, title or candidate..."
            className={styles.searchInput}
          />
        </div>

        <button
          type="button"
          className={`${styles.filterButton} ${
            showFilters
              ? styles.filterButtonActive
              : ''
          }`}
          onClick={() =>
            setShowFilters((current) => !current)
          }
        >
          <span>☷</span>
          Filters
          <span className={styles.filterButtonValue}>
            {sortLabel}
          </span>
        </button>
      </div>

      {showFilters && (
        <Card className={styles.filterPanel}>
          <div className={styles.filterField}>
            <label htmlFor="sort-filter">
              Sort by
            </label>

            <select
              id="sort-filter"
              value={sortMode}
              onChange={(event) =>
                setSortMode(
                  event.target.value as SortMode
                )
              }
            >
              <option value="latest">
                Date Posted
              </option>
              <option value="helpful">
                Most Helpful
              </option>
              <option value="company">
                Company
              </option>
              <option value="role">
                Role
              </option>
            </select>
          </div>

          <div className={styles.filterField}>
            <label htmlFor="company-filter">
              Company
            </label>

            <select
              id="company-filter"
              value={companyFilter}
              onChange={(event) =>
                setCompanyFilter(event.target.value)
              }
            >
              <option>All companies</option>

              {companies.map((company) => (
                <option
                  key={company}
                  value={company}
                >
                  {company}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterField}>
            <label htmlFor="role-filter">
              Role
            </label>

            <select
              id="role-filter"
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value)
              }
            >
              <option>All roles</option>

              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            className={styles.clearFilters}
            onClick={() => {
              setSortMode('latest')
              setCompanyFilter('All companies')
              setRoleFilter('All roles')
            }}
          >
            Clear filters
          </button>
        </Card>
      )}

      <div className={styles.filterTabs}>
        {(
          [
            ['latest', 'Latest'],
            ['helpful', 'Most Helpful'],
            ['company', 'By Company'],
            ['role', 'By Role'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            className={`${styles.filterTab} ${
              sortMode === value
                ? styles.activeFilterTab
                : ''
            }`}
            onClick={() => setSortMode(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.resultSummary}>
        <span>
          {filteredExperiences.length}{' '}
          {filteredExperiences.length === 1
            ? 'experience'
            : 'experiences'}
        </span>

        <span>Sorted by {sortLabel}</span>
      </div>

      <div className={styles.experienceList}>
        {filteredExperiences.map((experience) => (
          <Card
            key={experience.id}
            className={styles.experienceCard}
          >
            <div className={styles.cardHeader}>
              <div className={styles.authorSection}>
                <Avatar
                  name={experience.author}
                  color={experience.color}
                />

                <div>
                  <p className={styles.authorName}>
                    {experience.author}
                  </p>

                  <p
                    className={
                      styles.authorCompanyRole
                    }
                  >
                    {experience.company}
                    <span>|</span>
                    {experience.role}
                  </p>

                  <div className={styles.authorMeta}>
                    <Tag color="indigo">
                      {experience.tag}
                    </Tag>

                    <span className={styles.time}>
                      {formatDate(
                        experience.datePosted
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                aria-label={
                  experience.saved
                    ? 'Remove bookmark'
                    : 'Bookmark experience'
                }
                onClick={() =>
                  toggleSave(experience.id)
                }
                className={`${styles.saveButton} ${
                  experience.saved
                    ? styles.saved
                    : ''
                }`}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill={
                    experience.saved
                      ? 'currentColor'
                      : 'none'
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              className={styles.experienceTitle}
              onClick={() =>
                onOpenExperience(experience)
              }
            >
              {experience.title}
            </button>

            <p className={styles.experienceBody}>
              {experience.body}
            </p>

            <div className={styles.cardActions}>
              <button
                type="button"
                onClick={() =>
                  toggleHelpful(experience.id)
                }
                className={`${styles.actionButton} ${
                  experience.helpfulByMe
                    ? styles.helpfulActive
                    : ''
                }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill={
                    experience.helpfulByMe
                      ? 'currentColor'
                      : 'none'
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                  <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
                </svg>

                Helpful · {experience.helpful}
              </button>

              <button
                type="button"
                className={styles.actionButton}
                onClick={() =>
                  setOpenComments(
                    openComments === experience.id
                      ? null
                      : experience.id
                  )
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>

                {experience.comments.length}{' '}
                Comments
              </button>
            </div>

            {openComments === experience.id && (
              <div className={styles.commentsSection}>
                {experience.comments.length > 0 ? (
                  <div className={styles.commentList}>
                    {experience.comments.map(
                      (comment) => (
                        <div
                          key={comment.id}
                          className={
                            styles.commentItem
                          }
                        >
                          <Avatar
                            name={comment.author}
                            size="sm"
                            color="indigo"
                          />

                          <div
                            className={
                              styles.commentContent
                            }
                          >
                            <div
                              className={
                                styles.commentTopLine
                              }
                            >
                              <strong>
                                {comment.author}
                              </strong>

                              <span>
                                {comment.time}
                              </span>
                            </div>

                            <p>{comment.text}</p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className={styles.noComments}>
                    No comments yet. Be the first
                    to comment.
                  </p>
                )}

                <div
                  className={
                    styles.commentComposer
                  }
                >
                  <input
                    value={commentText}
                    onChange={(event) =>
                      setCommentText(
                        event.target.value
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === 'Enter'
                      ) {
                        addComment(
                          experience.id
                        )
                      }
                    }}
                    placeholder="Write a comment..."
                  />

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      addComment(experience.id)
                    }
                    disabled={!commentText.trim()}
                  >
                    Comment
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}

        {filteredExperiences.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>
              {bookmarkedOnly ? '🔖' : '🔍'}
            </span>

            <p className={styles.emptyText}>
              {bookmarkedOnly
                ? 'You have not bookmarked any experiences yet.'
                : search
                  ? `No experiences found for "${search}".`
                  : 'No experiences match the selected filters.'}
            </p>
          </div>
        )}
      </div>

      {!bookmarkedOnly && (
        <button
          type="button"
          className={styles.viewAll}
          onClick={resetAndViewAll}
        >
          View all experiences →
        </button>
      )}
    </div>
  )
}

function formatDate(date: string): string {
  const posted = new Date(date)
  const now = new Date()

  const difference = Math.max(
    0,
    now.getTime() - posted.getTime()
  )

  const minutes = Math.floor(
    difference / 60000
  )

  const hours = Math.floor(
    difference / 3600000
  )

  const days = Math.floor(
    difference / 86400000
  )

  if (minutes < 60) {
    return `${Math.max(1, minutes)} min ago`
  }

  if (hours < 24) {
    return `${hours} hr${hours === 1 ? '' : 's'} ago`
  }

  if (days < 7) {
    return `${days} day${days === 1 ? '' : 's'} ago`
  }

  return posted.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}