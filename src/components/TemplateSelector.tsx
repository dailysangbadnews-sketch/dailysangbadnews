import React, { useState } from 'react';
import { ALL_TEMPLATES, CATEGORIES } from '../data/templates';
import { TemplateId } from '../types/studio';
import { Search, Sparkles } from 'lucide-react';

interface TemplateSelectorProps {
  currentTemplate: TemplateId;
  onSelectTemplate: (id: TemplateId) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplate,
  onSelectTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = ALL_TEMPLATES.filter((tpl) => {
    const matchesCat =
      selectedCategory === 'all' ||
      (selectedCategory === 'breaking' && (tpl.category === 'breaking' || tpl.id === 'urgent' || tpl.id === 'flashbrief')) ||
      (selectedCategory === 'quote' && (tpl.category === 'quote' || tpl.id === 'editorial')) ||
      (selectedCategory === 'report' && (tpl.category === 'report' || tpl.id === 'investigate' || tpl.id === 'data')) ||
      (selectedCategory === 'dark' && (tpl.category === 'dark' || tpl.id === 'night' || tpl.id === 'cinema' || tpl.id === 'premium')) ||
      (selectedCategory === 'minimal' && (tpl.category === 'minimal' || tpl.id === 'pa_editorial' || tpl.id === 'mono')) ||
      (selectedCategory === 'special' && (tpl.category === 'special' || tpl.id === 'agri' || tpl.id === 'community' || tpl.id === 'feature'));

    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !query ||
      tpl.name.toLowerCase().includes(query) ||
      tpl.description.toLowerCase().includes(query) ||
      tpl.num.includes(query);

    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ডিজাইন খুঁজুন (নাম বা নম্বর)…"
          className="w-full pl-9 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#a71924] text-white shadow-sm font-semibold'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-2 overflow-y-auto pr-1 max-h-[520px] scrollbar-thin">
        {filteredTemplates.map((tpl) => {
          const isActive = currentTemplate === tpl.id;
          return (
            <button
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl.id)}
              className={`group text-left p-2 rounded-xl border transition-all relative flex flex-col justify-between ${
                isActive
                  ? 'border-[#a71924] ring-2 ring-red-500/20 bg-red-50/50 dark:bg-red-950/20 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-800/80 hover:shadow-sm'
              }`}
            >
              {/* Thumbnail Representation */}
              <div className="w-full h-16 rounded-lg mb-2 relative overflow-hidden bg-gray-100 border border-gray-200/80 flex items-center justify-center">
                {/* Visual miniature mockup for the template */}
                {renderThumbnailMockup(tpl.id)}
                
                {isActive && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#a71924] text-white flex items-center justify-center text-[9px] font-bold shadow">
                    ✓
                  </span>
                )}
              </div>

              {/* Title & Info */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-800 dark:text-gray-200 leading-tight">
                  <span className="truncate">{tpl.name}</span>
                  <span className="text-[10px] text-gray-400 font-mono ml-1">{tpl.num}</span>
                </div>
                <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                  {tpl.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-8 text-gray-400 text-xs">
          কোনো ডিজাইন পাওয়া যায়নি
        </div>
      )}
    </div>
  );
};

// Mini stylized mockups for templates
function renderThumbnailMockup(id: TemplateId) {
  switch (id) {
    case 'breaking':
      return (
        <div className="w-full h-full bg-[#172331] p-1 flex flex-col justify-between">
          <div className="w-full h-1.5 bg-[#a71924] rounded-full" />
          <div className="bg-white rounded p-0.5 space-y-0.5">
            <div className="w-3/4 h-1 bg-red-800 rounded" />
            <div className="w-full h-1 bg-gray-300 rounded" />
          </div>
          <div className="w-full h-1 bg-gray-600 rounded" />
        </div>
      );
    case 'darkquote':
    case 'gold':
    case 'premium':
      return (
        <div className="w-full h-full bg-[#14202c] p-1.5 flex flex-col items-center justify-center border border-[#d4b06a]/50 rounded">
          <span className="text-[#d4b06a] text-xs font-serif font-black">“</span>
          <div className="w-3/4 h-1 bg-gray-400 rounded my-0.5" />
          <div className="w-1/2 h-0.5 bg-[#d4b06a] rounded" />
        </div>
      );
    case 'green':
    case 'agri':
      return (
        <div className="w-full h-full bg-[#edf5f1] p-1 flex flex-col justify-between border-t-2 border-[#176b54]">
          <div className="w-2/3 h-1 bg-[#176b54] rounded" />
          <div className="w-full h-5 bg-[#d2e4da] rounded" />
          <div className="w-full h-1 bg-[#176b54] rounded" />
        </div>
      );
    case 'split':
      return (
        <div className="w-full h-full flex">
          <div className="w-1/2 bg-[#a71924] p-1 flex items-center justify-center">
            <div className="w-3/4 h-1 bg-white rounded" />
          </div>
          <div className="w-1/2 bg-[#f2f3f4] p-1 flex items-center justify-center">
            <div className="w-3/4 h-1 bg-gray-400 rounded" />
          </div>
        </div>
      );
    case 'portrait':
      return (
        <div className="w-full h-full bg-[#f8f9fa] p-1 flex gap-1">
          <div className="w-1/2 space-y-1">
            <div className="w-full h-1 bg-red-700 rounded" />
            <div className="w-4/5 h-1 bg-gray-400 rounded" />
          </div>
          <div className="w-1/2 h-full bg-gray-300 rounded flex items-center justify-center text-[8px] text-gray-500 font-bold">
            ছবি
          </div>
        </div>
      );
    case 'cinema':
    case 'photojournal':
      return (
        <div className="w-full h-full bg-[#111822] relative p-1 flex flex-col justify-end">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80" />
          <div className="relative z-10 w-full space-y-0.5">
            <div className="w-3/4 h-1 bg-white rounded" />
            <div className="w-1/2 h-0.5 bg-[#d6b66d] rounded" />
          </div>
        </div>
      );
    default:
      return (
        <div className="w-full h-full bg-[#f5f5f2] p-1.5 flex flex-col justify-between border-t-2 border-[#a71924]">
          <div className="w-1/3 h-1 bg-red-800 rounded" />
          <div className="space-y-0.5">
            <div className="w-full h-1 bg-gray-800 rounded" />
            <div className="w-4/5 h-0.5 bg-gray-500 rounded" />
          </div>
          <div className="w-full h-1 bg-red-800 rounded" />
        </div>
      );
  }
}
