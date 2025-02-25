const postItBoard = document.getElementById('post-it-board')
const newTaskBtn = document.getElementById('new-task-btn')
const newTaskModal = document.getElementById('new-task-modal')
const cancelBtn = document.getElementById('cancel-btn')
const newTaskForm = document.getElementById('new-task-form')
const addMoreBtn = document.getElementById('add-more-btn')
const inputCont = document.getElementById('input-container')

postItBoard.addEventListener("click", () => console.log("hey"))

/*open and close modal */
newTaskBtn.addEventListener("click", ()=> newTaskModal.style.display ="block")
cancelBtn.addEventListener("click", ()=> newTaskModal.style.display ="none")

addMoreBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    const newInput = `
      <input type="text" name="title" id="task-name" placeholder="task" required>
    `
    inputCont.insertAdjacentHTML('afterend', newInput)
}
)

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]))
        console.log('Initialized tasks in localStorage')
      } else {
        console.log('Data already exists in localStorage')
      }
      
  });
  

/**add new task to localstorage */
newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault()


    const taskNames = newTaskForm.querySelectorAll('input[name= "title"]')

    const newSubmission ={
        submissionId: Date.now(),
        tasks: []
    }

    taskNames.forEach((input, index)=> {
        newSubmission.tasks.push({
            taskId: Date.now() + index,
            name: input.value,
        })
    })
    
    const existingSubmissions = JSON.parse(localStorage.getItem('taskSubmissions')) || []
    
    existingSubmissions.push(newSubmission)
   
    localStorage.setItem('taskSubmissions', JSON.stringify(existingSubmissions))
  
    addSubmissionToUI(newSubmission)
    
    newTaskModal.style.display ="none"

})

/**add new task to UI */

function addSubmissionToUI(submission) {
    const submissionContainer = document.createElement('div');
    submissionContainer.classList.add('postItNote');
    submissionContainer.id = `submission-${submission.submissionId}`;

    // Create submission header
    const submissionHTML =
  submission.tasks.forEach(task => {
        `
            <div class="task" id="task-${task.taskId}">
                <h2>${task.name}</h2>
                <h3 onclick="deleteTask(${submission.submissionId}, ${task.taskId})">Delete</h3>
            </div>
        `;
    });

    submissionContainer.innerHTML = submissionHTML;

    // Append to post-it board
    postItBoard.appendChild(submissionContainer);
}
