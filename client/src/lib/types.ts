export interface Pack {
  id?: number;
  userId: number;
  name: string;
  trail: string;
  isWinter?: boolean;
  isSummer?: boolean;
  isSolo?: boolean;
  isGroup?: boolean;
  isFemale?: boolean;
}

export interface Item {
  name: string;
  categoryId: number;
  description: string;
  weight: number;
  cost?: number;
}