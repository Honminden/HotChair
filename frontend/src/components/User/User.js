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
            username: state.username,
            fullName: state.fullName,
            email: state.email,
            organization: state.organization,
            region: state.region
        }
    }
}