import { getDataApi } from "./api/getDataApi.js";
import { addDataApi } from "./api/addDataApi.js";
import { updateDataApi } from "./api/updateDataApi.js"
import { deleteDataApi } from "./api/deleteDataApi.js";

const addStudentForm = document.getElementById("add-student-form");
const getStudentsBtn = document.getElementById("get-students-btn");
const updateStudentForm = document.getElementById("update-student-form");
const updateModalBackground = document.getElementById("updateModalBackground");
const studentsTableBody = document.getElementById("students-table-body");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");
const skillsInput = document.getElementById("skills");
const emailInput = document.getElementById("email");
const isEnrolledCheckBox = document.getElementById("isEnrolled");
const nameUpInput = document.getElementById("name-u")
const ageUpInput = document.getElementById("age-u")
const courseUpInput = document.getElementById("course-u");
const skillsUpInput = document.getElementById("skills-u");
const emailUpInput = document.getElementById("email-u");
const isEnrolledUpInput = document.getElementById("isEnrolled-u");

async function getStudents() {
    try {
        const students = await getDataApi();
        return students;
    } catch (error) {
        console.log("getStudents:", error.message);
        return [];
    }
}

function renderStudents(students) {
    studentsTableBody.innerHTML = "";
    const layout = students.map(student => 
        `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.skills}</td>
            <td>${student.email}</td>
            <td>${student.isEnrolled}</td>
            <td>
                <button data-update-id="${student.id}">Оновити</button>
                <button data-delete-id="${student.id}">Видалити</button>
            <td>
        </tr>`
    ).join('');
    return studentsTableBody.insertAdjacentHTML("beforeend", layout);
};

getStudentsBtn.addEventListener("click", async e => {
    e.preventDefault();
    const students = await getStudents();
    renderStudents(students);
});

async function addStudent() {
    try {
        const students = await getDataApi();
        const newStudent = {
            id: String(students.length + 1),
            name: nameInput.value,
            age: Number(ageInput.value),
            course: courseInput.value,
            skills: skillsInput.value.split(","),
            email: emailInput.value,
            isEnrolled: isEnrolledCheckBox.checked
        };

        await addDataApi(newStudent);

        nameInput.value = "";
        ageInput.value = "";
        courseInput.value = "";
        skillsInput.value = "";
        emailInput.value = "";
        isEnrolledCheckBox.checked = false;

        const updatedStudents = await getStudents();
        renderStudents(updatedStudents);
    } catch (error) {
        console.log("addStudent:", error.message);
    }
}

addStudentForm.addEventListener("submit", e => {
    e.preventDefault();
    addStudent();
});

async function updateStudent(id) {
    try {
        updateModalBackground.classList.toggle("show");
        const students = await getStudents();
        const foundStudent = students.find(s => s.id === id);
        nameUpInput.value = foundStudent.name;
        ageUpInput.value = foundStudent.age;
        courseUpInput.value = foundStudent.course;
        skillsUpInput.value = foundStudent.skills.join(",");
        emailUpInput.value = foundStudent.email;
        isEnrolledUpInput.checked = foundStudent.isEnrolled;
    } catch (error) {
        console.log("updateStudent:", error.message);
    }
};

updateStudentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const id = updateStudentForm.dataset.updateId;
        const newInfo = {
            name: nameUpInput.value,
            age: Number(ageUpInput.value),
            course: courseUpInput.value,
            skills: skillsUpInput.value.split(","),
            email: emailUpInput.value,
            isEnrolled: isEnrolledUpInput.checked
        };

        await updateDataApi(id, newInfo);
        updateModalBackground.classList.toggle("show");

        const updatedStudents = await getStudents();
        renderStudents(updatedStudents);
        updateStudentForm.removeAttribute("data-update-id");
    } catch (error) {
        console.log("updateStudentForm form:", error.message);
    }
});

async function deleteStudent(id) {
    try {
        await deleteDataApi(id);
        const updatedStudents = await getStudents();
        renderStudents(updatedStudents);
    } catch (error) {
        console.log("deleteStudent:", error.message);
    }
}

studentsTableBody.addEventListener("click", async e => {
    e.preventDefault();
    if (e.target.tagName === "BUTTON") {
        if (e.target.dataset.deleteId) {
            deleteStudent(e.target.dataset.deleteId);
        }
        if (e.target.dataset.updateId) {
            updateStudentForm.dataset.updateId = e.target.dataset.updateId;
            updateStudent(e.target.dataset.updateId);
        }
    }
});

document.getElementById("closeModal").addEventListener("click", e => {
    e.preventDefault();
    updateModalBackground.classList.toggle("show");
});