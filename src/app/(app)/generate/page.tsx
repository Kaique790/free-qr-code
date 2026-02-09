import { Container } from "@/components/container";
import { QrLinkForm } from "@/components/qr-link-form";
import { Button } from "@/components/ui/buttons";

export default function Generate() {
  return (
    <Container className="mx-aut o mt-12 max-w-[1220px] px-8">
      <div>
        <h1 className="text-center text-6xl font-bold">
          Gerando <span className="text-primary">QRcode</span>
        </h1>

        <p className="mt-4 text-center opacity-75">
          Onde será usado o seu QRcode?
        </p>

        <div className="mt-4">
          <div className="flex w-full gap-4">
            <Button variant="outline" size="sm" className="flex-1/4">
              Link
            </Button>
            <Button disabled variant="outline" size="sm" className="flex-1/4">
              Redes sociais
            </Button>
            <Button disabled variant="outline" size="sm" className="flex-1/4">
              Telefone
            </Button>
          </div>

          <QrLinkForm />
        </div>
      </div>
    </Container>
  );
}
