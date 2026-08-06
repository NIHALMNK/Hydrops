export default function ContactLoading() {
  return (
    <main className="min-h-screen w-full bg-[#F8F6F1] pt-32 pb-24 px-6 sm:px-10 lg:px-16 animate-pulse">
      {/* Hero Skeleton */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <div className="h-4 w-32 bg-[#E8E5DF] rounded-full mx-auto mb-6" />
        <div className="h-14 sm:h-20 w-3/4 bg-[#E8E5DF] rounded-2xl mx-auto mb-6" />
        <div className="h-5 w-full bg-[#E8E5DF] rounded-lg mx-auto mb-3" />
        <div className="h-5 w-2/3 bg-[#E8E5DF] rounded-lg mx-auto" />
      </div>

      {/* Cards Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-52 bg-[#E8E5DF] rounded-3xl" />
        ))}
      </div>

      {/* Form Skeleton */}
      <div className="max-w-4xl mx-auto h-[500px] bg-[#E8E5DF] rounded-[2.5rem]" />
    </main>
  );
}
