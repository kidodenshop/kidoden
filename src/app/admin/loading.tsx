export default function AdminLoading() {
  return (
    <div className="space-y-10 animate-fade-in">
      {/* Title & Description Skeleton */}
      <div className="space-y-2.5">
        <div className="h-9 w-48 bg-brand-navy/10 rounded-2xl animate-pulse" />
        <div className="h-4 w-80 bg-brand-navy/5 rounded-xl animate-pulse" />
      </div>

      {/* KPI Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white border border-brand-mint/15 rounded-[2rem] p-6 shadow-md flex flex-col justify-between h-40 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="h-4 w-24 bg-brand-navy/10 rounded-lg animate-pulse" />
              <div className="w-9 h-9 bg-brand-mint/5 rounded-xl animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-8 w-32 bg-brand-navy/15 rounded-xl animate-pulse" />
              <div className="h-3.5 w-20 bg-brand-navy/5 rounded-md animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Skeleton: Large Block & Sidebar Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Large Block Skeleton (Recent Orders or Catalog Table) */}
        <div className="lg:col-span-2 bg-white border border-brand-mint/15 rounded-[2.5rem] p-8 shadow-md space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-brand-navy/15 rounded-xl animate-pulse" />
            <div className="h-6 w-20 bg-brand-pink/10 rounded-full animate-pulse" />
          </div>
          
          <div className="space-y-4">
            <div className="h-4 w-full bg-brand-navy/5 rounded-md animate-pulse" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center py-4 border-b border-brand-mint/5 last:border-0"
              >
                <div className="space-y-1.5">
                  <div className="h-4 w-28 bg-brand-navy/10 rounded-lg animate-pulse" />
                  <div className="h-3 w-40 bg-brand-navy/5 rounded-md animate-pulse" />
                </div>
                <div className="h-4 w-16 bg-brand-navy/15 rounded-lg animate-pulse" />
                <div className="h-6 w-16 bg-brand-mint/10 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Operations Sidebar Skeleton */}
        <div className="bg-white border border-brand-mint/15 rounded-[2.5rem] p-8 shadow-md flex flex-col justify-between h-[360px]">
          <div className="space-y-6">
            <div className="h-6 w-36 bg-brand-navy/15 rounded-xl animate-pulse" />
            
            <div className="space-y-4">
              <div className="h-20 bg-brand-pink/5 border border-brand-pink/5 rounded-2xl animate-pulse" />
              <div className="h-20 bg-brand-mint/5 border border-brand-mint/5 rounded-2xl animate-pulse" />
            </div>
          </div>

          <div className="h-12 bg-brand-yellow/10 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
