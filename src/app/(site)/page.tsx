
import Hero from "./components/Hero/Hero";
import Services from "./components/Services/Services";
import About from "./components//About/About";
import Process from "./components/Process/Process";
import Gallery  from "./components/Gallery/Gallery";
import Contact from "./components/Contact/Contact";
import Reviews from "./components/Reviews/Reviews";




export default function Page() {
  return (
    <>
    <Hero />
    <Services />
    <About />
    <Process />
     <Gallery />
      <Contact />
      <Reviews />
    </>
  );
}
