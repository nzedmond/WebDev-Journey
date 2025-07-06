const todolist = [];

renderTodoList();
function renderTodoList(){
  let todoListHTML = '';

  for(let i=0; i<todolist.length; i++){
    const todoObject = todolist[i];
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;

    const {name, dueDate} = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div> 
      <button class="delete-btn" onclick="
        todolist.splice(${i}, 1);
        renderTodoList();
      ">Delete</button>
    `;
    todoListHTML += html;
    document.querySelector('.todoListElements').innerHTML = todoListHTML;
  }
}
function addTODO(){
  const inputElement = document.querySelector('.js-name-input');

  const name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date');

  const dueDate = dateInputElement.value;


  todolist.push({
    //name: name,
    //dueDate: dueDate
    name,
    dueDate
  });
  console.log(todolist);

  inputElement.value = '';
  renderTodoList();



}