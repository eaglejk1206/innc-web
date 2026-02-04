import React from 'react';

export interface PortfolioItem {
  id: string; // Changed from number to string for Firestore IDs
  title: string;
  category: 'visual' | 'archive';
  client: string;
  year: string;
  imageUrl: string;
  youtubeUrl?: string; // 유튜브 영상 주소 (선택 사항)
  description: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  category: string;
  message: string;
  date: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

export enum AdminTab {
  DASHBOARD = 'DASHBOARD',
  POSTS = 'POSTS',
  SETTINGS = 'SETTINGS',
}