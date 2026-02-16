export type dotsType = "rounded" | "dots" | "square";

export interface CreateQrCodeParams {
  url: string;
  logoBase64?: string;
  dotsType?: dotsType;
}
