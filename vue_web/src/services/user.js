import mainJson from '../documents/main.json'
export default class User {
    static id;
    static name = '';
    static UserLogin(userLogin, userPassword) {
        const user = mainJson.users.find(user => user.email === userLogin && user.password === userPassword);
        if(user){this.name = user.username; this.id = user.id}
        return user ? true : false; 
    }

    
    // static GetName(userId) {
    //     const user = mainJson.users.find(user => user.id === userId);
    //     return user ? user.username : null;
    // }

}