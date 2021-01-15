const userID  = require('shortid');  

let users = [
    {
        id: userID.generate(),
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
        created_at:" Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)", // Date, defaults to current date
        updated_at: "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) "// Date, defaults to current date
      }
]


module.exports = {
    findAll(){
        // SELECT * FROM users
        return Promise.resolve(users)
    },
    findById(id) {
        // SELECT * FROM dogs WHERE id = 1;
        const user = users.find(u => u.id === id)
        return Promise.resolve(user)
      }
,
    create( name,bio ){
        const newUser = {id:userID.generate(),name:name,bio:bio,
            created_at:Date(),updated_at:null};

        return Promise.resolve(newUser);
    },
    
    delete(id){
        // DELETE FROM users WHERE id = 1
        const user = Users.find(user => user.id === id);
        if (!user)
            return Promise.resolve(null)
        users = users.filter(u => u.id !== id);
        return Promise.resolve(user)
    },
    update(id, changes){
        const user = users.find(user => user.id === id)
        if(!user) return Promise.resolve(null);

        const updatedUser = {...changes,id}
        users = users.map( u =>(u.id === id ? updatedUser : u))
        return Promise.resolve(updatedUser)
    }
}