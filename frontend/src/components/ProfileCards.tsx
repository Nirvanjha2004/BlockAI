import {Card, CardFooter, Image, Button} from "@nextui-org/react";

export default function ProfileCards() {
  return (
    <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={400}
        src="https://nextui.org/images/hero-card.jpeg"
        width={400}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-lg text-white/80">Available soon.</p>
        <Button
          className="text-lg text-white bg-black/20"
          color="default"
          radius="lg"
          size="lg"
          variant="flat"
        >
          Notify me
        </Button>
      </CardFooter>
    </Card>
  );
}
