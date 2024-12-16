import React, { useState, memo } from 'react';

const ToDoItem = memo(({ job, jobStatus, editJobText, onSetJob }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(job.text);

    const handleSave = () => {
        if (!editedText.trim()) return;
        editJobText(job.id, editedText);
        setIsEditing(false);
    };

    const handleDoubleClick = () => {
        onSetJob(job.text, job.id);
        setIsEditing(true);
    }

    return (
        <li style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input
                type="checkbox"
                checked={job.completed}
                onChange={() => jobStatus(job.id)}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave();
                    }}
                    autoFocus
                />
            ) : (
                <span
                    style={{
                        textDecoration: job.completed ? "line-through" : "none",
                        flex: "1",
                    }}
                    onDoubleClick={handleDoubleClick}
                >
                    {job.text}
                </span>
            )}
        </li>
    );
});

export default ToDoItem;