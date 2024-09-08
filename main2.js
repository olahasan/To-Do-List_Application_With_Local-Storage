let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataToLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    sendDataToArray(input.value);
  }
  input.value = "";
};

function sendDataToArray(DateOfTask) {
  let data = {
    id: Date.now(),
    title: DateOfTask,
    completed: false,
  };

  arrayOfTasks.push(data);
  console.log(arrayOfTasks);

  addDataToPage(arrayOfTasks);
  addDataToLocalStorage(arrayOfTasks);
}

function addDataToPage(arrayOfTasks) {
  tasksDiv.innerHTML = "";

  //   if (arrayOfTasks.length > 1) {
  //     arrayOfTasks.shift();
  //   }

  arrayOfTasks.forEach((ele) => {
    let div = document.createElement("div");
    div.className = "task";
    if (ele.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", ele.id);
    div.appendChild(document.createTextNode(ele.title));

    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));

    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorage(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataToLocalStorage() {
  let dataFromLocalStorage = localStorage.getItem("tasks");

  if (dataFromLocalStorage) {
    let dataInArray = JSON.parse(dataFromLocalStorage);
    addDataToPage(dataInArray);
  }
}

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove(); // remove the element from the DOM / Page
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id")); // remove the element from the Local Storage
  }

  if (e.target.classList.contains("task")) {
    // console.log(e.target);
    e.target.classList.toggle("done"); // toggle the "done-class" in element in DOM / Page
    toggleStatusTaskInArray(e.target.getAttribute("data-id")); // toggle the "done-class" in element in array to add in Local Storage
  }
});

function deleteTaskFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((e) => {
    return e.id != taskId;
  });
  //   console.log(arrayOfTasks);

  addDataToLocalStorage(arrayOfTasks);
}

function toggleStatusTaskInArray(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}

// localStorage.clear();
