export type CategoryId =
  | 'all'
  | 'bangladesh'
  | 'international'
  | 'economy'
  | 'sports'
  | 'tech'
  | 'entertainment'
  | 'opinion'
  | 'lifestyle';

export interface Category {
  id: CategoryId;
  label: string;
  badgeColor?: string;
}

export interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
  avatarUrl?: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  content: string[];
  category: CategoryId;
  categoryLabel: string;
  author: string;
  reporterLocation?: string;
  publishedAt: string;
  timeAgo: string;
  readTimeMinutes: number;
  imageUrl: string;
  imageCaption?: string;
  isBreaking?: boolean;
  isLead?: boolean;
  isFeatured?: boolean;
  viewsCount: number;
  likesCount: number;
  comments: Comment[];
  district?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  totalVotes: number;
  options: PollOption[];
  userVotedOptionId?: string;
}

export interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: string;
}
