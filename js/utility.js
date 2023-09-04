export default class {
    static addLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    static removeFromLocalStorage(key) {
        localStorage.removeItem(key)
    }

    static readLocalStorage(key) {
        return JSON.parse(localStorage.getItem(key))
    }
}