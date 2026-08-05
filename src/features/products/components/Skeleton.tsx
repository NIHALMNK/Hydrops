import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#1A1A1A] pt-28 px-6 md:px-12 animate-pulse">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 py-16">
        <div className="lg:col-span-7 space-y-6">
          <div className="w-32 h-4 bg-[#E5E0D8] rounded" />
          <div className="w-3/4 h-12 bg-[#E5E0D8] rounded" />
          <div className="w-full h-20 bg-white rounded-2xl" />
          <div className="flex gap-4">
            <div className="w-36 h-12 bg-[#C8A96A]/20 rounded-full" />
            <div className="w-36 h-12 bg-[#E5E0D8] rounded-full" />
          </div>
        </div>
        <div className="lg:col-span-5 aspect-[3/4] bg-white border border-[#E5E0D8] rounded-[2rem]" />
      </div>
    </div>
  );
}
