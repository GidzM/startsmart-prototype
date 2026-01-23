
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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-40 no-scrollbar">
      <header className="mb-10">
        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">Learning Academy</p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Course Catalog</h1>
      </header>

      <div className="mb-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-primary text-black shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 text-gray-500 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative group max-w-sm w-full">
           <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
           <input 
             className="w-full bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-bold"
             placeholder="Search by topic..."
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <div key={course.id} className="group cursor-pointer active:scale-[0.98] transition-all">
            <div className="bg-white dark:bg-card-dark rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col h-full">
              <div 
                className="w-full aspect-video bg-cover bg-center relative" 
                style={{ backgroundImage: `url("${course.imageUrl}")` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1.5 bg-primary/90 text-black text-[9px] font-bold uppercase tracking-widest rounded-lg">{course.level}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">{course.tag}</p>
                <h4 className="text-xl font-bold tracking-tight leading-tight mb-4 group-hover:text-primary transition-colors">{course.title}</h4>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase text-gray-400 mb-8">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {course.duration}</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">menu_book</span> {course.lessonCount} lessons</span>
                </div>
                
                <div className="mt-auto">
                  {course.progress !== undefined ? (
                    <div className="space-y-4">
                      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary shadow-[0_0_8px_rgba(19,236,91,0.5)]" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold uppercase text-gray-500">{course.progress}% done</span>
                         <button onClick={() => navigate(`/lesson/${course.id}`)} className="text-primary text-[10px] font-bold uppercase tracking-widest border-b-2 border-primary">Continue</button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => navigate(`/lesson/${course.id}`)}
                      className="w-full py-4 bg-gray-50 dark:bg-gray-800 hover:bg-primary hover:text-black rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-inner flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-black"
                    >
                      Start module <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
