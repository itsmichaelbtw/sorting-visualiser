import type { WithChildren } from "../../../types";

import React, { Suspense } from "react";

export function DevelopmentEnvironment({ children }: WithChildren) {
  if (NODE_ENVIRONMENT === "production") {
    return null;
  }

  return <Suspense fallback={null}>{children}</Suspense>;
}
