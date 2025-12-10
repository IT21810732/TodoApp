import TodoItem from './TodoItem'

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-10 text-center text-slate-500 shadow-inner dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
    <span className="text-4xl">🗒️</span>
    <div>
      <p className="text-lg font-semibold text-slate-700 dark:text-white">
        No todos yet
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-300">
        Add your first task to get started.
      </p>
    </div>
  </div>
)

const TodoList = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  onDragStart,
  onDrop,
}) => (
  <section className="rounded-2xl bg-white/80 p-4 shadow-xl backdrop-blur-md ring-1 ring-slate-200 dark:bg-slate-900/70 dark:ring-slate-800">
    <div className="flex items-center justify-between px-1 pb-3">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        Your tasks
      </h2>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-300">
        {todos.length} item{todos.length === 1 ? '' : 's'}
      </p>
    </div>

    {todos.length === 0 ? (
      <EmptyState />
    ) : (
      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            onEdit={onEditTodo}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </ul>
    )}
  </section>
)

export default TodoList

