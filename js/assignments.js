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
    assignments.push({ subject, name, date, time, status: "Not Yet Done" });
    saveAssignments(assignments);
}

// Load assignments into homepage (only Not Yet Done)
function loadHomeAssignments() {
    const assignments = getAssignments();
    const list = document.getElementById("home-assignments");
    if (!list) return;
    list.innerHTML = "";

    assignments.filter(a => a.status === "Not Yet Done").forEach(a => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${a.subject}</strong> - ${a.name} <br> Due: ${a.date} ${a.time}`;
        list.appendChild(li);
    });
}

// Load tasks into All Assignments page
function loadTasksPage() {
    const assignments = getAssignments();
    const tableBody = document.getElementById("tasks-table");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    assignments.forEach((task, index) => {
        const subject = task.subject || "Undefined";
        const name = task.name || "Undefined";
        const date = task.date || "Not set";
        const time = task.time || "Not set";
        const status = task.status || "Not Yet Done";

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${subject}</td>
            <td>${name}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td>
                <select onchange="updateStatus(${index}, this.value)">
                    <option value="Not Yet Done" ${status === "Not Yet Done" ? "selected" : ""}>Not Yet Done</option>
                    <option value="Done" ${status === "Done" ? "selected" : ""}>Done</option>
                </select>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Update assignment status
function updateStatus(index, status) {
    let assignments = getAssignments();

    if (status === "Done") {
        // remove the assignment entirely
        assignments.splice(index, 1);
    } else {
        assignments[index].status = status;
    }

    saveAssignments(assignments);

    // Reload both pages if present
    loadTasksPage();
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
