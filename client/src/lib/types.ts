export interface Pack {
  id: number
  name: string;
  trail: string;
  isWinter: boolean;
  isSummer: boolean;
  isSolo: boolean;
  isGroup: boolean;
  isFemaile: boolean;
}

export interface Item {
  name: string;
  categoryId: number;
  description: string;
  weight: number;
  cost?: number;
}