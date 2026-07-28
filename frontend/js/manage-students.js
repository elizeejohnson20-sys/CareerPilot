async function loadStudents() {

    const response = await fetch(
        "https://careerpilot-production-77eb.up.railway.app/admin/students"
    );

    const students = await response.json();

    let output = "";

    students.forEach(student => {

        output += `

        <tr>

            <td>${student.full_name}</td>

            <td>${student.email}</td>

            <td>${student.department}</td>

            <td>${student.cgpa}</td>

            <td>${student.skills}</td>

        </tr>

        `;

    });

    document.getElementById("studentTable").innerHTML = output;

}

loadStudents();