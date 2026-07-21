const email = "elizabeth20@gmail.com";

async function loadProfile() {

    const response = await fetch(
        `http://127.0.0.1:8000/profile/${email}`
    );

    const user = await response.json();

    document.getElementById("full_name").value = user.full_name;
    document.getElementById("skills").value = user.skills;
    document.getElementById("experience").value = user.experience;
    document.getElementById("cgpa").value = user.cgpa;
    document.getElementById("department").value = user.department || "";
    document.getElementById("phone").value = user.phone || "";
}

async function saveProfile() {

    const user = {

        full_name: document.getElementById("full_name").value,
        skills: document.getElementById("skills").value,
        experience: parseInt(document.getElementById("experience").value),
        cgpa: parseFloat(document.getElementById("cgpa").value),
        department: document.getElementById("department").value,
        phone: document.getElementById("phone").value,
        email: email

    };

    const response = await fetch(
        "http://127.0.0.1:8000/profile",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }
    );

    const result = await response.json();

    alert(result.message);
}

loadProfile();