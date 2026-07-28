let companyId = localStorage.getItem("editCompanyId");


window.onload = function () {

    if(companyId == null){

        alert("No company selected");
        window.location.href = "manage-companies.html";
        return;

    }

    loadCompany();

};



function loadCompany(){

    fetch(`https://careerpilot-production-77eb.up.railway.app/companies/${companyId}`)

    .then(response => response.json())

    .then(data => {


        document.getElementById("company_name").value = data.company_name;

        document.getElementById("location").value = data.location;

        document.getElementById("package_lpa").value = data.package_lpa;

        document.getElementById("eligibility_cgpa").value = data.eligibility_cgpa;


    })

    .catch(error => {

        console.log(error);

        alert("Failed to load company");

    });


}




function updateCompany(){


    let company = {


        company_name:
        document.getElementById("company_name").value,


        location:
        document.getElementById("location").value,


        package_lpa:
        document.getElementById("package_lpa").value,


        eligibility_cgpa:
        document.getElementById("eligibility_cgpa").value

    };



    fetch(`https://careerpilot-production-77eb.up.railway.app/companies/${companyId}`,{


        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(company)


    })

    .then(response=>response.json())


    .then(data => {

    alert("Company Updated Successfully");

    localStorage.removeItem("editCompanyId");

    window.location.replace("manage-companies.html");

    })

    .catch(error=>{


        console.log(error);

        alert("Update Failed");


    });



}