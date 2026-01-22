
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { POPULAR_COURSES } from '../constants';

const Catalog: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Commercial', 'Residential', 'Management'];

  const filteredCourses = activeCategory === 'All' 
    ? POPULAR_COURSES 
    : POPULAR_COURSES.filter(c => c.category === activeCategory);

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#111813] dark:text-white min-h-screen pb-24">
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-md p-4 justify-between border-b border-gray-100 dark:border-gray-800">
        <div 
          onClick={() => navigate(-1)}
          className="text-[#111813] dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </div>
        <h2 className="text-[#111813] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Course Catalog</h2>
      </header>

      <main className="max-w-md mx-auto">
        <div className="px-4 py-4">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full shadow-sm">
              <div className="text-[#61896f] flex border-none bg-white dark:bg-gray-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input 
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111813] dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-gray-800 focus:border-none h-full placeholder:text-[#61896f] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" 
                placeholder="Search modules (e.g. flipping, taxes)..." 
              />
            </div>
          </label>
        </div>

        <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 shadow-sm transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-[#111813] font-semibold' 
                  : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-[#111813] dark:text-gray-300 font-medium'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 pt-2">
          <h3 className="text-[#111813] dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">Popular Modules</h3>
          <span className="text-primary text-sm font-semibold">See all</span>
        </div>

        <div className="flex flex-col gap-4 p-4">
          {filteredCourses.map((course) => (
            <div key={course.id} className="group">
              <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <div 
                  className="w-full bg-center bg-no-repeat aspect-[16/9] bg-cover relative" 
                  style={{ backgroundImage: `url("${course.imageUrl}")` }}
                >
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    course.level === 'Advanced' ? 'bg-[#111813]/80 text-white backdrop-blur-md' :
                    course.level === 'Intermediate' ? 'bg-primary/90 text-[#111813] backdrop-blur-md' :
                    'bg-blue-500/80 text-white backdrop-blur-md'
                  }`}>
                    {course.level}
                  </div>
                </div>
                <div className="flex w-full grow flex-col items-stretch justify-center gap-1 p-4">
                  <p className="text-primary text-xs font-bold leading-normal uppercase tracking-widest">{course.tag}</p>
                  <h4 className="text-[#111813] dark:text-white text-lg font-bold leading-tight">{course.title}</h4>
                  <div className="flex flex-col gap-3 mt-1">
                    <div className="flex items-center gap-2 text-[#61896f] dark:text-gray-400 text-sm">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{course.duration} • {course.lessonCount} lessons</span>
                    </div>
                    {course.progress !== undefined ? (
                      <div className="space-y-2">
                        <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-primary h-full" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500">{course.progress}% Completed</span>
                          <button 
                            onClick={() => navigate(`/lesson/${course.id}`)}
                            className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary/20 text-primary border border-primary/30 text-sm font-bold shadow-sm active:scale-95 transition-transform"
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-[#61896f] dark:text-gray-400 text-sm line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between pt-2">
                          {course.rating ? (
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-yellow-400 text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                              <span className="text-sm font-bold dark:text-white">{course.rating}</span>
                              <span className="text-xs text-gray-400">({course.reviewCount})</span>
                            </div>
                          ) : (
                            <div className="flex -space-x-2">
                              {[1, 2].map(i => (
                                <div key={i} className="size-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 bg-cover" style={{ backgroundImage: `url('https://picsum.photos/100/100?random=${i}')` }}></div>
                              ))}
                              <div className="flex size-6 items-center justify-center rounded-full border-2 border-white dark:border-gray-800 bg-gray-100 text-[8px] font-bold text-gray-900">+1k</div>
                            </div>
                          )}
                          <button 
                            onClick={() => navigate(`/lesson/${course.id}`)}
                            className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-9 px-4 bg-primary text-[#111813] text-sm font-bold shadow-sm active:scale-95 transition-transform"
                          >
                            Start Module
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Catalog;
