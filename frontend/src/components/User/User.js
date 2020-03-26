import store from '../../store'

export default function User()
{
    return {
        logOut () {
            if(store.state.token)
            {
                store.commit('logout');
            }
    }
};}