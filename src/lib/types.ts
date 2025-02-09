// types/index.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  featuredImage?: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category?: Category;
}

export interface PostCreateInput {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string | null;
  published: boolean;
  categoryId: string;
}

export interface PostUpdateInput {
  title?: string;
  content?: string;
  featuredImage?: string | null;
  published?: boolean;
  categoryId?: string;
}

export interface FormData {
  moveReason: string[];
  otherMoveReason?: string;
  familyStatus: string;
  budget: string;
  timeline: string;
  languages: string[];
  otherLanguage?: string;
  preferredCity: string;
  specificCity?: string;
  knowledgeLevel: string;
  housingPreference: string;
  needAssistance: string;
  countryOfOrigin: string;
}