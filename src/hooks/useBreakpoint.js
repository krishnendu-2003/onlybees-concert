import { useEffect, useState } from "react";

export function useIsNarrow(breakpoint = 980) {
  const get = () => (typeof window === "undefined" ? false : window.innerWidth <= breakpoint);
  const [isNarrow, setIsNarrow] = useState(get);

  useEffect(() => {
    const onResize = () => setIsNarrow(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isNarrow;
}
