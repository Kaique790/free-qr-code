import { UseFormRegister } from "react-hook-form";
import { QrLinkForm } from "./qr-link-form";

interface QrDetailsProps {
  register: UseFormRegister<QrLinkForm>;
}

export function QrDetails({ register }: QrDetailsProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4 md:gap-8">
        <label className="font-medium" htmlFor="color">
          Cor:
        </label>

        <input
          className="h-[37px] w-full max-w-[200px]"
          {...register("color")}
          id="color"
          type="color"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="color">
          Tamanho do Logo:
        </label>
        <div className="w-full pr-2 bg-gray-2/50 rounded-md">
          <select
            className="w-full  p-2"
            {...register("logoSize")}
            name="logoSize"
            id="color"
          >
            <option value="0.6">Normal</option>
            <option value="0.4">Pequena</option>
          </select>
        </div>
      </div>
    </div>
  );
}
