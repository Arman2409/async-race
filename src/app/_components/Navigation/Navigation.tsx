"use client"
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import styles from "../../_styles/components/Navigation/Navigation.module.scss";
import capitalizeFirstLetter from "../../_helpers/capitalizeFirstLetter";
import Button from "../shared/Button/Button";
import type { Active } from "../../_types/components/navigation";

const Navigation = () => {
  const [active, setActive] = useState<Active>("garage");
  const router = useRouter();
  const pathname = usePathname();

  const changePage = useCallback((page: "garage" | "winner") => {
    router.push(page === "garage" ? "/" : page);
  }, [router]);

  useEffect(() => {
    // change active element by the window's location 
    setActive(pathname === "/" ? "garage" : "winner");
  }, [pathname, setActive])

  return (
    <div className={styles.navigation}>
      <h2 className={styles.navigation__page_title}>
        {capitalizeFirstLetter(active)}
      </h2>
      <Button
        onClick={() => changePage("winner")}
        isActive={active === "winner"}
        text="Winner"
      />
      <Button
        onClick={() => changePage("garage")}
        isActive={active === "garage"}
        text="Garage"
      />
    </div>
  )
}

export default Navigation;