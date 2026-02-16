import Image from "next/image";
import squareQrImg from "@/assets/images/qr-type-1.png";
import dotsQrImg from "@/assets/images/qr-type-2.png";
import roundedQrImg from "@/assets/images/qr-type-3.png";
import { Control, Controller } from "react-hook-form";
import { QrLinkForm } from "./qr-link-form";
import { cn } from "@/lib/utils";

interface qrTypesProps {
  control: Control<QrLinkForm>;
}

const dotsOptions = [
  { value: "square", image: squareQrImg },
  { value: "dots", image: dotsQrImg },
  { value: "rounded", image: roundedQrImg },
];

export function QrTypes({ control }: qrTypesProps) {
  return (
    <Controller
      name="dotsType"
      control={control}
      defaultValue="square"
      render={({ field }) => (
        <div className="scrollbar-x-custom flex max-w-full gap-4 overflow-x-auto pb-1 md:pb-0">
          {dotsOptions.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => field.onChange(option.value)}
              className={cn(
                "border-gray-2 cursor-pointer rounded-lg border-2 p-1 transition",
                option.value === field.value && "border-green-500",
              )}
            >
              <Image
                src={option.image}
                alt={option.value}
                width={140}
                height={140}
                className="min-w-[116px]"
              />
            </button>
          ))}
        </div>
      )}
    />
  );
}
