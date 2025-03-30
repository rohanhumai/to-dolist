const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

document.addEventListener("DOMContentLoaded", showTask);

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("You must write something!");
        return;
    }
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);
    
    let span = document.createElement("span");
    span.textContent = "\u00d7";
    span.onclick = function() {
        li.remove();
        saveData();
    };
    li.appendChild(span);

    li.onclick = function() {
        li.classList.toggle("checked");
        saveData();
    };

    inputBox.value = "";
    saveData();
}

function saveData() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("tasks") || "";
    document.querySelectorAll("ul li").forEach(li => {
        li.onclick = function() {
            li.classList.toggle("checked");
            saveData();
        };
        li.querySelector("span").onclick = function() {
            li.remove();
            saveData();
        };
    });
}
