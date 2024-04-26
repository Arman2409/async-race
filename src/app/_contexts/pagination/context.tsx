import { createContext } from "react";

import type { PaginationContext } from "../../_types/contexts/pagination";

export const paginationContext = createContext<PaginationContext>({} as PaginationContext);