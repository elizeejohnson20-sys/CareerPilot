console.log("Dashboard JS Loaded");

async function loadProfile() {

    const email = "elizabeth20@gmail.com";

    const response = await fetch(
        `http://127.0.0.1:8000/profile/${email}`
    );

    const user = await response.json();

    document.getElementById("name").innerText = user.full_name;
    document.getElementById("email").innerText = user.email;
    document.getElementById("skills").innerText = user.skills;
    document.getElementById("experience").innerText = user.experience;
    document.getElementById("cgpa").innerText = user.cgpa;
    document.getElementById("department").innerText = user.department;
    document.getElementById("phone").innerText = user.phone;

}

loadProfile();