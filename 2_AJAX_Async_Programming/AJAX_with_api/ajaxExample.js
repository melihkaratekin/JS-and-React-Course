// Status : Hata Kodları (200, 404 vb.)

// AJAX Rakamlar Ne Anlam İfade Ediyor? (readyState)
// 1: Server bağlantısı sağlandı.
// 2: İstek alındı.
// 3: İsteğin gerektirdiği işlemin yapılması. (onprogress)
// 4: İsteğin bitmesi ve yanıtın hazırlanması. (onload)

// Tümünü kapsayan: onreadystatechange

const buttonElement = document.querySelector("#change");

buttonElement.addEventListener("click", getDataFromTxtFileWithAJAX);

function getDataFromTxtFileWithAJAX() {

    const xhr = new XMLHttpRequest();

    // Veri çekeceğiz o yüzden GET olacak, sonra txt dosyasının yolunu ve asenkron olacağını belirttik.
    xhr.open("GET", "https://api.exchangeratesapi.io/latest", async=true);

    // 1. Yöntem: readyState = 4 iken, yani yanıt alındığında
    xhr.onload = function() {
            
            if(this.status == 200) 
            {
                // Yanıtı JSON objesine dönüştürdük.
                const response = JSON.parse(this.responseText)

                const tlAmount = response.rates.TRY;
                const inputAmount = Number(document.querySelector("#amount").value);
                const result = tlAmount * inputAmount;

                const valueElement = document.querySelector("#tl");
                valueElement.value = result;
            }

    }

    // Gönderme işlemi
    xhr.send();

}