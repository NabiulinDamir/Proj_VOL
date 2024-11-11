import mainJson from '../documents/main.json'
export default class User {
    static id;
    static Login(userLogin, userPassword) {
        const user = mainJson.users.find(user => user.email === userLogin && user.password === userPassword);
        if(user){this.id = user.id}
        return user ? true : false; 
    }

    static Get_User_Name(){
        return this.id ? mainJson.users.find(user => user.id === this.id).username : null
    }

    static Get_Group_Id(){
        return this.id ? mainJson.users.find(user => user.id === this.id).group_id : null
    }

    static Get_Group_Name(){
        return this.id ? mainJson.groups.find(group => group.id == this.Get_Group_Id()).name : null
    }
    
    
    // static GetName(userId) {
    //     const user = mainJson.users.find(user => user.id === userId);
    //     return user ? user.username : null;
    // }

}