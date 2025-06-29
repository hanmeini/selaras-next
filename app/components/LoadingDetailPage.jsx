"use client";
import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';

const SkeletonBox = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
);

const LoadingDetailPage = () => {
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden bg-gray-50 min-h-screen">
        <div className="relative h-80 w-full">
          <SkeletonBox className="absolute inset-0 w-full h-full" />
          <button className="absolute top-4 left-4 z-20 bg-white/70 p-2 rounded-full shadow-lg backdrop-blur-sm">
            <FiChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        <div className="bg-white p-5 rounded-t-3xl -mt-8 relative z-10 space-y-4">
          <SkeletonBox className="h-8 w-2/3" />
          <div className="flex items-center gap-4">
            <SkeletonBox className="h-12 w-12 rounded-xl" />
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-3 w-32" />
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <SkeletonBox className="h-4 w-1/2" />
            <SkeletonBox className="h-4 w-2/3" />
          </div>

          <div className="space-y-4 mt-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonBox key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:block bg-white">
        <header className="bg-[#003366] text-white p-12 md:rounded-b-4xl relative">
          <button className="absolute top-6 left-6 z-20 bg-white/20 p-2 rounded-full">
            <FiChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="max-w-6xl mx-auto pt-8 space-y-4">
            <SkeletonBox className="h-10 w-1/2 bg-blue-300" />
            <SkeletonBox className="h-4 w-1/3 bg-blue-200" />
            <SkeletonBox className="h-4 w-1/4 bg-blue-200" />
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-8 space-y-10">
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-[400px] -mt-10">
            <SkeletonBox className="col-span-2 row-span-2 w-full h-full rounded-2xl" />
            <SkeletonBox className="w-full h-full rounded-2xl" />
            <SkeletonBox className="w-full h-full rounded-2xl" />
          </div>

          <div className="flex items-center gap-4">
            <SkeletonBox className="h-16 w-16 rounded-2xl" />
            <div className="space-y-2">
              <SkeletonBox className="h-4 w-24" />
              <SkeletonBox className="h-3 w-32" />
              <SkeletonBox className="h-3 w-24" />
            </div>
          </div>

          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonBox key={i} className="h-4 w-full" />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default LoadingDetailPage;
