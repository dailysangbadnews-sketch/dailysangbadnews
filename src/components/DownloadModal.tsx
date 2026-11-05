import React from 'react';
import { X, Download, Share2, Check, Sparkles } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageType: 'png' | 'jpg';
  filename: string;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageType,
  filename,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !imageUrl) return null;

  const handleDirectDownload = () => {
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], filename, {
          type: imageType === 'png' ? 'image/png' : 'image/jpeg',
        });
        await navigator.share({
          title: 'দৈনিক সংবাদ ফটোকার্ড',
          text: 'দৈনিক সংবাদ ফটোকার্ড মেকার দিয়ে তৈরি',
          files: [file],
        });
      } catch (e) {
        console.log('Share canceled or not supported');
      }
    } else {
      handleDirectDownload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-md w-full p-4 sm:p-5 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-600 flex items-center justify-center font-bold">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                ফটোকার্ড প্রস্তুত হয়েছে!
              </h2>
              <p className="text-[11px] text-gray-500">
                {imageType.toUpperCase()} ফরম্যাটে ডাউনলোড বা সেভ করুন
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

        {/* Image Preview */}
        <div className="my-3 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 flex items-center justify-center max-h-[50vh]">
          <img
            src={imageUrl}
            alt="Generated Card"
            className="w-full h-auto object-contain max-h-[50vh] rounded-lg shadow-sm"
          />
        </div>

        {/* Mobile Instruction Note */}
        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 text-[11px] text-amber-800 dark:text-amber-200 mb-3">
          💡 <strong>টিপস:</strong> মোবাইলে স্বয়ংক্রিয় ডাউনলোডে সমস্যা হলে উপরের ছবির ওপর <strong>আঙুল দিয়ে চেপে ধরে (Long Press)</strong> ‘Download image’ বা ‘ছবি সংরক্ষণ করুন’ চাপুন।
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handleDirectDownload}
            className="flex-1 py-2.5 px-4 bg-[#a71924] hover:bg-[#8e141e] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-red-900/20 active:scale-95 transition"
          >
            <Download className="w-4 h-4" />
            <span>সরাসরি ডাউনলোড</span>
          </button>

          {'share' in navigator && (
            <button
              onClick={handleShare}
              className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
              title="শেয়ার করুন"
            >
              <Share2 className="w-4 h-4" />
              <span>শেয়ার</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium rounded-xl text-xs transition"
          >
            বন্ধ
          </button>
        </div>
      </div>
    </div>
  );
};
