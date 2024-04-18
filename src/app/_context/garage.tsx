import { createContext } from "react";
import type { GarageContext } from "../_types/context/garageContext";

export const garageContext = createContext<GarageContext>({} as GarageContext);