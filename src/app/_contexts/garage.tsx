import { createContext } from "react";
import type { GarageContext } from "../_types/contexts/garage";

export const garageContext = createContext<GarageContext>({} as GarageContext);