import React, { useState, useEffect, useRef } from 'react';
import InputField from './InputField';
import ToDoItem from './ToDoItem';
import FilterItem from './FilterItem';
import { LB_STATUS, LB_TO_DO_LIST } from '../../utils/const/common';
import { TablePagination } from '@mui/material';
import useFilter from '../hooks/useFilter';
import {ThemeContext} from "../../context/themeContext";

const ToDoPage = () => {
    const ListJob = "JOB_LIST";
    const [job, setJob] = useState("");
    // const [filter, setFilter] = useState(LB_STATUS.ALL);
    const [editingJobId, setEditingJobId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const jobListRef = useRef(() => {
        const storageJobList = JSON.parse(localStorage.getItem(ListJob));
        return storageJobList ?? [];
    });


    const [jobList, setJobList] = useState(jobListRef.current);
    const {filter, setFilter, filteredData: filterJob} = useFilter(jobList, LB_STATUS.ALL);
    useEffect(() => {
        localStorage.setItem(ListJob, JSON.stringify(jobList));
        console.log("render ne");
    }, [jobList]);

    // Using context in child components
    const { toggleFunction, themeStyles } = React.useContext(ThemeContext);

    const handleAddJob = () => {
        if (!job.trim()) return;
    
        if (editingJobId) {
            // Edit current job
            setJobList((prevList) =>{
                const updateList = prevList.map((jobItem) =>
                    jobItem.id === editingJobId ? { ...jobItem, text: job } : jobItem
                )
                const editedJob = updateList.find((job) => job.id === editingJobId);
                const filteredList = updateList.filter((job) => job.id !== editingJobId);
                setEditingJobId(null); 
                return [editedJob, ...filteredList];
        });
           
            
        } else {
            // Add new job
            const newJob = { id: Date.now(), text: job.trim(), completed: false };
            setJobList((prevList) => [newJob, ...prevList]);
        }
    
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
           const editedJob = updatedList.find((job) => job.id === id);
           const filteredList = updatedList.filter((job) => job.id !== id);
           return [editedJob, ...filteredList];
        });
    };

    const filteredJobs = jobList.filter((job) => {
        if (filter === LB_STATUS.COMPLETED) return job.completed;
        if (filter === LB_STATUS.ACTIVE) return !job.completed;
        return true;
    });

    const paginatedJobs = filteredJobs.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };


    return (
  <div style={{ padding: "10px", textAlign: "center", ...themeStyles }}>
            <h1 style={{ color: "#b83f45" }}>{LB_TO_DO_LIST}</h1>
            <InputField
                job={job}
                setJob={setJob}
                handleAddJob={handleAddJob}
            />

            <ul style={{ listStyleType: "none", padding: 0, margin: "20px auto", maxWidth: "200px" }}>
                {paginatedJobs.map((job) => (
                    <ToDoItem
                        key={job.id}
                        job={job}
                        jobStatus={jobStatus}
                        editJobText={editJobText}
                        onSetJob={(text, id) => {
                            setJob(text);
                            setEditingJobId(id);
                        }}
                    />
                ))}
            </ul>

            <div>
                <button onClick={toggleFunction}>
                    Change Theme
                </button>
            </div>

            <TablePagination
                sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 15]}
                count={filteredJobs.length}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


            <FilterItem
                filter={filter}
                setFilter={setFilter}
                clearCompleted={() => setJobList(jobList.filter((job) => !job.completed))}
                countItems={jobList.filter((job) => !job.completed).length}
            />
        </div>
      
    );
};

export default ToDoPage;