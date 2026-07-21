const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const loginData = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    const response = await fetch("http://127.0.0.1:8000/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(loginData)

    });

    const result = await response.json();

    alert(result.message);

    if(result.message==="Login Successful"){

        window.location.href="dashboard.html";

    }

});