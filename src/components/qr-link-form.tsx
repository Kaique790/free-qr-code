"use client";

import {
  CheckIcon,
  DownloadIcon,
  UploadIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Input } from "./ui/input";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/buttons";
import {
  CreateQrCodeResponse,
  useCreateQrCode,
} from "@/hooks/use-create-qr-code";
import { convertToBase64 } from "@/utils/convert-to-base64";
import { useState } from "react";
import Image from "next/image";
import { downloadBase64Image } from "@/utils/base64-to-img";

const qrLinkFormSchema = z.object({
  url: z.url("URL inválida"),
  file: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ["image/png", "image/jpeg", "image/webp"].includes(files[0]?.type),
      "Formato inválido (PNG, JPG ou WEBP)",
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= 2 * 1024 * 1024,
      "O arquivo deve ter no máximo 2MB",
    ),
});

type QrLinkForm = z.infer<typeof qrLinkFormSchema>;

export function QrLinkForm() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<QrLinkForm>({
    resolver: zodResolver(qrLinkFormSchema),
  });

  const { createQrCodeFn, isPending } = useCreateQrCode();

  const [createdQrCode, setCreatedQrCode] = useState<CreateQrCodeResponse>();

  const uploadImage = useWatch({
    control,
    name: "file",
  });

  async function onSubmit(data: QrLinkForm) {
    const base64 = !!data.file?.length
      ? await convertToBase64(data.file)
      : undefined;

    const qrCode = await createQrCodeFn({
      logoBase64: base64,
      url: data.url,
    });

    setCreatedQrCode(qrCode);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-4"
    >
      <div className="flex flex-col">
        <label htmlFor="url">Sua URL</label>
        <Input
          id="url"
          type="text"
          {...register("url")}
          placeholder="ex: https://www.meusite.com.br"
        />
        {errors.url && (
          <p className="mt-2 text-sm text-red-500">{errors.url?.message}</p>
        )}
      </div>

      <div className="flex flex-col">
        <>
          <label
            htmlFor="logo"
            className={cn(
              "flex cursor-pointer items-center justify-center gap-2 rounded border border-dashed p-2 text-center",
              errors.file && "border-solid border-red-500 text-red-500",
            )}
          >
            {uploadImage && uploadImage.length > 0 && !errors.file ? (
              <>
                Imagem anexada <CheckIcon size={20} />
              </>
            ) : (
              <>
                Anexar seu logo <UploadIcon size={20} />
              </>
            )}
          </label>

          <Input
            id="logo"
            type="file"
            {...register("file")}
            className="hidden"
          />

          {errors.file && (
            <p className="mt-2 text-sm text-red-500">
              {String(errors.file?.message)}
            </p>
          )}
        </>
      </div>

      {createdQrCode && (
        <>
          <Image
            alt=""
            width={600}
            height={600}
            src={`data:image/png;base64,${createdQrCode.image_base64}`}
            className="mx-auto block w-full max-w-[500px]"
          />

          <Button
            onClick={() => downloadBase64Image(createdQrCode.image_base64)}
            type="button"
          >
            Baixar QR Code <DownloadIcon />
          </Button>
        </>
      )}

      <Button
        variant={!!createdQrCode ? "outline" : "default"}
        disabled={isPending}
        type="submit"
      >
        Gerar QR code
      </Button>
    </form>
  );
}
