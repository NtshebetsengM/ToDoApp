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
        </li>
        <span>
            <button onclick="deleteTask(${submission.submissionId}, ${index})" class="deleteTaskBtn">
                <svg width="10%" height="10%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 9L11 15M11 9L17 15M2.72 12.96L7.04 18.72C7.392 19.1893 7.568 19.424 7.79105 19.5932C7.9886 19.7432 8.21232 19.855 8.45077 19.9231C8.72 20 9.01334 20 9.6 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H9.6C9.01334 4 8.72 4 8.45077 4.07689C8.21232 4.14499 7.9886 4.25685 7.79105 4.40675C7.568 4.576 7.392 4.81067 7.04 5.28L2.72 11.04C2.46181 11.3843 2.33271 11.5564 2.28294 11.7454C2.23902 11.9123 2.23902 12.0877 2.28294 12.2546C2.33271 12.4436 2.46181 12.6157 2.72 12.96Z" 
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </button>
        </span>
    `)
    .join("")

    // Create submission header
    const submissionHTML = `
        <div class="postItPin">x</div>
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

