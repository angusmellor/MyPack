interface PackObject {
  [key: string]: any
}

export interface NewPack extends PackObject {
  userId: number;
  name: string;
  trail: string;
  isWinter?: boolean;
  isSummer?: boolean;
  isSolo?: boolean;
  isGroup?: boolean;
  isFemale?: boolean;
}

export interface Pack extends NewPack {
 id: number
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