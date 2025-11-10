import { ArrowRightIcon, ImageIcon } from "@phosphor-icons/react/ssr";
import heroImg from "@/assets/images/hero-mockup.png";

import { Button } from "@/components/ui/buttons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-12">
      <div className="space-y-3">
        <h1 className="text-center text-[3.5rem] leading-none font-bold">
          Gere seu <span className="text-primary">QRcode</span> rapidamente.
        </h1>
        <p className="text-center font-medium opacity-60">
          Gere QRcode com seu logotipo. Um clique, 20 QRcodes!
        </p>
      </div>

      <Button
        variant="dark"
        className="mx-auto mt-8 w-[330px] max-w-full rounded-full py-2"
      >
        Gerar o meu <ArrowRightIcon />
      </Button>

      <div className="pl-8">
        <Image
          className="mt-8 ml-auto w-[90%] max-w-full object-cover"
          src={heroImg}
          quality={100}
          width={800}
          height={800}
          alt=""
        />
      </div>

      <div className="px-8">
        <article className="border-dark mx-auto w-[380px] max-w-full overflow-hidden rounded-[2.5rem] border-2">
          <div className="flex h-[244px] flex-col justify-between px-6 py-8">
            <div className="text-center">
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

          <div className="bg-dark flex h-[244px] flex-col justify-between px-6 py-8 text-white">
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
