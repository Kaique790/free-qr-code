export function downloadBase64Image(base64: string) {
  const cleanBase64 = base64.includes("base64,")
    ? base64.split("base64,")[1]
    : base64;

  const byteCharacters = atob(cleanBase64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const filename = "qrcode.png";
  const blob = new Blob([new Uint8Array(byteNumbers)], {
    type: "image/pnge",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  a.remove();
  URL.revokeObjectURL(url);
}
