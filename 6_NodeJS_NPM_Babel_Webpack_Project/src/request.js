export class Request {
    
    constructor(url) {
        this.url = url;
    }



    // GET Request
    async get() {
        const response = await fetch(this.url);
        var responseData = await response.json();
        return responseData;
    }



    // POST Request
    async post(data) {
        
        const response = await fetch(this.url, {
                                                method: 'POST',
                                                body: JSON.stringify(data),
                                                headers: {"Content-type": "application/json; charset=UTF-8"}
                                                });
        var responseData = await response.json();

        return responseData;
    }



    // PUT Request
    async put(id, data) {

        const response = await fetch(this.url + "/" + id, {
                                                method: 'PUT',
                                                body: JSON.stringify(data),
                                                headers: {"Content-type": "application/json; charset=UTF-8"}
                                            });
        var responseData = await response.json();

        return responseData;

    }



    // DELETE Request
    async delete(id) {

        const response = await fetch(this.url + "/" + id, {
                                                method: 'DELETE'
                                            });
        
                                            
        return "Veri Başarıyla Silindi";

    }
    
}