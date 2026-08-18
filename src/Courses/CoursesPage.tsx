import { useMemo, useState } from 'react';
import { Card, Button, StarRating } from '../components/ui';
import styles from './CoursesPage.module.css';

type CourseCategory = 'topPicks' | 'trending' | 'resumeSpecific';
type CourseColor = 'dark' | 'yellow' | 'violet' | 'green' | 'pink';

type Course = {
  id: number;
  emoji: string;
  title: string;
  provider: string;
  level: string;
  hours: number;
  rating: number;
  color: CourseColor;
  tag?: string;
  topic: string;
  category: CourseCategory[];
  keywords: string[];
  url: string;
};

const SAVED_COURSES_KEY = 'connectly_saved_courses';

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
    category: ['topPicks', 'resumeSpecific'],
    keywords: ['react', 'frontend', 'javascript', 'web development'],
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
    category: ['topPicks', 'resumeSpecific'],
    keywords: ['javascript', 'dsa', 'algorithms', 'data structures'],
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
    category: ['trending', 'resumeSpecific'],
    keywords: ['react query', 'tanstack query', 'react', 'api'],
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
    category: ['trending', 'resumeSpecific'],
    keywords: ['node', 'node.js', 'backend', 'javascript', 'express'],
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
    category: ['topPicks', 'resumeSpecific'],
    keywords: ['css', 'flexbox', 'grid', 'frontend', 'web design'],
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
    category: ['trending', 'resumeSpecific'],
    keywords: ['typescript', 'javascript', 'react', 'frontend'],
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
    color: 'violet',
    topic: 'Full Stack',
    category: ['topPicks', 'resumeSpecific'],
    keywords: ['full stack', 'react', 'node', 'javascript', 'mongodb'],
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
    color: 'dark',
    tag: 'Trending',
    topic: 'Cloud',
    category: ['trending'],
    keywords: ['aws', 'cloud', 'devops', 'cloud computing'],
    url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/',
  },
];

const CATEGORY_LABELS: Record<CourseCategory, string> = {
  topPicks: 'Top Picks',
  trending: 'Trending',
  resumeSpecific: 'Resume Specific',
};

function getSavedCourseIds(): Set<number> {
  try {
    const saved = localStorage.getItem(SAVED_COURSES_KEY);

    if (!saved) {
      return new Set();
    }

    const parsed: number[] = JSON.parse(saved);

    return new Set(parsed);
  } catch {
    return new Set();
  }
}

function saveCourseIds(ids: Set<number>) {
  localStorage.setItem(
    SAVED_COURSES_KEY,
    JSON.stringify(Array.from(ids))
  );

  window.dispatchEvent(new Event('connectly-course-bookmarks-updated'));
}

export default function CoursesPage() {
  const [category, setCategory] =
    useState<CourseCategory>('topPicks');

  const [tab, setTab] =
    useState<'forYou' | 'all'>('forYou');

  const [search, setSearch] = useState('');

  const [saved, setSaved] =
    useState<Set<number>>(() => getSavedCourseIds());

  const toggleSaved = (id: number) => {
    setSaved((previous) => {
      const next = new Set(previous);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      saveCourseIds(next);

      return next;
    });
  };

  const openCourse = (course: Course) => {
    window.open(course.url, '_blank', 'noopener,noreferrer');
  };

  const filteredCourses = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return COURSES
      .filter((course) => {
        if (tab === 'all') {
          return true;
        }

        return course.category.includes(category);
      })
      .filter((course) => {
        if (!searchTerm) {
          return true;
        }

        const searchableContent = [
          course.title,
          course.provider,
          course.topic,
          course.level,
          ...course.keywords,
        ]
          .join(' ')
          .toLowerCase();

        return searchableContent.includes(searchTerm);
      })
      .sort((a, b) => b.rating - a.rating);
  }, [category, tab, search]);

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            Suggested Courses
          </h1>

          <p className={styles.subtitle}>
            Courses recommended to build the right skills
          </p>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrapper}>
        <svg
          className={styles.searchIcon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
          />

          <path d="m20 20-3.5-3.5" />
        </svg>

        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search courses, skills, technologies..."
          className={styles.searchInput}
        />

        {search && (
          <button
            className={styles.clearSearch}
            onClick={() => setSearch('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* Main tabs */}
      <div className={styles.tabs}>
        <button
          onClick={() => setTab('forYou')}
          className={`${styles.tab} ${
            tab === 'forYou'
              ? styles.activeTab
              : ''
          }`}
        >
          For You
        </button>

        <button
          onClick={() => setTab('all')}
          className={`${styles.tab} ${
            tab === 'all'
              ? styles.activeTab
              : ''
          }`}
        >
          Browse All
        </button>
      </div>

      {/* Recommendation categories */}
      {tab === 'forYou' && (
        <div className={styles.categoryTabs}>
          {(
            Object.keys(CATEGORY_LABELS) as CourseCategory[]
          ).map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`${styles.categoryButton} ${
                category === item
                  ? styles.activeCategory
                  : ''
              }`}
            >
              {CATEGORY_LABELS[item]}
            </button>
          ))}
        </div>
      )}

      {/* Results information */}
      <div className={styles.resultsHeader}>
        <span>
          {search
            ? `Search results for "${search}"`
            : tab === 'all'
              ? 'All courses'
              : CATEGORY_LABELS[category]}
        </span>

        <span className={styles.resultCount}>
          {filteredCourses.length} courses
        </span>
      </div>

      {/* Course list */}
      <div className={styles.courseList}>
        {filteredCourses.map((course) => {
          const isSaved = saved.has(course.id);

          return (
            <Card
              key={course.id}
              className={styles.courseCard}
            >
              <div className={styles.courseContent}>

                {/* Course Icon */}
                <div
                  className={`${styles.courseIcon} ${
                    styles[course.color]
                  }`}
                >
                  {course.emoji}
                </div>

                {/* Course Details */}
                <div className={styles.courseDetails}>

                  <div className={styles.courseTitleRow}>

                    {/* Clickable Course Title */}
                    <button
                      className={styles.courseTitle}
                      onClick={() => openCourse(course)}
                    >
                      {course.title}
                    </button>

                    {/* Bookmark */}
                    <button
                      onClick={() =>
                        toggleSaved(course.id)
                      }
                      className={`${styles.saveButton} ${
                        isSaved
                          ? styles.saved
                          : ''
                      }`}
                      aria-label={
                        isSaved
                          ? 'Remove saved course'
                          : 'Save course'
                      }
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={
                          isSaved
                            ? 'currentColor'
                            : 'none'
                        }
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Topic */}
                  <div className={styles.topic}>
                    {course.topic}
                  </div>

                  {/* Metadata */}
                  <div className={styles.metadata}>
                    <span>{course.provider}</span>

                    <span className={styles.dot}>
                      ·
                    </span>

                    <span>{course.level}</span>

                    <span className={styles.dot}>
                      ·
                    </span>

                    <span>
                      {course.hours} hours
                    </span>
                  </div>

                  {/* Rating */}
                  <div className={styles.ratingRow}>
                    <StarRating
                      rating={course.rating}
                    />

                    <span
                      className={styles.ratingNumber}
                    >
                      {course.rating}
                    </span>

                    {course.tag && (
                      <span
                        className={`${styles.tag} ${
                          course.tag === 'Top Pick'
                            ? styles.topPick
                            : course.tag === 'Popular'
                              ? styles.popular
                              : styles.new
                        }`}
                      >
                        {course.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Button */}
              <div className={styles.buttonRow}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => openCourse(course)}
                >
                  View Course
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty state */}
      {filteredCourses.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            🔍
          </div>

          <h3>No courses found</h3>

          <p>
            Try searching for another skill,
            technology, or course.
          </p>

          <button
            className={styles.clearButton}
            onClick={() => {
              setSearch('');
              setTab('all');
            }}
          >
            Browse all courses
          </button>
        </div>
      )}

      {/* View more */}
      {filteredCourses.length > 0 && (
        <button
          className={styles.viewMore}
          onClick={() => setTab('all')}
        >
          View all courses →
        </button>
      )}
    </div>
  );
}