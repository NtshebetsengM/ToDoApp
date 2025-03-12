# Pinned and Planned

This is a simple Task Management App where users can add, complete, and delete tasks dynamically. The app uses `localStorage` to persist tasks even after a page refresh. Tasks are grouped under a title, and users can interact with the tasks by marking them as completed, adding new tasks, or deleting them.

## Features

### Modal for Adding Tasks
- A modal pops up when you click the "Add New Task" button.
- Inside the modal, you can add a title for the task group and enter multiple task names.
- You can dynamically add more input fields to add more tasks.
- The modal can be closed, and inputs are reset when the "Cancel" button is clicked.

### Task Group Submission
- Tasks are submitted with a title (group) and a list of tasks, and stored in the browser’s `localStorage`.
- Each task has an initial status of "pending."
- Task group submissions are stored and rendered in the UI with random background colors for each submission.

### Task Status Management
- Tasks can be marked as **completed** or **pending** by clicking on them.
- Completed tasks are visually distinct (through a class `completedTask`).
- Tasks toggle between "completed" and "pending" each time they are clicked.

### Task Deletion
- Tasks can be individually deleted.
- Entire task groups (submissions) can be deleted, removing all tasks in the group from both the UI and `localStorage`.
- Deleting tasks or task groups requires a confirmation prompt.

### Randomized Background Colors
- Each task group submission is rendered with a randomly selected background color to make it visually appealing.

### Persistence with `localStorage`
- All tasks and task groups are saved to `localStorage` for persistence.
- Tasks are rendered from `localStorage` when the page loads, ensuring data is retained even after the page is refreshed.
- If no tasks exist in `localStorage`, an empty array is initialized automatically.

## Icons

This app uses the following SVG icons:

- **Trash Icon** (Delete Task): [Trash Icon](https://www.untitledui.com/icon/trash-01)
- **Eraser Icon** (Remove Task): [Remove Icon](https://www.untitledui.com/icon/eraser)

## Font

The app uses the **Caveat** font from Google Fonts for a more personalized and playful style: [Caveat Font](https://fonts.google.com/share?selection.family=Caveat:wght@400..700).

## How to Use

1. **Add a New Task Group**:
   - Click on the "Add New Task" button to open the modal.
   - Enter a group title and task names in the inputs.
   - Click "Submit" to save the task group.

2. **Manage Tasks**:
   - Click on tasks to toggle their status between **pending** and **completed**.
   - Use the delete button to remove tasks or task groups.

3. **Persistence**:
   - All tasks and task groups are automatically saved in `localStorage` and will persist between page reloads.

## Running the App Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/NtshebetsengM/ToDoApp.git
    ```

2. Open `index.html` in your browser.

3. Ensure your browser's console is open to see any error messages or logs for debugging.

## Future Enhancements

- **Task Editing**: Ability to edit existing tasks.
- **LocalStorage Expiration**: Clear old tasks after a set period.
- **Task Importance**: Ability to set tasks as important and have it reflected on the UI.

## Contributing

Feel free to submit issues or pull requests if you have ideas for improvements or bug fixes.
