import "./style.css";

interface Todo {
  title: string;
  isComplete: boolean;
  readonly id: string;
}

const todos: Todo[] = [];

const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

//const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;
const todoInput = document.querySelector(".input") as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();

  const todo: Todo = {
    title: todoInput.value,
    isComplete: false,
    id: String(Math.random() * 1000),
  };
  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};
const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";

  // checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;

  // title paragraph
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : "";

  checkBox.onchange = () => {
    // update TS array
    todos.find((item) => {
      if (item.id === id) item.isComplete = checkBox.checked;
    });

    // update UI immediately
    paragraph.className = checkBox.checked ? "textCut" : "";
  };

  // delete btn
  const button: HTMLButtonElement = document.createElement("button");
  button.className = "deleteBtn";
  button.innerText = "X";
  button.onclick = () => deleteTodo(String(id));

  todo.append(checkBox, paragraph, button);
  todosContainer.append(todo);
};


const deleteTodo = (id: string) => {
  const idx = todos.findIndex((item) => item.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  todosContainer.innerText = "";
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isComplete, item.id);
  });
};
