export interface Video {
  id: string;
  title: string;
  originalTitle?: string;  // 原名
  director: string;
  actors: string[];
  type: string[];         // 类型
  country: string;        // 制片国家
  year: number;
  rating: number;         // 豆瓣评分
  description: string;    // 简介
  posterUrl?: string;     // 封面图
  sourceUrl: string;      // 实际视频URL（这个会被加密/代理）
}