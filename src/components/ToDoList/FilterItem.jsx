import React from "react";
import { LB_TOTAL_ITEM, LB_STATUS, LB_CLEAR_COMPLETED } from "../../utils/const/common";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const FilterItem = ({ filter, setFilter, clearCompleted, countItems }) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "20px",
                padding: "0 300px",
            }}
        >
            <Fab variant="extended" style={{ flexShrink: 0 }}>
                <EditIcon sx={{ mr: 1 }} /> {LB_TOTAL_ITEM} {countItems}
            </Fab>

            <div style={{ display: "flex", gap: "10px" }}>
                {[LB_STATUS.ALL, LB_STATUS.ACTIVE, LB_STATUS.COMPLETED].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        style={{
                            backgroundColor: filter === status ? "#b83f45" : "transparent",
                            color: filter === status ? "white" : "black",
                            border: "1px solid #b83f45",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        {status.toUpperCase()}
                    </button>
                ))}
            </div>
            <button
                onClick={clearCompleted}
                style={{
                    backgroundColor: "transparent",
                    color: "black",
                    border: "1px solid black",
                    padding: "5px 10px",
                    cursor: "pointer",
                }}
            >
                {LB_CLEAR_COMPLETED}
            </button>
        </div>
    );
};

export default FilterItem;