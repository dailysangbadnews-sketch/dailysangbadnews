import React from 'react';
import { X, CheckCircle, Palette, Image as ImageIcon, Download, Sparkles } from 'lucide-react';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-lg w-full p-4 sm:p-6 shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center font-bold">
              ?
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                কীভাবে ফটোকার্ড তৈরি করবেন?
              </h2>
              <p className="text-xs text-gray-500">৩টি সহজ ধাপে মাত্র ২ মিনিটে পেশাদার ফটোকার্ড</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-3.5 text-xs text-gray-700 dark:text-gray-300">
          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="w-6 h-6 rounded-full bg-[#a71924] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
              ১
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white mb-0.5">
                টেমপ্লেট নির্বাচন করুন
              </div>
              <p className="text-gray-500">
                বাম পাশের প্যানেল থেকে আপনার সংবাদের ক্যাটাগরি অনুযায়ী ৩২টি প্রিমিয়াম ডিজাইনের যেকোনো একটি বেছে নিন (যেমন: ব্রেকিং নিউজ, সম্পাদকীয়, গোল্ড, মিনিমাল ইত্যাদি)।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="w-6 h-6 rounded-full bg-[#a71924] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
              ২
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white mb-0.5">
                শিরোনাম, খবর ও ছবি দিন
              </div>
              <p className="text-gray-500">
                ‘কনটেন্ট’ ট্যাবে গিয়ে মূল শিরোনাম ও বিস্তারিত বিবরণ লিখুন। ‘ছবি ও ব্র্যান্ডিং’ ট্যাবে গিয়ে ছবি আপলোড করুন অথবা রেডিমেড নমুনা ছবি নির্বাচন করুন।
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="w-6 h-6 rounded-full bg-[#a71924] text-white flex items-center justify-center font-bold shrink-0 mt-0.5">
              ৩
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white mb-0.5">
                ক্যানভাসে পজিশন ঠিক করে ডাউনলোড করুন
              </div>
              <p className="text-gray-500">
                ক্যানভাসে যেকোনো লেখা বা ছবিতে ট্যাপ করে তীরচিহ্ন দিয়ে ডানে-বামে সরাতে পারবেন। কাজ শেষ হলে ওপরে <strong>PNG ডাউনলোড</strong> বা <strong>কপি</strong> বাটনে চাপ দিন!
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#a71924] hover:bg-[#8e141e] text-white font-bold rounded-lg text-xs"
          >
            বুঝেছি, শুরু করুন
          </button>
        </div>
      </div>
    </div>
  );
};
