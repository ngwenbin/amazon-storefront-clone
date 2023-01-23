/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ProductObject } from "../utils";

interface CardProps {
  data: ProductObject;
  onClickCb?: (id: string) => void;
}

const Card = ({ data, onClickCb }: CardProps) => {
  const onClickHandler = (id: string) => onClickCb && onClickCb(id);
  return (
    <div
      className="border rounded-[4px] border-[rgba(0,0,0,0.1)] w-min bg-gray-100"
      onClick={() => onClickHandler(data.id)}
      aria-hidden="true"
    >
      <div className="w-[225px] aspect-square bg-white">
        {data?.media && data.media.length > 0 ? (
          <img
            src={data.media[0].src}
            alt=""
            className="w-full h-full object-contain p-4"
          />
        ) : null}
      </div>
      <div className="flex flex-col px-4 py-4 border-t">
        <p className="font-medium text-xs">Data Id: {data.id}</p>
        <p className="font-medium text-xs text-[#6f7999] pb-2">{data.skuId}</p>
        <p className="font-semibold text-sm text-[#000]">{data.name}</p>
        <p className="font-medium text-xs text-[#6f7999]">{data.brand}</p>
        <p className="font-medium text-xs text-[#6f7999]">{data.categories}</p>
      </div>
    </div>
  );
};

export default Card;
