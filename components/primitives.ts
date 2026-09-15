import clsx from "clsx";

export function title({ fullWidth = false }: { fullWidth?: boolean } = {}) {
  return clsx(
    "text-[2.3rem] font-semibold leading-9 tracking-tight lg:text-5xl",
    fullWidth ? "block w-full" : "inline",
  );
}
