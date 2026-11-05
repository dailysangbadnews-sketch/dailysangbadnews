import React, { useRef } from 'react';
import { AspectRatio, StudioValues } from '../types/studio';
import { SAMPLE_PHOTOS } from '../data/templates';
import {
  Image as ImageIcon,
  Upload,
  Palette,
  Layers,
  Ratio,
  Check,
  Sparkles,
} from 'lucide-react';

interface MediaBrandingProps {
  values: StudioValues;
  aspectRatio: AspectRatio;
  onValuesChange: (key: keyof StudioValues, value: string) => void;
  onAspectRatioChange: (ratio: AspectRatio) => void;
  onPhotoUpload: (file: File) => void;
  onLogoUpload: (file: File) => void;
  onBgUpload: (file: File) => void;
  onSelectSamplePhoto: (url: string) => void;
  hasPhoto: boolean;
  hasLogo: boolean;
  hasBg: boolean;
  onRemovePhoto: () => void;
  onRemoveLogo: () => void;
}

const PRESET_ACCENTS = [
  { name: 'সংবাদ লাল', color: '#a71924' },
  { name: 'গাঢ় মেরুন', color: '#7d101a' },
  { name: 'গোল্ডেন', color: '#d4b06a' },
  { name: 'পরিবেশ সবুজ', color: '#176b54' },
  { name: 'রয়েল ব্লু', color: '#1d4ed8' },
  { name: 'ডার্ক স্লেট', color: '#1e293b' },
  { name: 'কমলা', color: '#ea580c' },
  { name: 'কালো', color: '#111827' },
];

const PRESET_BACKGROUNDS = [
  { name: 'ক্লাসিক পেপার', color: '#f5f5f2' },
  { name: 'সাদা', color: '#ffffff' },
  { name: 'হালকা নীল-ধূসর', color: '#eef2f6' },
  { name: 'হালকা সবুজ', color: '#edf5f1' },
  { name: 'ডার্ক স্লেট', color: '#172330' },
  { name: 'ডিপ ব্ল্যাক', color: '#111822' },
];

export const MediaBranding: React.FC<MediaBrandingProps> = ({
  values,
  aspectRatio,
  onValuesChange,
  onAspectRatioChange,
  onPhotoUpload,
  onLogoUpload,
  onBgUpload,
  onSelectSamplePhoto,
  hasPhoto,
  hasLogo,
  hasBg,
  onRemovePhoto,
  onRemoveLogo,
}) => {
  const photoInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      {/* Aspect Ratio Selector */}
      <div>
        <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
          <Ratio className="w-3.5 h-3.5 text-[#a71924]" />
          <span>সোশ্যাল মিডিয়া ফ্রেমের আকার (Aspect Ratio)</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: '1:1', label: '১:১ স্কয়ার', sub: 'ফেসবুক ও ইনস্টাগ্রাম' },
            { id: '4:5', label: '৪:৫ পোর্ট্রেট', sub: 'ফেসবুক পোস্ট ফিড' },
            { id: '16:9', label: '১৬:৯ ল্যান্ডস্কেপ', sub: 'ইউটিউব ও ব্যানার' },
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => onAspectRatioChange(r.id as AspectRatio)}
              className={`p-2 rounded-xl border text-center transition-all ${
                aspectRatio === r.id
                  ? 'border-[#a71924] bg-red-50/60 dark:bg-red-950/30 ring-2 ring-red-500/20 text-[#a71924] font-bold'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div className="text-xs">{r.label}</div>
              <div className="text-[9px] text-gray-400 mt-0.5">{r.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700/80">
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-800 dark:text-gray-200">
            <ImageIcon className="w-3.5 h-3.5 text-[#a71924]" />
            <span>সংবাদ বা ব্যক্তির ছবি</span>
          </label>
          {hasPhoto && (
            <button
              onClick={onRemovePhoto}
              className="text-[10px] text-red-500 hover:text-red-700"
            >
              ছবি মুছুন
            </button>
          )}
        </div>

        {/* Upload Button */}
        <input
          type="file"
          ref={photoInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) onPhotoUpload(e.target.files[0]);
          }}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => photoInputRef.current?.click()}
          className="w-full py-2 px-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 transition"
        >
          <Upload className="w-3.5 h-3.5 text-[#a71924]" />
          <span>{hasPhoto ? 'ছবি পরিবর্তন করুন' : 'ডিভাইস থেকে ছবি আপলোড করুন'}</span>
        </button>

        {/* Curated Sample Photos for Instant 1-Click Testing */}
        <div className="mt-2.5">
          <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
            <span>অথবা নমুনা ছবি নির্বাচন করুন:</span>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {SAMPLE_PHOTOS.map((sp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSamplePhoto(sp.url)}
                className="group relative rounded-lg overflow-hidden h-10 border border-gray-200 hover:border-red-500 focus:ring-2 focus:ring-red-500 transition"
                title={sp.name}
              >
                <img
                  src={sp.url}
                  alt={sp.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-200"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logo & Background Upload */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="file"
          ref={logoInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) onLogoUpload(e.target.files[0]);
          }}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => logoInputRef.current?.click()}
          className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300"
        >
          <Upload className="w-3 h-3 text-[#a71924]" />
          <span>{hasLogo ? 'লোগো যুক্ত হয়েছে ✓' : 'লোগো আপলোড'}</span>
        </button>

        <input
          type="file"
          ref={bgInputRef}
          onChange={(e) => {
            if (e.target.files?.[0]) onBgUpload(e.target.files[0]);
          }}
          accept="image/*"
          className="hidden"
        />
        <button
          onClick={() => bgInputRef.current?.click()}
          className="p-2 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300"
        >
          <Layers className="w-3 h-3 text-[#a71924]" />
          <span>{hasBg ? 'ব্যাকগ্রাউন্ড যুক্ত ✓' : 'ব্যাকগ্রাউন্ড ছবি'}</span>
        </button>
      </div>

      {/* Color Swatches */}
      <div>
        <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
          <Palette className="w-3.5 h-3.5 text-[#a71924]" />
          <span>প্রধান থিম রং (Accent Color)</span>
        </label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="color"
            value={values.accent}
            onChange={(e) => onValuesChange('accent', e.target.value)}
            className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5"
          />
          <span className="text-xs font-mono text-gray-500 uppercase">{values.accent}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_ACCENTS.map((item) => (
            <button
              key={item.color}
              type="button"
              onClick={() => onValuesChange('accent', item.color)}
              className="w-6 h-6 rounded-full border border-black/10 shadow-sm flex items-center justify-center transition hover:scale-110"
              style={{ backgroundColor: item.color }}
              title={item.name}
            >
              {values.accent.toLowerCase() === item.color.toLowerCase() && (
                <Check className="w-3 h-3 text-white drop-shadow" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
          পটভূমির রং (Background Color)
        </label>
        <div className="flex items-center gap-2 mb-2">
          <input
            type="color"
            value={values.background}
            onChange={(e) => onValuesChange('background', e.target.value)}
            className="w-9 h-9 rounded-lg border border-gray-300 cursor-pointer p-0.5"
          />
          <span className="text-xs font-mono text-gray-500 uppercase">{values.background}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_BACKGROUNDS.map((item) => (
            <button
              key={item.color}
              type="button"
              onClick={() => onValuesChange('background', item.color)}
              className="w-6 h-6 rounded-full border border-gray-300 shadow-sm flex items-center justify-center transition hover:scale-110"
              style={{ backgroundColor: item.color }}
              title={item.name}
            >
              {values.background.toLowerCase() === item.color.toLowerCase() && (
                <Check className="w-3 h-3 text-gray-800 dark:text-white drop-shadow" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Family Selector */}
      <div>
        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-1.5">
          বাংলা ফন্ট নির্বাচন (Font Style)
        </label>
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          {[
            { id: 'Hind Siliguri', name: 'Hind Siliguri', bn: 'হিন্দ শিলিগুড়ি' },
            { id: 'Tiro Bangla', name: 'Tiro Bangla', bn: 'তিরো বাংলা' },
            { id: 'Noto Sans Bengali', name: 'Noto Sans', bn: 'নোটো সান্স' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => onValuesChange('font', f.id)}
              className={`p-2 rounded-xl border text-center transition-all ${
                values.font === f.id
                  ? 'border-[#a71924] bg-red-50 dark:bg-red-950/40 text-[#a71924] font-bold ring-2 ring-red-500/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300'
              }`}
            >
              <div className="text-xs truncate font-bold" style={{ fontFamily: f.id }}>
                {f.name}
              </div>
              <div className="text-[10px] text-gray-400 truncate mt-0.5" style={{ fontFamily: f.id }}>
                {f.bn}
              </div>
            </button>
          ))}
        </div>
        <select
          value={values.font}
          onChange={(e) => onValuesChange('font', e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="Hind Siliguri">Hind Siliguri (জনপ্রিয় সংবাদপত্র স্টাইল)</option>
          <option value="Tiro Bangla">Tiro Bangla (সম্পাদকীয় ও গম্ভীর)</option>
          <option value="Noto Sans Bengali">Noto Sans Bengali (আধুনিক ও পরিচ্ছন্ন)</option>
          <option value="Noto Serif Bengali">Noto Serif Bengali (ক্লাসিক সাহিত্যিক)</option>
        </select>
      </div>
    </div>
  );
};
