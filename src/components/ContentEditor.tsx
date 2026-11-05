import React from 'react';
import { StudioValues } from '../types/studio';
import { Calendar, Type, User, MessageSquare, Tag, Globe, Sparkles } from 'lucide-react';

interface ContentEditorProps {
  values: StudioValues;
  onChange: (key: keyof StudioValues, value: string) => void;
  onSetTodayDate: () => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  values,
  onChange,
  onSetTodayDate,
}) => {
  return (
    <div className="space-y-3.5">
      {/* Font Style Selector */}
      <div className="bg-gradient-to-r from-red-50/70 via-gray-50 to-gray-50 dark:from-red-950/30 dark:via-gray-800/60 dark:to-gray-800/60 p-3 rounded-xl border border-red-200/80 dark:border-red-900/40">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-1.5 text-xs font-bold text-gray-800 dark:text-gray-200">
            <Type className="w-4 h-4 text-[#a71924]" />
            <span>ফন্ট স্টাইল নির্বাচন (Font Style)</span>
          </label>
          <span className="text-[10px] text-gray-500 font-medium">৩টি প্রিমিয়াম ফন্ট</span>
        </div>

        {/* 3 Quick Switch Buttons */}
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {[
            { id: 'Hind Siliguri', name: 'Hind Siliguri', bn: 'হিন্দ শিলিগুড়ি', tag: 'সংবাদপত্র' },
            { id: 'Tiro Bangla', name: 'Tiro Bangla', bn: 'তিরো বাংলা', tag: 'সম্পাদকীয়' },
            { id: 'Noto Sans Bengali', name: 'Noto Sans', bn: 'নোটো সান্স', tag: 'স্পষ্ট' },
          ].map((f) => {
            const isSelected = values.font === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => onChange('font', f.id)}
                className={`p-2 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-[#a71924] bg-white dark:bg-gray-800 text-[#a71924] font-bold ring-2 ring-red-500/20 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300 hover:border-gray-300'
                }`}
              >
                <div
                  className="text-xs truncate font-bold"
                  style={{ fontFamily: f.id }}
                >
                  {f.name}
                </div>
                <div
                  className="text-[10px] text-gray-500 dark:text-gray-400 truncate mt-0.5"
                  style={{ fontFamily: f.id }}
                >
                  {f.bn}
                </div>
                <span
                  className={`inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded-full font-medium ${
                    isSelected
                      ? 'bg-red-100 text-[#a71924] dark:bg-red-950 dark:text-red-300'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  {f.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dropdown with preview */}
        <select
          value={values.font}
          onChange={(e) => onChange('font', e.target.value)}
          className="w-full px-2.5 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="Hind Siliguri">Hind Siliguri — আধুনিক ও সংবাদপত্র জনপ্রিয়</option>
          <option value="Tiro Bangla">Tiro Bangla — ক্লাসিক ও সম্পাদকীয় স্টাইল</option>
          <option value="Noto Sans Bengali">Noto Sans Bengali — পরিচ্ছন্ন ও স্পষ্ট ডিজিটাল</option>
          <option value="Noto Serif Bengali">Noto Serif Bengali — ঐতিহ্যবাহী সেরিফ</option>
        </select>
      </div>

      {/* Brand & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">
            <Globe className="w-3 h-3 text-[#a71924]" />
            <span>পোর্টাল / ব্র্যান্ডের নাম</span>
          </label>
          <input
            type="text"
            value={values.brand}
            onChange={(e) => onChange('brand', e.target.value)}
            placeholder="যেমন: দৈনিক সংবাদ"
            className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300">
              <Calendar className="w-3 h-3 text-[#a71924]" />
              <span>তারিখ ও সময়</span>
            </label>
            <button
              type="button"
              onClick={onSetTodayDate}
              className="text-[10px] text-red-600 dark:text-red-400 hover:underline flex items-center gap-0.5"
            >
              <Sparkles className="w-2.5 h-2.5" />
              আজকের দিন
            </button>
          </div>
          <input
            type="text"
            value={values.date}
            onChange={(e) => onChange('date', e.target.value)}
            placeholder="০৫ নভেম্বর ২০২৬"
            className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Main Headline */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300">
            <Type className="w-3 h-3 text-[#a71924]" />
            <span>প্রধান শিরোনাম / মূল উক্তি</span>
          </label>
          <span className="text-[10px] text-gray-400">
            {values.headline.length} অক্ষর
          </span>
        </div>
        <textarea
          rows={2}
          value={values.headline}
          onChange={(e) => onChange('headline', e.target.value)}
          placeholder="এখানে আকর্ষণীয় প্রধান শিরোনাম লিখুন…"
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-bold leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
        />
      </div>

      {/* Body / Detail Text */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300">
            <MessageSquare className="w-3 h-3 text-[#a71924]" />
            <span>বিস্তারিত বক্তব্য / সংবাদের বিবরণ</span>
          </label>
          <span className="text-[10px] text-gray-400">
            {values.bodytext.length} অক্ষর
          </span>
        </div>
        <textarea
          rows={3}
          value={values.bodytext}
          onChange={(e) => onChange('bodytext', e.target.value)}
          placeholder="সংবাদের বিস্তারিত বা উক্তির পেছনের প্রেক্ষাপট লিখুন…"
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500 resize-y min-h-[70px]"
        />
      </div>

      {/* Person & Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">
            <User className="w-3 h-3 text-[#a71924]" />
            <span>ব্যক্তির নাম / বক্তা</span>
          </label>
          <input
            type="text"
            value={values.person}
            onChange={(e) => onChange('person', e.target.value)}
            placeholder="যেমন: ফরহাদ আহমদ"
            className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">
            <Tag className="w-3 h-3 text-[#a71924]" />
            <span>পরিচয় / পদবি</span>
          </label>
          <input
            type="text"
            value={values.role}
            onChange={(e) => onChange('role', e.target.value)}
            placeholder="যেমন: সাংবাদিক ও কলামিস্ট"
            className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Footer / Extra Note */}
      <div>
        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1">
          ফুটার বার্তা / অতিরিক্ত তথ্য
        </label>
        <input
          type="text"
          value={values.footer}
          onChange={(e) => onChange('footer', e.target.value)}
          placeholder="যেমন: বিস্তারিত কমেন্টে অথবা ওয়েবসাইটে দেখুন"
          className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>
  );
};
