import { createContext } from "react";
import type { GarageContext } from "../_types/context/garage";

export const garageContext = createContext<GarageContext>({} as GarageContext);