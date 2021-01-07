export class UI {

    constructor() {
        this.nameInput = document.getElementById("name");
        this.departmentInput = document.getElementById("department");
        this.salaryInput = document.getElementById("salary");
        this.employeesList = document.getElementById("employees");
        this.updateEmployeeButton = document.getElementById("update");
        this.firstCardBody = document.getElementById("card-body");
    }

    addAllEmployeeToUI(employees) {

        let result = ""

        employees.forEach(employee => {
            result += `
            <tr>                            
                <td>${employee.name}</td>
                <td>${employee.department}</td>
                <td>${employee.salary}</td>
                <td>${employee.id}</td>
                <td><a href="#" id = "update-employee" class= "btn btn-warning">Güncelle</a></td> 
                <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
            </tr>
            `;
        });

        this.employeesList.innerHTML = result;

    }

    addEmployeeToUI(employee) {
        this.employeesList.innerHTML += `
        <tr>                            
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-warning">Güncelle</a></td> 
            <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `; 
    }

    deleteEmployeeFromUI(element) {
        element.remove();
    }

    toggleUpdateButton(targetEmployee) {
        if(this.updateEmployeeButton.style.display === "none") {
            this.updateEmployeeButton.style.display = "block";
            this.addEmployeeInfoToInputs(targetEmployee);
        }
        else {
            this.updateEmployeeButton.style.display = "none";
            this.clearInputs();
        }
    }

    addEmployeeInfoToInputs(target) {

        // Güncellenecek eleman şuanda elimizde bunun değerlerini array biçiminde almamız gerekiyor.
        // Children ile bunu yapıyoruz.
        const children = target.children;

        // Şimdi güncellenecek elemanın değerlerini inputlara yerleştireceğiz.
        this.nameInput.value = children[0].textContent;
        this.departmentInput.value = children[1].textContent;
        this.salaryInput.value = children[2].textContent;
    }

    updateEmployeeOnUI(employee, parent) {
        parent.innerHTML = `
        <tr>                            
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
            <td>${employee.id}</td>
            <td><a href="#" id = "update-employee" class= "btn btn-warning">Güncelle</a></td> 
            <td><a href="#" id = "delete-employee" class= "btn btn-danger">Sil</a></td>
        </tr>
        `;

        this.clearInputs();

        this.updateEmployeeButton.style.display = "none";
    }

    clearInputs() {
        this.nameInput.value = "";
        this.departmentInput.value = "";
        this.salaryInput.value = "";
    }

    showAlert(type, message) {

           //Div Oluşturma
           const alert = document.createElement("div");
           alert.className = `alert alert-${type}`;
           alert.appendChild(document.createTextNode(message));
    
           //Div'i Arayüze Ekleme
           firstCardBody.appendChild(alert);
    
           //Uyarı bir süre ekranda kalması için timer koyacağız.
           setTimeout(function() {
               alert.remove();
           }, 2000);
    
    }
    

}