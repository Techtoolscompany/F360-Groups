import React, { useState, useEffect } from 'react';
import { useSidebar } from '../../context/SidebarContext';

interface Quiz {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  duration: string;
  quizzes: Quiz[];
}

function CourseCard({ course, onSelect }: { course: Course; onSelect: (course: Course) => void }) {
  return (
    <div 
      onClick={() => onSelect(course)}
      className="bg-[#1e2128] rounded-lg overflow-hidden cursor-pointer hover:bg-[#2a2f38] transition-colors"
    >
      <img 
        src={course.thumbnail} 
        alt={course.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{course.title}</h3>
        <p className="text-gray-400 mt-1">{course.description}</p>
        <div className="flex items-center mt-4 text-sm text-gray-400">
          <span>{course.instructor}</span>
          <span className="mx-2">•</span>
          <span>{course.duration}</span>
        </div>
      </div>
    </div>
  );
}

function QuizComponent({ quiz, onComplete }: { quiz: Quiz; onComplete: () => void }) {
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete();
  };

  return (
    <div className="bg-[#1e2128] rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">{quiz.title}</h3>
      <div className="space-y-6">
        {quiz.questions.map((question, qIndex) => (
          <div key={question.id} className="space-y-4">
            <p className="text-white">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <label key={oIndex} className="flex items-center space-x-3 text-gray-300 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={answers[qIndex] === oIndex}
                    onChange={() => {
                      const newAnswers = [...answers];
                      newAnswers[qIndex] = oIndex;
                      setAnswers(newAnswers);
                    }}
                    disabled={submitted}
                    className="form-radio text-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {submitted && (
              <p className={`text-sm ${answers[qIndex] === question.correctAnswer ? 'text-green-500' : 'text-red-500'}`}>
                {answers[qIndex] === question.correctAnswer ? 'Correct!' : 'Incorrect'}
              </p>
            )}
          </div>
        ))}
      </div>
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Submit Quiz
        </button>
      )}
    </div>
  );
}

function CourseDetail({ course, onBack }: { course: Course; onBack: () => void }) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-400 hover:text-white"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Courses
      </button>

      <div className="bg-[#1e2128] rounded-lg overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white">{course.title}</h2>
          <p className="text-gray-400 mt-2">{course.description}</p>
          <div className="flex items-center mt-4 text-gray-400">
            <span>{course.instructor}</span>
            <span className="mx-2">•</span>
            <span>{course.duration}</span>
          </div>
        </div>
      </div>

      {selectedQuiz ? (
        <QuizComponent 
          quiz={selectedQuiz} 
          onComplete={() => {
            setCompletedQuizzes([...completedQuizzes, selectedQuiz.id]);
          }} 
        />
      ) : (
        <div className="bg-[#1e2128] rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Course Quizzes</h3>
          <div className="space-y-4">
            {course.quizzes.map(quiz => (
              <div 
                key={quiz.id}
                className="flex items-center justify-between p-4 bg-[#2a2f38] rounded-lg"
              >
                <div>
                  <h4 className="text-white font-medium">{quiz.title}</h4>
                  <p className="text-sm text-gray-400">{quiz.questions.length} questions</p>
                </div>
                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className={`px-4 py-2 rounded-lg ${
                    completedQuizzes.includes(quiz.id)
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {completedQuizzes.includes(quiz.id) ? 'Completed' : 'Start Quiz'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Courses() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { setIsCollapsed } = useSidebar();

  useEffect(() => {
    setIsCollapsed(!!selectedCourse);
  }, [selectedCourse, setIsCollapsed]);

  const courses: Course[] = [
    {
      id: '1',
      title: 'Introduction to Christianity',
      description: 'Learn the fundamentals of Christian faith and beliefs.',
      instructor: 'Pastor John',
      thumbnail: 'https://picsum.photos/seed/course1/800/400',
      duration: '6 weeks',
      quizzes: [
        {
          id: 'q1',
          title: 'Basic Christian Beliefs',
          questions: [
            {
              id: 'q1-1',
              question: 'What is the central figure of Christianity?',
              options: ['Moses', 'Jesus Christ', 'Abraham', 'David'],
              correctAnswer: 1
            },
            {
              id: 'q1-2',
              question: 'What is the holy book of Christianity?',
              options: ['The Quran', 'The Torah', 'The Bible', 'The Vedas'],
              correctAnswer: 2
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Bible Study Methods',
      description: 'Learn effective methods for studying the Bible.',
      instructor: 'Dr. Sarah Wilson',
      thumbnail: 'https://picsum.photos/seed/course2/800/400',
      duration: '4 weeks',
      quizzes: [
        {
          id: 'q2',
          title: 'Bible Study Techniques',
          questions: [
            {
              id: 'q2-1',
              question: 'What is exegesis?',
              options: [
                'A type of prayer',
                'Critical explanation of a text',
                'A Bible translation',
                'A church ritual'
              ],
              correctAnswer: 1
            }
          ]
        }
      ]
    }
  ];

  return (
    <div className="h-full">
      {selectedCourse ? (
        <CourseDetail 
          course={selectedCourse} 
          onBack={() => setSelectedCourse(null)} 
        />
      ) : (
        <div>
          <h1 className="text-2xl font-semibold text-white mb-6">Available Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onSelect={setSelectedCourse} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;