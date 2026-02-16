export function downloadQr(imgURL: string) {
  const link = document.createElement("a");
  link.href = imgURL;
  link.download = "qrcode.png";
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(imgURL);
}
