import { Link } from 'react-router-dom'

function StatusMessage({
  title,
  message,
  actionLabel,
  actionTo,
  onAction,
  isError = false,
  isLoading = false,
}) {
  return (
    <section
      role={isError ? 'alert' : 'status'}
      className="mx-auto flex min-h-56 max-w-xl flex-col items-center justify-center py-12 text-center"
    >
      {isLoading ? (
        <span
          aria-hidden="true"
          className="mb-4 size-8 animate-spin rounded-full border-2 border-blue-100 border-t-blue-600 motion-reduce:animate-none"
        />
      ) : (
        <span
          aria-hidden="true"
          className={`mb-4 flex size-11 items-center justify-center rounded-full text-lg font-semibold ${isError ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}
        >
          {isError ? '!' : 'i'}
        </span>
      )}
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">{message}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="mt-5 inline-flex min-h-11 items-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex min-h-11 items-center rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {actionLabel}
        </button>
      )}
    </section>
  )
}

export default StatusMessage