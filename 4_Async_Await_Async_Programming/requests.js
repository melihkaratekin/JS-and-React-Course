class Request {


    // GET Request
    async get(url) {

        // Await, Fetch'in veya bir sonucun resolve etmesini bekler. Olumsuzsa reject ile hata döndürür.
        const response = await fetch(url);

        var data = await response.json();

        return data;

    }


    // POST Request
    async post(url, data) {
        
        const response = await fetch(url, {
                                                method: 'POST',
                                                body: JSON.stringify(data),
                                                headers: {"Content-type": "application/json; charset=UTF-8"}
                                            });
        var data = await response.json();

        return data;
    }


    // PUT Request
    async put(url, data) {

        const response = await fetch(url, {
                                                method: 'PUT',
                                                body: JSON.stringify(data),
                                                headers: {"Content-type": "application/json; charset=UTF-8"}
                                            });
        var data = await response.json();

        return data;

    }


    // DELETE Request
    async delete(url) {

        const response = await fetch(url, {
                                                method: 'DELETE'
                                            });
        
                                            
        return "Veri Başarıyla Silindi";

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