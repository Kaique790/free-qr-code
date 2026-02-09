import { api } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export interface UseCreateQrCodeParams {
  url: string;
  logoBase64: string;
  logoSize?: number;
  bg?: string;
  shape?: string;
  shapeColor?: string;
  shapePadding?: number;
}

export interface CreateQrCodeResponse {
  image_base64: string;
}

async function createQrCode(body: UseCreateQrCodeParams) {
  const cleanLogoBase64 = body.logoBase64.replace(/^data:.*;base64,/, "");

  const res = await api.post("/create-qr-code", {
    url: body.url,
    logoBase64: cleanLogoBase64,
    logoSize: body.logoSize,
    bg: body.bg,
    shape: body.shape,
    shapeColor: body.shapeColor,
    shapePadding: body.shapePadding,
  });

  return res.data;
}

export function useCreateQrCode() {
  const { mutateAsync: createQrCodeFn, isPending } = useMutation({
    mutationFn: createQrCode,
  });

  return { createQrCodeFn, isPending };
}
