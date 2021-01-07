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
    xhr.open("GET", "example.txt", async=true);

    // readyState = 3 iken, yani process işleniyorken
    xhr.onprogress = function() {
            console.log("Process işleniyor...");
    }

    // 1. Yöntem: readyState = 4 iken, yani yanıt alındığında
    xhr.onload = function() {
            // Durum OK olduğunda ve yanıt hazır olduğunda
            if(this.status == 200) 
            {
                console.log(this.responseText); //Yanıtın text'ini yazdır.
            }
    }

    // 2. Yöntem: status = 200 ve readyState = 4 iken, yani yanıt alındığında
    xhr.onreadystatechange = function() {
            // Durum OK olduğunda ve yanıt hazır olduğunda
            if(this.status == 200 && this.readyState == 4) 
            {
                console.log(this.responseText); //Yanıtın text'ini yazdır.
            }
    }

    // Gönderme işlemi
    xhr.send();

}