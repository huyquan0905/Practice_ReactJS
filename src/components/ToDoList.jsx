import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/base/Button';
import {
    LB_TO_DO_LIST,
    LB_ADD,
    MSG_ADD_TO_DO_LIST,
    LB_All,
    LB_Active,
    LB_Complete,
    LB_CLEAR_COMPLETED,
    LB_TOTAL_ITEM
} from "../utils/const/common";

const ToDoList = () => {
    const ListJob = "JOB_LIST";

    const [job, setJob] = useState("");
    const [jobList, setJobList] = useState(() => {
        const storageJobList = JSON.parse(localStorage.getItem(ListJob));
        return storageJobList ?? [];
    });
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem(ListJob, JSON.stringify(jobList));
    }, [jobList]);

    const handleAddJob = () => {
        if (!job.trim()) return;
        const newJob = { id: Date.now(), text: job.trim(), completed: false };
        setJobList([...jobList, newJob]);
        setJob("");
    };

    const jobStatus = (id) => {
        setJobList((prevList) =>
            prevList.map((job) =>
                job.id === id ? { ...job, completed: !job.completed } : job
            )
        );
    };

    const clearCompleted = () => {
        setJobList((prevList) => prevList.filter((job) => !job.completed));
    };

    const filteredJobs = jobList.filter((job) => {
        if (filter === "completed") {
            return job.completed;
        }
        if (filter === "active") {
            return !job.completed;
        }
        return true;
    });

    return (
        <div style={{ padding: "10px", textAlign: "center" }}>
            <h1 style={{ color: "#b83f45" }}>{LB_TO_DO_LIST}</h1>
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
                <Button
                    onClick={handleAddJob}
                    style={{ padding: "10px 20px" }}
                >
                    {LB_ADD}
                </Button>

            </div>
            <ul
                style={{
                    listStyleType: "none",
                    padding: 0,
                    margin: "20px auto",
                    maxWidth: "200px",
                    textAlign: "center",
                }}
            >
                {filteredJobs.map((job) => (
                    <li key={job.id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <input
                            type="checkbox"
                            checked={job.completed}
                            onChange={() => jobStatus(job.id)}
                        />
                        <span
                            style={{
                                textDecoration: job.completed ? "line-through" : "none",
                                flex: "1",
                            }}
                        >
                            {job.text}
                        </span>
                    </li>
                ))}
            </ul>

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
                    <EditIcon sx={{ mr: 1 }} /> {LB_TOTAL_ITEM} {jobList.filter((job) => !job.completed).length}
                </Fab>

                <div style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={() => setFilter("all")}
                        style={{
                            backgroundColor: filter === "all" ? "#b83f45" : "transparent",
                            color: filter === "all" ? "white" : "black",
                            border: "1px solid #b83f45",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        {LB_All}
                    </button>

                    <button
                        onClick={() => setFilter("active")}
                        style={{
                            backgroundColor: filter === "active" ? "#b83f45" : "transparent",
                            color: filter === "active" ? "white" : "black",
                            border: "1px solid #b83f45",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        {LB_Active}
                    </button>

                    <button
                        onClick={() => setFilter("completed")}
                        style={{
                            backgroundColor: filter === "completed" ? "#b83f45" : "transparent",
                            color: filter === "completed" ? "white" : "black",
                            border: "1px solid #b83f45",
                            padding: "5px 10px",
                            cursor: "pointer",
                        }}
                    >
                        {LB_Complete}
                    </button>
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


        </div >
    );
};

export default ToDoList;
