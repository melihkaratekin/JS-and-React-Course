// Selecting Elements
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const cardBody = document.querySelector(".card-body");

// Event Listeners
githubForm.addEventListener("submit", getData);
clearLastUsers.addEventListener("click", clearAllSearched);
document.addEventListener("DOMContentLoaded", getAllSearched);


// Github sınıfından bir obje oluşturacağız.
const github = new Github();
const ui = new UI();


// Event Functions
// Verileri Al
function getData(e) {
    // trim = gereksiz boşlukları siler
    let username = nameInput.value.trim();

    if (username === "") {
        alert("Lütfen geçerli bir kullanıcı adı giriniz.")
    }
    else {
        // Github objesi üzerindeki bir async fonksiyonuna göndereceğiz
        // Bu yüzden  then ve catch ile yakalamamız gerek
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found") {
                ui.showAlert("danger", "Kullanıcı Bulunamadı");
            }
            else {
                // ÖNCE ARAYÜZE EKLEMEMİZ LAZIM SONRA STORAGE'A EKLENECEK!
                ui.addSearchedUserToUI(username)
                Storage.addSearchedUserToStorage(username);
                ui.showAlert("success", "Kullanıcı Listelendi");
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }

        })
        .catch(err => console.log(err))
    }

    ui.clearInput();

    e.preventDefault();
}


// Tüm Aramaları Temizle
function clearAllSearched(e) {
    
    if(confirm("Tümünü Silmek İstediğinizden Emin Misiniz?"))
    {
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }

}


// Aramaları Al ve UI'a ekle
function getAllSearched(e) {
    
    let users = Storage.getSearchedUsersFromStorage();
    
    let result = "";

    users.forEach(user => {
        result += `
        <li class="list-group-item"> ${user} </li>
        `;
    });

    lastUsers.innerHTML = result;


}




