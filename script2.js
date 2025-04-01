const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add event listener for Enter key
inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

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
    span.onclick = function(e) {
        e.stopPropagation();
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
    inputBox.focus();
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
        
        const span = li.querySelector("span");
        if (span) {
            span.onclick = function(e) {
                e.stopPropagation();
                li.remove();
                saveData();
            };
        }
    });
}