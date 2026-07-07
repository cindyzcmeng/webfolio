import profileMask from "../../assets/images/profile-mask.svg";
import profileBackdrop from "../../assets/images/profile-photo.svg";
import profileTud from "../../assets/images/profile-tud.png";
import hiDoodle from "../../assets/images/hi-doodle.svg";

export default function AboutMe() {
  return (
    <section className="flex w-full flex-col items-start gap-8">
      <h2 className="font-heading text-3xl uppercase text-moss sm:text-4xl md:text-5xl">
        About ME
      </h2>
      <div className="flex w-full flex-col items-center gap-8 md:flex-row md:items-center">
        <p className="font-body text-lg leading-relaxed text-moss md:flex-1 md:text-2xl">
          I am a product designer with a multicultural background, I am drawn to projects where
          physical and digital experiences meet, and bring a research-driven approach to
          interaction design.
          <br />
          <br />
          I believe design is a tool for connection. My work focuses on shaping{" "}
          <span className="font-bold">how we interact with technology</span> in{" "}
          <span className="font-bold">public spaces</span>, such as museums and libraries, to
          ensure that as we leverage powerful tools like LLMs, the human experience remains at the
          core of the design.
          <br />
          <br />
          I'm currently based in the Netherlands as a Master of Design for Interaction student at
          Delft University of Technology (TU Delft).
        </p>
        <div className="relative h-[260px] shrink-0 md:h-[320px]" style={{ aspectRatio: "264.81 / 292.836" }}>
          <div
            className="absolute inset-0"
            style={{
              maskImage: `url(${profileMask})`,
              WebkitMaskImage: `url(${profileMask})`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <img
              src={profileBackdrop}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={profileTud}
              alt="Portrait"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <img
            src={hiDoodle}
            alt=""
            aria-hidden
            className="absolute -right-6 top-2 w-24 -rotate-[11deg] sm:w-28"
            style={{ aspectRatio: "120.488 / 73.3834", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
