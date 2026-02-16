"use client";

import {
  CheckIcon,
  DownloadSimpleIcon,
  UploadIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Input } from "./ui/input";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/buttons";
import { useCreateQrCode } from "@/hooks/use-create-qr-code";
import { convertToBase64 } from "@/utils/convert-to-base64";
import { useState } from "react";
import Image from "next/image";
import { downloadQr } from "@/utils/donwload-qr";

import exampleQr from "@/assets/images/example-qr-code.png";
import { QrTypes } from "./qr-types";

const qrLinkFormSchema = z.object({
  url: z.url("URL inválida"),
  dotsType: z.enum(["square", "dots", "rounded"]),
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

export type QrLinkForm = z.infer<typeof qrLinkFormSchema>;

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
  const [createdQrCode, setCreatedQrCode] = useState<string>();

  const uploadImage = useWatch({
    control,
    name: "file",
  });

  async function onSubmit(data: QrLinkForm) {
    const base64 = !!data.file?.length
      ? await convertToBase64(data.file)
      : undefined;

    console.log(data.dotsType);

    const qrCode = await createQrCodeFn({
      logoBase64: base64,
      url: data.url,
      dotsType: data.dotsType,
    });

    const imgURL = URL.createObjectURL(qrCode);
    setCreatedQrCode(imgURL);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex flex-col gap-16 md:flex-row lg:mt-0 lg:flex-1"
    >
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex w-full flex-col space-y-2">
          <label htmlFor="url">Sua URL:</label>
          <Input
            id="url"
            type="text"
            {...register("url")}
            placeholder="ex: https://www.meusite.com.br"
          />
          {errors.url && (
            <p className="mt-1 text-sm text-red-500">{errors.url?.message}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <p>Adicione um logo (opcional):</p>

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
            <p className="mt-1 text-sm text-red-500">
              {String(errors.file?.message)}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <p>Seu tipo de QRcode:</p>

          <QrTypes control={control} />
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {createdQrCode ? (
          <>
            <Image
              alt=""
              width={600}
              height={600}
              src={createdQrCode}
              className="mx-auto mb-8 block w-full max-w-[440px] sm:max-w-[340px]"
            />

            <Button
              onClick={() => downloadQr(createdQrCode)}
              type="button"
              className="w-full"
            >
              Baixar QR Code <DownloadSimpleIcon size={20} />
            </Button>
          </>
        ) : (
          <Image
            src={exampleQr}
            width={600}
            height={600}
            alt=""
            className="mx-auto mb-8 block w-full max-w-[440px] sm:max-w-[340px]"
          />
        )}

        <Button
          variant={!!createdQrCode ? "outline" : "default"}
          disabled={isPending}
          type="submit"
          className="w-full"
        >
          Gerar QR code
        </Button>
      </div>
    </form>
  );
}
