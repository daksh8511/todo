const myinput = document.querySelector("input");
let addBtn = document.querySelector("button");
let myul = document.querySelector("ul");
let todoList = [];

const getTodoFromLS = () => {
  return JSON.parse(localStorage.getItem("todo")) || [];
};

const addTodoInLocalStorage = (todoList) => {
  return localStorage.setItem("todo", JSON.stringify(todoList));
};

const showTodoList = () => {
  todoList = getTodoFromLS();
  todoList.forEach((ele) => {
    let liElement = document.createElement("li");
    liElement.innerHTML = ele;
    myul.append(liElement);
  });
};

const removeTodoList = (e) => {
  const itemText = e.target.textContent;

  todoList = todoList.filter((ele) => ele !== itemText);

  addTodoInLocalStorage(todoList);

  e.target.remove();
};

const addTodoList = () => {
  todoList = getTodoFromLS();
  let newTodo = myinput.value.trim();

  if (newTodo.length !== 0 && !todoList.includes(newTodo)) {
    todoList.push(newTodo);
    todoList = [...new Set(todoList)];

    addTodoInLocalStorage(todoList);

    let liElement = document.createElement("li");
    liElement.innerHTML = newTodo;
    myul.append(liElement);
  }

  myinput.value = "";
};

showTodoList();

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addTodoList();
});

myul.addEventListener("click", (e) => removeTodoList(e));
