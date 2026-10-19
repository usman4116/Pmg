import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { Conditions } from "@/components/sections/Conditions";
import { WhyUs } from "@/components/sections/WhyUs";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { Insurance } from "@/components/sections/Insurance";
import { Facilities } from "@/components/sections/Facilities";
import { Faq } from "@/components/sections/Faq";
import { BookingCta } from "@/components/sections/BookingCta";

export default function Home() {
  return (
    <>
      {/* Act I: Night → Sleep & Quiet Hours */}
      <Hero />
      <Intro />

      {/* Act II: Dawn → First Breath, Pulmonary & Primary Care, Philosophy */}
      <Services />
      <WhyUs />

      {/* Act III: Full Daylight → Clinical Index, Physicians, Proof, Infrastructure & Answers */}
      <Conditions />
      <Team />
      <Testimonials />
      <Insurance />
      <Facilities />
      <Faq />

      {/* Act IV: Dusk to Evening → Consultation & Restorative Stillness */}
      <BookingCta />
    </>
  );
}
