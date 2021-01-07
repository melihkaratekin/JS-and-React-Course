// Tüm Elementleri Seçme
// # = id       . = class   li.abc = li içerisindeki abc sınıfı olanlar
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


// Event Listeners
form.addEventListener("submit", addTodo);
document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
secondCardBody.addEventListener("click", deleteTodo);
filter.addEventListener("keyup", filterTodos);
clearButton.addEventListener("click", clearAllTodos);




// Uyarı Gösterme Fonksiyonu
function showAlert(type, message) {
    /* AŞAĞIDAKİ YAPIYI OLUŞTURACAĞIZ

       <div class="alert alert-danger">
           This is a danger alert—check it out!
       </div>

       */

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




// Storage'dan tüm todoları çekme fonksiyonu
function getTodosFromStorage() {

    // Todos Array Oluşturacağız
    let todos;

    if (localStorage.getItem("todos") === null)
    {
        //Eğer yoksa todos'a boş bir array ata
        todos = [];
    }
    else
    {
        // JSON.Parse : String şeklinde aldığı değerleri toplu olarak Array'e dönüştürür.
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

// Sayfa yenilendiğinde tüm Todoları Storage'dan çekme ve listeleme fonksiyonu
function loadAllTodosToUI(newTodo) {

    // Todoları çekme işlemi
    let todos = getTodosFromStorage();

    // Todolarda gezinme ve Arayüze Ekleme
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
 
}




// Todo Ekleme
function addTodo(e) {

    // trim() : Veri çıktısındaki gereksiz boşlukları siler.
    const newTodo = todoInput.value.trim();

    if (newTodo === "")
    {
       // Giriş Yapmadıysa (Boşsa) Uyarı Ver
       showAlert("danger", "Lütfen bir todo giriniz.");
    }
    else
    {
        // Değişkene atadığımız string değeri arayüze ekleme fonksiyonuna gönderdik.
        addTodoToUI(newTodo)

        // Todoların sayfa yenilendiğinde gitmemesi için Local Storage'a ekleme işlemi
        addTodoToStorage(newTodo)

        // Todo Eklendiyse Başarılı Mesaj Ver
        showAlert("success", "Todo Eklendi");
    }


    // Sayfa yenilenmesini önledik. Yoksa hata alacaktık.
    e.preventDefault()
}

// Aldığı string değeri list item olarak arayüze ekleyecek.
function addTodoToUI(newTodo) {

    /* AŞAĞIDAKİ YAPIYI OLUŞTURACAĞIZ

    <li class="list-group-item d-flex justify-content-between">
    
    Todo 1

    <a href = "#" class ="delete-item">
        <i class = "fa fa-remove"></i>
    </a>

    </li>

    */
    
    //Liste Oluşturma
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";

    //Link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    //Linki ve Gelen String Değeri Listenin İçerisine Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Todo Liste'e listItem'ı Ekleme
    todoList.appendChild(listItem);

    //Ekleme İşleminden Sonra Todo Input'u Temizlemek
    todoInput.value = "";

}

// Storage'a ekleme fonksiyonu
function addTodoToStorage(newTodo) {

   // Todoları çekme işlemi
   let todos = getTodosFromStorage();

   // Yeni Todo'yu array'e ekleme işlemi
   todos.push(newTodo);

   // Local Storage'ı yeni Array'e göre güncelleme işlemi
   localStorage.setItem("todos", JSON.stringify(todos));

}




// Todo Silme
function deleteTodo(e) {

    // Çarpı butonuna tıklandığında
    if(e.target.className === "fa fa-remove")
    {
        //Çarpı butonunun ailesinin (a etiketi) ailesine (li) erişeceğiz ve ARAYÜZDEN sileceğiz.
        e.target.parentElement.parentElement.remove();
        showAlert("danger", "Todo Silindi");

        //Sadece arayüzden sildik, şimdi ise Storage'dan silmemiz gerekiyor. Yoksa sayfa yenilendiğinde gelecek.
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)

    }

}

// Todo Storage'dan Silme
function deleteTodoFromStorage(deleteTodo) {

    let todos = getTodosFromStorage();

    todos.forEach(function(todo, index) {
        if(todo === deleteTodo)
        {
            todos.splice(index, 1); // Belirlenen index'ten itibaren 1 tane eleman sileceğimizi belirtir.
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));

}

// Todo Tümünü Silme
function clearAllTodos(e) {

    if(confirm("Tümünü Silmek İstediğinizden Emin Misiniz?"))
    {
        while(todoList.firstElementChild != null)
        {
            todoList.removeChild(todoList.firstElementChild);
        }

        localStorage.removeItem("todos");
    }

}




// Todo Filtreleme
function filterTodos(e) {

    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();

        if(text.indexOf(filterValue) === -1)
        {
            listItem.setAttribute("style", "display: none !important");
        }
        else
        {
            listItem.setAttribute("style", "display: block");
        }

    });

}