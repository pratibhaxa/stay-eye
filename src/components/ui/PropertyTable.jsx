import React, { useEffect, useState } from "react";
import { Table } from "antd";
import TablePagination from "@mui/material/TablePagination";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useSelector } from "react-redux";

const columns = [
    {
        title: "Property Name",
        dataIndex: "propertyName",
    },
    {
        title: "Address",
        dataIndex: "address",
    },
    {
        title: "No. of Rooms",
        dataIndex: "numberOfRooms",
    },
    {
        title: "Facilities",
        dataIndex: "facilities",
        render: (facilities) => facilities.join(", "), // Display facilities as a comma-separated string
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

export const PropertyTable = () => {
    const data = useSelector((state) => {
        return state.properties;
    })
    // const [propertyList, setPropertyList] = useState([]);
    // const propertiesCollectionRef = collection(db, "properties");

    // const getPropertyList = async () => {
    //     try {
    //         const data = await getDocs(propertiesCollectionRef);
    //         const filteredData = data.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         const matchingProperties = [];
    //         for (var i = 0; i < filteredData.length; i++) {
    //             let obj = filteredData[i];
    //             if (
    //                 obj["property_manager_email"] === auth?.currentUser?.email
    //             ) {
    //                 matchingProperties.push(obj);
    //             }
    //         }
    //         setPropertyList(matchingProperties);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     getPropertyList();
    // }, []);

    // console.log("propertyList: ", propertyList);

    const [page, setPage] = useState(0); // Track the current page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Track rows per page

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page on rows per page change
    };

    // Calculate the data for the current page
    const paginatedData = data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item, index) => ({
            ...item,
            key: `${page * rowsPerPage + index}`, // Ensure each row has a unique key
        }));
    
    // console.log("data: ", data);

    return (
        <>
            <Table
                columns={columns}
                dataSource={paginatedData} // Display only the paginated data
                size="small"
                pagination={false} // Disable internal Ant Design table pagination
            />
            <TablePagination
                component="div"
                count={data.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
        </>
    );
};
