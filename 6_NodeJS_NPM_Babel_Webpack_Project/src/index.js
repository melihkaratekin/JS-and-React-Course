import {Request} from "./request";
import {UI} from './ui';

// Elementleri Seçme
const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

// Object Literal
const request = new Request("http://localhost:3000/employees");
const ui = new UI();


// Event Listeners
document.addEventListener("DOMContentLoaded", getAllEmployees);
document.addEventListener("submit", addEmployee);
employeesList.addEventListener("click", updateOrDelete);
updateEmployeeButton.addEventListener("click", updateEmployee);

// Güncellenecek Verinin Bilgilerini Taşıyan Değişken
let updateState = null;

// Event Functions
function getAllEmployees() {
    request.get()
    .then(employees => {
        ui.addAllEmployeeToUI(employees);
    })
    .catch(err => console.log(err))
}

function addEmployee(e) {

    const employeeName = nameInput.value.trim();
    const employeeDep = departmentInput.value.trim();
    const employeeSal = salaryInput.value.trim();

    if(employeeName === "" || employeeDep === "" || employeeSal === "") {
        ui.showAlert("danger", "Lütfen tüm alanları doldurunuz!")
    }
    else {
        request.post({
            "name": employeeName,
            "department": employeeDep,
            "salary": Number(employeeSal)
        })
        .then(employee => {
            ui.addEmployeeToUI(employee);
        })
        .catch(err => console.log(err))
    }

    ui.clearInputs();
    e.preventDefault();
}

function updateOrDelete(e) {

    // e.target = Event verdiğin div içerisinde hangi objeye basıldığını HTML kodu olarak gösterir. 
    if (e.target.id === "delete-employee") {
        deleteEmployee(e.target);
    }
    else if (e.target.id === "update-employee") {
        /*
            tr elementine ulaşmamız gerekiyor. Bunun için sıralama şu şekilde olacak. 
            1 - targetEmployee'nin parent elementine erişeceğiz. (td)
            2 - td'nin parent elementine erişeceğiz. (tr)
        */
       console.log("sadasd");
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}

function deleteEmployee(targetEmployee) {

    /*
        ID değerine ulaşmamız gerekiyor. Bunun için sıralama şu şekilde olacak. 
        1 - targetEmployee'nin parent elementine erişeceğiz. (td)
        2 - td'nin kardeşine erişeceğiz. (güncelle butonu td'si)
        3 - onun da kardeşine erişeceğiz. (id'nin td'si)
        4 - id'nin td'si içerisindeki değeri textContent ile alacağız.
    */
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

    request.delete(id)
    .then(message => {
        /*
            tr elementine ulaşmamız gerekiyor. Bunun için sıralama şu şekilde olacak. 
            1 - targetEmployee'nin parent elementine erişeceğiz. (td)
            2 - td'nin parent elementine erişeceğiz. (tr)
        */
        const trElement = targetEmployee.parentElement.parentElement;
        ui.deleteEmployeeFromUI(trElement);
    })
    .catch(err => console.log(err));

}

function updateEmployeeController(targetEmployee) {


    ui.toggleUpdateButton(targetEmployee);


    // updateState null ise kullanıcı güncelleye yeni tıklamıştır.
    if(updateState === null) {
        
        // Güncellenecek kişinin bilgilerini updateState'e atacağız.
        // Target employee'de bizim tr ve objeleri var bunun elemanlarına erişeceğiz.

        updateState = {
            updateID: targetEmployee.children[3].textContent,
            updateParent: targetEmployee
        }
    }
    else {
        // updateState null değilse kullanıcı güncelleye iki kere tıklamıştır yani eski haline gelecek.
        updateState = null;
    }

}

function updateEmployee() {
    if (updateState) {

        const data = {
            "name": nameInput.value.trim(),
            "department": departmentInput.value.trim(),
            "salary": Number(salaryInput.value.trim())
        };

        request.put(updateState.updateID, data)
        .then(updatedEmployee => {

            // UpdateParent içerisinde tr kısmı komple var.
            ui.updateEmployeeOnUI(updatedEmployee, updateState.updateParent);
            
        })
        .catch(err => console.log(err))
    }
}

