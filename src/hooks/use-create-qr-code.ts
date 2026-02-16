import { CreateQrCodeParams } from "@/app/interfaces/qrcode-details";
import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

async function createQrCode(body: CreateQrCodeParams): Promise<Blob> {
  const res = await api.post(
    "/create-qr-code",
    {
      url: body.url,
      logoBase64: body.logoBase64,
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
