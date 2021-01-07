// AJAX ve Callback ile HTTP İstekleri - ES6 Öncesi

class Request {

    constructor() {
        this.xhr = new XMLHttpRequest();
    }


    // GET Request
    get(url, callback) {

        this.xhr.open("GET", url);

        const temp = this; // Bu kısımda This = Request sınıfını işaret eder.

        this.xhr.onload = function() {
            // this kelimesini burada kullanırsak onloadın yanındaki xhr objesini işaret eder.
            // Böylece biz xhr.xhr.status yapıyor gibi oluruz.
            // Bu yüzden fonksiyon dışında this kullanıp değişkene atayarak
            // Request sınıfını işaret etmesini sağlayabiliriz.
            if (temp.xhr.status == 200) {
                callback(null, temp.xhr.responseText);
            }
            else {
                callback("Hata", null);
            }

        } // Üstteki temp yerine buraya .bind(this) yazarak da çözebilirdik.

        
        // İstek Gönderme İşlemi
        this.xhr.send();

    }


    // POST Request
    post(url, data, callback) {

        this.xhr.open("POST", url);

        // Göndereceğimiz verinin tipini (JSON) belirtmemiz gerek.
        this.xhr.setRequestHeader("Content-type", "application/json");
        
        const temp = this; // Bu kısımda This = Request sınıfını işaret eder.

        // Bu sefer örnek olması amaçlı arrow function yazalım.
        this.xhr.onload = () => {

            // 201 = İstek başarıyla tamamlandı ve yeni kaynak oluşturuldu.
            if (temp.xhr.status == 201) {
                callback(null, temp.xhr.responseText);
            }
            else {
                callback("Hata", null);
            }

        }

        // İstek Gönderme Kısmı
        // Veri STRING biçiminde gönderilmesi gerekiyor.
        this.xhr.send(JSON.stringify(data));

    }


    // PUT Request
    put(url, data, callback) {

        this.xhr.open("PUT", url);

        // Göndereceğimiz verinin tipini (JSON) belirtmemiz gerek.
        this.xhr.setRequestHeader("Content-type", "application/json");
        
        const temp = this; // Bu kısımda This = Request sınıfını işaret eder.

        // Bu sefer örnek olması amaçlı arrow function yazalım.
        this.xhr.onload = () => {

            if (temp.xhr.status == 200) {
                callback(null, temp.xhr.responseText);
            }
            else {
                callback("Hata", null);
            }

        }

        // İstek Gönderme Kısmı
        // Veri STRING biçiminde gönderilmesi gerekiyor.
        this.xhr.send(JSON.stringify(data));

    }


    // DELETE Request
    delete(url, callback) {

        this.xhr.open("DELETE", url);

        const temp = this; // Bu kısımda This = Request sınıfını işaret eder.

        this.xhr.onload = function() {
            // this kelimesini burada kullanırsak onloadın yanındaki xhr objesini işaret eder.
            // Böylece biz xhr.xhr.status yapıyor gibi oluruz.
            // Bu yüzden fonksiyon dışında this kullanıp değişkene atayarak
            // Request sınıfını işaret etmesini sağlayabiliriz.
            if (temp.xhr.status == 200) {
                callback(null, temp.xhr.responseText);
            }
            else {
                callback("Hata", null);
            }

        } // Üstteki temp yerine buraya .bind(this) yazarak da çözebilirdik.

        
        // İstek Gönderme İşlemi
        this.xhr.send();

    }


    
}










// Main Kısmı

// Request objesi oluşturduk.
const request = new Request();




// GET İstek Gönderme (URL ve Callback Function)
request.get("https://jsonplaceholder.typicode.com/albums",

            function(err, response) {
                if(err == null)
                {
                    console.log(response);
                }
                else
                {
                    console.log(err);
                }
            });




// POST İstek Gönderme (URL, Data ve Callback Function)
request.post("https://jsonplaceholder.typicode.com/albums",

            {userid: 2, title: "Thriller"},

            function(err, response) {
                if(err == null)
                {
                    console.log(response);
                }
                else
                {
                    console.log(err);
                }
            });




// PUT İstek Gönderme (URL (Güncellenecek Veri Seçilmiş Biçimde), Data ve Callback Function)
request.put("https://jsonplaceholder.typicode.com/albums/10",

            {userid: 150, title: "Ceg - Bu Gece"},

            function(err, response) {
                if(err == null)
                {
                    console.log(response);
                }
                else
                {
                    console.log(err);
                }
            });




// DELETE İstek Gönderme (URL (Silinecek Veri Seçilmiş Biçimde) ve Callback Function)
request.delete("https://jsonplaceholder.typicode.com/albums/10",

            function(err, response) {
                if(err == null)
                {
                    console.log("Veri Silme İşlemi Başarılı...");
                }
                else
                {
                    console.log(err);
                }
            });