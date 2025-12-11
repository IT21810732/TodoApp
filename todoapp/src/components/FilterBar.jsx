const filters = [
    { id: 'all', label: 'All' },
    { id: 'completed', label: 'Completed' },
    { id: 'pending', label: 'Pending' },
  ]
  
  const FilterBar = ({ currentFilter, onChange }) => (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map(({ id, label }) => {
        const isActive = currentFilter === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
              isActive
                ? 'border-indigo-500 bg-indigo-500 text-white shadow-md'
                : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
  
  export default FilterBar
  
  