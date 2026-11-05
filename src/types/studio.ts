export type TemplateId =
  | 'quote'
  | 'breaking'
  | 'minimal'
  | 'portrait'
  | 'darkquote'
  | 'green'
  | 'headline'
  | 'bulletin'
  | 'gold'
  | 'report'
  | 'impact'
  | 'classic'
  | 'editorial'
  | 'redline'
  | 'split'
  | 'night'
  | 'agri'
  | 'urgent'
  | 'feature'
  | 'investigate'
  | 'premium'
  | 'community'
  | 'data'
  | 'cinema'
  | 'pa_editorial'
  | 'frontpage'
  | 'photojournal'
  | 'longread'
  | 'mono'
  | 'redcolumn'
  | 'featuregrid'
  | 'flashbrief';

export type AspectRatio = '1:1' | '4:5' | '16:9';

export type LayerType = 'text' | 'image' | 'rect';

export interface Layer {
  id: string;
  type: LayerType;
  x: number;
  y: number;
  w: number;
  h: number;
  size?: number;
  color?: string;
  weight?: number;
  align?: 'left' | 'center' | 'right';
  opacity?: number;
  scale?: number;
  fill?: string;
  text?: string;
  font?: string;
  visible?: boolean;
  src?: string | null;
  fit?: 'cover' | 'contain';
  _img?: HTMLImageElement | null;
}

export interface StudioValues {
  brand: string;
  date: string;
  headline: string;
  bodytext: string;
  person: string;
  role: string;
  footer: string;
  accent: string;
  background: string;
  font: string;
}

export interface TemplateMeta {
  id: TemplateId;
  num: string;
  name: string;
  category: 'quote' | 'breaking' | 'report' | 'special' | 'minimal' | 'dark';
  categoryLabel: string;
  thumbClass: string;
  description: string;
}

export interface HistoryState {
  layers: Layer[];
  template: TemplateId;
  values: StudioValues;
  aspectRatio: AspectRatio;
  photoData: string | null;
  logoData: string | null;
  bgData: string | null;
}
