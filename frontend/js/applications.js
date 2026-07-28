async function loadApplications() {

    const email = localStorage.getItem("email");

    const response = await fetch(
        `https://careerpilot-production-77eb.up.railway.app/applications/${email}`
    );

    const applications = await response.json();

    let output = "";

    applications.forEach(application => {

        output += `

        <div class="company-card">

            <img
               src="images/${application.logo}"
               class="company-logo"
            >

            <h3>${application.company_name}</h3>

            <p><strong>Location:</strong> ${application.location}</p>

            <p><strong>Package:</strong> ${application.package_lpa} LPA</p>

            <p>
            <strong>Status:</strong>
            <span class="status-badge ${application.status.toLowerCase()}">
                ${application.status}
            </span>
            </p>

           <p>
<strong>Applied On:</strong>
${new Date(application.applied_date).toLocaleDateString(
    "en-IN",
    {
        day: "numeric",
        month: "short",
        year: "numeric"
    }
)}
</p>

        </div>

        `;

    });

    document.getElementById("applicationList").innerHTML = output;

}

loadApplications();