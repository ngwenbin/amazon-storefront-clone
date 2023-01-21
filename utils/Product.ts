import {
  randCompanyName,
  randImg,
  randPastDate,
  randPhrase,
  randProductDescription,
  randProductName,
  randUuid,
} from "@ngneat/falso";

export interface ProductMedia {
  src: string;
  name?: string | null;
  size?: string | null;
  format?: string | null;
}

export interface ProductObject {
  id: string;
  name?: string | null;
  createdAt: string;
  skuId?: string | null;
  brand?: string | null;
  description?: string | null;
  ingredients?: string | null;
  media?: Array<ProductMedia | null> | null;
}

export const generateRandomProducts = (qty?: number): Array<ProductObject> =>
  Array.from({ length: qty ?? 96 }).map(() => ({
    id: randUuid(),
    skuId: randUuid(),
    createdAt: randPastDate().toString(),
    name: randProductName(),
    brand: randCompanyName(),
    description: randProductDescription(),
    ingredients: randPhrase(),
    media: randImg({ length: 4 }).map((img, idx) => ({
      src: img,
      name: `Img ${idx}`,
    })),
  }));
