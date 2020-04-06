import store from '../../store'

export default class User
{
    isLogined()
    {
        return (store.state.token != null);
    }

    login(user)
    {
        if(!this.isLogined)
        {
            store.commit('login', user);
        }
    }

    logout ()
    {
        if(this.isLogined)
        {
            store.commit('logout');
        }
    }

    getUserInfo()
    {
        return {
            username: store.state.username,
            fullName: store.state.fullName,
            email: store.state.email,
            organization: store.state.organization,
            region: store.state.region
        }
    }

    isAdmin()
    {
        return (this.getUserInfo().username === "admin");
    }
}