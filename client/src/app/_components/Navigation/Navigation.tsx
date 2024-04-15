"use client"
import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import styles from "../../_styles/Navigation/Navigation.module.scss";
import Button from "../shared/Button/Button";
import type { Active } from "../../_types/components/navigation";

const Navigation = () => {
  const [active, setActive] = useState<Active>("Garage");
  const router = useRouter();
  const pathname = usePathname();

  const changePage = useCallback((page: "garage" | "winners") => {
    router.push(page === "garage" ? "/" : "/winners");
  }, [router]);

  useEffect(() => {
    setActive(pathname === "/" ? "Garage" : "Winners");
  }, [pathname, setActive])

  return (
    <div className={styles.navigation}>
      <h2 className={styles.navigation__page_title}>
        {active}
      </h2>
      <Button
        onClick={() => changePage("winners")}
        isActive={active === "Winners"}
        text="Winners"
      />
      <Button
        onClick={() => changePage("garage")}
        isActive={active === "Garage"}
        text="Garage"
      />
    </div>
  )
}

export default Navigation;