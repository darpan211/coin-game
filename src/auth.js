const auth = () => {
    const users = localStorage.getItem('user');
    if (users) {
        return true;
    } else {
        return false;
    }
}

export default auth;