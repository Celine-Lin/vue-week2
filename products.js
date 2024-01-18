const app = Vue.createApp({
  data(){
    return {
      // config 設定
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'vue-week2',
      // 產品資料格式
      products: [],
      // 點擊事件的產品obj
      temp: {}
    }
  },
  methods: {
    checkLogin(){
      axios.post(`${this.url}/api/user/check`)
        .then(() => {
          this.getData();
        })
        .catch(() => {
          alert('登入失敗');
          window.location = 'index.html';
        })
    },
    getData(){
      axios.get(`${this.url}}/api/${this.path}/admin/products`)
        .then(res=>{
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    }
  },
  mounted(){
    // 取得 Token（Token 僅需要設定一次）
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexVueToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 預設把 token 加入 headers 裡
    axios.defaults.headers.common['Authorization'] = token;
    // 預設驗證登入
    this.checkLogin();
  }
});

app.mount('#app');