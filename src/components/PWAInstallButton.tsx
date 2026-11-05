import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Smartphone, Download, X, Share2, PlusSquare, CheckCircle2 } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (!ok) {
        setShowGuide(true);
      }
    } else {
      setShowGuide(true);
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // If already installed and running as a standalone app, show clean active badge or return null
  if (isInstalled) {
    return (
      <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>অ্যাপ মোডে আছে</span>
      </div>
    );
  }

  return (
    <>
      {/* Dynamic Install Button */}
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-950/40 transition active:scale-95 animate-pulse hover:animate-none"
        title="আপনার ডিভাইসে সরাসরি অ্যাপ ইনস্টল করুন"
      >
        <Smartphone className="w-3.5 h-3.5" />
        <span>অ্যাপ ইনস্টল করুন</span>
      </button>

      {/* Guided Modal for Android, iOS & Desktop */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                    মোবাইলে অ্যাপ হিসেবে ইনস্টল করুন
                  </h3>
                  <p className="text-[11px] text-gray-500">
                    প্লে-স্টোর ছাড়াই আপনার ফোনের হোম স্ক্রিনে অ্যাপ যুক্ত করুন
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step by step for iOS vs Android */}
            <div className="space-y-3 text-xs text-gray-700 dark:text-gray-300">
              {isIOS ? (
                /* iOS iPhone/iPad Instructions */
                <div className="space-y-2.5 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="font-bold text-gray-900 dark:text-white text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    আইফোন বা আইপ্যাডে (Safari ব্রাউজার):
                  </div>
                  <ol className="list-decimal pl-4 space-y-1.5 text-gray-600 dark:text-gray-300">
                    <li>
                      সাফারি ব্রাউজারের নিচে থাকা <strong>Share (শেয়ার)</strong> বাটনে চাপ দিন।
                    </li>
                    <li>
                      মেনু থেকে নিচের দিকে স্ক্রল করে <strong>‘Add to Home Screen’ (হোম স্ক্রিনে যোগ করুন)</strong> নির্বাচন করুন।
                    </li>
                    <li>
                      উপরে ডানে থাকা <strong>‘Add’</strong> বাটনে চাপ দিন। আপনার ফোনে অ্যাপটি ইনস্টল হয়ে যাবে!
                    </li>
                  </ol>
                </div>
              ) : (
                /* Android / Chrome Instructions */
                <div className="space-y-2.5 bg-gray-50 dark:bg-gray-800/60 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="font-bold text-gray-900 dark:text-white text-xs flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    অ্যান্ড্রয়েড ফোনে (Chrome ব্রাউজার):
                  </div>
                  <ol className="list-decimal pl-4 space-y-1.5 text-gray-600 dark:text-gray-300">
                    <li>
                      ব্রাউজারের উপরে ডানদিকের <strong>তিনটি বিন্দু (⋮)</strong> মেনুতে চাপ দিন।
                    </li>
                    <li>
                      মেনু থেকে <strong>‘Install app’ (অ্যাপ ইনস্টল করুন)</strong> অথবা <strong>‘Add to Home screen’</strong> চাপুন।
                    </li>
                    <li>
                      তারপর <strong>‘Install’</strong> বাটনে চাপ দিলেই সরাসরি আপনার ফোনে একটি আলাদা অ্যাপের মতো বসে যাবে।
                    </li>
                  </ol>
                </div>
              )}

              {/* Important Note about In-App Browsers */}
              <div className="bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200">
                ⚠️ <strong>জরুরি টিপস:</strong> আপনি যদি ফেসবুক, মেসেঞ্জার বা ইমেইলের ভেতরের ব্রাউজারে লিংকটি খুলে থাকেন, তবে সেখানে সরাসরি ইনস্টল হবে না। লিংকটি কপি করে আপনার ফোনের মূল <strong>Google Chrome</strong> (বা Safari) ব্রাউজারে ওপেন করুন।
              </div>

              {/* Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full py-2 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 flex items-center justify-center gap-1.5 transition"
              >
                <span>{copiedLink ? 'লিংক কপি হয়েছে ✓' : 'অ্যাপের লিংক কপি করুন'}</span>
              </button>
            </div>

            {/* Close Button */}
            <div className="pt-1 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="w-full py-2.5 bg-[#a71924] hover:bg-[#8e141e] text-white font-bold rounded-xl text-xs transition"
              >
                বুঝেছি, বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
