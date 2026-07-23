window.onload = function(){

    loadApplications();

};



function loadApplications(){


fetch("http://127.0.0.1:8000/admin/applications")


.then(response => response.json())


.then(data => {


let table = document.getElementById("applicationsTable");


table.innerHTML = "";


data.forEach(app => {


let row = `

<tr>

<td>${app.application_id}</td>

<td>${app.student_email}</td>

<td>${app.company_name}</td>

<td>${app.location}</td>

<td>${app.status}</td>

<td>${app.applied_date}</td>

<td>

<select id="status-${app.application_id}">

    <option value="Applied" ${app.status === "Applied" ? "selected" : ""}>Applied</option>

    <option value="Shortlisted" ${app.status === "Shortlisted" ? "selected" : ""}>Shortlisted</option>

    <option value="Interview" ${app.status === "Interview" ? "selected" : ""}>Interview</option>

    <option value="Selected" ${app.status === "Selected" ? "selected" : ""}>Selected</option>

    <option value="Rejected" ${app.status === "Rejected" ? "selected" : ""}>Rejected</option>

</select>

<button onclick="changeStatus(${app.application_id})">

Save

</button>

</td>

</tr>

`;


table.innerHTML += row;


});


})


.catch(error=>{

console.log(error);

});


}
function changeStatus(applicationId) {

   let status = document.getElementById(
    `status-${applicationId}`
   ).value;
   
    if (status == null || status.trim() === "") {
        return;
    }

    fetch(`http://127.0.0.1:8000/admin/applications/${applicationId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: status
        })
    })

    .then(response => response.json())

    .then(data => {

        alert(data.message);

        loadApplications();

    })

    .catch(error => {

        console.log(error);

        alert("Failed to update application status.");

    });

}