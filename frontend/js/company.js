let companies = [];
let appliedCompanies = [];

const studentCgpa = Number(localStorage.getItem("cgpa")) || 0;

async function loadCompanies() {

    const email = localStorage.getItem("email");

    const companyResponse = await fetch(
        "http://127.0.0.1:8000/companies"
    );

    companies = await companyResponse.json();

    const applicationResponse = await fetch(
        `http://127.0.0.1:8000/applications/${email}`
    );

    const applications = await applicationResponse.json();

    appliedCompanies = applications.map(
        application => Number(application.company_id)
    );

    displayCompanies(companies);

}

function displayCompanies(companyList){

    let output = "";

    companyList.forEach(company=>{

        output += `

        <div class="company-card">

            <img
                class="company-logo"
                src="images/${company.logo}"
                alt="${company.company_name}"
            >

            <h3>${company.company_name}</h3>

            <p><strong>Location:</strong> ${company.location}</p>

            <p><strong>Package:</strong> ${company.package_lpa} LPA</p>

            <p><strong>Eligibility:</strong> ${company.eligibility_cgpa} CGPA</p>

            ${
                studentCgpa >= company.eligibility_cgpa

                ?

                `<p style="color:green;font-weight:bold;">
                    ✅ Eligible
                </p>`

                :

                `<p style="color:red;font-weight:bold;">
                    ❌ Not Eligible
                </p>`
            }

            ${
                appliedCompanies.includes(company.company_id)

                ?

                `<button disabled>
                    ✔ Applied
                </button>`

                :

                `<button onclick="viewCompany(${company.company_id})">
                    View Details
                </button>`
            }

        </div>

        `;

    });

    document.getElementById("companyList").innerHTML = output;

}

function searchCompanies() {

    const search = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const minPackage =
        Number(document.getElementById("packageFilter").value) || 0;

    const maxCgpa =
        Number(document.getElementById("cgpaFilter").value) || 100;

    const filtered = companies.filter(company =>

        (
            company.company_name.toLowerCase().includes(search) ||
            company.location.toLowerCase().includes(search)
        )

        &&

        company.package_lpa >= minPackage

        &&

        company.eligibility_cgpa <= maxCgpa

    );

    displayCompanies(filtered);

}

async function applyCompany(companyId) {

    const email = localStorage.getItem("email");

    const response = await fetch(
        "http://127.0.0.1:8000/apply",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student_email: email,
                company_id: companyId
            })
        }
    );

    const result = await response.json();

    alert(result.message);

}

function viewCompany(companyId) {

    const company = companies.find(
        c => c.company_id === companyId
    );

    document.getElementById("modalLogo").src =
        "images/" + company.logo;

    document.getElementById("modalName").innerText =
        company.company_name;

    document.getElementById("modalLocation").innerText =
        "Location : " + company.location;

    document.getElementById("modalPackage").innerText =
        "Package : " + company.package_lpa + " LPA";

    document.getElementById("modalCgpa").innerText =
        "Eligibility : " + company.eligibility_cgpa + " CGPA";
    document.getElementById("modalRole").innerHTML =
    "<strong>Job Role:</strong> " + company.job_role;

document.getElementById("modalLocation").innerHTML =
    "<strong>Location:</strong> " + company.location;

document.getElementById("modalPackage").innerHTML =
    "<strong>Package:</strong> ₹" + company.package_lpa + " LPA";

document.getElementById("modalCgpa").innerHTML =
    "<strong>Minimum CGPA:</strong> " + company.eligibility_cgpa;

document.getElementById("modalSkills").innerHTML =
    company.skills_required;

document.getElementById("modalDescription").innerHTML =
    company.description;

const studentCgpa = Number(
    localStorage.getItem("cgpa")
);

const message = document.getElementById("eligibilityMessage");

const button = document.getElementById("applyButton");

if (studentCgpa >= company.eligibility_cgpa) {

    message.innerHTML =
        "✅ You are eligible for this company.";

    message.style.color = "green";

    button.disabled = false;

}
else {

    message.innerHTML =
        "❌ You are not eligible based on CGPA.";

    message.style.color = "red";

    button.disabled = true;

}

    document.getElementById("applyButton").onclick = async function () {

        await applyCompany(companyId);

        closeModal();

        loadCompanies();

    };

    document.getElementById("companyModal").style.display = "block";

}

function closeModal() {

    document.getElementById("companyModal").style.display = "none";

}

window.onclick = function (event) {

    const modal = document.getElementById("companyModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

};

loadCompanies();