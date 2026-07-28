const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const loginData = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    const response = await fetch("https://careerpilot-production-77eb.up.railway.app/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(loginData)

    });

    const result = await response.json();

    alert(result.message);

    if(result.message==="Login Successful"){
        
        localStorage.setItem("email", loginData.email);
        window.location.href="dashboard.html";

    }

});