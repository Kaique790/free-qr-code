import QRCodeStyling, { CornerSquareType, Options } from "qr-code-styling";

export type dotsType = "rounded" | "dots" | "square";

interface CreateQrCodeParams {
  url?: string;
  logoBase64?: string;
  dotsType?: dotsType;
  color?: string;
  logoSize: number;
}

const cornersSquareType: Record<dotsType, CornerSquareType> = {
  dots: "dot",
  square: "square",
  rounded: "extra-rounded",
};

export async function createQrCode({
  url = "https://free-qr-code-64.vercel.app",
  logoBase64,
  dotsType = "square",
  color = "#000",
  logoSize = 0.6,
}: CreateQrCodeParams): Promise<string> {
  const options: Options = {
    width: 1000,
    height: 1000,
    data: url,
    image: logoBase64,
    margin: 10,
    dotsOptions: {
      type: dotsType,
      color: color,
    },
    cornersSquareOptions: {
      type: cornersSquareType[dotsType],
    },
    cornersDotOptions: {
      type: dotsType === "square" ? "square" : "dot",
    },
    qrOptions: {
      errorCorrectionLevel: logoBase64 ? "H" : "L",
    },
    imageOptions: {
      imageSize: logoSize,
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
