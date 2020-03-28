import store from '../../store'

export default
{
    isLogined()
    {
        return (store.state.token != null);
    },
    login(user)
    {
        if(!this.isLogined)
        {
            store.commit('login', user);
        }
    },
    logout ()
    {
        if(this.isLogined)
        {
            store.commit('logout');
        }
    }
}