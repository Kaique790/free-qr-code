import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url, logoBase64, bg, logoSize, shape, shapeColor, shapePadding } =
    await req.json();

  if (!url || !logoBase64) {
    return NextResponse.json({ error: "insufficient data" }, { status: 400 });
  }

  const res = await fetch(
    "https://qrcode-generator-py.onrender.com/qrcode_logo",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
        logo_base64: logoBase64,
        logo_size: logoSize,
        bg,
        shape,
        shape_color: shapeColor,
        shape_padding: shapePadding,
      }),
    },
  );

  if (!res.ok) {
    console.log(res);
    return NextResponse.json(
      { error: "Generate qr-code error" },
      { status: 500 },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
