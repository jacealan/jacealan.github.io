const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const loginUser = document.querySelector("#login-user");
const loginUserName = document.querySelector("#username");
const logoutButton = document.querySelector("#logout");

const userTodo = document.querySelector("#user-todo");
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const HIDDEN_ATTRIBUTE = "hidden";
const USERNAME_KEY = "username";
let TODOS_KEY;
let savedToDos;
let toDos = [];

///// ///// ///// /////

logoutButton.addEventListener("click", () => {
  localStorage.removeItem(USERNAME_KEY);
  loginForm.removeAttribute(HIDDEN_ATTRIBUTE);
  loginUser.setAttribute(HIDDEN_ATTRIBUTE, "");
  toDoList.innerHTML = "";
  toDos = []
  userTodo.setAttribute(HIDDEN_ATTRIBUTE, "");
});

function onLoginSubmit(event) {
  loginForm.setAttribute(HIDDEN_ATTRIBUTE, "");
  const username = loginInput.value;
  loginInput.value = "";
  localStorage.setItem(USERNAME_KEY, username);
  paintUser(username);
  initToDos(username)
}

function paintUser(username) {
  // const username = localStorage.getItem(USERNAME_KEY)
  loginUser.removeAttribute(HIDDEN_ATTRIBUTE);
  userTodo.removeAttribute(HIDDEN_ATTRIBUTE);
  loginUserName.innerText = username;
}

///// ///// ///// /////

function initToDos(username) {
  TODOS_KEY = username + "todos"
  savedToDos = localStorage.getItem(TODOS_KEY);
  if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const div = document.createElement("div");
  div.id = newTodo.id;
  const button = document.createElement("span");
  button.innerText = "✔️ ";
  button.addEventListener("click", deleteToDo);
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  div.appendChild(button);
  div.appendChild(span);
  toDoList.appendChild(div);
}

function handleToDoSubmit(event) {
  // event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now()
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

///// ///// ///// /////

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  loginForm.removeAttribute(HIDDEN_ATTRIBUTE);
  loginInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onLoginSubmit(event);
    }
  });
} else {
  paintUser(savedUsername);  
  initToDos(savedUsername)
}

toDoInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    handleToDoSubmit(event);
  }  
});
