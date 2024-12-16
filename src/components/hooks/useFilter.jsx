import { useState } from 'react';

const useFilter = (data, filterCondition) => {
    const [filter, setFilter] = useState(filterCondition);

    const filteredData = data.filter((item) => {
        if (filter === "COMPLETED") return item.completed;
        if (filter === "ACTIVE") return !item.completed;
        return true;
    });

    return { filter, setFilter, filteredData };
};

export default useFilter;
