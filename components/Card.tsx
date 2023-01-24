/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ProductObject } from "~/utils";

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
      <div className="flex flex-col px-4 py-4 border-t gap-y-2">
        <p className="font-bold text-lg text-black">$&nbsp;{data?.price}</p>
        <p className="font-semibold text-sm text-[#000]">
          {data?.popularity} / 10
        </p>

        <div>
          <p className="font-semibold text-sm text-[#000]">{data?.name}</p>
          <p className="font-medium text-xs text-[#6f7999] italic">
            {data?.brand}
          </p>
        </div>
        <p className="font-medium text-xs text-[#6f7999]">{data?.categories}</p>

        <div>
          <p className="font-medium text-xs">Id: {data?.id}</p>
          <p className="font-medium text-xs text-[#6f7999] pb-2">
            {data?.skuId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
