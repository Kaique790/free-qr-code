import { auth } from "@/lib/auth";
import QRCodeStyling, { Options } from "qr-code-styling";
import nodeCanvas from "canvas";
import { JSDOM } from "jsdom";

import { NextResponse } from "next/server";
import { CreateQrCodeParams } from "@/app/interfaces/qrcode-details";

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, logoBase64, dotsType } =
    (await req.json()) as CreateQrCodeParams;

  if (!url) {
    return NextResponse.json({ error: "insufficient data" }, { status: 400 });
  }

  const options: Options = {
    width: 300,
    height: 300,
    data: url,
    image: logoBase64,
    dotsOptions: {
      type: dotsType,
    },
    cornersSquareOptions: {
      type: dotsType === "square" || !dotsType ? "square" : "extra-rounded",
    },
    cornersDotOptions: {
      type: dotsType === "square" || !dotsType ? "square" : "extra-rounded",
    },
    qrOptions: {
      errorCorrectionLevel: "H",
    },
    imageOptions: {
      imageSize: 0.6,
      margin: 1,
    },
  };

  const qrCode = new QRCodeStyling({
    nodeCanvas,
    jsdom: JSDOM,
    ...options,
  });

  const bufferQrCode = (await qrCode.getRawData("png")) as Buffer;

  return new NextResponse(new Uint8Array(bufferQrCode), {
    headers: {
      "content-Type": "image/png",
    },
  });
}
