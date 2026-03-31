export const sessionStore = {
    save: (key, data) => sessionStorage.setItem(key, JSON.stringify(data)),
    get: (key) => JSON.parse(sessionStorage.getItem(key)),
    remove: (key) => sessionStorage.removeItem(key)
};