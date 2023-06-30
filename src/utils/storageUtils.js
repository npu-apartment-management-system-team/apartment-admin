import store from 'store'
const USER_KEY = 'user_key';

export default {
    // 保存用户
    saveUser(user) {
        store.set(USER_KEY,user);// 登录成功的时候，读取用户数据并放在内存中
            // const user = result.data;
            // // memoryUtils.user = user;
            // storageUtils.saveUser(user);
    },

    // 读取用户
    getUser() {
        return store.get(USER_KEY) || {}
    },

    // 删除用户
    removeUser() {
        store.remove(USER_KEY);
    }
}