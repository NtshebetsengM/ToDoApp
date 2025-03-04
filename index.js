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
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.name = 'task_name';
    newInput.placeholder = 'Task name';
    newInput.required = true;

    // Append to the container
    inputCont.appendChild(newInput);
}
)



/**add new task to localstorage */
newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const groupTitle = document.getElementById('group-title').value
    const taskNames = document.querySelectorAll('input[name="task_name"]')
    const taskValues = Array.from(taskNames).map(input=>input.value)

    const newSubmission ={
        submissionId: Date.now(),
        group: groupTitle,
        tasks: taskValues
    }

    console.log(newSubmission)
  
    
    let existingSubmissions = JSON.parse(localStorage.getItem('taskSubmissions')) || []
    
    existingSubmissions.unshift(newSubmission)
   
    localStorage.setItem('taskSubmissions', JSON.stringify(existingSubmissions))
  
    renderSubmission(newSubmission)
    
    newTaskModal.style.display ="none"

})


/**add new task to UI */

function renderSubmission(submission) {
    const submissionContainer = document.createElement('div');
    submissionContainer.classList.add('postItNote');
    submissionContainer.id = submission.submissionId;


    const taskListHTML = submission.tasks
    .map((task, index) => `
        <li id="task-${submission.submissionId}-${index}" class="postItList">
            ${task}
            <button onclick="deleteTask(${submission.submissionId}, ${index})">Delete</button>
        </li>
    `)
    .join("")

    // Create submission header
    const submissionHTML = `
         <h2>${submission.group}</h2> 
        <ul>${taskListHTML}</ul>
        `

    submissionContainer.innerHTML = submissionHTML;

    // Append to post-it board
    postItBoard.insertBefore(submissionContainer, postItBoard.firstChild);
}

document.addEventListener('DOMContentLoaded', function () {
    // Check if there's already data in localStorage
    let storedSubmissions = localStorage.getItem('taskSubmissions');
    
    if (!storedSubmissions) {
        localStorage.setItem('taskSubmissions', JSON.stringify([]));
        console.log('Initialized tasks in localStorage');
    } else {
        console.log('Rendering stored submissions...');
        const submissions = JSON.parse(storedSubmissions); // Convert JSON to array
        
        // Render each submission
        submissions.reverse().forEach(renderSubmission);
    }
});

