/// <reference types="react" />

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;

  export default ReactComponent;
}
