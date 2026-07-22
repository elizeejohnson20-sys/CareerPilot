async function addCompany() {

    const company_name = document.getElementById("company_name").value;
    const location = document.getElementById("location").value;
    const package_lpa = parseFloat(document.getElementById("package_lpa").value);
    const eligibility_cgpa = parseFloat(document.getElementById("eligibility_cgpa").value);

    const response = await fetch(
        "http://127.0.0.1:8000/admin/company",
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