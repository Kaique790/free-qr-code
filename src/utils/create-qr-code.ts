import QRCodeStyling, { Options } from "qr-code-styling";

export type dotsType = "rounded" | "dots" | "square";

interface CreateQrCodeParams {
  url?: string;
  logoBase64?: string;
  dotsType?: dotsType;
}

export async function createQrCode({
  url = "https://free-qr-code-64.vercel.app",
  logoBase64,
  dotsType = "square",
}: CreateQrCodeParams): Promise<string> {
  const options: Options = {
    width: 300,
    height: 300,
    data: url,
    image: logoBase64,
    dotsOptions: {
      type: dotsType,
    },
    cornersSquareOptions: {
      type: dotsType === "square" ? "square" : "extra-rounded",
    },
    cornersDotOptions: {
      type: dotsType === "square" ? "square" : "extra-rounded",
    },
    qrOptions: {
      errorCorrectionLevel: logoBase64 ? "H" : "L",
    },
    imageOptions: {
      imageSize: 0.6,
      margin: 1,
    },
  };

  const qrCode = new QRCodeStyling(options);

  const tempDiv = document.createElement("div");
  qrCode.append(tempDiv);

  const blob = await qrCode.getRawData("png");

  const objectUrl = URL.createObjectURL(blob as Blob);

  return objectUrl;
}
