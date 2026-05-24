const Loader = () => (
  <div className="loader" role="status" aria-label="Loading">
    {/* Concentric-ring CSS spinner — no external image dependency */}
    <div
      className="size-8 rounded-full border-2 border-dark-500 border-t-blue-500 animate-spin"
      style={{ animationDuration: '0.7s' }}
    />
    <span className="sr-only">Loading…</span>
  </div>
);

export default Loader;
