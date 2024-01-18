const app = Vue.createApp({
    data(){
        return{
            // config 設定
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'vue-week2',
            // axios login api: headers
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // 登入功能 login
        login(){
            axios
                .post(`${this.url}/admin/signin`, this.user)
                .then(res=>{
                    // #2-1 將 token 和 unix timstamp 存起來
                    const { token, expired} = res.data;
                    // #2-2 設定 cookie
                    document.cookie = `hexVueToken=${token}; expires=${new Date(expired)}; path=/`;
                    window.location = 'products.html';
                })
                .catch(err=>{err.response.data.message});
        },
    },
});

app.mount('#app');
