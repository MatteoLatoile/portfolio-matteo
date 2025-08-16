// /app/projets/loading.jsx
export default function Loading() {
  return (
    <div className="body-page">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="h-8 md:h-14 w-64 bg-white/10 rounded mt-20 animate-pulse" />
        <div className="h-4 w-80 bg-white/10 rounded mt-3 animate-pulse" />
      </div>

      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10 md:mt-14">
        <div className="space-y-10">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-8 animate-pulse">
      <div className="h-6 w-48 bg-white/10 rounded" />
      <div className="h-4 w-40 bg-white/10 rounded mt-3" />
      <div className="h-20 bg-white/10 rounded mt-5" />
      <div className="flex gap-2 mt-5">
        <span className="h-7 w-16 bg-white/10 rounded-full" />
        <span className="h-7 w-20 bg-white/10 rounded-full" />
        <span className="h-7 w-14 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}
