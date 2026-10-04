
//this file is used to s
const sessionIdToUserMap = new Map();

function setUSer(id, user){
    sessionIdToUserMap.set(id, user);
}

function getUser(id){
    return sessionIdtoUserMap.get(id);
}

module.exports = {
    setUser, getUser
};