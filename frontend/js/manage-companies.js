let companies = [];

async function loadCompanies() {

    const response = await fetch(
        "http://127.0.0.1:8000/admin/companies"
    );

    companies = await response.json();

    displayCompanies(companies);

}

function displayCompanies(companyList) {

    let output = "";

    companyList.forEach(company => {

        output += `

        <tr>

            <td>${company.company_id}</td>
            <td>${company.company_name}</td>
            <td>${company.location}</td>
            <td>${company.package_lpa}</td>
            <td>${company.eligibility_cgpa}</td>

            <td>

                <button onclick="editCompany(${company.company_id})">
    Edit
</button>

<button onclick="deleteCompany(${company.company_id})">
    Delete
</button>
            </td>

        </tr>

        `;

    });

    document.getElementById("companyBody").innerHTML = output;

}

function searchCompany() {

    const search = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const filtered = companies.filter(company =>

        company.company_name.toLowerCase().includes(search)

    );

    displayCompanies(filtered);

}

loadCompanies();
async function deleteCompany(companyId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(
        `http://127.0.0.1:8000/admin/company/${companyId}`,
        {
            method: "DELETE"
        }
    );

    const result = await response.json();

    alert(result.message);

    loadCompanies();

}
function editCompany(companyId) {

    localStorage.setItem("editCompanyId", companyId);

    window.location.href = "edit-company.html";

}