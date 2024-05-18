declare module "*.svg" {
  import type { ReactElement, SVGProps } from "react";

  const content: (
    props: SVGProps<SVGElement> & { alt: string },
  ) => ReactElement;
  export default content;
}
