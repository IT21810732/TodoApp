import { useEffect, useMemo, useState } from 'react'
import FilterBar from './components/FilterBar'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import useLocalStorage from './hooks/useLocalStorage'

const FILTERS = {
  all: 'all',
  completed: 'completed',
  pending: 'pending',
}

const generateId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `todo-${Date.now()}`

const App = () => {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [filter, setFilter] = useState(FILTERS.all)
  const [draggingId, setDraggingId] = useState(null)
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const handleAddTodo = ({ title, description, dueDate }) => {
    const trimmedTitle = title.trim()
    if (!trimmedTitle) return

    const newTodo = {
      id: generateId(),
      title: trimmedTitle,
      description: description.trim(),
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    setTodos((prev) => [...prev, newTodo])
    setFilter(FILTERS.all)
    setShowForm(false)
  }

  const handleToggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const handleEditTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo)),
    )
  }

  const handleReorder = (sourceId, targetId) => {
    if (!sourceId || !targetId || sourceId === targetId) return

    setTodos((prev) => {
      const sourceIndex = prev.findIndex(({ id }) => id === sourceId)
      const targetIndex = prev.findIndex(({ id }) => id === targetId)
      if (sourceIndex === -1 || targetIndex === -1) return prev

      const updated = [...prev]
      const [moved] = updated.splice(sourceIndex, 1)
      updated.splice(targetIndex, 0, moved)
      return updated
    })
  }

  const filteredTodos = useMemo(() => {
    if (filter === FILTERS.completed) {
      return todos.filter(({ completed }) => completed)
    }
    if (filter === FILTERS.pending) {
      return todos.filter(({ completed }) => !completed)
    }
    return todos
  }, [todos, filter])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-100 px-4 py-8 text-slate-900 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="flex flex-col gap-3 rounded-2xl bg-white/70 p-6 shadow-xl backdrop-blur-md ring-1 ring-slate-200 dark:bg-slate-900/70 dark:ring-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-300">
                Stay organized
              </p>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Todo List
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-slate-100 dark:text-slate-900"
            >
              <span className="h-2 w-2 rounded-full bg-amber-300 shadow-inner" />
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
          <FilterBar currentFilter={filter} onChange={setFilter} />
        </header>

        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:translate-y-[-1px] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {showForm ? 'Hide form' : 'Add a task'}
            <span aria-hidden className="text-lg">
              {showForm ? '−' : '+'}
            </span>
          </button>
        </div>

        {showForm && <TodoForm onAddTodo={handleAddTodo} />}

        <TodoList
          todos={filteredTodos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={handleEditTodo}
          onDragStart={setDraggingId}
          onDrop={(targetId) => handleReorder(draggingId, targetId)}
        />
      </div>
    </div>
  )
}

export default App
