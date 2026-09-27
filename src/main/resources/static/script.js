const API_URL = "/api/internships";

let internships = [];

async function loadInternships() {
    const response = await fetch(API_URL);
    internships = await response.json();

    const search = document.getElementById("searchInput").value.toLowerCase();
    const status = document.getElementById("statusFilter").value;

    let filtered = internships;

    if (search) {
        filtered = filtered.filter(item =>
            item.companyName.toLowerCase().includes(search)
        );
    }

    if (status) {
        filtered = filtered.filter(item => item.status === status);
    }

    displayInternships(filtered);
    updateStats(internships);
}

function displayInternships(data) {
    const container = document.getElementById("internshipList");

    if (data.length === 0) {
        container.innerHTML = "<p>No internships found.</p>";
        return;
    }

    container.innerHTML = data.map(item => `
        <div class="internship">
            <h2>${item.companyName}</h2>
            <p><strong>Role:</strong> ${item.jobRole}</p>
            <p><strong>Location:</strong> ${item.location || "Not specified"}</p>
            <p><strong>Applied:</strong> ${item.applicationDate}</p>
            <span class="status">${item.status}</span>

            <div class="actions">
                <button class="edit-btn" onclick="editInternship(${item.id})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteInternship(${item.id})">
                    Delete
                </button>
            </div>
        </div>
    `).join("");
}

function updateStats(data) {
    document.getElementById("totalCount").textContent = data.length;

    document.getElementById("appliedCount").textContent =
        data.filter(x => x.status === "Applied").length;

    document.getElementById("interviewCount").textContent =
        data.filter(x => x.status === "Interview").length;

    document.getElementById("selectedCount").textContent =
        data.filter(x => x.status === "Selected").length;

    document.getElementById("rejectedCount").textContent =
        data.filter(x => x.status === "Rejected").length;
}

function openForm() {
    document.getElementById("formTitle").textContent = "Add Internship";
    document.getElementById("internshipForm").reset();
    document.getElementById("internshipId").value = "";
    document.getElementById("formModal").style.display = "flex";
}

function closeForm() {
    document.getElementById("formModal").style.display = "none";
}

async function editInternship(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const item = await response.json();

    document.getElementById("formTitle").textContent = "Edit Internship";
    document.getElementById("internshipId").value = item.id;
    document.getElementById("companyName").value = item.companyName;
    document.getElementById("jobRole").value = item.jobRole;
    document.getElementById("location").value = item.location || "";
    document.getElementById("applicationDate").value = item.applicationDate;
    document.getElementById("status").value = item.status;

    document.getElementById("formModal").style.display = "flex";
}

async function deleteInternship(id) {
    if (!confirm("Delete this internship?")) {
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadInternships();
}

document.getElementById("internshipForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const id = document.getElementById("internshipId").value;

    const internship = {
        companyName: document.getElementById("companyName").value,
        jobRole: document.getElementById("jobRole").value,
        location: document.getElementById("location").value,
        applicationDate: document.getElementById("applicationDate").value,
        status: document.getElementById("status").value
    };

    if (id) {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(internship)
        });
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(internship)
        });
    }

    closeForm();
    loadInternships();
});

loadInternships();
