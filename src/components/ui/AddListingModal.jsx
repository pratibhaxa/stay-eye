import { Button, Form, Input, Modal, Tag, Tooltip } from "antd";
import { useState } from "react";

const optionStrings = [
    "Swimming Pool",
    "Gym",
    "Private Beach Access",
    "Wi-Fi",
    "Fireplace",
    "Hot Tub",
    "Ski Access",
    "Rooftop Terrace",
    "Parking",
    "Boat Dock",
    "Firepit",
    "Private Garden",
    "Outdoor Kitchen",
    "Home Theater",
    "Concierge",
    "Spa",
    "Hiking Trails",
    "Private Dock",
    "Smart Home Integration",
    "Wine Cellar",
    "BBQ Area",
    "Playground",
    "Tennis Court",
    "Infinity Pool",
    "Ski-In/Ski-Out",
];
const options = optionStrings.map((option) => ({
    label: option,
    value: option,
}));

export const AddListingModal = ({
    displayAddListingModal,
    setDisplayAddListingModal,
    handleAddListingModal,
    newListing,
    setNewListing,
    options
}) => {
    const [form] = Form.useForm();
    const [newListing, setNewListing] = useState({
        address: "",
        email: "",
        facilities: "",
        propertyName: "",
        rooms: "",
    });

    const handleSubmit = async () => {
        console.log("add listing");
        try {
            const values = await form.validateFields();
            setNewListing(values);
            setDisplayAddListingModal(false);
            form.resetFields();
        } catch (error) {
            console.error("Form validation failed: ", error);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setDisplayAddListingModal(false);
        setNewListing({});
    };

    const handleFormChange = (e, inputField) => {
        const { value } = e.target;
        setNewListing((prevListing) => ({
            ...prevListing,
            [inputField]: value,
        }));
    };

    console.log("newListing: ", newListing);

    return (
        <>
            <Tooltip
                title="Add new property"
                className="add-listing-button add-listing-icon"
                autoAdjustOverflow={true}
            >
                <Button
                    size="default"
                    type="primary"
                    onClick={() => setDisplayAddListingModal(true)}
                >
                    Add Listing
                </Button>
            </Tooltip>
            <Modal
                title="Add Property"
                open={displayAddListingModal}
                onOk={handleSubmit}
                okText="Add"
                onCancel={handleCancel}
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    form={form}
                    requiredMark={false}
                    name="add_listing_modal"
                    initialValues={{
                        email: localStorage.getItem("email") || "",
                    }}
                    onValuesChange={(changedValues, allValues) => {
                        setNewListing(allValues);
                    }}
                >
                    <Form.Item
                        label={
                            <>
                                {newListing.propertyName == undefined ||
                                newListing.propertyName.length === 0 ? (
                                    <Tag color="error">Required</Tag>
                                ) : null}
                                <>Property Name</>
                            </>
                        }
                        name="propertyName"
                    >
                        <Input
                            placeholder="Input property name"
                            onChange={(e) =>
                                handleFormChange(e, "propertyName")
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <>
                                {newListing.address == undefined ||
                                newListing.address.length === 0 ? (
                                    <Tag color="error">Required</Tag>
                                ) : null}
                                <>Address</>
                            </>
                        }
                        name="address"
                    >
                        <Input
                            placeholder="Input address"
                            onChange={(e) => handleFormChange(e, "address")}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <>
                                {newListing.rooms == undefined ||
                                newListing.rooms.length === 0 ? (
                                    <Tag color="error">Required</Tag>
                                ) : null}
                                <>No. of Rooms</>
                            </>
                        }
                        name="rooms"
                    >
                        <Input
                            placeholder="Input number of rooms"
                            onChange={(e) => handleFormChange(e, "rooms")}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <>
                                {newListing.facilities == undefined ||
                                newListing.facilities.length === 0 ? (
                                    <Tag color="error">Required</Tag>
                                ) : null}
                                <>Facilities</>
                            </>
                        }
                        name="facilities"
                    >
                        <Input
                            placeholder="Input facilities"
                            onChange={(e) => handleFormChange(e, "facilities")}
                        />
                    </Form.Item>
                    <Form.Item
                        // label={<div><Tag color="warning">Optional</Tag>Property Manager Email ID</div>}
                        label="Property Manager Email ID"
                        name="email"
                    >
                        <Input
                            placeholder="Input email"
                            disabled
                            // onChange={(e) => handleFormChange(e, "email")}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
