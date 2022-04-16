export const getLocalStorage = () => {
    const list = localStorage.getItem('list')

    if (list) {
        return JSON.parse(localStorage.getItem('list'))
    } else {
        return []
    }
}