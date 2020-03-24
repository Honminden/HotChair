import store from '../../store'

export default () =>{return {
    logOut () {
        if(store.state.token)
        {
            store.commit('logout');
        }
    }
};}