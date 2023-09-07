import gitUser from "./gitUser.js"
import utility from './utility.js'

export class favorite {
    constructor () {
        this.entries = utility.readLocalStorage('users') ?? []
        this.update()
        this.add()
    }

    async add () {
        document.querySelector('.searchUser button').addEventListener('click', async () => {
            try{
                const inputValue = document.querySelector('.searchUser input').value
        
                const user = await gitUser.search(inputValue)

                if (user.login === undefined) {
                    throw new Error('Usuário não encontrado')
                }

                if (this.entries.find(entry => entry.login === user.login)) {
                    alert('Usuário já cadastrado')
                    return
                }

                this.entries = [user, ...this.entries]
                user.id = this.entries.length
                
                utility.addLocalStorage('users', this.entries)

                this.update()

            } catch(error) {
                alert(error.message)
            }
        })
    }

    removeOption () {
        const users = utility.readLocalStorage('users')
        let contador = 0

        for(const user of users) {
            document.getElementById(`remove-user-${user.id}`).addEventListener('click', () => {
                this.entries = this.entries.filter(object => object.login !== user.login)
                this.entries.forEach(element => {
                    ++contador
                    element.id = contador
                })

                utility.removeFromLocalStorage('users')
                utility.addLocalStorage('users', this.entries)
                this.update()
            })
        }
    }

    update() {
        document.querySelector('tbody').innerHTML = ''
        const users = utility.readLocalStorage('users') ?? []

        if(users.length >= 1) {
            document.querySelector('.no-favorites').style.display = 'none'

            users.forEach(user => {
                this.trHTML =   `
                                    <tr>
                                        <td class="user">
                                            <img src="https://github.com/${user.login}.png" alt="">
                                            <a href="https://github.com/${user.login}" target="_blank">
                                                <p>${user.name}</p>
                                                <span>/${user.login}</span>
                                            </a>
                                        </td>
                                        <td class="repositories">
                                            ${user.public_repos}
                                        </td>
                                        <td class="followers">
                                            ${user.followers}
                                        </td>
                                        <td class="remove">
                                            <button id='remove-user-${user.id}'>Remover</button>
                                        </td>
                                    </tr>
                                `          
    
                document.querySelector('tbody').innerHTML += this.trHTML
            })
            this.removeOption()
            
        } else {
            document.querySelector('.no-favorites').style.display = 'flex'
        }
    }
}