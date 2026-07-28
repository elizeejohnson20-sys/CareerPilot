const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const userData = {
        full_name: document.getElementById("full_name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        skills: document.getElementById("skills").value,
        experience: parseInt(document.getElementById("experience").value)
    };

    try {

        const response = await fetch("https://careerpilot-production-77eb.up.railway.app/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)

        });

        const result = await response.json();

        alert(result.message);
        
        window.location.href = "login.html";

    }

    catch (error) {

        alert("Server Error");

        console.log(error);

    }

});