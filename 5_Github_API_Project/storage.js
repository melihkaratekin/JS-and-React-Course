class Storage {

    // Bu kısımdaki fonksiyonları static ile yazacağız.
    // Böylece Storage.fonksiyonİsmi şeklinde erişebileceğiz.

    static getSearchedUsersFromStorage() {

        // Todos Array Oluşturacağız
        let users;
    
        if (localStorage.getItem("searched") === null)
        {
            //Eğer yoksa todos'a boş bir array ata
            users = [];
        }
        else
        {
            // JSON.Parse : String şeklinde aldığı değerleri toplu olarak Array'e dönüştürür.
            users = JSON.parse(localStorage.getItem("searched"));
        }
    
        return users;
    }



    static addSearchedUserToStorage(username) {
        
        let users = this.getSearchedUsersFromStorage();

        if (users.indexOf(username) === -1) {
            users.push(username);
        }

        localStorage.setItem("searched", JSON.stringify(users));
        
    }



    static clearAllSearchedUsersFromStorage() {
        localStorage.removeItem("searched");
    }
}