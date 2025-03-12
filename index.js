const postItBoard = document.getElementById('post-it-board')
const newTaskBtn = document.getElementById('new-task-btn')
const newTaskModal = document.getElementById('new-task-modal')
const cancelBtn = document.getElementById('cancel-btn')
const newTaskForm = document.getElementById('new-task-form')
const addMoreBtn = document.getElementById('add-more-btn')
const inputCont = document.getElementById('input-container')



/*open and close modal */
newTaskBtn.addEventListener("click", ()=> newTaskModal.style.display ="block")
cancelBtn.addEventListener("click", ()=> {
    
    newTaskForm.reset()
    newTaskModal.style.display ="none"
    

    const extraInputs = inputCont.querySelectorAll('input[name="task_name"]');
    extraInputs.forEach((input, index) => {
        if (index > 0) input.remove(); // Keep only the initial two inputs
    })
})

addMoreBtn.addEventListener('click', (event)=>{
    event.preventDefault()

    const newInput = document.createElement('input');
    
    newInput.type = 'text';
    newInput.name = 'task_name';
    newInput.placeholder = 'Task name';
    newInput.required = true;

   
    inputCont.appendChild(newInput);
}
)



/**add new task to localstorage */
newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault()
   
    const groupTitle = document.getElementById('group-title').value
    const taskNames = document.querySelectorAll('input[name="task_name"]')
    const taskValues = Array.from(taskNames).map(input=>({
        name: input.value,
        status:'pending',
        })
    )

    if(groupTitle.trim() === "" || taskValues.length === 0){
        console.log('nothing here')
        return
    }else{
        const newSubmission ={
            submissionId: Date.now(),
            group: groupTitle.trim(),
            tasks: taskValues
        }
    
        console.log(newSubmission)
      
        
        let existingSubmissions = JSON.parse(localStorage.getItem('taskSubmissions')) || []
        
        existingSubmissions.unshift(newSubmission)
       
        localStorage.setItem('taskSubmissions', JSON.stringify(existingSubmissions))
      
        renderSubmission(newSubmission)
        
        newTaskModal.style.display ="none"
     

    }

    newTaskForm.reset()
    const extraInputs = inputCont.querySelectorAll('input[name="task_name"]');
    extraInputs.forEach((input, index) => {
        if (index > 0) input.remove(); // Keep only the initial two inputs
    })

})


/**add new task to UI */

/*randomly selecting the background color */
const colors = ["#ffffc0", "#c0e0ff", "#c0ffc0", "#e0c0ff"];

function getRandomColor(){
    return colors[Math.floor(Math.random()* colors.length)]
}

function renderSubmission(submission) {
    const submissionContainer = document.createElement('div');
    submissionContainer.classList.add('postItNote');
    submissionContainer.id = submission.submissionId;

    submissionContainer.style.backgroundColor = getRandomColor()

    const taskListHTML = submission.tasks
        .map((task, index) => `
            <li id="task-${submission.submissionId}-${index}" 
                class="${task.status === 'completed' ? 'completedTask' : ''}" 
                onclick="markTaskCompleted(${submission.submissionId}, ${index})">
                ${task.name} 
            </li>
            <div onclick="deleteTask(${submission.submissionId}, ${index})" class="removeTaskBtn">
                <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.9995 13L10.9995 6.00004M20.9995 21H7.99955M10.9368 20.0628L19.6054 11.3941C20.7935 10.2061 21.3875 9.61207 21.6101 8.92709C21.8058 8.32456 21.8058 7.67551 21.6101 7.07298C21.3875 6.388 20.7935 5.79397 19.6054 4.60592L19.3937 4.39415C18.2056 3.2061 17.6116 2.61207 16.9266 2.38951C16.3241 2.19373 15.675 2.19373 15.0725 2.38951C14.3875 2.61207 13.7935 3.2061 12.6054 4.39415L4.39366 12.6059C3.20561 13.794 2.61158 14.388 2.38902 15.073C2.19324 15.6755 2.19324 16.3246 2.38902 16.9271C2.61158 17.6121 3.20561 18.2061 4.39366 19.3941L5.06229 20.0628C5.40819 20.4087 5.58114 20.5816 5.78298 20.7053C5.96192 20.815 6.15701 20.8958 6.36108 20.9448C6.59126 21 6.83585 21 7.32503 21H8.67406C9.16324 21 9.40784 21 9.63801 20.9448C9.84208 20.8958 10.0372 20.815 10.2161 20.7053C10.418 20.5816 10.5909 20.4087 10.9368 20.0628Z"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        `)
        .join("");

    // Create submission header
    const submissionHTML = `
        <div class="PostItHeader">
            <img src="images/doodle-heart.png" class="postItPin">
            <div class="deletePostItBtn" id="${submission.submissionId}" onclick="deletePostIt(${submission.submissionId})"> 
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <h2>${submission.group}</h2> 
        <ul>${taskListHTML}</ul>
    `;

    submissionContainer.innerHTML = submissionHTML;
    postItBoard.insertBefore(submissionContainer, postItBoard.firstChild);
}

// eslint-disable-next-line no-unused-vars
function markTaskCompleted(submissionId, index) {
    let storedSubmissions = JSON.parse(localStorage.getItem('taskSubmissions'));

    if (!storedSubmissions) {
        console.log("No submissions found in localStorage.");
        return;
    }

    const submission = storedSubmissions.find(sub => sub.submissionId === submissionId);
    if (submission) {
        const task = submission.tasks[index];
        task.status = task.status === "completed" ? "pending" : "completed";

        // Update localStorage
        localStorage.setItem('taskSubmissions', JSON.stringify(storedSubmissions));

        // Update UI
        const taskElement = document.getElementById(`task-${submissionId}-${index}`);
        
        if (taskElement) {
            taskElement.classList.toggle("completedTask");
        }
    } else {
        console.log("Submission not found with id:", submissionId);
    }
}


// eslint-disable-next-line no-unused-vars
function deleteTask(id, index) {
    const userConfirmed = window.confirm("Are you sure you want to delete this task?");
    
    if (userConfirmed) {
        let storedSubmissions = JSON.parse(localStorage.getItem('taskSubmissions')) || [];

        const targetSubmission = storedSubmissions.find(submission => submission.submissionId === id);
        
        if (targetSubmission) {
            targetSubmission.tasks.splice(index, 1);
            localStorage.setItem('taskSubmissions', JSON.stringify(storedSubmissions));

            // Remove from UI
            document.getElementById(`task-${id}-${index}`)?.remove();
            document.querySelector(`[onclick="deleteTask(${id}, ${index})"]`)?.remove();
        }
    }
}



// eslint-disable-next-line no-unused-vars
function deletePostIt(id){
    console.log(id, "clicked");
    const userConfirmed = window.confirm("Are you sure you want to delete this?");
    
    if(userConfirmed)
   
    {
        let storedSubmissions = localStorage.getItem('taskSubmissions');

        
        if (!storedSubmissions) {
            console.log("No submissions found in localStorage.");
            return;
        }

      
        const submissions = JSON.parse(storedSubmissions);
        

        const updatedSubmissions = submissions.filter(submission => submission.submissionId !== id)

        if (updatedSubmissions.length !== submissions.length) {
        alert('successfully deleted')

        localStorage.setItem('taskSubmissions', JSON.stringify(updatedSubmissions));
        
        const submissionElement = document.getElementById(id)
        if (submissionElement){
            submissionElement.remove()
        }
        } else {
            console.log("Submission with submissionId", id, "not found.");
        }
    }
    else{
        alert('deletion cancelled!')
    }
}


document.addEventListener('DOMContentLoaded', function () {
  
    let storedSubmissions = localStorage.getItem('taskSubmissions');
    
    if (!storedSubmissions) {
        localStorage.setItem('taskSubmissions', JSON.stringify([]));
        console.log('Initialized tasks in localStorage');
    } else {
        console.log('Rendering stored submissions...');
        const submissions = JSON.parse(storedSubmissions);
        
      
        submissions.reverse().forEach(renderSubmission);
    }
});

