import { StudioValues, TemplateId } from '../types/studio';

export interface SampleCard {
  id: string;
  title: string;
  category: string;
  template: TemplateId;
  values: Partial<StudioValues>;
  photoUrl: string;
}

export const SAMPLE_PRESETS: SampleCard[] = [
  {
    id: 'quote-sample',
    title: 'সম্পাদকীয় উক্তি ও মতামত',
    category: 'মতামত',
    template: 'quote',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    values: {
      brand: 'দৈনিক সংবাদ',
      date: '০৫ নভেম্বর ২০২৬',
      headline: 'জনস্বার্থের প্রশ্নে কোনো আপস নয়',
      bodytext:
        'আমরা উন্নয়ন ও কর্মসংস্থানের বিপক্ষে নই। কিন্তু উন্নয়নের নামে শোষণ, মুনাফার নামে ধ্বংস আর ব্যবসার নামে স্থানীয় মানুষের অধিকার হরণ মেনে নেওয়া যায় না।',
      person: 'ফরহাদ আহমদ',
      role: 'সাংবাদিক ও বিশেষ প্রতিনিধি',
      footer: 'দৈনিক সংবাদ স্পেশাল সম্পাদকীয়',
      accent: '#a71924',
      background: '#f5f5f2',
    },
  },
  {
    id: 'breaking-sample',
    title: 'জরুরি ব্রেকিং নিউজ',
    category: 'ব্রেকিং',
    template: 'breaking',
    photoUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
    values: {
      brand: 'দৈনিক সংবাদ',
      date: '০৫ নভেম্বর ২০২৬ · তাৎক্ষণিক',
      headline: 'জাতীয় সংসদ নির্বাচন: নতুন রোডম্যাপ ঘোষণা',
      bodytext:
        'সুষ্ঠু ও নিরপেক্ষ নির্বাচনের লক্ষ্যে নির্বাচন কমিশনের পক্ষ থেকে সকল রাজনৈতিক দলের সাথে জরুরি সংলাপের দিনক্ষণ চূড়ান্ত করা হয়েছে।',
      person: 'মুহাম্মদ ইউনূস',
      role: 'প্রধান উপদেষ্টা',
      footer: 'সরাসরি লাইভ আপডেট পেতে দৈনিক সংবাদের সাথে থাকুন',
      accent: '#d5ae66',
      background: '#172330',
    },
  },
  {
    id: 'sports-sample',
    title: 'বিশ্বকাপ ক্রিকেট জয়',
    category: 'খেলাধুলা',
    template: 'portrait',
    photoUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
    values: {
      brand: 'দৈনিক সংবাদ খেলাধুলা',
      date: '০৫ নভেম্বর ২০২৬',
      headline: 'শেষ ওভারের রোমাঞ্চে ঐতিহাসিক জয় টাইগারদের',
      bodytext:
        'শ্বাসরুদ্ধকর ম্যাচে অস্ট্রেলিয়াকে ৩ উইকেটে হারিয়ে সেমিফাইনালের টিকিট নিশ্চিত করল বাংলাদেশ দল। ম্যাচসেরা হলেন নাজমুল শান্ত।',
      person: 'নাজমুল হোসেন শান্ত',
      role: 'বাংলাদেশ ক্রিকেট দল অধিনায়ক',
      footer: 'আইসিসি বিশ্বকাপ ২০২৬ লাইভ কভারেজ',
      accent: '#176b54',
      background: '#f5f5f2',
    },
  },
  {
    id: 'tech-sample',
    title: 'প্রযুক্তি ও এআই উদ্ভাবন',
    category: 'প্রযুক্তি',
    template: 'gold',
    photoUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    values: {
      brand: 'দৈনিক সংবাদ টেক হাব',
      date: '০৫ নভেম্বর ২০২৬',
      headline: 'বাংলা ভাষার প্রথম উন্নত লার্জ ল্যাঙ্গুয়েজ মডেল উন্মোচিত',
      bodytext:
        'কৃত্রিম বুদ্ধিমত্তার জগতে বাংলাদেশের বিজ্ঞানীদের নতুন মাইলফলক। এখন থেকে প্রাতিষ্ঠানিক সকল বাংলা অনুবাদ ও রিসার্চে এই মডেল বিপ্লব ঘটাবে।',
      person: 'ড. জামিলুর রহমান',
      role: 'প্রধান গবেষক ও এআই বিজ্ঞানী',
      footer: 'প্রযুক্তি ও আধুনিক উদ্ভাবনী সংবাদ',
      accent: '#d4b06a',
      background: '#14202c',
    },
  },
];
