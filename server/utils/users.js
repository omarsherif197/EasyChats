class Queue {
    constructor() {
      this.elements = {};
      this.head = 0;
      this.tail = 0;
    }
    enqueue(element) {
      this.elements[this.tail] = element;
      this.tail++;
    }
    dequeue() {
      const item = this.elements[this.head];
      delete this.elements[this.head];
      this.head++;
      return item;
    }
    peek() {
      return this.elements[this.head];
    }
    get length() {
      return this.tail - this.head;
    }
    get isEmpty() {
      return this.length === 0;
    }
  }

var users = {};

//Join user to chat
function userJoin(id, username, room){

    //const user = {id, username, room};
    if (username in users){
        users[username].id = id
    } else {
        users[username] = {
            username,
            id,
            room,
            q: new Queue()
        };
    }

    return users[username];
}

//get current user
function getCurrentUser(id){
    for (let user in users){
        if (users[user].id == id){
            return users[user]
        }
    }
    
}

//user leaves
function userLeave(id){
    todelete=null
    for (let user in users){
        if (users[user].id == id){
            todelete=users[user]
            delete users[user]
        }
        
    }
    
    return todelete
}

function getRoomUsers(room) {
    roomusrs = []
    for (let user in users){
        if (users[user].room == room){
            roomusrs.push(users[user])
        }
    }
    return roomusrs

}

function queuemsg(username, message){
        users[username].q.enqueue(message)
    return
}

function emptyqueue(user){
    users[user.username] = user
    return
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    queuemsg,
    emptyqueue
}