const postItBoard = document.getElementById('post-it-board')
const newTaskBtn = document.getElementById('new-task-btn')
const newTaskModal = document.getElementById('new-task-modal')
const cancelBtn = document.getElementById('cancel-btn')


postItBoard.addEventListener("click", () => console.log("hey"))
newTaskBtn.addEventListener("click", ()=> newTaskModal.style.display ="block")
cancelBtn.addEventListener("click", ()=> newTaskModal.style.display ="none")
