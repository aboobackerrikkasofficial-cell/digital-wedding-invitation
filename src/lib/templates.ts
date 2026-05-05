export interface WeddingTemplate {
  id: string;
  name: string;
  category: 'muslim' | 'non-muslim' | 'default';
  primaryColor: string;
  bgColor: string;
  fontFamily: string;
  thumbnail?: string;
}

export const WEDDING_TEMPLATES: WeddingTemplate[] = [
  {
    id: 'default',
    name: 'Pink Panther',
    category: 'default',
    primaryColor: '#E91E63',
    bgColor: '#FF8DA1',
    fontFamily: 'serif',
    thumbnail: '/pink-panther-thumbnail.png',
  },
  {
    id: 'muslim-1',
    name: 'Royal Emerald',
    category: 'muslim',
    primaryColor: '#ad924d',
    bgColor: '#064e3b',
    fontFamily: 'serif',
  },
  {
    id: 'muslim-2',
    name: 'Midnight Blue & Gold',
    category: 'muslim',
    primaryColor: '#d4af37',
    bgColor: '#1e3a8a',
    fontFamily: 'serif',
  },
  {
    id: 'muslim-3',
    name: 'Cream & Gold',
    category: 'muslim',
    primaryColor: '#c5a059',
    bgColor: '#fffcf2',
    fontFamily: 'serif',
    thumbnail: '/cream-gold-gradient.png',
  },
  {
    id: 'non-muslim-1',
    name: 'Peach Floral',
    category: 'non-muslim',
    primaryColor: '#e69b81',
    bgColor: '#fffaf0',
    fontFamily: 'serif',
  },
  {
    id: 'non-muslim-2',
    name: 'Modern Minimalist',
    category: 'non-muslim',
    primaryColor: '#333333',
    bgColor: '#fcfcfc',
    fontFamily: 'sans',
  },
  {
    id: 'royal',
    name: 'Royal Purple Islamic',
    category: 'muslim',
    primaryColor: '#d4af37',
    bgColor: '#2b1e3f',
    fontFamily: 'serif',
    thumbnail: '/royal-purple-solid.png',
  },
];
