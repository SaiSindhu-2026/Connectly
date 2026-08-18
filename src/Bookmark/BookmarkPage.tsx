import { useEffect, useState } from 'react'
import type {
  Dispatch,
  SetStateAction,
} from 'react'

import {
  Avatar,
  Button,
  Card,
  StarRating,
  Tag,
} from '../components/ui'

import type {
  Experience,
} from './ExperiencesPage'

import styles from './BookmarkPage.module.css'

type Props = {
  experience: Experience

  setExperiences: Dispatch<
    SetStateAction<Experience[]>
  >

  onBack: () => void
}

type Course = {
  id: number
  emoji: string
  title: string
  provider: string
  level: string
  hours: number
  rating: number
  color: string
  tag?: string
  topic: string
  url: string
}

const SAVED_COURSES_KEY =
  'connectly_saved_courses'

/*
  Keep this list synchronized with the
  courses available in Courses.tsx.

  Later, when you connect your backend,
  this should come from your API/database.
*/
const COURSES: Course[] = [
  {
    id: 1,
    emoji: '⚛️',
    title: 'React – The Complete Guide',
    provider: 'Udemy',
    level: 'Beginner to Advanced',
    hours: 48,
    rating: 4.8,
    color: 'dark',
    tag: 'Top Pick',
    topic: 'React',
    url: 'https://www.udemy.com/courses/search/?q=React%20The%20Complete%20Guide',
  },

  {
    id: 2,
    emoji: '🔢',
    title: 'JavaScript Algorithms and Data Structures',
    provider: 'freeCodeCamp',
    level: 'Intermediate',
    hours: 300,
    rating: 4.8,
    color: 'yellow',
    tag: 'Popular',
    topic: 'JavaScript & DSA',
    url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/',
  },

  {
    id: 3,
    emoji: '⚡',
    title: 'React Query – The Complete Guide',
    provider: 'Udemy',
    level: 'Intermediate',
    hours: 12,
    rating: 4.5,
    color: 'violet',
    topic: 'React Query',
    url: 'https://www.udemy.com/courses/search/?q=React%20Query',
  },

  {
    id: 4,
    emoji: '🌿',
    title: 'Node.js – Basics to Advanced',
    provider: 'Coursera',
    level: 'Beginner',
    hours: 24,
    rating: 4.6,
    color: 'green',
    tag: 'New',
    topic: 'Node.js',
    url: 'https://www.coursera.org/search?query=node.js',
  },

  {
    id: 5,
    emoji: '🎨',
    title: 'CSS Mastery: Flexbox & Grid',
    provider: 'Frontend Masters',
    level: 'Intermediate',
    hours: 8,
    rating: 4.7,
    color: 'pink',
    topic: 'CSS',
    url: 'https://frontendmasters.com/courses/css-grid-flexbox-v2/',
  },

  {
    id: 6,
    emoji: '🟨',
    title: 'TypeScript for JavaScript Developers',
    provider: 'YouTube',
    level: 'Intermediate',
    hours: 6,
    rating: 4.7,
    color: 'yellow',
    tag: 'Trending',
    topic: 'TypeScript',
    url: 'https://www.youtube.com/results?search_query=TypeScript+for+JavaScript+Developers',
  },

  {
    id: 7,
    emoji: '🚀',
    title: 'Full Stack Web Development',
    provider: 'Coursera',
    level: 'Intermediate',
    hours: 40,
    rating: 4.6,
    topic: 'Full Stack',
    url: 'https://www.coursera.org/search?query=full%20stack%20web%20development',
  },

  {
    id: 8,
    emoji: '☁️',
    title: 'AWS Cloud Practitioner Essentials',
    provider: 'AWS',
    level: 'Beginner',
    hours: 10,
    rating: 4.7,
    tag: 'Trending',
    topic: 'Cloud',
    url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/',
  },
]

function getSavedCourseIds(): number[] {
  try {
    const saved =
      localStorage.getItem(
        SAVED_COURSES_KEY
      )

    if (!saved) {
      return []
    }

    const parsed = JSON.parse(saved)

    return Array.isArray(parsed)
      ? parsed
      : []
  } catch {
    return []
  }
}

export default function BookmarkPage({
  experience,
  setExperiences,
  onBack,
}: Props) {
  const [commentText, setCommentText] =
    useState('')

  const [
    savedCourseIds,
    setSavedCourseIds,
  ] = useState<number[]>(
    getSavedCourseIds
  )

  /*
    Listen for bookmark changes coming
    from CoursesPage.
  */
  useEffect(() => {
    const updateCourses = () => {
      setSavedCourseIds(
        getSavedCourseIds()
      )
    }

    window.addEventListener(
      'connectly-course-bookmarks-updated',
      updateCourses
    )

    return () => {
      window.removeEventListener(
        'connectly-course-bookmarks-updated',
        updateCourses
      )
    }
  }, [])

  /*
    Get actual course objects from
    the saved course IDs.
  */
  const bookmarkedCourses =
    COURSES.filter((course) =>
      savedCourseIds.includes(
        course.id
      )
    )

  const toggleHelpful = () => {
    setExperiences((prev) =>
      prev.map((item) =>
        item.id === experience.id
          ? {
              ...item,

              helpful:
                item.helpfulByMe
                  ? Math.max(
                      0,
                      item.helpful - 1
                    )
                  : item.helpful + 1,

              helpfulByMe:
                !item.helpfulByMe,
            }
          : item
      )
    )
  }

  const toggleSave = () => {
    setExperiences((prev) =>
      prev.map((item) =>
        item.id === experience.id
          ? {
              ...item,
              saved: !item.saved,
            }
          : item
      )
    )
  }

  const addComment = () => {
    const text =
      commentText.trim()

    if (!text) return

    setExperiences((prev) =>
      prev.map((item) =>
        item.id === experience.id
          ? {
              ...item,

              comments: [
                ...item.comments,

                {
                  id: Date.now(),
                  author: 'Sai Sindhu',
                  text,
                  time: 'Just now',
                },
              ],
            }
          : item
      )
    )

    setCommentText('')
  }

  const openCourse = (
    course: Course
  ) => {
    window.open(
      course.url,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const removeCourseBookmark = (
    courseId: number
  ) => {
    const updated =
      savedCourseIds.filter(
        (id) => id !== courseId
      )

    localStorage.setItem(
      SAVED_COURSES_KEY,
      JSON.stringify(updated)
    )

    setSavedCourseIds(updated)

    window.dispatchEvent(
      new Event(
        'connectly-course-bookmarks-updated'
      )
    )
  }

  return (
    <div className={styles.page}>

      {/* =========================
          BACK
      ========================= */}

      <button
        type="button"
        className={styles.backButton}
        onClick={onBack}
      >
        ← Back to experiences
      </button>

      {/* =========================
          EXPERIENCE
      ========================= */}

      <Card
        className={
          styles.detailCard
        }
      >
        <div
          className={
            styles.topRow
          }
        >
          <div
            className={
              styles.authorSection
            }
          >
            <Avatar
              name={
                experience.author
              }
              color={
                experience.color as any
              }
              size="lg"
            />

            <div>
              <h1
                className={
                  styles.title
                }
              >
                {
                  experience.title
                }
              </h1>

              <p
                className={
                  styles.authorName
                }
              >
                {
                  experience.author
                }
              </p>

              <p
                className={
                  styles.companyRole
                }
              >
                {
                  experience.company
                }

                <span>
                  |
                </span>

                {
                  experience.role
                }
              </p>

              <div
                className={
                  styles.meta
                }
              >
                <Tag color="indigo">
                  {
                    experience.tag
                  }
                </Tag>

                <span>
                  {new Date(
                    experience.datePosted
                  ).toLocaleDateString(
                    'en-IN',
                    {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }
                  )}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className={`${styles.saveButton} ${
              experience.saved
                ? styles.saved
                : ''
            }`}
            onClick={toggleSave}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={
                experience.saved
                  ? 'currentColor'
                  : 'none'
              }
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>

            {experience.saved
              ? 'Bookmarked'
              : 'Bookmark'}
          </button>
        </div>

        <div
          className={
            styles.body
          }
        >
          {
            experience.body
          }
        </div>

        {experience.image && (
          <img
            src={
              experience.image
            }
            alt="Interview experience attachment"
            className={
              styles.image
            }
          />
        )}

        <div
          className={
            styles.actions
          }
        >
          <button
            type="button"
            className={`${styles.actionButton} ${
              experience.helpfulByMe
                ? styles.active
                : ''
            }`}
            onClick={
              toggleHelpful
            }
          >
            👍 Helpful ·{' '}
            {
              experience.helpful
            }
          </button>

          <span
            className={
              styles.commentCount
            }
          >
            💬{' '}
            {
              experience
                .comments
                .length
            }{' '}
            Comments
          </span>
        </div>
      </Card>

      {/* =========================
          COMMENTS
      ========================= */}

      <Card
        className={
          styles.commentsCard
        }
      >
        <h2>
          Comments (
          {
            experience
              .comments
              .length
          }
          )
        </h2>

        {experience.comments
          .length === 0 ? (
          <p
            className={
              styles.noComments
            }
          >
            No comments yet.
            Start the discussion.
          </p>
        ) : (
          <div
            className={
              styles.commentList
            }
          >
            {experience.comments.map(
              (comment) => (
                <div
                  key={
                    comment.id
                  }
                  className={
                    styles.commentItem
                  }
                >
                  <Avatar
                    name={
                      comment.author
                    }
                    size="sm"
                    color="indigo"
                  />

                  <div>
                    <div
                      className={
                        styles.commentHeader
                      }
                    >
                      <strong>
                        {
                          comment.author
                        }
                      </strong>

                      <span>
                        {
                          comment.time
                        }
                      </span>
                    </div>

                    <p>
                      {
                        comment.text
                      }
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        <div
          className={
            styles.composer
          }
        >
          <input
            value={
              commentText
            }
            onChange={(e) =>
              setCommentText(
                e.target.value
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === 'Enter'
              ) {
                addComment()
              }
            }}
            placeholder="Write a comment..."
          />

          <Button
            variant="primary"
            size="sm"
            onClick={
              addComment
            }
            disabled={
              !commentText.trim()
            }
          >
            Comment
          </Button>
        </div>
      </Card>

      {/* =========================
          BOOKMARKED COURSES
      ========================= */}

      <Card
        className={
          styles.coursesCard
        }
      >
        <div
          className={
            styles.coursesHeader
          }
        >
          <div>
            <h2>
              Bookmarked Courses
            </h2>

            <p>
              Courses you've saved
              for later
            </p>
          </div>

          <span
            className={
              styles.courseCount
            }
          >
            {
              bookmarkedCourses.length
            }
          </span>
        </div>

        {bookmarkedCourses.length ===
        0 ? (
          <div
            className={
              styles.noCourses
            }
          >
            <div
              className={
                styles.noCoursesIcon
              }
            >
              🔖
            </div>

            <h3>
              No bookmarked courses
            </h3>

            <p>
              Save courses from
              Suggested Courses and
              they'll appear here.
            </p>
          </div>
        ) : (
          <div
            className={
              styles.courseList
            }
          >
            {bookmarkedCourses.map(
              (course) => (
                <div
                  key={
                    course.id
                  }
                  className={
                    styles.courseItem
                  }
                >
                  <div
                    className={`${styles.courseIcon} ${
                      styles[
                        course.color
                      ]
                    }`}
                  >
                    {
                      course.emoji
                    }
                  </div>

                  <div
                    className={
                      styles.courseInfo
                    }
                  >
                    <button
                      type="button"
                      className={
                        styles.courseTitle
                      }
                      onClick={() =>
                        openCourse(
                          course
                        )
                      }
                    >
                      {
                        course.title
                      }
                    </button>

                    <div
                      className={
                        styles.courseTopic
                      }
                    >
                      {
                        course.topic
                      }
                    </div>

                    <div
                      className={
                        styles.courseMetadata
                      }
                    >
                      <span>
                        {
                          course.provider
                        }
                      </span>

                      <span>
                        ·
                      </span>

                      <span>
                        {
                          course.level
                        }
                      </span>

                      <span>
                        ·
                      </span>

                      <span>
                        {
                          course.hours
                        }{' '}
                        hours
                      </span>
                    </div>

                    <div
                      className={
                        styles.courseRating
                      }
                    >
                      <StarRating
                        rating={
                          course.rating
                        }
                      />

                      <span>
                        {
                          course.rating
                        }
                      </span>

                      {course.tag && (
                        <Tag color="indigo">
                          {
                            course.tag
                          }
                        </Tag>
                      )}
                    </div>
                  </div>

                  <div
                    className={
                      styles.courseActions
                    }
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        openCourse(
                          course
                        )
                      }
                    >
                      View Course
                    </Button>

                    <button
                      type="button"
                      className={
                        styles.removeCourse
                      }
                      onClick={() =>
                        removeCourseBookmark(
                          course.id
                        )
                      }
                      aria-label="Remove course bookmark"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </Card>
    </div>
  )
}