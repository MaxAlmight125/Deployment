document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const categorySelect = document.getElementById('categorySelect');
    const addTaskButton = document.getElementById('addTaskButton');
    const filterCategory = document.getElementById('filterCategory');
    const searchInput = document.getElementById('searchInput');
    const taskList = document.getElementById('taskList');
  
    let tasks = [];
  
    const renderTasks = () => {
      const categoryFilter = filterCategory.value;
      const searchTerm = searchInput.value.toLowerCase();
  
      taskList.innerHTML = '';
      tasks
        .filter(task => 
          (categoryFilter === 'All' || task.category === categoryFilter) &&
          task.text.toLowerCase().includes(searchTerm)
        )
        .forEach(task => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${task.text} <span class="category">[${task.category}]</span>
            <button class="deleteTask">Delete</button>
          `;
          taskList.appendChild(li);
  
          li.querySelector('.deleteTask').addEventListener('click', () => {
            tasks = tasks.filter(t => t !== task);
            renderTasks();
          });
        });
    };
  
    addTaskButton.addEventListener('click', () => {
      const text = taskInput.value.trim();
      const category = categorySelect.value;
  
      if (text && category) {
        tasks.push({ text, category });
        taskInput.value = '';
        categorySelect.value = '';
        renderTasks();
      } else {
        alert('Please enter a task and select a category.');
      }
    });
  
    filterCategory.addEventListener('change', renderTasks);
    searchInput.addEventListener('input', renderTasks);
  });
  