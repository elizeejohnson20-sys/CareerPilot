async function loadDashboard() {

    const response = await fetch(
        "http://127.0.0.1:8000/admin/dashboard"
    );

    const data = await response.json();

    document.getElementById("students").innerText =
        data.total_students;

    document.getElementById("companies").innerText =
        data.total_companies;

    document.getElementById("applications").innerText =
        data.total_applications;
}

loadDashboard();