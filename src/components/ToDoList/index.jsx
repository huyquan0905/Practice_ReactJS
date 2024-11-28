import React, { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import ToDoItem from './ToDoItem';
import FilterItem from './FilterItem';
import { LB_STATUS, LB_TO_DO_LIST } from '../../utils/const/common';

const ToDoPage = () => {
    const ListJob = "JOB_LIST";
    const [job, setJob] = useState("");
    const [filter, setFilter] = useState(LB_STATUS.ALL);
    const jobListRef = useRef(() => {
        const storageJobList = JSON.parse(localStorage.getItem(ListJob));
        return storageJobList ?? [];
    });

    const [jobList, setJobList] = useState(jobListRef.current);

    useEffect(() => {
        localStorage.setItem(ListJob, JSON.stringify(jobList));
    }, [jobList]);

    const handleAddJob = () => {
        if (!job.trim()) return;
        const newJob = { id: Date.now(), text: job.trim(), completed: false };
        setJobList((prevList) => {
            const updatedList = [...prevList, newJob];
            jobListRef.current = updatedList;
            return updatedList;
        });
        setJob("");
    };

    const jobStatus = (id) => {
        setJobList((prevList) => {
            const updatedList = prevList.map((job) =>
                job.id === id ? { ...job, completed: !job.completed } : job
            );
            jobListRef.current = updatedList;
            return updatedList;
        });
    };

    const editJobText = (id, newText) => {
        setJobList((prevList) => {
            const updatedList = prevList.map((job) =>
                job.id === id ? { ...job, text: newText } : job
            );
            jobListRef.current = updatedList;
            return updatedList;
        });
    };

    const clearCompleted = () => {
        setJobList((prevList) => {
            const updatedList = prevList.filter((job) => !job.completed);
            jobListRef.current = updatedList;
            return updatedList;
        });
    };

    const filteredJobs = jobList.filter((job) => {
        if (filter === LB_STATUS.COMPLETED) return job.completed;
        if (filter === LB_STATUS.ACTIVE) return !job.completed;
        return true;
    });

    return (
        <div style={{ padding: "10px", textAlign: "center" }}>
            <h1 style={{ color: "#b83f45" }}>{LB_TO_DO_LIST}</h1>
            <InputField
                job={job}
                setJob={setJob}
                handleAddJob={handleAddJob}
            />
            <ul style={{ listStyleType: "none", padding: 0, margin: "20px auto", maxWidth: "200px" }}>
                {filteredJobs.map((job) => (
                    <ToDoItem
                        key={job.id}
                        job={job}
                        jobStatus={jobStatus}
                        editJobText={editJobText}
                    />
                ))}
            </ul>
            <FilterItem
                filter={filter}
                setFilter={setFilter}
                clearCompleted={clearCompleted}
                countItems={jobList.filter((job) => !job.completed).length}
            />
        </div>
    );
};

export default ToDoPage;
