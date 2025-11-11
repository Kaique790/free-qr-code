import {
  ArrowRightIcon,
  CheckIcon,
  ImageIcon,
} from "@phosphor-icons/react/ssr";
import heroImg from "@/assets/images/hero-mockup.png";

import { Button } from "@/components/ui/buttons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-12 ml-auto grid max-w-[calc(100vw-(100vw-1200px)/2)] gap-8 min-[800px]:mt-17 min-[800px]:grid-cols-2 min-[800px]:grid-rows-[auto_1fr] min-[800px]:items-start">
      <div className="px-8 min-[800px]:order-0 min-[800px]:col-start-1 min-[800px]:row-start-1">
        <div className="flex items-center justify-center gap-2 text-sm opacity-35 min-[800px]:justify-start">
          <span className="bg-primary rounded-full p-1">
            <CheckIcon size={12} />
          </span>
          QRcode grátis
        </div>
        <div className="mt-4 space-y-3">
          <h1 className="text-center text-[3.5rem] leading-none font-bold min-[800px]:text-left">
            Gere seu <span className="text-primary">QRcode</span> rapidamente.
          </h1>
          <p className="text-center font-medium opacity-60 min-[800px]:text-left">
            Gere QRcode com seu logotipo. Um clique, 20 QRcodes!
          </p>
        </div>

        <Button
          variant="dark"
          className="mx-auto mt-8 w-[330px] max-w-full rounded-full py-2 min-[800px]:mx-0 min-[800px]:mt-12"
        >
          Gerar o meu <ArrowRightIcon />
        </Button>
      </div>

      <div className="pl-8 min-[800px]:order-0 min-[800px]:col-start-2 min-[800px]:row-span-2 min-[800px]:row-start-1 min-[800px]:pl-0">
        <Image
          className="mt-8 ml-auto w-[90%] max-w-full object-cover min-[800px]:mt-0"
          src={heroImg}
          quality={100}
          width={1500}
          height={1500}
          alt=""
        />
      </div>

      <div className="px-8 min-[800px]:order-0 min-[800px]:col-start-1 min-[800px]:row-start-2 min-[800px]:mt-12 min-[800px]:px-0 min-[800px]:pl-8">
        <article className="border-dark mx-auto w-[380px] max-w-full overflow-hidden rounded-[2.5rem] border-2 min-[800px]:mx-0 min-[800px]:flex min-[800px]:w-[520px]">
          <div className="flex h-[244px] flex-col justify-between px-6 py-8">
            <div className="text-center min-[800px]:text-left">
              <h3 className="text-2xl font-medium">QR + LOGO</h3>
              <p className="opacity-70">
                você pode adicionar sua logo, só copiar e colar.
              </p>
            </div>

            <div className="mx-auto flex items-center justify-center gap-3">
              <ImageIcon size={32} />
              <p className="text-sm">
                Escolha uma moldura e chame atenção para seu projeto!
              </p>
            </div>
          </div>

          <div className="bg-dark flex h-[244px] flex-col justify-between px-6 py-8 text-white min-[800px]:min-w-[230px]">
            <div className="text-center">
              <span className="text-5xl font-bold">100%</span>
              <p className="font-light">
                De desconto no seu <span className="font-medium">QRcode</span>.
              </p>
            </div>

            <div className="mx-auto h-px w-[100px] max-w-full bg-white/25" />

            <Button variant="white" className="mx-auto w-fit">
              Gerar com logotipo
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
