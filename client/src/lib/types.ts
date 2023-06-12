interface PackObject {
  [key: string]: any
}

export interface Pack extends PackObject {
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
  id?: number;
  name: string;
  categoryId: number;
  description: string;
  weight: number;
  cost?: number;
}

export interface Cat {
  id: number;
  category: string
}