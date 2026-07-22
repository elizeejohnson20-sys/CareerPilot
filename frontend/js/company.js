let companies = [];

async function loadCompanies() {

    const response = await fetch("http://127.0.0.1:8000/companies");

    companies = await response.json();

    displayCompanies(companies);

}

function displayCompanies(companyList) {

    let output = "";

    companyList.forEach(company => {

        output += `

        <div class="company-card">

            <h3>${company.company_name}</h3>

            <p><strong>Location:</strong> ${company.location}</p>

            <p><strong>Package:</strong> ${company.package_lpa} LPA</p>

            <p><strong>Eligibility:</strong> ${company.eligibility_cgpa} CGPA</p>

            <button onclick="applyCompany(${company.company_id})">
                Apply Now
            </button>

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

    const filtered = companies.filter(company =>

        company.company_name.toLowerCase().includes(search) ||
        company.location.toLowerCase().includes(search)

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

loadCompanies();