import { useState } from 'react'

const initialForm = { title: '', description: '', dueDate: '' }

const TodoForm = ({ onAddTodo }) => {
  const [form, setForm] = useState(initialForm)

  const handleChange = ({ target }) => {
    const { name, value } = target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddTodo(form)
    setForm(initialForm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white/80 p-6 shadow-xl backdrop-blur-md ring-1 ring-slate-200 dark:bg-slate-900/70 dark:ring-slate-800"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-500 dark:text-indigo-300">
            Add a task
          </p>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            What&apos;s on your mind?
          </h2>
        </div>
        <div className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100">
          Keep Things Updated
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Title
            </label>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Ship frontend, prepare slides..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/40"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Description (optional)
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Add helpful context or steps..."
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/40"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Due date (optional)
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/40"
            />
          </div>
          <button
            type="submit"
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:translate-y-[-1px] hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Add todo
            <span aria-hidden className="text-lg">
              +
            </span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default TodoForm

