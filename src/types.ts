export type Category = 'games' | 'movies' | 'series';

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category: Category;
  authorName: string;
  authorUid: string;
  imageUrl?: string;
  createdAt: any; // Firestore Timestamp
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  role: 'admin' | 'user';
}
