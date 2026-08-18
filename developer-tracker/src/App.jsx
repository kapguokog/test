import { useState, useEffect } from 'react'
import './App.css'

// Данные разработчиков с текущими задачами и временем
const initialDevelopers = [
  {
    id: 1,
    name: 'Алексей Иванов',
    task: 'Разработка API для авторизации пользователей',
    timeSpent: 120, // минуты
    estimatedTime: 240, // минуты
    status: 'in-progress'
  },
  {
    id: 2,
    name: 'Мария Петрова',
    task: 'Интеграция платежной системы',
    timeSpent: 300,
    estimatedTime: 480,
    status: 'in-progress'
  },
  {
    id: 3,
    name: 'Дмитрий Сидоров',
    task: 'Оптимизация базы данных',
    timeSpent: 90,
    estimatedTime: 180,
    status: 'in-progress'
  },
  {
    id: 4,
    name: 'Елена Козлова',
    task: 'Создание дашборда аналитики',
    timeSpent: 450,
    estimatedTime: 600,
    status: 'completed'
  },
  {
    id: 5,
    name: 'Иван Морозов',
    task: 'Рефакторинг модуля уведомлений',
    timeSpent: 60,
    estimatedTime: 120,
    status: 'in-progress'
  }
]

function App() {
  const [developers, setDevelopers] = useState(initialDevelopers)
  const [elapsedTime, setElapsedTime] = useState(0)

  // Таймер, который обновляется каждую секунду
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Форматирование времени из минут в часы и минуты
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}ч ${mins}м`
  }

  // Форматирование прошедшего времени в реальном времени
  const formatElapsedTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Расчет прогресса выполнения задачи
  const calculateProgress = (spent, estimated) => {
    return Math.min((spent / estimated) * 100, 100)
  }

  // Обработчик завершения задачи
  const handleCompleteTask = (id) => {
    setDevelopers(developers.map(dev => 
      dev.id === id ? { ...dev, status: 'completed' } : dev
    ))
  }

  // Обработчик сброса задачи
  const handleResetTask = (id) => {
    setDevelopers(developers.map(dev => 
      dev.id === id ? { ...dev, status: 'in-progress', timeSpent: 0 } : dev
    ))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📋 Трекер задач разработчиков</h1>
        <div className="timer">
          <span>Время сессии: </span>
          <strong>{formatElapsedTime(elapsedTime)}</strong>
        </div>
      </header>

      <main className="main-content">
        <div className="developers-grid">
          {developers.map((developer) => (
            <div 
              key={developer.id} 
              className={`developer-card ${developer.status === 'completed' ? 'completed' : ''}`}
            >
              <div className="card-header">
                <div className="avatar">
                  {developer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="developer-info">
                  <h3>{developer.name}</h3>
                  <span className={`status-badge ${developer.status}`}>
                    {developer.status === 'completed' ? '✓ Завершено' : '⏳ В работе'}
                  </span>
                </div>
              </div>

              <div className="task-info">
                <h4>Текущая задача:</h4>
                <p>{developer.task}</p>
              </div>

              <div className="time-tracking">
                <div className="time-display">
                  <div className="time-item">
                    <span className="label">Затрачено:</span>
                    <span className="value">{formatTime(developer.timeSpent)}</span>
                  </div>
                  <div className="time-item">
                    <span className="label">Оценено:</span>
                    <span className="value">{formatTime(developer.estimatedTime)}</span>
                  </div>
                </div>

                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${calculateProgress(developer.timeSpent, developer.estimatedTime)}%` }}
                  ></div>
                  <span className="progress-text">
                    {Math.round(calculateProgress(developer.timeSpent, developer.estimatedTime))}%
                  </span>
                </div>
              </div>

              <div className="card-actions">
                {developer.status !== 'completed' && (
                  <button 
                    className="btn-complete"
                    onClick={() => handleCompleteTask(developer.id)}
                  >
                    ✓ Завершить задачу
                  </button>
                )}
                {developer.status === 'completed' && (
                  <button 
                    className="btn-reset"
                    onClick={() => handleResetTask(developer.id)}
                  >
                    ↻ Сбросить
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 Трекер задач разработчиков | React JS Application</p>
      </footer>
    </div>
  )
}

export default App
