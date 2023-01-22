/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  rand,
  randCompanyName,
  randPastDate,
  randPhrase,
  randProductDescription,
  randProductName,
  randUuid,
} from "@ngneat/falso";

const imgArr = [
  "https://m.media-amazon.com/images/I/71Gc4RvxEUL._AC_SX679_.jpg",
  "https://m.media-amazon.com/images/I/81gbSr7DBML._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71J3b2xn6BL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81QmX4eTtSL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/6140G5mWDbL._AC_SL1200_.jpg",
  "https://m.media-amazon.com/images/I/616kSXTLZrL._AC_SL1200_.jpg",
  "https://m.media-amazon.com/images/I/71GGk5UAQXL._AC_SY879_.jpg",
  "https://m.media-amazon.com/images/I/713KrzasLcL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81aYysedGeL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81bgR1vzX9L._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81jqOpL8LWL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71qWJ94lD2L._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81IRvHh-EpL._AC_SL1500_.jpg",
  "https://m.media-amazon.com/images/I/A1xRLOh8ukL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71dwAdEUTXL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/51v4osyV1tL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71c7Up4a7YL._SL1200_.jpg",
  "https://m.media-amazon.com/images/I/81xJ0pT9NcL._SL1500_.jpg",
];

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
  Array.from({ length: qty ?? 96 }).map((_, idx) => ({
    id: idx.toString(),
    skuId: `SKU-${randUuid().slice(0, 8)}`,
    createdAt: randPastDate().toString(),
    name: randProductName(),
    brand: randCompanyName(),
    description: randProductDescription(),
    ingredients: randPhrase(),
    media: Array.from({ length: 2 }).map((img, idx) => ({
      src: rand(imgArr),
      name: `Img ${idx}`,
    })),
  }));
