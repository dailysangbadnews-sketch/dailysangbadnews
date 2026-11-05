import React from 'react';
import {
  Download,
  HelpCircle,
  RotateCcw,
  Sparkles,
  FileDown,
  Upload,
  Copy,
  Check,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onDownload: (type: 'png' | 'jpg') => void;
  onCopyImage: () => void;
  onReset: () => void;
  onSaveProject: () => void;
  onOpenProject: () => void;
  onOpenGuide: () => void;
  onOpenSamplePresets: () => void;
  onDownloadOfflineApp?: () => void;
  isCopied: boolean;
  statusMessage?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onDownload,
  onCopyImage,
  onReset,
  onSaveProject,
  onOpenProject,
  onOpenGuide,
  onOpenSamplePresets,
  onDownloadOfflineApp,
  isCopied,
  statusMessage,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#111a24] text-white border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#c52c39] to-[#7d101a] flex items-center justify-center font-black text-white text-base sm:text-lg shadow-lg shadow-red-950/40">
            সং
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                দৈনিক সংবাদ
              </span>
              <span className="bg-red-600/30 text-red-300 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-red-500/30">
                PRO STUDIO
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium hidden xs:block">
              প্রফেশনাল নিউজ গ্রাফিক্স ও সোশ্যাল ফটোকার্ড মেকার
            </p>
          </div>
        </div>

        {/* Center / Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* In-App PWA Install Button */}
          <PWAInstallButton />

          {/* Sample Preset Button */}
          <button
            onClick={onOpenSamplePresets}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition"
            title="রেডিমেড নমুনা দেখুন"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">নমুনা দেখুন</span>
          </button>

          {/* Quick Guide */}
          <button
            onClick={onOpenGuide}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-medium transition"
            title="কীভাবে ব্যবহার করবেন?"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">গাইড</span>
          </button>

          {/* Save / Open Project */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-800/80 p-0.5 rounded-lg border border-gray-700">
            <button
              onClick={onSaveProject}
              className="p-1.5 hover:bg-gray-700 text-gray-300 rounded text-xs flex items-center gap-1"
              title="প্রজেক্ট ফাইল সেভ (JSON)"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>সেভ</span>
            </button>
            <button
              onClick={onOpenProject}
              className="p-1.5 hover:bg-gray-700 text-gray-300 rounded text-xs flex items-center gap-1"
              title="আগের প্রজেক্ট খুলুন"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>খুলুন</span>
            </button>
            <button
              onClick={onReset}
              className="p-1.5 hover:bg-gray-700 text-gray-400 hover:text-red-300 rounded text-xs"
              title="রিসেট"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Download Offline Standalone App */}
          {onDownloadOfflineApp && (
            <button
              onClick={onDownloadOfflineApp}
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium border border-gray-700 transition"
              title="সম্পূর্ণ স্টুডিও অফলাইন HTML ফাইল ডাউনলোড করুন"
            >
              <FileDown className="w-3.5 h-3.5 text-blue-400" />
              <span>অ্যাপ ফাইল ডাউনলোড</span>
            </button>
          )}

          {/* Copy Image Button */}
          <button
            onClick={onCopyImage}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold border border-gray-700 transition"
            title="ছবি ক্লিপবোর্ডে কপি করুন"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-300">কপি হয়েছে!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>কপি</span>
              </>
            )}
          </button>

          {/* Export PNG (Primary) */}
          <button
            onClick={() => onDownload('png')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#a71924] hover:bg-[#8d141e] text-white text-xs font-bold shadow-md shadow-red-900/30 transition active:scale-95"
            title="স্বচ্ছ ও স্পষ্ট PNG ছবি ডাউনলোড করুন"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PNG ডাউনলোড</span>
          </button>

          {/* Export JPG */}
          <button
            onClick={() => onDownload('jpg')}
            className="hidden xs:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition"
            title="সংকুচিত JPG ছবি ডাউনলোড করুন"
          >
            <span>JPG</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="bg-red-950/60 border-t border-red-900/40 text-center py-1 text-[11px] text-red-200">
          {statusMessage}
        </div>
      )}
    </header>
  );
};
