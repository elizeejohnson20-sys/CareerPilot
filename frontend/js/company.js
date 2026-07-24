let companies = [];
let appliedCompanies = [];

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


function displayCompanies(companyList) {

    let output = "";

    companyList.forEach(company => {
    

        output += `

        <div class="company-card">

            <img
                src="images/${company.logo}"
                class="company-logo"
                alt="${company.company_name}"
            >

            <h3>${company.company_name}</h3>

            <p><strong>Location:</strong> ${company.location}</p>

            <p><strong>Package:</strong> ${company.package_lpa} LPA</p>

            <p><strong>Eligibility:</strong> ${company.eligibility_cgpa} CGPA</p>
${
    appliedCompanies.includes(company.company_id)

    ?

    `<button disabled
        style="background:green;color:white;">
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

function viewCompany(companyId){

    const company = companies.find(c => c.company_id === companyId);

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

 document.getElementById("applyButton").onclick = async function(){

    await applyCompany(companyId);

    closeModal();

    loadCompanies();

};

    document.getElementById("companyModal").style.display = "block";

}

function closeModal(){

    document.getElementById("companyModal").style.display = "none";

}

window.onclick = function(event){

    const modal = document.getElementById("companyModal");

    if(event.target == modal){

        modal.style.display = "none";

    }

}

