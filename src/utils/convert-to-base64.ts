export function convertToBase64(files: FileList): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onload = (readerEvent) => {
      const bas64String = readerEvent.target?.result as string;

      resolve(bas64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}
