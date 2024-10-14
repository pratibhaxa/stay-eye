import { useState } from "react";
import { PropertyTable } from "./PropertyTable"
import { Navbar } from "./Navbar";
import { AddListingModal } from "./AddListingModal";
import { Divider, Typography } from "antd";
import "../styling/Properties.css";
import { facilities } from "../../data/facilities";

export const Properties = () => {
    const [current, setCurrent] = useState(localStorage.getItem("currentNavbarItem") || "dashboard");
    const [displayAddListingModal, setDisplayAddListingModal] = useState(false);
    const [newListing, setNewListing] = useState({});

    const options = facilities.map((option) => ({
        label: option,
        value: option,
      }));

    localStorage.setItem("currentNavbarItem", current);
    
    const handleAddListingModal = (e) => {
        setDisplayAddListingModal(true);
    }

    return (
        <>
            <Navbar
                current={current}
                setCurrent={setCurrent}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "12px" }}>
                <AddListingModal
                    displayAddListingModal={displayAddListingModal}
                    setDisplayAddListingModal={setDisplayAddListingModal}
                    handleAddListingModal={handleAddListingModal}
                    newListing={newListing}
                    setNewListing={setNewListing}
                    options={options}
                />
            </div>
            <Divider orientation="left">
                <Typography>Properties</Typography>
            </Divider>
            <PropertyTable />
        </>
    )
}