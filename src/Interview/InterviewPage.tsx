
import { useState } from 'react'
import { Card, Button, CircleProgress } from '../components/ui'
import styles from './InterviewPage.module.css'

type Sub = 'overview' | 'mockExam' | 'mockInterview' | 'feedback'

function InterviewPage() {
  const [sub, setSub] = useState<Sub>('overview')

  if (sub === 'overview') {
    return <InterviewOverview onSub={setSub} />
  }

  if (sub === 'mockExam') {
    return <MockExam onBack={() => setSub('overview')} />
  }

  if (sub === 'mockInterview') {
    return <MockInterview onBack={() => setSub('overview')} />
  }

  if (sub === 'feedback') {
    return <Feedback onBack={() => setSub('overview')} />
  }

  return null
}

/* =========================================================
   INTERVIEW OVERVIEW
========================================================= */

function InterviewOverview({
  onSub,
}: {
  onSub: (s: Sub) => void
}) {
  const recent = [
    {
      title: 'Mock Interview – Frontend Developer',
      score: 78,
      date: '2 days ago',
      sub: 'mockInterview' as Sub,
    },
    {
      title: 'Mock Exam – React Basics',
      score: 82,
      date: '5 days ago',
      sub: 'mockExam' as Sub,
    },
  ]

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.pageTitle}>
          Interview Prep
        </h1>

        <p className={styles.pageSubtitle}>
          Practice and improve your interview skills.
        </p>
      </div>

      {/* Main options */}
      <div className={styles.optionList}>
        {[
          {
            icon: '📋',
            title: 'Mock Exams',
            sub: 'mockExam' as Sub,
            desc: 'Practice DSA, JavaScript, React and other concepts.',
            color: 'indigo',
          },
          {
            icon: '🎤',
            title: 'Mock Interviews',
            sub: 'mockInterview' as Sub,
            desc: '1:1 AI interviews based on your target role and experience.',
            color: 'violet',
          },
          {
            icon: '📊',
            title: 'Feedback',
            sub: 'feedback' as Sub,
            desc: 'View your performance and get AI-powered improvement tips.',
            color: 'emerald',
          },
        ].map((item) => (
          <button
            key={item.title}
            onClick={() => onSub(item.sub)}
            className={styles.optionButton}
          >
            <span
              className={`${styles.optionIcon} ${
                styles[item.color]
              }`}
            >
              {item.icon}
            </span>

            <div className={styles.optionText}>
              <p className={styles.optionTitle}>
                {item.title}
              </p>

              <p className={styles.optionDescription}>
                {item.desc}
              </p>
            </div>

            <svg
              className={styles.optionArrow}
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

      {/* Recent Activity */}
      <div>
        <h2 className={styles.sectionTitle}>
          Your Recent Activity
        </h2>

        <Card className={styles.recentCard}>
          {recent.map((item) => (
            <div
              key={item.title}
              className={styles.recentItem}
            >
              <CircleProgress
                value={item.score}
                size={48}
                color={
                  item.score >= 80
                    ? '#059669'
                    : '#4338CA'
                }
              />

              <div className={styles.recentDetails}>
                <p className={styles.recentTitle}>
                  {item.title}
                </p>

                <p className={styles.recentMeta}>
                  Score: {item.score}% · {item.date}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSub(item.sub)}
              >
                View
              </Button>
            </div>
          ))}

          <div className={styles.viewAllContainer}>
            <button className={styles.viewAllButton}>
              View all activity →
            </button>
          </div>
        </Card>
      </div>
    </div>
  )
}

/* =========================================================
   MOCK EXAM
========================================================= */

function MockExam({
  onBack,
}: {
  onBack: () => void
}) {
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const questions = [
    {
      q: 'Which hook is used to manage side effects in React?',
      opts: [
        'useState',
        'useEffect',
        'useContext',
        'useReducer',
      ],
      correct: 1,
    },
    {
      q: 'What does the "key" prop help React identify?',
      opts: [
        'Component type',
        'DOM elements uniquely',
        'Props changes',
        'State updates',
      ],
      correct: 1,
    },
  ]

  const q = questions[current]

  if (!started) {
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
            Mock Exam
          </h1>
        </div>

        <Card className={styles.examIntroCard}>
          <div className={styles.centerContent}>
            <span className={styles.largeEmoji}>
              📋
            </span>

            <h2 className={styles.examTitle}>
              React Fundamentals
            </h2>

            <p className={styles.examSubtitle}>
              20 questions · 30 minutes · Multiple choice
            </p>

            <div className={styles.examStats}>
              {[
                ['Questions', '20'],
                ['Time', '30 min'],
                ['Topics', 'React, JS'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className={styles.examStat}
                >
                  <p className={styles.examStatValue}>
                    {value}
                  </p>

                  <p className={styles.examStatLabel}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <Button
              variant="primary"
              className={styles.fullButton}
              size="lg"
              onClick={() => setStarted(true)}
            >
              Start Exam
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.examHeader}>
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

          <span className={styles.questionCounter}>
            Question {current + 1} of {questions.length}
          </span>
        </div>

        <span className={styles.timer}>
          28:45
        </span>
      </div>

      {/* Progress */}
      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{
            width: `${
              ((current + 1) / questions.length) * 100
            }%`,
          }}
        />
      </div>

      <Card className={styles.questionCard}>
        <p className={styles.question}>
          {q.q}
        </p>

        <div className={styles.answerList}>
          {q.opts.map((option, index) => {
            let answerClass = styles.answerOption

            if (
              submitted &&
              index === q.correct
            ) {
              answerClass = `${styles.answerOption} ${styles.correctAnswer}`
            } else if (
              submitted &&
              selected === index &&
              index !== q.correct
            ) {
              answerClass = `${styles.answerOption} ${styles.wrongAnswer}`
            } else if (
              !submitted &&
              selected === index
            ) {
              answerClass = `${styles.answerOption} ${styles.selectedAnswer}`
            }

            return (
              <button
                key={index}
                onClick={() =>
                  !submitted && setSelected(index)
                }
                className={answerClass}
              >
                <span className={styles.answerLetter}>
                  {String.fromCharCode(65 + index)}.
                </span>

                {option}
              </button>
            )
          })}
        </div>

        <div className={styles.questionActions}>
          {!submitted ? (
            <Button
              variant="primary"
              disabled={selected === null}
              onClick={() => setSubmitted(true)}
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => {
                if (current < questions.length - 1) {
                  setCurrent((c) => c + 1)
                  setSelected(null)
                  setSubmitted(false)
                } else {
                  onBack()
                }
              }}
            >
              {current < questions.length - 1
                ? 'Next Question'
                : 'Finish Exam'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

/* =========================================================
   MOCK INTERVIEW
========================================================= */

function MockInterview({
  onBack,
}: {
  onBack: () => void
}) {
  const [started, setStarted] = useState(false)
  const [qIdx, setQIdx] = useState(0)
  const [answer, setAnswer] = useState('')

  const questions = [
    'Tell me about yourself and your experience with React.',
    'How do you handle state management in large React applications?',
    'Describe a challenging project you worked on and how you overcame obstacles.',
  ]

  if (!started) {
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
            Mock Interview
          </h1>
        </div>

        <Card className={styles.interviewIntroCard}>
          <span className={styles.largeEmoji}>
            🎤
          </span>

          <h2 className={styles.interviewTitle}>
            Frontend Developer Interview
          </h2>

          <p className={styles.interviewSubtitle}>
            AI-powered · 1:1 Interview simulation ·{' '}
            {questions.length} questions
          </p>

          <div className={styles.topicsBox}>
            <p className={styles.topicsTitle}>
              Topics covered:
            </p>

            <div className={styles.topicList}>
              {[
                'React',
                'JavaScript',
                'Problem Solving',
                'System Design',
                'Behavioral',
              ].map((topic) => (
                <span
                  key={topic}
                  className={styles.topic}
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            className={styles.fullButton}
            size="lg"
            onClick={() => setStarted(true)}
          >
            Start Interview
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.examHeader}>
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

          <span className={styles.questionCounter}>
            Question {qIdx + 1} of {questions.length}
          </span>
        </div>

        <span className={styles.liveBadge}>
          <span className={styles.liveDot} />
          LIVE
        </span>
      </div>

      {/* AI question */}
      <Card className={styles.aiCard}>
        <div className={styles.aiQuestion}>
          <div className={styles.aiAvatar}>
            AI
          </div>

          <div className={styles.aiMessage}>
            <p>
              {questions[qIdx]}
            </p>
          </div>
        </div>
      </Card>

      {/* Answer */}
      <Card className={styles.answerCard}>
        <p className={styles.answerLabel}>
          Your answer
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here, or use voice input..."
          className={styles.answerTextarea}
        />

        <div className={styles.answerFooter}>
          <button className={styles.voiceButton}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
              <path d="M19 10v2a7 7 0 01-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>

            Use voice
          </button>

          <Button
            variant="primary"
            disabled={!answer.trim()}
            onClick={() => {
              if (qIdx < questions.length - 1) {
                setQIdx((q) => q + 1)
                setAnswer('')
              } else {
                onBack()
              }
            }}
          >
            {qIdx < questions.length - 1
              ? 'Submit & Next'
              : 'Finish Interview'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

/* =========================================================
   FEEDBACK
========================================================= */

function Feedback({
  onBack,
}: {
  onBack: () => void
}) {
  const metrics = [
    {
      label: 'Communication',
      value: 82,
      color: 'indigo',
    },
    {
      label: 'Technical Depth',
      value: 74,
      color: 'violet',
    },
    {
      label: 'Problem Solving',
      value: 88,
      color: 'blue',
    },
    {
      label: 'Confidence',
      value: 76,
      color: 'emerald',
    },
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
          AI Feedback
        </h1>
      </div>

      {/* Overall score */}
      <Card className={styles.feedbackScoreCard}>
        <CircleProgress
          value={78}
          size={88}
          color="#4338CA"
        />

        <p className={styles.overallScore}>
          Overall Score: 78%
        </p>

        <p className={styles.overallSubtitle}>
          Mock Interview – Frontend Developer · 2 days ago
        </p>
      </Card>

      {/* Performance breakdown */}
      <Card className={styles.feedbackCard}>
        <h3 className={styles.feedbackHeading}>
          Performance Breakdown
        </h3>

        <div className={styles.metrics}>
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className={styles.metricHeader}>
                <span className={styles.metricLabel}>
                  {metric.label}
                </span>

                <span className={styles.metricValue}>
                  {metric.value}%
                </span>
              </div>

              <div className={styles.metricTrack}>
                <div
                  className={`${styles.metricFill} ${
                    styles[metric.color]
                  }`}
                  style={{
                    width: `${metric.value}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className={styles.feedbackCard}>
        <h3 className={styles.feedbackHeading}>
          AI Recommendations
        </h3>

        <div className={styles.recommendations}>
          {[
            {
              icon: '✅',
              text: 'Strong React fundamentals demonstrated with clear component examples.',
            },
            {
              icon: '💡',
              text: 'Practice explaining state management with more concrete use cases.',
            },
            {
              icon: '📈',
              text: 'Work on system design vocabulary — mention scalability patterns.',
            },
          ].map((tip, index) => (
            <div
              key={index}
              className={styles.recommendation}
            >
              <span className={styles.recommendationIcon}>
                {tip.icon}
              </span>

              <p className={styles.recommendationText}>
                {tip.text}
              </p>
            </div>
          ))}
        </div>

        <Button
          variant="primary"
          className={styles.fullButton}
          size="sm"
        >
          Practice Again
        </Button>
      </Card>
    </div>
  )
}

export default InterviewPage;