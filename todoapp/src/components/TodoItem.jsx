import { useMemo, useState } from 'react'

const formatDate = (dateString) => {
  if (!dateString) return 'No due date'
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'No due date'
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDrop,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate ?? '',
  })

  const statusStyles = useMemo(
    () =>
      todo.completed
        ? 'border-green-200 bg-green-50 text-green-700 dark:border-green-900/50 dark:bg-green-900/30 dark:text-green-100'
        : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-100',
    [todo.completed],
  )

  const handleSave = () => {
    if (!draft.title.trim()) return
    onEdit(todo.id, {
      title: draft.title.trim(),
      description: draft.description.trim(),
      dueDate: draft.dueDate,
    })
    setIsEditing(false)
  }

  return (
    <li
      draggable
      onDragStart={() => onDragStart(todo.id)}
      onDragOver={(event) => event.preventDefault()}
      onDrop={() => onDrop(todo.id)}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-md backdrop-blur transition hover:-translate-y-[1px] hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/70"
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="grid gap-3 md:grid-cols-[1fr,220px] md:items-start md:gap-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="mt-1 h-5 w-5 cursor-pointer rounded border-slate-300 text-indigo-600 transition focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-800"
          />
          <div className="flex-1 space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={draft.title}
                  onChange={({ target }) =>
                    setDraft((prev) => ({ ...prev, title: target.value }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/40"
                />
                <textarea
                  value={draft.description}
                  onChange={({ target }) =>
                    setDraft((prev) => ({ ...prev, description: target.value }))
                  }
                  rows={2}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/40"
                />
                <input
                  type="date"
                  value={draft.dueDate ?? ''}
                  onChange={({ target }) =>
                    setDraft((prev) => ({ ...prev, dueDate: target.value }))
                  }
                  className="w-40 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-500 dark:focus:ring-indigo-500/40"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-start gap-2">
                  <h3
                    className={`text-lg font-semibold ${
                      todo.completed
                        ? 'text-slate-500 line-through'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {todo.title}
                  </h3>
                  <span
                    className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}
                  >
                    {todo.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                {todo.description && (
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {todo.description}
                  </p>
                )}
              </div>
            )}
          </div>
        </label>

        <div className="flex w-full flex-col items-start gap-3 md:w-full md:items-end">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Due
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200">
            {formatDate(todo.dueDate)}
          </div>

          <div className="flex w-full flex-wrap justify-end gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-lg bg-emerald-500 px-3 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false)
                    setDraft({
                      title: todo.title,
                      description: todo.description,
                      dueDate: todo.dueDate ?? '',
                    })
                  }}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="flex-1 rounded-lg bg-rose-500 px-3 py-2 text-xs font-semibold text-white shadow transition hover:bg-rose-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export default TodoItem

