window.onload = function () {

    loadStudents();

};

async function loadStudents() {

    const response = await fetch(
        "http://127.0.0.1:8000/admin/students"
    );

    const students = await response.json();

    let output = "";

    students.forEach(student => {

        output += `

        <tr>

            <td>${student.id}</td>
            <td>${student.full_name}</td>
            <td>${student.email}</td>
            <td>${student.skills}</td>
            <td>${student.experience}</td>
            <td>${student.cgpa}</td>
            <td>${student.department || ""}</td>

        </tr>

        `;

    });

    document.getElementById("studentTable").innerHTML = output;

}