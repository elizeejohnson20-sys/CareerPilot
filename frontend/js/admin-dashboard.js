async function loadDashboard() {

    const response = await fetch(
        "https://careerpilot-production-77eb.up.railway.app/admin/dashboard"
    );

    const data = await response.json();

    document.getElementById("students").innerText =
        data.total_students;

    document.getElementById("companies").innerText =
        data.total_companies;

    document.getElementById("applications").innerText =
        data.total_applications;

}

function logout(){

    localStorage.clear();

    window.location.href="index.html";

}

loadDashboard();