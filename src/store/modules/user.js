import $bus from '@/main'

export default {
  state:{
    userInfo: {
      userName: null,
      userId: null,
      companyName: null,
      companyId: null
    },
  },
  getters: {
    getUserInfo(state){
      return state.userInfo
    }
  },
  mutations:{
    updateUserInfo(state, userInfo){
      state.userInfo = userInfo
    },
    updateUserId(state, id){
      state.userInfo.userId = id
      state.userInfo.userName = id=='1'?'Tom':id=='2'?'Jack':id=='3'?'Mike':''
      sessionStorage.setItem('userId',id)
    }
  },
  actions:{
    login({commit, state}, params){
      return new Promise((resolve, reject)=>{
        $bus.http
        .get($bus.apis.getcompanysbyuserid, {
          userId: params
        })
        .then(res => {
          let userInfo = {
            userId: params,
            userName: params=='1'?'Tom':params=='2'?'Jack':params=='3'?'Mike':''
          }
          res.data.forEach(i => {
            if(i.selected) {
              userInfo.companyName = i.companyName
              userInfo.companyId = i.id
            }
          })
          commit('updateUserInfo', userInfo)
          sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },

  }
}