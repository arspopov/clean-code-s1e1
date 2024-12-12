// Select DOM elements using BEM class names
var taskInput = document.getElementById("new-task"); // Add a new task
var addButton = document.querySelector(".tasks__button--add");
var incompleteTaskHolder = document.querySelector(".tasks__list--incomplete");
var completedTasksHolder = document.querySelector(".tasks__list--completed");

// New task list item
var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  listItem.className = "tasks__item";

  var checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.className = "tasks__checkbox";

  var label = document.createElement("label");
  label.className = "tasks__text";
  label.innerText = taskString;

  var editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "tasks__input tasks__input--edit";

  var editButton = document.createElement("button");
  editButton.className = "tasks__button tasks__button--edit";
  editButton.innerText = "Edit";

  var deleteButton = document.createElement("button");
  deleteButton.className = "tasks__button tasks__button--delete";

  var deleteButtonImg = document.createElement("img");
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.alt = "Delete";
  deleteButtonImg.className = "tasks__button-icon";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
};

var editTask = function () {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".tasks__input--edit");
  var label = listItem.querySelector(".tasks__text");
  var editButton = listItem.querySelector(".tasks__button--edit");
  var isEditMode = listItem.classList.contains("tasks__item--edit-mode");

  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("tasks__item--edit-mode");
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var checkBox = taskListItem.querySelector(".tasks__checkbox");
  var editButton = taskListItem.querySelector(".tasks__button--edit");
  var deleteButton = taskListItem.querySelector(".tasks__button--delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

addButton.onclick = addTask;
addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
