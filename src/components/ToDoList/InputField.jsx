import React from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/base"
import { LB_ADD, MSG_ADD_TO_DO_LIST } from "../../utils/const/common";

const InputField = ({ job, setJob, handleAddJob }) => {
    return (
        <div style={{ display: "flex", gap: "10px", marginLeft: "300px", marginRight: "300px" }}>
            <TextField
                value={job}
                onChange={(e) => setJob(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleAddJob();
                    }
                }}
                label={MSG_ADD_TO_DO_LIST}
                variant="outlined"
                fullWidth
            />
            <Button onClick={handleAddJob} style={{ padding: "10px 20px" }}>
                {LB_ADD}
            </Button>
        </div>
    );
};

export default InputField;
