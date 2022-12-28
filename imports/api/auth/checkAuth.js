const checkAuth = (user, role) => {
    if(!user) throw 'not login!!'
    if(user.profile.role !== role) throw 'not authorized';
}

export default checkAuth;