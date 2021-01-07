// Promise ve Fetch ile HTTP İstekleri - ES6

/*

İstek yapıldığı an bir Promise objesi oluşuyor ve bu objenin içeriğinde state ve value
olmak üzere iki değer oluyor.

3 durum vardır:
1 - Pending (İstek yapıldıktan sonra bekleme durumu)
        Promise Objesi
            State: Pending
            Value: Undefined

2 - Olumlu Yanıt
        Promise Objesi
            State: Resolved
            Value: 5
        Yanıt olumluysa karşı taraf resolve() ile bunu gönderiyor, biz then() ile alıyoruz.
3 - Olumsuz Yanıt
        Promise Objesi
            State: Rejected
            Value: Error
        Yanıt olumsuzsa karşı taraf reject() ile bunu gönderiyor, biz catch() ile alıyoruz.

NOT: Fetch yapısını kullanırsak sadece bu yapının içerisinde sonucu elde edebiliriz.
     Fetch + Promise kullanırsak sonucu main kısmında kullanabiliriz.
*/

class Request {


    // GET Request
    get(url) {

        // Promise, ayrı ayrı fonksiyon yazılmasını önleyip callback işlemlerini kolaylaştırarak
        // direkt dışarıya bir çıktı verilmesini sağlar.
        return new Promise(function(resolve, reject) {
            // Fetch URL'e gider ve response'u JSON şeklinde verir.
            fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        });

    }


    // POST Request
    post(url, data) {

        return new Promise(function(resolve, reject) {
            // Fetch URL'e gider ve response'u JSON şeklinde verir.
            fetch(url, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {"Content-type": "application/json; charset=UTF-8"}
                        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        });

    }


    // PUT Request
    put(url, data) {

        return new Promise(function(resolve, reject) {
            fetch(url, {
                            method: 'PUT',
                            body: JSON.stringify(data),
                            headers: {"Content-type": "application/json; charset=UTF-8"}
                        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        
        });

    }


    // DELETE Request
    delete(url) {

        // Promise, ayrı ayrı fonksiyon yazılmasını önleyip callback işlemlerini kolaylaştırarak
        // direkt dışarıya bir çıktı verilmesini sağlar.
        return new Promise(function(resolve, reject) {
            // Fetch URL'e gider ve response'u JSON şeklinde verir.
            fetch(url, {
                            method: 'DELETE'
                        })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(err => reject(err))
        });

    }

}





const request = new Request();



// GET İsteği
// Then ve catch ile yukarıdan gelen veriyi yazdıracağız.
request.get("https://jsonplaceholder.typicode.com/albums")
.then(data => console.log(data))
.catch(err => console.log(err));


// POST İsteği
// Then ve catch ile yukarıdan gelen veriyi yazdıracağız.
request.post("https://jsonplaceholder.typicode.com/albums", {userid: 150, title: 'foo'})
.then(data => console.log(data))
.catch(err => console.log(err));


// PUT İsteği
// Then ve catch ile yukarıdan gelen veriyi yazdıracağız.
request.put("https://jsonplaceholder.typicode.com/albums/1", {userid: 142, title: 'Melih'})
.then(data => console.log(data))
.catch(err => console.log(err));


// DELETE İsteği
// Then ve catch ile yukarıdan gelen veriyi yazdıracağız.
request.delete("https://jsonplaceholder.typicode.com/albums/10")
.then(data => console.log("Başarıyla silindi"))
.catch(err => console.log(err));
