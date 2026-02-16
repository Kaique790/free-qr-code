import { CreateQrCodeParams } from "@/app/interfaces/qrcode-details";
import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

async function createQrCode(body: CreateQrCodeParams): Promise<Blob> {
  const res = await api.post<Blob, AxiosResponse<Blob>, CreateQrCodeParams>(
    "/create-qr-code",
    {
      url: body.url,
      logoBase64: body.logoBase64,
      dotsType: body.dotsType,
    },
    {
      responseType: "blob",
    },
  );

  return res.data;
}

export function useCreateQrCode() {
  const { mutateAsync: createQrCodeFn, isPending } = useMutation({
    mutationFn: createQrCode,
  });

  return { createQrCodeFn, isPending };
}
