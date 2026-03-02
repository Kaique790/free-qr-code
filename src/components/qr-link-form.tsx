"use client";

import exampleQr from "@/assets/images/example-qr-code.png";
import { cn } from "@/lib/utils";
import { downloadQr } from "@/utils/donwload-qr";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  DownloadSimpleIcon,
  UploadIcon,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/buttons";
import { Input } from "./ui/input";

import { convertToBase64 } from "@/utils/convert-to-base64";
import { createQrCode } from "@/utils/create-qr-code";
import { QrTypes } from "./qr-types";
import { QrDetails } from "./qr-details";
import { useDebounce } from "@/hooks/useDebounce";

const qrLinkFormSchema = z.object({
  url: z.url("URL inválida"),
  dotsType: z.enum(["square", "dots", "rounded"]),
  color: z.string(),
  logoSize: z.string(),
  file: z
    .custom<FileList>()
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
  } = useForm({
    resolver: zodResolver(qrLinkFormSchema),
    defaultValues: {
      url: "https://free-qr-code-64.vercel.app",
      color: "#000",
      logoSize: "0.6",
      dotsType: "square",
    },
  });

  const [qrUrl, setQrUrl] = useState<string | null>(null);

  const watchedUrl = useWatch({ control, name: "url" });
  const watchedDotsType = useWatch({ control, name: "dotsType" });
  const watchedFile = useWatch({ control, name: "file" });
  const watchedLogoSize = useWatch({ control, name: "logoSize" });

  const watchedColor = useWatch({ control, name: "color" });
  const debouncedColor = useDebounce<string>(watchedColor, 1000);

  useEffect(() => {
    async function generateQr() {
      let logoBase64;

      if (watchedFile && watchedFile.length > 0) {
        logoBase64 = await convertToBase64(watchedFile);
      }

      const url = await createQrCode({
        url: watchedUrl,
        logoBase64,
        dotsType: watchedDotsType,
        color: debouncedColor,
        logoSize: Number(watchedLogoSize),
      });

      console.log(watchedLogoSize);

      setQrUrl((oldUrl) => {
        if (oldUrl) URL.revokeObjectURL(oldUrl);
        return url;
      });
    }

    generateQr();
  }, [
    watchedUrl,
    watchedDotsType,
    watchedFile,
    watchedLogoSize,
    debouncedColor,
  ]);

  async function onSubmit() {
    if (!qrUrl) return;
    downloadQr(qrUrl);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex min-h-dvh flex-col gap-16 md:flex-row lg:mt-0 lg:flex-1"
    >
      <div className="flex flex-1 flex-col gap-4 md:w-1/2 md:max-w-[490px]">
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
            {watchedFile && watchedFile.length > 0 && !errors.file ? (
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
        <div className="space-y-4 sm:flex sm:gap-4 md:flex-col lg:flex-row">
          <Image
            alt=""
            width={1000}
            height={1000}
            quality={100}
            src={qrUrl ?? exampleQr}
            className="mx-auto mb-8 block w-full max-w-[440px] sm:max-w-[340px]"
          />

          <QrDetails register={register} />
        </div>

        <Button type="submit" className="mt-8 w-full md:mt-4">
          Baixar QR Code <DownloadSimpleIcon size={20} />
        </Button>
      </div>
    </form>
  );
}
