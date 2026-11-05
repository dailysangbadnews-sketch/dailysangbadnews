import React from 'react';
import { SAMPLE_PRESETS, SampleCard } from '../data/samplePresets';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface SamplePresetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSample: (sample: SampleCard) => void;
}

export const SamplePresetsModal: React.FC<SamplePresetsModalProps> = ({
  isOpen,
  onClose,
  onSelectSample,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-xl w-full p-4 sm:p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                রেডিমেড নমুনা সংবাদ কার্ড
              </h2>
              <p className="text-xs text-gray-500">
                যেকোনো একটিতে ক্লিক করলেই সাথে সাথে ক্যানভাসে লোড হবে
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto pr-1">
          {SAMPLE_PRESETS.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelectSample(item);
                onClose();
              }}
              className="group border border-gray-200 dark:border-gray-800 hover:border-red-500 rounded-xl p-3 bg-gray-50 dark:bg-gray-800/60 cursor-pointer transition hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-600">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {item.template}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#a71924] transition line-clamp-2">
                  {item.values.headline}
                </h3>
                <p className="text-[11px] text-gray-500 line-clamp-2 mt-1">
                  {item.values.bodytext}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700/60 flex items-center justify-between text-[11px] text-gray-500">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {item.values.person}
                </span>
                <span className="text-red-600 dark:text-red-400 font-bold group-hover:underline flex items-center gap-1">
                  প্রয়োগ করুন →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
