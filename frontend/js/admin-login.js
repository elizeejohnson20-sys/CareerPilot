async function adminLogin() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
        "https://careerpilot-production-77eb.up.railway.app/admin/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    );

    const result = await response.json();

    alert(result.message);

    if (result.message === "Admin Login Successful") {

        localStorage.setItem("admin", email);

        window.location.href = "admin-dashboard.html";
    }

}