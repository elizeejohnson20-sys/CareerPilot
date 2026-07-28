alert("Dashboard JS Loaded");
const email = localStorage.getItem("email");

if (!email) {
    alert("Please login first.");
    window.location.href = "login.html";
}

console.log("Before loadProfile");
loadProfile();
console.log("After loadProfile");

async function loadProfile() {

    try {

        const response = await fetch(
            `https://careerpilot-production-77eb.up.railway.app/profile/${email}`
        );

        const user = await response.json();

        document.getElementById("full_name").value = user.full_name || "";
        document.getElementById("email").value = user.email || "";
        document.getElementById("skills").value = user.skills || "";
        document.getElementById("experience").value = user.experience || 0;
        document.getElementById("cgpa").value = user.cgpa || 0;
        localStorage.setItem("cgpa", user.cgpa);
        document.getElementById("department").value = user.department || "";
        document.getElementById("phone").value = user.phone || "";


        const applicationResponse = await fetch(
    `https://careerpilot-production-77eb.up.railway.app/applications/${email}`
);

const applications = await applicationResponse.json();

document.getElementById("totalApplications").innerText =
    applications.length;

document.getElementById("totalInterviews").innerText =
    applications.filter(
        application => application.status === "Interview"
    ).length;

document.getElementById("totalSelected").innerText =
    applications.filter(
        application => application.status === "Selected"
    ).length;

    }
     catch (error) {

    console.error(error);

    alert(error);

}

}

async function saveProfile() {

    const user = {

        full_name: document.getElementById("full_name").value,
        email: email,
        skills: document.getElementById("skills").value,
        experience: Number(document.getElementById("experience").value),
        cgpa: Number(document.getElementById("cgpa").value),
        department: document.getElementById("department").value,
        phone: document.getElementById("phone").value

    };

    const response = await fetch("https://careerpilot-production-77eb.up.railway.app/profile", {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    });

    const result = await response.json();

    alert(result.message);

}

function logout() {

    localStorage.clear();

    window.location.href = "index.html";

}

loadProfile();
async function uploadResume() {

    const fileInput = document.getElementById("resume");

    if (fileInput.files.length === 0) {

        alert("Please select a PDF.");

        return;

    }

    const formData = new FormData();

    formData.append("file", fileInput.files[0]);

    const response = await fetch(

        `https://careerpilot-production-77eb.up.railway.app/upload-resume?email=${email}`,

        {

            method: "POST",

            body: formData

        }

    );

    const result = await response.json();

    alert(result.message);

}
async function viewResume() {

    const response = await fetch(
        `https://careerpilot-production-77eb.up.railway.app/resume/${email}`
    );

    const data = await response.json();

    if (!data.resume) {

        alert("No resume uploaded.");

        return;

    }

    window.open(
        `https://careerpilot-production-77eb.up.railway.app/uploads/${data.resume}`,
        "_blank"
    );

}