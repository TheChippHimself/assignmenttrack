
// Store assignments in localStorage
function getAssignments() {
    return JSON.parse(localStorage.getItem("assignments")) || [];
}

function saveAssignments(assignments) {
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

// Add new assignment
function addAssignment(subject, name, date, time) {
    const assignments = getAssignments();
    assignments.push({ subject, name, date, time, status: "NOT YET DONE" });
    saveAssignments(assignments);
}

// Load assignments into homepage (only NOT YET DONE)
function loadHomeAssignments() {
    const assignments = getAssignments();
    const list = document.getElementById("home-assignments");
    if (!list) return;
    list.innerHTML = "";

    assignments.filter(a => a.status === "NOT YET DONE").forEach(a => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${a.subject}</strong> - ${a.name} <br> Due: ${a.date} ${a.time}`;
        list.appendChild(li);
    });
}

// Load tasks from localStorage
function loadTasksPage() {
    let assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
    const tableBody = document.getElementById("tasks-table");
    tableBody.innerHTML = "";

    assignments.forEach((task, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.subject}</td>
            <td>${task.assignment}</td>
            <td>${task.dueDate}</td>
            <td>${task.dueTime}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="Not Yet Done" ${task.status === "Not Yet Done" ? "selected" : ""}>Not Yet Done</option>
                    <option value="Done" ${task.status === "Done" ? "selected" : ""}>Done</option>
                </select>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Update assignment status
function updateStatus(index, value) {
    let assignments = JSON.parse(localStorage.getItem("assignments") || "[]");
    assignments[index].status = value;

    // If marked as Done → delete it
    if (value === "Done") {
        assignments.splice(index, 1);
    }

    // Save updates to localStorage
    localStorage.setItem("assignments", JSON.stringify(assignments));

    // Reload table
    loadTasksPage();
}


// Update assignment status
function updateStatus(index, status) {
    const assignments = getAssignments();
    assignments[index].status = status;
    saveAssignments(assignments);
    loadHomeAssignments();
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    const subject = document.getElementById("subject").value;
    const name = document.getElementById("assignment").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    addAssignment(subject, name, date, time);
    alert("Assignment Added!");
    window.location.href = "index.html";
}
