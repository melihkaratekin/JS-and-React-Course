class Github {
    constructor() {
        this.url = "https://api.github.com/users/";
    }

    async getGithubData(username) {
        const responseForUser = await fetch(this.url + username);
        const responseForRepo = await fetch(this.url + username + "/repos")
        
        const userData = await responseForUser.json();
        const repoData = await responseForRepo.json();

        return {
            user: userData,
            repo: repoData
        };
    }
}