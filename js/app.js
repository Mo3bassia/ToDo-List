let addInp = document.querySelector(".addInp");
let addBtn = document.querySelector(".addBtn");
let tasks = document.querySelector(".tasks");
let total = document.querySelector(".total");
let completed = document.querySelector(".completed");
let ul = document.querySelector(".tasks-cont ul.tasks");

let arr = [];

function createLi(object) {
  let li = document.createElement("li");
  ul.append(li);

  let formCheck = document.createElement("div");
  formCheck.classList.add("form-check");
  li.append(formCheck);

  let checkbox = document.createElement("input");
  formCheck.append(checkbox);
  checkbox.classList.add("form-check-input");
  checkbox.type = "checkbox";

  let input = document.createElement("input");
  input.type = "text";
  input.classList.add("taskInp");
  input.value = object.name;
  input.classList.add("form-control");
  checkbox.after(input);

  if (object.done) {
    checkbox.click();
  }
  completed.textContent = document.querySelectorAll(
    ".form-check-input:checked"
  ).length;

  let deleteI = document.createElement("i");
  deleteI.classList.add("fa-regular", "fa-trash-can");
  li.append(deleteI);
  total.textContent = document.getElementsByTagName("li").length;
}

if (localStorage.getItem("tasks") == undefined) {
  localStorage.setItem("tasks", JSON.stringify(arr));
  arr.push(JSON.parse(localStorage.getItem("tasks")));
} else {
  if (JSON.parse(localStorage.getItem("tasks")).length != 0) {
    JSON.parse(localStorage.getItem("tasks")).forEach((element) => {
      arr.push(element);
      createLi(element);
    });
  }
}

window.onkeyup = function (e) {
  if (e.target.classList.contains("taskInp")) {
    arr[
      Array.prototype.indexOf.call(
        ul.children,
        e.target.parentElement.parentElement
      )
    ].name = e.target.value;
    localStorage.setItem("tasks", JSON.stringify(arr));
  }
};

window.onclick = function (e) {
  if (e.target.classList.contains("form-check-input")) {
    let index = Array.prototype.indexOf.call(
      ul.children,
      e.target.parentElement.parentElement
    );
    if (e.target.checked) {
      arr[index].done = true;
    } else {
      arr[index].done = false;
    }
    localStorage.setItem("tasks", JSON.stringify(arr));
    completed.textContent = document.querySelectorAll(
      ".form-check-input:checked"
    ).length;
  }
  if (
    e.target.tagName.toLowerCase() == "svg" ||
    e.target.tagName.toLowerCase() == "path"
  ) {
    e.target.tagName.toLowerCase() == "svg"
      ? (index = Array.prototype.indexOf.call(
          ul.children,
          e.target.parentElement
        ))
      : (index = Array.prototype.indexOf.call(
          ul.children,
          e.target.parentElement.parentElement
        ));

    e.target.tagName.toLowerCase() == "svg"
      ? e.target.parentElement.remove()
      : e.target.parentElement.parentElement.remove();

    arr.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(arr));

    total.textContent = document.getElementsByTagName("li").length;
    completed.textContent = document.querySelectorAll(
      ".form-check-input:checked"
    ).length;
  }
};

function newTask() {
  if (addInp.value != "") {
    let obj = {
      name: addInp.value,
      done: false,
    };
    if (arr.length == 0) {
      arr = [];
    }
    arr.push(obj);
    createLi(obj);
    localStorage.setItem("tasks", JSON.stringify(arr));
    addInp.value = "";
    addInp.focus();
  } else {
    addInp.focus();
  }
}

addBtn.onclick = newTask;

addInp.onclick = function () {};

document.addEventListener("DOMContentLoaded", () => {
  const settingsBtn = document.querySelector(".settings-btn");
  const settingsMenu = document.querySelector(".settings-menu");
  const colorButtons = document.querySelectorAll(".color-btn");
  const header = document.querySelector(".header");
  const headerTitle = document.querySelector(".header h2");
  const tasksAdd = document.querySelector(".tasks-add");
  const tasksCont = document.querySelector(".tasks-cont");
  const tasksCount = document.querySelector(".tasks-count");
  const addBtn = document.querySelector(".addBtn");
  const total = document.querySelector(".total");
  const completed = document.querySelector(".completed");

  // Load saved color from localStorage
  const savedColor = localStorage.getItem("themeColor");
  if (savedColor) {
    applyColor(savedColor);
  }

  settingsBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    settingsMenu.style.display =
      settingsMenu.style.display === "block" ? "none" : "block";
  });

  colorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const color = e.target.getAttribute("data-color");
      applyColor(color);
      localStorage.setItem("themeColor", color);
    });
  });

  function applyColor(color) {
    header.style.backgroundColor = color;
    headerTitle.style.backgroundColor = color;
    tasksAdd.style.backgroundColor = `${color}33`;
    tasksCont.style.backgroundColor = `${color}33`;
    tasksCount.style.backgroundColor = `${color}33`;
    addBtn.style.backgroundColor = color;
    total.style.backgroundColor = color;
    completed.style.backgroundColor = color;
    document.querySelector(".settings-btn").style.backgroundColor = color;
  }

  // Hide settings menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!settingsMenu.contains(e.target) && !settingsBtn.contains(e.target)) {
      settingsMenu.style.display = "none";
    }
  });
});
