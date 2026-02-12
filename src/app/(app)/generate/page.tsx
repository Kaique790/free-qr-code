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

        <div className="mt-4 lg:flex lg:gap-12">
          <div className="w-full space-y-2 lg:w-1/4">
            <p>Onde será usado o seu QRcode?</p>
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1/4 md:py-2 lg:flex-0"
              >
                Link
              </Button>
              <Button
                disabled
                variant="outline"
                size="sm"
                className="flex-1/4 md:py-2 lg:flex-0"
              >
                Redes sociais
              </Button>
              <Button
                disabled
                variant="outline"
                size="sm"
                className="flex-1/4 md:py-2 lg:flex-0"
              >
                Telefone
              </Button>
            </div>
          </div>

          <QrLinkForm />
        </div>
      </div>
    </Container>
  );
}
