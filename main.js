const input =document.getElementById('taskInput')
const addBtn =document.getElementById('addBtn')
const taskList =document.getElementById('taskList')
const clearAllBtbn =document.getElementById('clearAll')
// console.log(input,addBtn,taskList,clearAllBtbn);

clearAllBtbn.addEventListener('click', clearAll);
addBtn.addEventListener('click', addTask);
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
displayTasks();



function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach(function(task, index) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    // لو المهمة خلصت، نديها ستايل خاص
    const textStyle = task.done ? 'text-decoration: line-through; color: gray;' : '';

    li.innerHTML = `
  <span style="text-decoration: ${task.done ? 'line-through' : 'none'};">
    ${task.text}
  </span>
  <div>
<button class="btn btn-${task.done ? 'warning' : 'success'} btn-sm me-2" onclick="markDone(${index})">
  ${task.done ? 'Undo' : 'Done'}
</button>
    <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
  </div>
`;

    taskList.appendChild(li);
  });
}

// tasks = ["Study JavaScript", "Practice CSS", "Watch a tutorial"];
// displayTasks();




function addTask() {
  const newTask = input.value.trim();

  if (newTask === '') {
    alert('please enter a task!');
    return;
  }

  // بدل ما نحط نص بس، نحط object
  tasks.push({ text: newTask, done: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  displayTasks();
  input.value = '';
}







function deleteTask(index){
    tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}







function markDone(index) {
  // نقلب حالة المهمة: لو كانت false تبقى true والعكس
  tasks[index].done = !tasks[index].done;

  // نحفظ التعديل في localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // نعرض التحديث في الصفحة
  displayTasks();
}




function clearAll() {
  // تأكيد بسيط قبل الحذف
  const confirmDelete = confirm('Are you sure you want to delete all tasks?');
  if (!confirmDelete) return;

  // نحذف كل المهام من المصفوفة والـ localStorage
  tasks = [];
  localStorage.removeItem('tasks');

  // نفضّي الليستة من الصفحة
  taskList.innerHTML = '';
}
