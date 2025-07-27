// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  bucket?: string;
  status?: string;
  published_at?: string;
}

// Post interface with proper metadata structure
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    location?: string;
    wave_conditions?: {
      key: WaveCondition;
      value: string;
    };
    best_season?: {
      key: Season;
      value: string;
    };
  };
}

// Author interface
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name?: string;
    bio?: string;
    avatar?: {
      url: string;
      imgix_url: string;
    };
    instagram?: string;
    years_surfing?: number;
  };
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
    color?: string;
  };
}

// Type literals for select-dropdown values
export type WaveCondition = 'small' | 'medium' | 'large' | 'epic';
export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'year_round';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}

// Utility types
export type PostCardProps = {
  post: Post;
  showAuthor?: boolean;
  className?: string;
};

export type CategoryBadgeProps = {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
};

export type AuthorCardProps = {
  author: Author;
  showBio?: boolean;
  className?: string;
};