import { createContext } from "react";

import type { PaginationContext } from "../../_types/context/pagination";

export const paginationContext = createContext<PaginationContext>({} as PaginationContext);