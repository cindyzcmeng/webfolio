import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import heroImage from "../assets/bancall/bancall-concept.png";
import ardoinesEnvisionRender from "../assets/bancall/ardoines-envision-render.png";
import ardoinesMap from "../assets/bancall/ardoines-map.png";
import ardoinesEnvision from "../assets/bancall/ardoines-envision.png";
import byTheSeine from "../assets/bancall/by-the-seine.png";
import keywords from "../assets/bancall/keywords.png";
import waterLand from "../assets/bancall/water-land.png";
import ripple from "../assets/bancall/ripple.png";
import organic from "../assets/bancall/organic.png";
import childLike from "../assets/bancall/child-like.png";
import floatingpic from "../assets/bancall/floating.png";
import floating from "../assets/bancall/floating-movement.png";
import falling from "../assets/bancall/falling.png";
import balancing from "../assets/bancall/balancing.png";
import ref1 from "../assets/bancall/ref-1.png";
import ref2 from "../assets/bancall/ref-2.png";
import ideation from "../assets/bancall/ideation.png";
import kinetic1 from "../assets/bancall/kinetic-1.png";
import kinetic2 from "../assets/bancall/kinetic-2.png";
import kinetic2027 from "../assets/bancall/kinetic-2027.gif";
import kinetic2026 from "../assets/bancall/kinetic-2026.gif";
import kinetic2025 from "../assets/bancall/kinetic-2025.gif";
import clay1 from "../assets/bancall/clay-1.png";
import clay2 from "../assets/bancall/clay-2.png";
import threeDPrint1 from "../assets/bancall/3d-print-1.png";
import wood from "../assets/bancall/wood.png";
import feedback from "../assets/bancall/feedback.png";
import risk from "../assets/bancall/risk.png";
import opportunity from "../assets/bancall/opportunity.png";
import finalOutcome from "../assets/bancall/final.png";
import threeDPrint from "../assets/bancall/3d-print.png";
import dimension from "../assets/bancall/dimension.png";
import loopDisplay from "../assets/bancall/Loop Display.mp4";
import movement from "../assets/bancall/movement.png";
import color from "../assets/bancall/color.png";
import material from "../assets/bancall/material.png";
import finishing from "../assets/bancall/finishing.png";
import finalPrototype from "../assets/bancall/final-prototype.png";
import implementation from "../assets/bancall/implementation.png";

const ACCENT = "#e41346";
const INK = "#121212";
const MUTE = "#999195";

const TOC_SECTIONS = [
  { id: "background", tag: "background" },
  { id: "challenge", tag: "challenge" },
  { id: "research", tag: "research" },
  { id: "concept", tag: "concept" },
  { id: "development", tag: "development" },
  { id: "result", tag: "result" },
  { id: "implementation", tag: "implementation" },
] as const;

type BancallDetailPageProps = {
  overlay?: boolean;
};

function BackLink({ overlay }: { overlay: boolean }) {
  const navigate = useNavigate();
  const className =
    "group flex w-fit cursor-pointer items-center gap-2 self-start font-programme text-base text-[#999195] outline-none transition-colors hover:text-[#e41346] focus-visible:text-[#e41346] focus-visible:ring-2 focus-visible:ring-[#e41346]/40 focus-visible:ring-offset-2";

  const Arrow = () => (
    <svg
      viewBox="0 0 100 49"
      className="h-4 w-8 rotate-90 fill-current transition-transform duration-200 ease-out group-hover:-translate-x-1 group-active:translate-x-0"
    >
      <path d="M51 31C51 29.8954 50.1046 29 49 29C47.8954 29 47 29.8954 47 31L49 31L51 31ZM47.5858 33.9142C48.3668 34.6953 49.6332 34.6953 50.4142 33.9142L63.1421 21.1863C63.9232 20.4052 63.9232 19.1389 63.1421 18.3579C62.3611 17.5768 61.0948 17.5768 60.3137 18.3579L49 29.6716L37.6863 18.3579C36.9052 17.5768 35.6389 17.5768 34.8579 18.3579C34.0768 19.1389 34.0768 20.4052 34.8579 21.1863L47.5858 33.9142ZM49 31L47 31L47 32.5L49 32.5L51 32.5L51 31L49 31Z" />
    </svg>
  );

  if (overlay) {
    return (
      <button type="button" onClick={() => navigate(-1)} className={className}>
        <Arrow />
        Back to homepage
      </button>
    );
  }

  return (
    <Link to="/" className={className}>
      <Arrow />
      Back to homepage
    </Link>
  );
}

function Tag({ children, alanSans = false }: { children: string; alanSans?: boolean }) {
  return (
    <span
      className={`text-sm uppercase tracking-wide sm:text-base ${alanSans ? "font-body" : "font-programme"}`}
      style={{ color: MUTE }}
    >
      {children}
    </span>
  );
}

function SectionHeader({ title, tag }: { title: string; tag: string }) {
  return (
    <header className="flex flex-col gap-2">
      <h2 className="font-programme-alt text-3xl font-bold uppercase sm:text-4xl" style={{ color: ACCENT }}>
        {title}
      </h2>
      <Tag>{tag}</Tag>
    </header>
  );
}

function Subtitle({ children }: { children: string }) {
  return (
    <h3 className="font-programme text-xl font-bold sm:text-2xl" style={{ color: INK }}>
      {children}
    </h3>
  );
}

function Body({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <p className="font-programme text-base leading-relaxed sm:text-lg" style={{ color: muted ? MUTE : INK }}>
      {children}
    </p>
  );
}

function Label({ children }: { children: string }) {
  return (
    <p
      className="font-programme text-sm font-bold uppercase tracking-wide sm:w-64 sm:shrink-0 sm:text-base"
      style={{ color: MUTE }}
    >
      {children}
    </p>
  );
}

function LabeledRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
      <Label>{label}</Label>
      <Body>{children}</Body>
    </div>
  );
}

type FigureImage = { src: string; alt: string; width: number; ratio: number };

function Figure({ images, equal = false }: { images: FigureImage[]; equal?: boolean }) {
  const totalWidth = images.reduce((sum, img) => sum + img.width, 0);
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      {images.map((img) => (
        <div
          key={img.src}
          className="w-full overflow-hidden"
          style={{
            flex: equal ? "1 1 0%" : `0 1 ${((img.width / totalWidth) * 100).toFixed(4)}%`,
            aspectRatio: `${img.ratio}`,
          }}
        >
          <img src={img.src} alt={img.alt} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

// kinetic-2.png is the flattened background plate; the three gifs sit inset
// on top of it at the exact offsets they occupy in the Figma frame.
function KineticTwo() {
  const insets = [
    { src: kinetic2027, alt: "Kinetic sculpture iteration 2027", left: 3.918, width: 28.361 },
    { src: kinetic2026, alt: "Kinetic sculpture iteration 2026", left: 34.147, width: 33.582 },
    { src: kinetic2025, alt: "Kinetic sculpture iteration 2025", left: 69.6, width: 25.564 },
  ];
  return (
    <div className="relative w-full overflow-hidden" style={{ flex: "0 1 57.6193%", aspectRatio: "1282/259" }}>
      <img src={kinetic2} alt="" className="h-full w-full object-cover" />
      {insets.map((inset) => (
        <div
          key={inset.src}
          className="absolute overflow-hidden"
          style={{
            left: `${inset.left}%`,
            top: "9.264%",
            width: `${inset.width}%`,
            height: "81.485%",
          }}
        >
          <img src={inset.src} alt={inset.alt} className="h-full w-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-6">
      {children}
    </section>
  );
}

function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(TOC_SECTIONS[0].id);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = TOC_SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      // Track a hairline at the very top of the viewport (matching the
      // scroll-mt-24 landing offset) instead of a mid-screen band — a band
      // is wider than short sections like "Background", so it can skip over
      // them and flip to the next section's tag before the short one is
      // actually at the top of the screen.
      { rootMargin: "-96px 0px -100% 0px", threshold: 0 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      aria-label="Table of contents"
      className="top-[15vh] z-40 hidden w-32 flex-col gap-4 self-start 2xl:sticky 2xl:flex"
    >
      {TOC_SECTIONS.map(({ id, tag }) => {
        const active = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={handleClick(id)}
            className="font-programme flex items-center gap-3 text-sm lowercase tracking-wide transition-colors"
            style={{ color: active ? ACCENT : MUTE }}
          >
            <span
              className="h-px shrink-0 transition-all duration-200"
              style={{ backgroundColor: active ? ACCENT : MUTE, width: active ? "24px" : "12px" }}
            />
            {tag}
          </a>
        );
      })}
    </nav>
  );
}

export default function BancallDetailPage({ overlay = false }: BancallDetailPageProps) {
  const content = (
    <div className="mx-auto flex max-w-[1160px] flex-col gap-8 px-6 py-16 sm:px-10">
      <BackLink overlay={overlay} />

      {/* Hero */}
      <div className="flex flex-col gap-4">
        <h1 className="font-programme-alt text-5xl font-bold uppercase sm:text-6xl md:text-7xl" style={{ color: ACCENT }}>
          Bancall
        </h1>
        <div className="flex flex-col gap-6 py-4">
          <p className="font-programme text-2xl sm:text-3xl" style={{ color: ACCENT }}>
            A bench that brings joy and community to the city through movements.
          </p>
          <div className="flex flex-wrap gap-4">
            <Tag alanSans>#PUBLIC FURNITURE</Tag>
            <Tag alanSans>#CULTURE</Tag>
          </div>
        </div>
        <div className="w-full overflow-hidden" style={{ aspectRatio: "1164/965" }}>
          <img src={heroImage} alt="Bancall concept illustration" className="h-full w-full object-cover" />
        </div>
      </div>

      {/*
        TOC and the section list are direct sibling columns in this grid, and
        the grid starts exactly at "Background" — so the TOC's own top edge
        lines up with the first section instead of the hero above it.
      */}
      <div className="grid grid-cols-1 gap-y-24 2xl:grid-cols-[128px_1fr] 2xl:gap-x-24">
        <TableOfContents />
        <div className="flex flex-col gap-24">
        {/* Background */}
        <Section id="background">
          <SectionHeader title="A new neighborhood" tag="#Background" />
          <div className="flex flex-col gap-4">
            <Subtitle>Les Ardoines</Subtitle>
            <a
              href="https://www.les-ardoines-vitry-sur-seine.fr/"
              target="_blank"
              rel="noreferrer"
              className="font-programme text-sm underline italic sm:text-base"
              style={{ color: MUTE }}
            >
              https://www.les-ardoines-vitry-sur-seine.fr/
            </a>
            <Body>
              Located in Vitry-sur-Seine, 3 km from Paris, the Ardoines project is one of the largest development
              operations in France, on a strategic site in the Grand Paris metropolis. The project includes 2 ZACs,
              Gare Ardoines and Seine Gare Vitry. The goal is to{" "}
              <span style={{ color: ACCENT }}>turn the industrial site into a mixed city</span>, where productive
              activities, offices and housing are organized around a supply of quality public spaces and green
              spaces, as well as better accessibility in modes of transport, for the benefit of residents.
            </Body>
          </div>
        </Section>

        {/* Challenge */}
        <Section id="challenge">
          <SectionHeader title="+ Movement" tag="#Challenge" />
          <div className="flex flex-col gap-4">
            <Subtitle>Movement in Urban Space</Subtitle>
            <Body>
              In collaboration with Vitry and developer EPA ORSA, our goal was to{" "}
              <span style={{ color: ACCENT }}>design public facilities</span> for ZAC Seine Gare Vitry in order to{" "}
              <span style={{ color: ACCENT }}>encourage movement</span>, and potentially{" "}
              <span style={{ color: ACCENT }}>create social links</span> in public space.
            </Body>
            <Figure
              images={[
                { src: ardoinesEnvisionRender, alt: "Ardoines site envisioning render", width: 331.894, ratio: 664 / 387 },
                { src: ardoinesMap, alt: "Ardoines ZAC map", width: 252.477, ratio: 505 / 451 },
                { src: ardoinesEnvision, alt: "Ardoines project envision categories", width: 386.42, ratio: 773 / 387 },
              ]}
            />
          </div>
        </Section>

        {/* Research */}
        <Section id="research">
          <SectionHeader title="Sur La Seine" tag="#Research" />
          <div className="flex flex-col gap-4">
            <Subtitle>Living by the Seine</Subtitle>
            <Body>
              After exploring the Seine Gare Vitry Zone, we found that{" "}
              <span style={{ color: ACCENT }}>
                the citizens&rsquo; activities largely revolve around the Seine River
              </span>
              .
            </Body>
            <Body>
              There were children fishing by the riverbank, elder people doing exercises facing the river, young
              people setting up campfire to party... And even graffitists leaving their mark of rebel on the walls
              along the Seine.
            </Body>
            <Figure
              images={[
                { src: byTheSeine, alt: "Illustration of daily life by the Seine", width: 556.0, ratio: 1009 / 545 },
                { src: keywords, alt: "Keywords observed along the Seine", width: 556.0, ratio: 1112 / 405 },
              ]}
            />
          </div>
          <div className="flex flex-col gap-4">
            <Subtitle>Design Direction</Subtitle>
            <Body>
              Once we have formed an understanding of the city and its people, we started pinning down keywords and
              pictures that can help us envision what we would like to build.
            </Body>
            <Body>
              We were looking for something that can <span style={{ color: ACCENT }}>connect</span> people to the
              river, bring communal <span style={{ color: ACCENT }}>interaction</span> to the city, and create{" "}
              <span style={{ color: ACCENT }}>joy</span>. The key to all that is &mdash; water.
            </Body>
          </div>
        </Section>

        {/* Concept */}
        <Section id="concept">
          <SectionHeader title="Water &amp; movement" tag="#Concept" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex flex-1 flex-col gap-4">
              <Subtitle>The Vitality of Water</Subtitle>
              <Body>Water can bring movement to our life, just as it brought vitality to the nature.</Body>
              <Body>
                Our concept was to <span style={{ color: ACCENT }}>bring this vitality water holds to the land </span>
                to<span style={{ color: ACCENT }}> evoke people&rsquo;s inner child</span>, and let joy ripple
                through them.
              </Body>
            </div>
            <div className="flex-1 overflow-hidden">
              <img src={waterLand} alt="Water to land concept diagram" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Subtitle>Keywords</Subtitle>
            <Figure
              equal
              images={[
                { src: ripple, alt: "Ripple — community", width: 1, ratio: 504 / 264 },
                { src: organic, alt: "Organic — nature", width: 1, ratio: 504 / 264 },
                { src: childLike, alt: "Child-like — enjoyment", width: 1, ratio: 504 / 264 },
                { src: floating, alt: "Floating — movement", width: 1, ratio: 504 / 264 },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Subtitle>Floating, Balancing</Subtitle>
            <Body>
              There is a resemblance in floating, falling and balancing &mdash;{" "}
              <span style={{ color: ACCENT }}>a sense of losing gravity</span>. The act of{" "}
              <span style={{ color: ACCENT }}>balancing</span> is particularly interesting to us, as its inherent
              unpredictability creates joy, and it is achievable on land without causing any danger.
            </Body>
            <Figure
              equal
              images={[
                { src: floatingpic, alt: "Floating in water", width: 1, ratio: 731 / 396 },
                { src: falling, alt: "Falling, mid-air", width: 1, ratio: 731 / 396 },
                { src: balancing, alt: "Balancing on a beam", width: 1, ratio: 731 / 396 },
              ]}
            />
            <Body>
              We were also inspired by CLOUD 9, an installation in Belgium. The installation creates playfulness
              through its ever-changing shape. One photograph caught our eyes: People falling on the installation,{" "}
              <span style={{ color: ACCENT }}>playing like a child</span>.
            </Body>
            <Figure
              images={[
                { src: ref1, alt: "CLOUD 9 installation reference 1", width: 406, ratio: 812 / 934 },
                { src: ref2, alt: "CLOUD 9 installation reference 2", width: 706, ratio: 1412 / 934 },
              ]}
            />
          </div>
        </Section>

        {/* Development */}
        <Section id="development">
          <SectionHeader title="An interactive bench" tag="#Development" />

          <div className="flex flex-col gap-4">
            <Subtitle>Ideation</Subtitle>
            <Body>
              Connecting all the dots, the resulting design should be:{" "}
              <span style={{ color: ACCENT }}>
                an installation that creates communal joy through movement of balancing
              </span>
              . Once the concept is defined, iterations of ideas began to form through rough sketches.
            </Body>
            <div className="w-full overflow-hidden">
              <img src={ideation} alt="Ideation sketches" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <Subtitle>Experimentation</Subtitle>

            <div className="flex flex-col gap-4">
              <LabeledRow label="EXP 1 : KINETIC SCULPTURE">
                At first we tried using kinetic structure to mimic the movement of ripple and wave.
              </LabeledRow>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="w-full overflow-hidden" style={{ flex: "0 1 42.3807%", aspectRatio: "943/259" }}>
                  <img src={kinetic1} alt="Kinetic sculpture experiment" className="h-full w-full object-cover" />
                </div>
                <KineticTwo />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <LabeledRow label="EXP 2 : CLAY">
                To lower the need for maintenance, we simplified the structure, and explored the form with clay.
              </LabeledRow>
              <Figure
                images={[
                  { src: clay1, alt: "Clay model experiment 1", width: 670.789, ratio: 1342 / 323 },
                  { src: clay2, alt: "Clay model experiment 2", width: 441.214, ratio: 883 / 323 },
                ]}
              />
            </div>

            <div className="flex flex-col gap-4">
              <LabeledRow label="PROTOTYPE 1 : 3D PRINT">
                We modeled and 3D printed the prototype to demonstrate the scenario.
              </LabeledRow>
              <div className="w-full overflow-hidden">
                <img src={threeDPrint1} alt="3D printed prototype process" className="h-full w-full object-cover" />
              </div>
            </div>

           <div className="flex flex-col gap-4">
              <LabeledRow label="PROTOTYPE 2 : WOOD">
                We invited our classmates to play around with the wooden prototype. Through their behavior, we found potentials of new ways of interaction.
              </LabeledRow>
              <div className="w-full overflow-hidden">
                <img src={wood} alt="Wooden prototype" className="h-full w-full object-cover" />
              </div>
            </div>

          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Subtitle>Evaluating and Refining</Subtitle>
              <Body>
                Based on our observations and user feedbacks, we further refined our design to be safer and more
                entertaining.
              </Body>
              <div className="w-full overflow-hidden">
                <img src={feedback} alt="User feedback quotes" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Potential Risks:</Label>
              <div className="w-full overflow-hidden">
                <img src={risk} alt="Potential safety risks" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Potential Opportunities:</Label>
              <div className="w-full overflow-hidden">
                <img src={opportunity} alt="Potential opportunities" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </Section>

        {/* Result — Bancall */}
        <Section id="result">
          <SectionHeader title="Bancall" tag="#result" />

          <div className="flex flex-col gap-4">
            <Subtitle>Concept</Subtitle>
            <Body>
              Bancall is a unibody interactive bench. With a truncated cone shaped bottom, Bancall can wobble when a
              force is applied to it, and return to still when undisturbed.
            </Body>
            <Figure
              images={[
                { src: finalOutcome, alt: "Bancall isometric line drawing", width: 366.573, ratio: 734 / 215 },
                { src: threeDPrint, alt: "Bancall rendered form", width: 332.713, ratio: 666 / 386 },
                { src: dimension, alt: "Bancall dimensions — 1500mm by 700mm", width: 332.713, ratio: 666 / 387 },
              ]}
            />
            <div className="w-full overflow-hidden mt-6">
              <video src={loopDisplay} autoPlay loop muted playsInline className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Subtitle>Movement</Subtitle>
            <Body>
              As a dynamic sculpture in public environments, Bancall acts as a conversational catalyst, where shared
              physical movement fosters a sense of community. It is designed to accommodate the needs of all
              citizens: sit quietly, climb on it, play with friends... There&rsquo;s a fit for every one.
            </Body>
            <div className="w-full overflow-hidden">
              <img
                src={movement}
                alt="Movement types — Face-to-Face, Teeter Totter, Balance Board"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Subtitle>CMF</Subtitle>
            <Figure
              images={[
                { src: color, alt: "Color palette", width: 218.295, ratio: 437 / 786 },
                { src: material, alt: "Material — WPC wood-plastic composite", width: 346.051, ratio: 693 / 786 },
                { src: finishing, alt: "Finishing — injection molding matte", width: 467.447, ratio: 935 / 786 },
              ]}
            />
          </div>
        </Section>

        {/* implementation — Vitry-sur-Seine */}
        <Section id="implementation">
          <SectionHeader title="Bancall in Vitry-sur-seine" tag="#implementation" />

          <div className="flex flex-col gap-4">
            <Subtitle>Final Prototype</Subtitle>
            <Body>The base is constructed from circular wooden plates and radially arranged trapezoidal panels. 
              The seating volume is built with stacked wooden offcuts, rigid foam and expansive spray foam. The outer shell is sculpted 
              using plaster-saturated cotton cloth and completed with a smooth plaster finish.</Body>
            <div className="w-full overflow-hidden">
              <img src={finalPrototype} alt="Final prototype making process" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Subtitle>Implementation Scenario</Subtitle>
            <div className="w-full overflow-hidden">
              <img
                src={implementation}
                alt="Bancall implementation scenario rendering"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Section>
        </div>
      </div>
    </div>
  );

  if (overlay) {
    return (
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto bg-white"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return <main className="w-full bg-white">{content}</main>;
}
