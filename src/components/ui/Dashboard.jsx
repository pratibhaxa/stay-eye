import { useState } from "react";
import { Navbar } from "./Navbar";

export const Dashboard = () => {
    const [current, setCurrent] = useState(localStorage.getItem("currentNavbarItem") || "dashboard");
    localStorage.setItem("currentNavbarItem", current);

    return (
        <>
            <Navbar
                current={current}
                setCurrent={setCurrent}s
            />
        </>
    )
}