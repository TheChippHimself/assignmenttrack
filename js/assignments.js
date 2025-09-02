
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

// Load assignments into tasks page (with status dropdown)
function loadTasksPage() {
    const assignments = getAssignments();
    const table = document.getElementById("tasks-table");
    if (!table) return;
    table.innerHTML = "";

    assignments.forEach((a, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${a.subject}</td>
            <td>${a.name}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td>
                <select class="form-control" onchange="updateStatus(${index}, this.value)">
                    <option ${a.status === "NOT YET DONE" ? "selected" : ""}>NOT YET DONE</option>
                    <option ${a.status === "DONE" ? "selected" : ""}>DONE</option>
                </select>
            </td>
        `;
        table.appendChild(row);
    });
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
