import React from 'react';

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'visual' | 'archive';
  client: string;
  year: string;
  imageUrl: string;
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