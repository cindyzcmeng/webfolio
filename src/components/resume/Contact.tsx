const EMAIL = "cindyzcmeng@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/cindyzcmeng";

export default function Contact() {
  return (
    <section id="contact" className="flex w-full flex-col items-start gap-8">
      <h3 className="font-heading text-3xl uppercase text-moss sm:text-4xl md:text-5xl">
        Contact
      </h3>
      <p className="font-body text-lg leading-relaxed text-moss md:text-2xl">
        I'm always happy to talk design, research, or new opportunities — reach out any time.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <a
          href={`mailto:${EMAIL}`}
          className="font-body text-lg uppercase text-moss underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70 sm:text-xl"
        >
          {EMAIL}
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="font-body text-lg uppercase text-moss underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70 sm:text-xl"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
}
