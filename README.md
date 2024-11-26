
# To-Do List Application

This is a simple React-based To-Do List application that allows users to manage tasks efficiently by adding, filtering, marking tasks as complete, and clearing completed tasks.

---

## Features

- Add new tasks to your to-do list.
- Toggle tasks between completed and incomplete states.
- Filter tasks by "All," "Active," or "Completed" states.
- Clear all completed tasks from the list.
- View the total count of active tasks.
- Persistent storage using `localStorage` to save tasks.

---

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- npm or Yarn package manager

### Steps to Run the Application

1. **Clone the repository**:
    ```bash
    git clone https://github.com/huyquan0905/Practice_ReactJS.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd Practice_ReactJS
    ```

3. **Install dependencies**:
    - Using npm:
        ```bash
        npm install
        ```
    - Or using Yarn:
        ```bash
        yarn install
        ```

4. **Start the development server**:
    - Using npm:
        ```bash
        npm start
        ```
    - Or using Yarn:
        ```bash
        yarn start
        ```

5. **Open the application**:
   The application will be available in your browser at [http://localhost:3000](http://localhost:3000).

---

## Usage

### Adding Tasks
1. Use the input field at the top of the application to enter a task.
2. Press **Enter** or click the **Add** button to add the task to the list.

### Managing Tasks
1. Click the checkbox next to a task to toggle its status (completed/incomplete).
2. Click the **Clear Completed** button to remove all completed tasks.

### Filtering Tasks
- Use the **All**, **Active**, or **Completed** buttons to filter the task list.

### Viewing Active Tasks Count
- The **Total Items** button displays the number of active tasks remaining.

---

## File Structure

```
src/
├── components/
│   └── ToDoList.jsx   # Main To-Do List component
├── utils/
│   └── const/
│       └── common.js  # Constants for labels and messages
├── App.js             # Entry point for the app
├── index.js           # Renders the app
```

---

## Customization

- Modify labels and messages in `src/utils/const/common.js` to localize or personalize text in the app.
- Style adjustments can be made directly in the inline styles or by migrating to CSS files or libraries like `styled-components`.

---

## Dependencies

This project uses the following dependencies:
- **React**: Library for building user interfaces.
- **@mui/material**: For UI components (e.g., `TextField`, `Fab`).
- **@mui/icons-material**: For icons (e.g., `EditIcon`).

---

## Contributing

Feel free to submit issues or contribute to this project by creating pull requests. For significant changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.

---

## Support

For questions or support, please reach out to [huyquanwork95@gmail.com](mailto:huyquanwork95@gmail.com).
