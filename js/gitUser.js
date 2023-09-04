export default class gitUser {
    static async search(username) {
        const endpoint = `https:api.github.com/users/${username}`

        return fetch(endpoint)
        .then(user => user.json())
        .then((data) => 
        ({
            login: data.login,
            name: data.name,
            public_repos: data.public_repos,
            followers: data.followers
        })
        )
    }
} 
    