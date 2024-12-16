import React from "react";
import { LB_STATUS } from "../../../utils/const/common";

const withFilter = (WrappedComponent) => {
    return ({filter, joblist, ...props}) => {
        const filterJobs = joblist.filter((job) => {
            if(filter === LB_STATUS.COMPLETED) return job.completed;
            if(filter === LB_STATUS.ACTIVE) return !job.completed;
            return true;
        });

        return <WrappedComponent filterJobs = {filterJobs} {...props} />;
    }
}