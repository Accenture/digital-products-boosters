import React from "react";
import Accordion from "../accordion";
import Disclosure from "../disclosure";
import PetAdoptionForm from "../pet-adoption-form";

const App = () => (
  <div>
    <Disclosure
      name="Admissions"
      links={[
        { href: "/about", text: "About" },
        { href: "/visit", text: "Visit" },
        { href: "/tution", text: "Tuition" }
      ]}
    />
    <Accordion
      tabData={[
        { title: "About", content: "We are awesome!" },
        { title: "Visit", content: "Come visit us!" },
        { title: "Tuition", content: "We are expensive!" }
      ]}
    />
    <PetAdoptionForm />
  </div>
);

export default App;
