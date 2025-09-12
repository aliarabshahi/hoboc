export type RoadmapLevel = 'مبتدی' | 'متوسط' | 'پیشرفته';
export type RoadmapStatus = 'شروع‌نشده' | 'در حال یادگیری' | 'تکمیل شده';

export interface RoadmapResource {
  title: string;
  url: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  level: RoadmapLevel;
  status: RoadmapStatus;
  resources?: RoadmapResource[];
}