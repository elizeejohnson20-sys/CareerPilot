async function addCompany() {

    const company_name = document.getElementById("company_name").value;
    const location = document.getElementById("location").value;
    const package_lpa = parseFloat(document.getElementById("package_lpa").value);
    const eligibility_cgpa = parseFloat(document.getElementById("eligibility_cgpa").value);

    const response = await fetch(
        "https://careerpilot-production-77eb.up.railway.app/admin/company",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                company_name,
                location,
                package_lpa,
                eligibility_cgpa
            })
        }
    );

    const result = await response.json();

    alert(result.message);

    if (result.message === "Company Added Successfully") {

        window.location.href = "admin-dashboard.html";

    }

}