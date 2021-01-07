// Status : Hata Kodları (200, 404 vb.)

// AJAX Rakamlar Ne Anlam İfade Ediyor? (readyState)
// 1: Server bağlantısı sağlandı.
// 2: İstek alındı.
// 3: İsteğin gerektirdiği işlemin yapılması. (onprogress)
// 4: İsteğin bitmesi ve yanıtın hazırlanması. (onload)

// Tümünü kapsayan: onreadystatechange

const buttonElement = document.querySelector("#ajaxButton");

buttonElement.addEventListener("click", getDataFromTxtFileWithAJAX);

function getDataFromTxtFileWithAJAX() {

    const xhr = new XMLHttpRequest();

    // Veri çekeceğiz o yüzden GET olacak, sonra txt dosyasının yolunu ve asenkron olacağını belirttik.
    xhr.open("GET", "example.json", async=true);

    // 1. Yöntem: readyState = 4 iken, yani yanıt alındığında
    xhr.onload = function() {

            // Durum OK olduğunda ve yanıt hazır olduğunda
            if(this.status == 200) 
            {
                const employees = JSON.parse(this.responseText);

                employees.forEach(function(employee) {
                    console.log(employee)
                });
            }
            
    }

    // Gönderme işlemi
    xhr.send();

}