import { useLenis } from "@/hooks/useLenis";
import { SlideIntro } from "@/components/wedding/SlideIntro";
import { PersonSlide } from "@/components/wedding/PersonSlide";
import { SlideCouple } from "@/components/wedding/SlideCouple";
import { SlideEnvelope } from "@/components/wedding/SlideEnvelope";
import groomImg from "@/assets/groom.jpg";
import brideImg from "@/assets/bride.jpg";
import { useEffect } from "react";

const Index = () => {
  useLenis();

  useEffect(() => {
    document.title = "Viha & Pranay — A Wedding Invitation";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "A divine invitation to the wedding of Viha & Pranay. Scroll through our story.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return (
    <main className="relative bg-background text-foreground">
      <h1 className="sr-only">Viha Sravani &amp; Pranay Chary — Wedding Invitation</h1>

      <SlideIntro />

    <PersonSlide
        side="right"
        image={brideImg}
        title="The Bride"
        name="Viha Sravani"
        intro="Daughter of Mr. Ravuri Malleshwara Rao & Mrs. Padhmavathi. A classical dancer and storyteller, who finds magic in the smallest moments of life."
        meta="Chinthaparru, Palakollu · 1998"
        bg="royal"
      />

      <PersonSlide
        side="left"
        image={groomImg}
        title="The Groom"
        name="Pranay Chari"
        intro="Son of Mr. Kolloju Narsimha Charyi & Mrs. Uma Maheshwari. An architect by trade, a dreamer by heart — finding poetry in still mornings and quiet music."
        meta="Chitkul, Hyderabad · 1998"
        bg="cream"
      />


      <SlideCouple />

      <SlideEnvelope />
    </main>
  );
};

export default Index;
