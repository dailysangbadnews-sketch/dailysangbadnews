import { Layer, StudioValues, TemplateId, TemplateMeta } from '../types/studio';

export const DEFAULT_VALUES: StudioValues = {
  brand: 'দৈনিক সংবাদ',
  date: '০৫ নভেম্বর ২০২৬',
  headline: 'জনস্বার্থের প্রশ্নে কোনো আপস নয়',
  bodytext:
    'আমরা উন্নয়ন ও কর্মসংস্থানের বিপক্ষে নই। কিন্তু উন্নয়নের নামে শোষণ, মুনাফার নামে ধ্বংস আর ব্যবসার নামে স্থানীয় মানুষের অধিকার হরণ মেনে নেওয়া যায় না। ফাইতং আমাদের অস্তিত্ব, আমাদের ঠিকানা, আমাদের ভবিষ্যৎ।',
  person: 'ফরহাদ আহমদ',
  role: 'সাংবাদিক ও বিশেষ প্রতিনিধি',
  footer: 'বিস্তারিত কমেন্টে অথবা ওয়েবসাইটে দেখুন',
  accent: '#a71924',
  background: '#f5f5f2',
  font: 'Noto Sans Bengali',
};

// High quality curated default sample photos
export const SAMPLE_PHOTOS = [
  {
    name: 'সাংবাদিক / বক্তা',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'সংবাদ সম্মেলন / মিডিয়া',
    url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'বাংলাদেশ স্মৃতিসৌধ / পরিবেশ',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'খেলাধুলা / ক্রিকেট',
    url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'আন্তর্জাতিক সম্মেলন',
    url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
  },
];

export const ALL_TEMPLATES: TemplateMeta[] = [
  { id: 'quote', num: '০১', name: 'সম্পাদকীয় কোট', category: 'quote', categoryLabel: 'উক্তি ও মতামত', thumbClass: 't0', description: 'বিশিষ্ট ব্যক্তির উক্তি ও মতামত কার্ড' },
  { id: 'breaking', num: '০২', name: 'ব্রেকিং নিউজ', category: 'breaking', categoryLabel: 'জরুরি সংবাদ', thumbClass: 't1', description: 'জরুরি ও ব্রেকিং খবরের আকর্ষণীয় কার্ড' },
  { id: 'minimal', num: '০৩', name: 'মিনিমাল প্রোফাইল', category: 'minimal', categoryLabel: 'মিনিমাল', thumbClass: 't2', description: 'পরিচ্ছন্ন ও মার্জিত সবুজ টোন প্রোফাইল' },
  { id: 'portrait', num: '০৪', name: 'পোর্ট্রেট ফিচার', category: 'special', categoryLabel: 'বিশেষ ফিচার', thumbClass: 't3', description: 'বড় ছবি সহ পোর্ট্রেট ফিচার' },
  { id: 'darkquote', num: '০৫', name: 'ডার্ক কোট', category: 'dark', categoryLabel: 'ডার্ক থিম', thumbClass: 't4', description: 'ডার্ক ব্যাকগ্রাউন্ডে প্রিমিয়াম গোল্ড কোট' },
  { id: 'green', num: '০৬', name: 'পরিবেশ / কৃষি', category: 'special', categoryLabel: 'পরিবেশ ও বিশেষ', thumbClass: 't5', description: 'পরিবেশ, জলবায়ু ও কৃষিভিত্তিক কার্ড' },
  { id: 'headline', num: '০৭', name: 'বড় শিরোনাম', category: 'breaking', categoryLabel: 'বড় শিরোনাম', thumbClass: 't6', description: 'বড় ও বোল্ড শিরোনাম বিশিষ্ট নিউজ ব্যানার' },
  { id: 'bulletin', num: '০৮', name: 'নিউজ বুলেটিন', category: 'report', categoryLabel: 'প্রতিবেদন', thumbClass: 't7', description: 'পত্রিকার নিয়মিত বুলেটিন ও আপডেট' },
  { id: 'gold', num: '০৯', name: 'প্রিমিয়াম গোল্ড', category: 'dark', categoryLabel: 'ডার্ক থিম', thumbClass: 't8', description: 'অভিজাত গোল্ডেন বর্ডার ও কালচে ব্যাকগ্রাউন্ড' },
  { id: 'report', num: '১০', name: 'বিশেষ প্রতিবেদন', category: 'report', categoryLabel: 'প্রতিবেদন', thumbClass: 't9', description: 'অনুসন্ধানী ও বিশেষ প্রতিবেদন কার্ড' },
  { id: 'impact', num: '১১', name: 'ইমপ্যাক্ট কার্ড', category: 'special', categoryLabel: 'বিশেষ ফিচার', thumbClass: 't10', description: 'দৃষ্টি আকর্ষণকারী গাঢ় সবুজ ইমপ্যাক্ট' },
  { id: 'classic', num: '১২', name: 'ক্লাসিক সংবাদ', category: 'report', categoryLabel: 'পত্রিকা স্টাইল', thumbClass: 't11', description: 'ঐতিহ্যবাহী জাতীয় দৈনিকের চিরচেনা রূপ' },
  { id: 'editorial', num: '১৩', name: 'সম্পাদকীয় ফিচার', category: 'quote', categoryLabel: 'উক্তি ও মতামত', thumbClass: 't12', description: 'সম্পাদকীয় মতামত ও গভীর বিশ্লেষণ' },
  { id: 'redline', num: '১৪', name: 'রেডলাইন রিপোর্ট', category: 'report', categoryLabel: 'প্রতিবেদন', thumbClass: 't13', description: 'লাল বর্ডার বিশিষ্ট আধুনিক রিপোর্ট কার্ড' },
  { id: 'split', num: '১৫', name: 'স্প্লিট নিউজ', category: 'special', categoryLabel: 'বিশেষ ফিচার', thumbClass: 't14', description: 'দ্বিখণ্ডিত আধুনিক লাল ও ধূসর ব্যাকগ্রাউন্ড' },
  { id: 'night', num: '১৬', name: 'নাইট এডিশন', category: 'dark', categoryLabel: 'ডার্ক থিম', thumbClass: 't15', description: 'রাতের বিশেষ সংস্করণ বা গভীর অনুসন্ধান' },
  { id: 'agri', num: '১৭', name: 'কৃষি ও প্রকৃতি', category: 'special', categoryLabel: 'পরিবেশ ও বিশেষ', thumbClass: 't16', description: 'কৃষি, গ্রামবাংলা ও প্রকৃতি সংবাদ' },
  { id: 'urgent', num: '১৮', name: 'জরুরি সংবাদ', category: 'breaking', categoryLabel: 'জরুরি সংবাদ', thumbClass: 't17', description: 'তাত্ক্ষণিক ও ফ্ল্যাশ সতর্কবার্তা' },
  { id: 'feature', num: '১৯', name: 'ফটো ফিচার', category: 'special', categoryLabel: 'ছবি ও ফিচার', thumbClass: 't18', description: 'ছবিকে প্রাধান্য দিয়ে তৈরি আকর্ষণীয় ফিচার' },
  { id: 'investigate', num: '২০', name: 'অনুসন্ধানী প্রতিবেদন', category: 'report', categoryLabel: 'প্রতিবেদন', thumbClass: 't19', description: 'খোলাসা করা গোপন তথ্য ও অনুসন্ধান' },
  { id: 'premium', num: '২১', name: 'প্রিমিয়াম ডার্ক', category: 'dark', categoryLabel: 'ডার্ক থিম', thumbClass: 't20', description: 'ডার্ক এলিগ্যান্ট গোল্ডেন ফ্রেম' },
  { id: 'community', num: '২২', name: 'জনপদ / তৃণমূল', category: 'special', categoryLabel: 'তৃণমূল সংবাদ', thumbClass: 't21', description: 'গ্রামাঞ্চল ও জেলাভিত্তিক বিশেষ সংবাদ' },
  { id: 'data', num: '২৩', name: 'তথ্যচিত্র / ডেটা', category: 'report', categoryLabel: 'তথ্যচিত্র', thumbClass: 't22', description: 'পরিসংখ্যান, জরিপ ও ডেটা সংবাদ' },
  { id: 'cinema', num: '২৪', name: 'সিনেম্যাটিক স্টোরি', category: 'dark', categoryLabel: 'সিনেমা ও ভিজ্যুয়াল', thumbClass: 't23', description: 'বড় ব্যাকগ্রাউন্ড ছবি ও সিনেম্যাটিক টেক্সট' },
  { id: 'pa_editorial', num: '২৫', name: 'ক্লিন সম্পাদকীয়', category: 'minimal', categoryLabel: 'মিনিমাল', thumbClass: 't25', description: 'প্রথম আলো ধাঁচের পরিচ্ছন্ন সম্পাদকীয় রুল' },
  { id: 'frontpage', num: '২৬', name: 'প্রথম পাতা', category: 'breaking', categoryLabel: 'পত্রিকা স্টাইল', thumbClass: 't26', description: 'পত্রিকার প্রথম পাতার শীর্ষ সংবাদের মতো' },
  { id: 'photojournal', num: '২৭', name: 'ফটো সাংবাদিকতা', category: 'dark', categoryLabel: 'ছবি ও ফিচার', thumbClass: 't27', description: 'ছবি সাংবাদিকতার জন্য সেরা ফুল ফ্রেম' },
  { id: 'longread', num: '২৮', name: 'দীর্ঘ প্রতিবেদন', category: 'report', categoryLabel: 'প্রতিবেদন', thumbClass: 't28', description: 'বিস্তারিত ও দীর্ঘ বর্ণনামূলক সংবাদ' },
  { id: 'mono', num: '২৯', name: 'মনোক্রোম রিপোর্ট', category: 'minimal', categoryLabel: 'মিনিমাল', thumbClass: 't29', description: 'কালো-সাদা মার্জিত মনোটোন লেআউট' },
  { id: 'redcolumn', num: '৩০', name: 'রেড কলাম', category: 'breaking', categoryLabel: 'বড় শিরোনাম', thumbClass: 't30', description: 'বামপাশে লাল কলাম দিয়ে শক্তিশালী উপস্থিতি' },
  { id: 'featuregrid', num: '৩১', name: 'ফিচার গ্রিড', category: 'report', categoryLabel: 'প্রতিবেদন', thumbClass: 't31', description: 'ছবি ও তথ্য পাশাপাশি সাজানো গ্রিড' },
  { id: 'flashbrief', num: '৩২', name: 'সংক্ষিপ্ত বুলেটিন', category: 'breaking', categoryLabel: 'জরুরি সংবাদ', thumbClass: 't32', description: 'ফ্ল্যাশ ও দ্রুত পড়ার মতো সংক্ষিপ্ত খবর' },
];

export const CATEGORIES = [
  { id: 'all', label: 'সব ডিজাইন (৩২)' },
  { id: 'breaking', label: 'ব্রেকিং ও শিরোনাম' },
  { id: 'quote', label: 'উক্তি ও সম্পাদকীয়' },
  { id: 'report', label: 'বিশেষ প্রতিবেদন' },
  { id: 'dark', label: 'ডার্ক ও প্রিমিয়াম' },
  { id: 'minimal', label: 'মিনিমাল' },
  { id: 'special', label: 'ছবি ও তৃণমূল' },
];

type PresetDef = [string, 'text' | 'image', number, number, number, any, number?, ('left' | 'center' | 'right')?];

export const PRESETS: Record<TemplateId, PresetDef[]> = {
  quote: [
    ['brand', 'text', 540, 82, 44, '#a71924', 800, 'center'],
    ['date', 'text', 105, 180, 23, '#58616b', 600, 'left'],
    ['headline', 'text', 540, 365, 48, '#18212b', 800, 'center'],
    ['bodytext', 'text', 540, 555, 31, '#303943', 600, 'center'],
    ['person', 'text', 440, 855, 38, '#ffffff', 800, 'left'],
    ['role', 'text', 440, 910, 25, '#ffffff', 600, 'left'],
    ['photo', 'image', 90, 715, 285, 270],
    ['footer', 'text', 540, 1030, 24, '#ffffff', 600, 'center'],
  ],
  breaking: [
    ['brand', 'text', 540, 85, 42, '#ffffff', 800, 'center'],
    ['date', 'text', 80, 180, 23, '#d5b66e', 600, 'left'],
    ['headline', 'text', 540, 340, 65, '#18212b', 900, 'center'],
    ['bodytext', 'text', 540, 535, 32, '#303943', 600, 'center'],
    ['photo', 'image', 110, 680, 230, 220],
    ['person', 'text', 400, 785, 38, '#18212b', 800, 'left'],
    ['role', 'text', 400, 840, 25, '#a71924', 600, 'left'],
    ['footer', 'text', 540, 1035, 24, '#ffffff', 700, 'center'],
  ],
  minimal: [
    ['brand', 'text', 540, 90, 40, '#ffffff', 800, 'center'],
    ['date', 'text', 540, 205, 22, '#526171', 600, 'center'],
    ['photo', 'image', 110, 290, 330, 420],
    ['headline', 'text', 720, 390, 48, '#176b54', 800, 'center'],
    ['bodytext', 'text', 720, 590, 28, '#27352f', 500, 'center'],
    ['person', 'text', 720, 830, 36, '#176b54', 800, 'center'],
    ['role', 'text', 720, 885, 24, '#52645a', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  portrait: [
    ['brand', 'text', 540, 80, 40, '#ffffff', 800, 'center'],
    ['photo', 'image', 545, 185, 455, 650],
    ['headline', 'text', 270, 345, 52, '#18212b', 900, 'center'],
    ['bodytext', 'text', 270, 585, 28, '#3b4650', 600, 'center'],
    ['person', 'text', 270, 830, 36, '#a71924', 800, 'center'],
    ['role', 'text', 270, 880, 23, '#505b65', 600, 'center'],
    ['date', 'text', 540, 970, 22, '#59636e', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  darkquote: [
    ['brand', 'text', 540, 90, 42, '#d8b66b', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#c4cbd2', 600, 'left'],
    ['headline', 'text', 540, 365, 55, '#ffffff', 800, 'center'],
    ['bodytext', 'text', 540, 575, 32, '#e6e9ed', 600, 'center'],
    ['photo', 'image', 95, 740, 210, 200],
    ['person', 'text', 370, 825, 35, '#ffffff', 800, 'left'],
    ['role', 'text', 370, 880, 24, '#d8b66b', 600, 'left'],
    ['footer', 'text', 540, 1030, 23, '#d8b66b', 600, 'center'],
  ],
  green: [
    ['brand', 'text', 540, 85, 42, '#ffffff', 800, 'center'],
    ['date', 'text', 90, 185, 22, '#176b54', 600, 'left'],
    ['headline', 'text', 540, 345, 52, '#176b54', 800, 'center'],
    ['bodytext', 'text', 540, 565, 31, '#253a32', 600, 'center'],
    ['photo', 'image', 105, 710, 260, 235],
    ['person', 'text', 430, 805, 37, '#ffffff', 800, 'left'],
    ['role', 'text', 430, 860, 24, '#e5f3ed', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  headline: [
    ['brand', 'text', 540, 85, 42, '#1c2730', 800, 'center'],
    ['date', 'text', 90, 175, 22, '#7a252b', 600, 'left'],
    ['headline', 'text', 540, 355, 68, '#17212a', 900, 'center'],
    ['photo', 'image', 110, 490, 860, 320],
    ['bodytext', 'text', 540, 875, 28, '#34404b', 600, 'center'],
    ['footer', 'text', 540, 1035, 24, '#ffffff', 700, 'center'],
  ],
  bulletin: [
    ['brand', 'text', 540, 85, 40, '#a71924', 800, 'center'],
    ['date', 'text', 90, 175, 22, '#6b7785', 600, 'left'],
    ['headline', 'text', 540, 340, 57, '#17212a', 900, 'center'],
    ['bodytext', 'text', 540, 560, 31, '#34404b', 600, 'center'],
    ['photo', 'image', 115, 700, 250, 235],
    ['person', 'text', 430, 800, 36, '#17212a', 800, 'left'],
    ['role', 'text', 430, 855, 24, '#a71924', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  gold: [
    ['brand', 'text', 540, 85, 42, '#d9b96f', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#c6cbd2', 600, 'left'],
    ['headline', 'text', 540, 355, 55, '#ffffff', 900, 'center'],
    ['bodytext', 'text', 540, 560, 31, '#edf0f2', 600, 'center'],
    ['photo', 'image', 110, 715, 250, 225],
    ['person', 'text', 420, 805, 36, '#ffffff', 800, 'left'],
    ['role', 'text', 420, 860, 24, '#d9b96f', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#d9b96f', 600, 'center'],
  ],
  report: [
    ['brand', 'text', 540, 85, 40, '#1d2b3a', 800, 'center'],
    ['date', 'text', 90, 180, 22, '#65717d', 600, 'left'],
    ['headline', 'text', 540, 345, 55, '#1d2b3a', 900, 'center'],
    ['bodytext', 'text', 540, 575, 30, '#34404b', 600, 'center'],
    ['photo', 'image', 100, 700, 270, 240],
    ['person', 'text', 430, 800, 36, '#1d2b3a', 800, 'left'],
    ['role', 'text', 430, 855, 24, '#a71924', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  impact: [
    ['brand', 'text', 540, 85, 40, '#dcece6', 800, 'center'],
    ['date', 'text', 90, 175, 22, '#b7c9c2', 600, 'left'],
    ['headline', 'text', 540, 350, 62, '#ffffff', 900, 'center'],
    ['bodytext', 'text', 540, 570, 31, '#e1ece7', 600, 'center'],
    ['photo', 'image', 110, 710, 245, 230],
    ['person', 'text', 420, 805, 36, '#ffffff', 800, 'left'],
    ['role', 'text', 420, 860, 24, '#b9d7ca', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  classic: [
    ['brand', 'text', 540, 85, 42, '#a71924', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#58616b', 600, 'left'],
    ['headline', 'text', 540, 355, 56, '#17212a', 900, 'center'],
    ['bodytext', 'text', 540, 565, 31, '#343e48', 600, 'center'],
    ['photo', 'image', 105, 710, 250, 230],
    ['person', 'text', 420, 805, 36, '#17212a', 800, 'left'],
    ['role', 'text', 420, 860, 24, '#a71924', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  editorial: [
    ['brand', 'text', 540, 82, 40, '#24384d', 800, 'center'],
    ['date', 'text', 90, 175, 21, '#66727e', 600, 'left'],
    ['headline', 'text', 540, 320, 57, '#1c2935', 900, 'center'],
    ['photo', 'image', 90, 425, 900, 340],
    ['bodytext', 'text', 540, 835, 28, '#34404b', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 700, 'center'],
  ],
  redline: [
    ['brand', 'text', 540, 78, 40, '#17212b', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#6a737c', 600, 'left'],
    ['headline', 'text', 540, 350, 58, '#17212b', 900, 'center'],
    ['bodytext', 'text', 540, 570, 30, '#38434c', 600, 'center'],
    ['photo', 'image', 110, 700, 260, 235],
    ['person', 'text', 430, 805, 35, '#a71924', 800, 'left'],
    ['role', 'text', 430, 860, 24, '#4b5660', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  split: [
    ['brand', 'text', 270, 85, 40, '#ffffff', 800, 'center'],
    ['date', 'text', 85, 180, 22, '#6b7785', 600, 'left'],
    ['headline', 'text', 270, 350, 50, '#17212b', 900, 'center'],
    ['bodytext', 'text', 270, 600, 27, '#36434e', 600, 'center'],
    ['photo', 'image', 570, 180, 440, 650],
    ['person', 'text', 270, 835, 35, '#a71924', 800, 'center'],
    ['role', 'text', 270, 885, 23, '#5c6872', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  night: [
    ['brand', 'text', 540, 85, 42, '#d6b66d', 800, 'center'],
    ['date', 'text', 90, 175, 22, '#c5d0d9', 600, 'left'],
    ['headline', 'text', 540, 355, 58, '#ffffff', 900, 'center'],
    ['photo', 'image', 110, 500, 860, 320],
    ['bodytext', 'text', 540, 880, 27, '#e2e8ed', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#d6b66d', 700, 'center'],
  ],
  agri: [
    ['brand', 'text', 540, 85, 42, '#ffffff', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#426b56', 600, 'left'],
    ['headline', 'text', 540, 340, 55, '#1d503c', 900, 'center'],
    ['photo', 'image', 90, 455, 900, 350],
    ['bodytext', 'text', 540, 865, 27, '#284638', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 700, 'center'],
  ],
  urgent: [
    ['brand', 'text', 540, 82, 40, '#a71924', 800, 'center'],
    ['date', 'text', 85, 170, 22, '#5c6670', 600, 'left'],
    ['headline', 'text', 540, 350, 63, '#17212b', 900, 'center'],
    ['photo', 'image', 105, 475, 870, 330],
    ['bodytext', 'text', 540, 870, 27, '#38434c', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 700, 'center'],
  ],
  feature: [
    ['brand', 'text', 540, 82, 40, '#ffffff', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#d6b66d', 600, 'left'],
    ['photo', 'image', 90, 220, 900, 500],
    ['headline', 'text', 540, 790, 51, '#ffffff', 900, 'center'],
    ['bodytext', 'text', 540, 900, 25, '#e9edf0', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#d6b66d', 600, 'center'],
  ],
  investigate: [
    ['brand', 'text', 540, 80, 40, '#a71924', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#606b75', 600, 'left'],
    ['headline', 'text', 540, 345, 55, '#17212b', 900, 'center'],
    ['bodytext', 'text', 540, 570, 30, '#343e48', 600, 'center'],
    ['photo', 'image', 100, 710, 250, 230],
    ['person', 'text', 420, 805, 35, '#17212b', 800, 'left'],
    ['role', 'text', 420, 860, 23, '#a71924', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  premium: [
    ['brand', 'text', 540, 82, 42, '#d3b16d', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#c4ccc9', 600, 'left'],
    ['headline', 'text', 540, 355, 58, '#ffffff', 900, 'center'],
    ['bodytext', 'text', 540, 575, 30, '#e4e9e7', 600, 'center'],
    ['photo', 'image', 100, 710, 270, 230],
    ['person', 'text', 430, 805, 35, '#ffffff', 800, 'left'],
    ['role', 'text', 430, 860, 23, '#d3b16d', 600, 'left'],
    ['footer', 'text', 540, 1035, 23, '#d3b16d', 600, 'center'],
  ],
  community: [
    ['brand', 'text', 540, 82, 40, '#ffffff', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#7c5b55', 600, 'left'],
    ['headline', 'text', 540, 345, 54, '#262d35', 900, 'center'],
    ['photo', 'image', 390, 440, 600, 380],
    ['bodytext', 'text', 230, 625, 27, '#39434b', 600, 'center'],
    ['person', 'text', 230, 835, 34, '#8b1e29', 800, 'center'],
    ['role', 'text', 230, 885, 23, '#59636d', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  data: [
    ['brand', 'text', 540, 82, 40, '#176b54', 800, 'center'],
    ['date', 'text', 85, 175, 22, '#5c6872', 600, 'left'],
    ['headline', 'text', 540, 330, 54, '#1d2d38', 900, 'center'],
    ['photo', 'image', 100, 430, 420, 340],
    ['bodytext', 'text', 760, 570, 28, '#31434a', 600, 'center'],
    ['person', 'text', 760, 820, 33, '#176b54', 800, 'center'],
    ['role', 'text', 760, 870, 22, '#5b6a70', 600, 'center'],
    ['footer', 'text', 540, 1035, 23, '#ffffff', 600, 'center'],
  ],
  cinema: [
    ['brand', 'text', 540, 80, 40, '#dce7ee', 800, 'center'],
    ['date', 'text', 85, 170, 22, '#c2ced8', 600, 'left'],
    ['photo', 'image', 0, 210, 1080, 600],
    ['headline', 'text', 540, 875, 58, '#ffffff', 900, 'center'],
    ['bodytext', 'text', 540, 960, 24, '#e5eaf0', 600, 'center'],
    ['footer', 'text', 540, 1040, 21, '#d6b66d', 600, 'center'],
  ],
  pa_editorial: [
    ['brand', 'text', 540, 70, 38, '#a71924', 900, 'center'],
    ['date', 'text', 85, 145, 20, '#68727b', 500, 'left'],
    ['headline', 'text', 540, 270, 62, '#171d23', 900, 'center'],
    ['photo', 'image', 70, 380, 940, 390],
    ['bodytext', 'text', 540, 835, 27, '#303943', 500, 'center'],
    ['footer', 'text', 540, 1035, 21, '#ffffff', 600, 'center'],
  ],
  frontpage: [
    ['brand', 'text', 540, 75, 42, '#a71924', 900, 'center'],
    ['date', 'text', 85, 155, 20, '#5e6872', 600, 'left'],
    ['headline', 'text', 540, 285, 58, '#1b242c', 900, 'center'],
    ['photo', 'image', 80, 390, 920, 380],
    ['bodytext', 'text', 540, 850, 26, '#38434c', 600, 'center'],
    ['footer', 'text', 540, 1035, 22, '#ffffff', 700, 'center'],
  ],
  photojournal: [
    ['brand', 'text', 540, 70, 38, '#ffffff', 800, 'center'],
    ['date', 'text', 80, 150, 20, '#d7dce1', 600, 'left'],
    ['photo', 'image', 35, 205, 1010, 610],
    ['headline', 'text', 540, 890, 54, '#ffffff', 900, 'center'],
    ['bodytext', 'text', 540, 965, 23, '#e5e9ed', 500, 'center'],
    ['footer', 'text', 540, 1040, 20, '#d6b66d', 600, 'center'],
  ],
  longread: [
    ['brand', 'text', 540, 75, 38, '#a71924', 800, 'center'],
    ['date', 'text', 100, 155, 20, '#68727b', 600, 'left'],
    ['headline', 'text', 540, 285, 56, '#202a33', 900, 'center'],
    ['photo', 'image', 110, 390, 860, 330],
    ['bodytext', 'text', 540, 790, 29, '#303943', 500, 'center'],
    ['person', 'text', 540, 915, 27, '#a71924', 800, 'center'],
    ['role', 'text', 540, 960, 21, '#68727b', 600, 'center'],
    ['footer', 'text', 540, 1040, 20, '#ffffff', 600, 'center'],
  ],
  mono: [
    ['brand', 'text', 540, 75, 38, '#222222', 900, 'center'],
    ['date', 'text', 85, 155, 20, '#666666', 600, 'left'],
    ['headline', 'text', 540, 300, 60, '#111111', 900, 'center'],
    ['photo', 'image', 100, 405, 880, 365],
    ['bodytext', 'text', 540, 850, 27, '#333333', 600, 'center'],
    ['footer', 'text', 540, 1035, 21, '#ffffff', 700, 'center'],
  ],
  redcolumn: [
    ['brand', 'text', 540, 75, 39, '#a71924', 900, 'center'],
    ['date', 'text', 95, 160, 20, '#606a74', 600, 'left'],
    ['headline', 'text', 540, 310, 58, '#202a34', 900, 'center'],
    ['photo', 'image', 115, 425, 850, 330],
    ['bodytext', 'text', 540, 825, 28, '#303943', 600, 'center'],
    ['person', 'text', 540, 925, 27, '#a71924', 800, 'center'],
    ['footer', 'text', 540, 1035, 21, '#ffffff', 600, 'center'],
  ],
  featuregrid: [
    ['brand', 'text', 540, 70, 38, '#263746', 800, 'center'],
    ['date', 'text', 85, 145, 20, '#66727e', 600, 'left'],
    ['headline', 'text', 540, 260, 54, '#1d2933', 900, 'center'],
    ['photo', 'image', 70, 360, 570, 480],
    ['bodytext', 'text', 830, 535, 29, '#34434d', 600, 'center'],
    ['person', 'text', 830, 790, 28, '#263746', 800, 'center'],
    ['role', 'text', 830, 835, 21, '#68747e', 600, 'center'],
    ['footer', 'text', 540, 1035, 21, '#ffffff', 600, 'center'],
  ],
  flashbrief: [
    ['brand', 'text', 540, 75, 38, '#ffffff', 900, 'center'],
    ['date', 'text', 85, 160, 20, '#e7d8b7', 600, 'left'],
    ['headline', 'text', 540, 370, 66, '#17212b', 900, 'center'],
    ['photo', 'image', 130, 500, 820, 300],
    ['bodytext', 'text', 540, 865, 27, '#3a4650', 600, 'center'],
    ['footer', 'text', 540, 1035, 22, '#ffffff', 700, 'center'],
  ],
};

export function drawTemplateBackground(
  cx: CanvasRenderingContext2D,
  template: TemplateId,
  W: number,
  H: number,
  accentColor: string,
  bgColor: string,
  bgImg: HTMLImageElement | null
) {
  // Base background fill
  cx.fillStyle = bgColor;
  cx.fillRect(0, 0, W, H);

  // Background image if provided
  if (bgImg) {
    cx.save();
    cx.globalAlpha = 0.22;
    cx.drawImage(bgImg, 0, 0, W, H);
    cx.restore();
  }

  // Template specific layout styles
  if (template === 'breaking') {
    cx.fillStyle = '#172331';
    cx.fillRect(0, 0, W, 130);
    cx.fillStyle = accentColor;
    cx.fillRect(0, 130, W, 9);
    cx.fillStyle = '#ffffff';
    cx.fillRect(45, 185, 990, 710);
    cx.strokeStyle = '#d9dfe5';
    cx.lineWidth = 2;
    cx.strokeRect(45, 185, 990, 710);
    cx.fillStyle = accentColor;
    cx.fillRect(45, 185, 10, 710);
    cx.fillStyle = '#172331';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'darkquote' || template === 'gold') {
    cx.fillStyle = '#172330';
    cx.fillRect(0, 0, W, H);
    cx.strokeStyle = '#4c5662';
    cx.lineWidth = 2;
    cx.strokeRect(35, 35, 1010, 1010);
    cx.strokeStyle = accentColor;
    cx.lineWidth = 5;
    cx.strokeRect(53, 53, 974, 974);
  } else if (template === 'green' || template === 'impact') {
    cx.fillStyle = accentColor;
    cx.fillRect(0, 0, W, 150);
    cx.fillRect(0, 970, W, 110);
    cx.fillStyle = '#ffffff';
    cx.globalAlpha = 0.08;
    cx.beginPath();
    cx.arc(950, 450, 340, 0, Math.PI * 2);
    cx.fill();
    cx.globalAlpha = 1;
  } else if (template === 'minimal') {
    cx.fillStyle = '#176b54';
    cx.fillRect(0, 0, W, 220);
    cx.fillStyle = '#d5e2da';
    cx.fillRect(500, 250, 530, 640);
  } else if (template === 'portrait') {
    cx.fillStyle = '#1e2935';
    cx.fillRect(0, 0, W, 135);
    cx.fillStyle = accentColor;
    cx.fillRect(0, 135, 16, 835);
    cx.fillStyle = '#e8e9e6';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'headline') {
    cx.fillStyle = '#202a34';
    cx.fillRect(0, 0, W, 125);
    cx.fillStyle = '#c8aa6c';
    cx.fillRect(0, 125, W, 7);
    cx.fillStyle = '#e9ecef';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'bulletin') {
    cx.fillStyle = accentColor;
    cx.fillRect(0, 0, 18, H);
    cx.fillStyle = '#202a34';
    cx.fillRect(0, 970, W, 110);
    cx.fillStyle = '#f0f1f2';
    cx.fillRect(45, 220, 990, 680);
  } else if (template === 'report') {
    cx.fillStyle = '#1d2b3a';
    cx.fillRect(0, 0, W, 145);
    cx.fillStyle = accentColor;
    cx.fillRect(0, 145, W, 7);
    cx.fillStyle = '#e9edf0';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'classic') {
    cx.fillStyle = '#8b1e29';
    cx.fillRect(0, 0, W, 14);
    cx.fillStyle = '#e9e9e6';
    cx.fillRect(0, 970, W, 110);
    cx.fillStyle = '#8b1e29';
    cx.fillRect(0, 970, W, 8);
  } else if (template === 'editorial') {
    cx.fillStyle = '#24384d';
    cx.fillRect(0, 0, W, 145);
    cx.fillStyle = '#c5a76b';
    cx.fillRect(0, 145, W, 7);
    cx.fillStyle = '#e8edf1';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'redline' || template === 'investigate') {
    cx.fillStyle = '#ffffff';
    cx.fillRect(35, 165, 1010, 775);
    cx.fillStyle = accentColor;
    cx.fillRect(0, 0, 18, H);
    cx.fillRect(35, 165, 1010, 8);
    cx.fillStyle = '#1d2b3a';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'split') {
    cx.fillStyle = accentColor;
    cx.fillRect(0, 0, 540, 970);
    cx.fillStyle = '#f2f3f4';
    cx.fillRect(540, 0, 540, 970);
    cx.fillStyle = '#202a34';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'night' || template === 'premium') {
    cx.fillStyle = '#142a3a';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = '#d6b66d';
    cx.fillRect(0, 0, W, 10);
    cx.fillRect(0, 970, W, 110);
    cx.strokeStyle = '#637482';
    cx.lineWidth = 2;
    cx.strokeRect(35, 35, 1010, 1010);
  } else if (template === 'agri') {
    cx.fillStyle = '#3d705b';
    cx.fillRect(0, 0, W, 145);
    cx.fillStyle = '#d5e5dc';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'urgent') {
    cx.fillStyle = accentColor;
    cx.fillRect(0, 0, W, 145);
    cx.fillStyle = '#ffffff';
    cx.fillRect(45, 185, 990, 740);
    cx.fillStyle = '#202a34';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'feature' || template === 'cinema') {
    cx.fillStyle = '#17212b';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = '#0c141c';
    cx.globalAlpha = 0.65;
    cx.fillRect(0, 760, W, 320);
    cx.globalAlpha = 1;
    cx.fillStyle = '#d6b66d';
    cx.fillRect(0, 0, W, 8);
  } else if (template === 'community') {
    cx.fillStyle = '#8b1e29';
    cx.fillRect(0, 0, 340, H);
    cx.fillStyle = '#f5f1e8';
    cx.fillRect(340, 0, 740, 970);
    cx.fillStyle = '#202a34';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'data') {
    cx.fillStyle = '#edf3ef';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = '#176b54';
    cx.fillRect(0, 0, W, 135);
    cx.fillStyle = '#d9e6df';
    cx.fillRect(540, 390, 470, 470);
    cx.fillStyle = '#202a34';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'pa_editorial' || template === 'frontpage') {
    cx.fillStyle = '#ffffff';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = accentColor;
    cx.fillRect(60, 28, 960, 8);
    cx.fillRect(60, 118, 960, 3);
    cx.fillStyle = '#222222';
    cx.fillRect(60, 970, 960, 2);
    cx.fillStyle = '#f0f1f2';
    cx.fillRect(0, 985, W, 95);
  } else if (template === 'photojournal') {
    cx.fillStyle = '#18232d';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = '#0d141b';
    cx.globalAlpha = 0.7;
    cx.fillRect(0, 780, W, 300);
    cx.globalAlpha = 1;
    cx.fillStyle = '#c9a45d';
    cx.fillRect(0, 0, W, 7);
  } else if (template === 'longread') {
    cx.fillStyle = '#f5f3ee';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = accentColor;
    cx.fillRect(0, 0, 14, H);
    cx.fillStyle = '#ffffff';
    cx.fillRect(55, 180, 970, 755);
    cx.fillStyle = accentColor;
    cx.fillRect(55, 180, 970, 5);
    cx.fillStyle = '#202a34';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'mono') {
    cx.fillStyle = '#f4f4f4';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = '#242a30';
    cx.fillRect(0, 0, W, 145);
    cx.fillStyle = '#bfc3c7';
    cx.fillRect(0, 145, W, 3);
    cx.fillStyle = '#242a30';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'redcolumn') {
    cx.fillStyle = '#ffffff';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = accentColor;
    cx.fillRect(0, 0, 22, H);
    cx.fillRect(55, 175, 970, 8);
    cx.fillStyle = '#f0f1f2';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'featuregrid') {
    cx.fillStyle = '#e9eef1';
    cx.fillRect(0, 0, W, H);
    cx.fillStyle = '#263746';
    cx.fillRect(0, 0, W, 130);
    cx.fillStyle = '#d5dde2';
    cx.fillRect(675, 360, 350, 480);
    cx.fillStyle = '#202a34';
    cx.fillRect(0, 970, W, 110);
  } else if (template === 'flashbrief') {
    cx.fillStyle = '#192633';
    cx.fillRect(0, 0, W, 145);
    cx.fillStyle = '#c9a45d';
    cx.fillRect(0, 145, W, 8);
    cx.fillStyle = '#f4f5f6';
    cx.fillRect(45, 200, 990, 700);
    cx.fillStyle = '#192633';
    cx.fillRect(0, 970, W, 110);
  } else {
    // Default quote
    cx.fillStyle = accentColor;
    cx.fillRect(0, 0, W, 10);
    cx.fillStyle = '#e9ecef';
    cx.fillRect(0, 970, W, 110);
  }
}
