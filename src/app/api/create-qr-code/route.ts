import { auth } from "@/lib/auth";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, logoBase64, bg, logoSize, shape, shapeColor, shapePadding } =
    await req.json();

  if (!url) {
    return NextResponse.json({ error: "insufficient data" }, { status: 400 });
  }

  const haslogoURL = logoBase64
    ? "https://qrcode-generator-py.onrender.com/qrcode_logo"
    : "https://qrcode-generator-py.onrender.com/qrcode";

  try {
    const res = await axios.post(haslogoURL, {
      url,
      logo_base64: logoBase64 ?? null,
      logo_size: logoSize,
      bg,
      shape,
      shape_color: shapeColor,
      shape_padding: shapePadding,
    });

    return NextResponse.json(res.data);
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: "Internal Error on Generate QR Code" },
        { status: 500 },
      );
    }

    if (error.response) {
      return NextResponse.json(
        { error: "Error on Generate QR Code" },
        { status: error.response.status },
      );
    }

    if (error.request) {
      return NextResponse.json(
        { error: "External Server Not Response" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Error on Generate QR Code" },
      { status: 500 },
    );
  }
}
