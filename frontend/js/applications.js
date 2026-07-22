async function loadApplications() {

    const email = localStorage.getItem("email");

    const response = await fetch(
        `http://127.0.0.1:8000/applications/${email}`
    );

    const applications = await response.json();

    let output = "";

    applications.forEach(application => {

        output += `

        <div class="company-card">

            <h3>${application.company_name}</h3>

            <p><strong>Location:</strong> ${application.location}</p>

            <p><strong>Package:</strong> ${application.package_lpa} LPA</p>

            <p><strong>Status:</strong> ${application.status}</p>

            <p><strong>Applied On:</strong> ${application.applied_date}</p>

        </div>

        `;

    });

    document.getElementById("applicationList").innerHTML = output;

}

loadApplications();