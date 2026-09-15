import clsx from "clsx";

import styles from "./supporters-section.module.css";

import { ScrollReveal } from "@/components/scroll-reveal";
import { title } from "@/components/primitives";

const SUPPORTERS = [
  {
    className: styles.ituLogo,
    name: "ITU NextGen",
  },
  {
    className: styles.innovationFundLogo,
    name: "Innovation Fund Denmark",
  },
  {
    className: styles.creativeEuropeLogo,
    name: "Creative Europe MEDIA",
  },
] as const;

export function SupportersSection() {
  return (
    <section aria-labelledby="supporters" className={styles.section}>
      <div aria-hidden="true" className={styles.edge}>
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M333.105 104.653L0 40.5698V0H1200V40.5698L924.558 80.477L604.292 40.5698L333.105 104.653Z" />
        </svg>
      </div>

      <ScrollReveal className={styles.content}>
        <h2
          className={clsx(
            title({ fullWidth: true }),
            "auxMono notBold",
            styles.heading,
          )}
          id="supporters"
        >
          We are supported by
        </h2>

        <ol aria-label="Brainglyph supporters" className={styles.grid}>
          {SUPPORTERS.map((supporter, index) => (
            <li key={supporter.name} className={styles.cell}>
              <span aria-hidden="true" className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-label={supporter.name}
                className={clsx(styles.logo, supporter.className)}
                role="img"
              />
            </li>
          ))}
        </ol>
      </ScrollReveal>
    </section>
  );
}
