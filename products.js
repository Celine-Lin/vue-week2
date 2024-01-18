const { createApp } = Vue;

const app = createApp({
  data(){
    return {
      // config 設定
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      api_path: 'vue-week2',
      // 產品資料格式
      products: [],
      // 點擊事件的產品obj
      temp: {}
    }
  },
  methods: {
    checkLogin(){
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'index.html';
        })
    },
    getData(){
      const url = `${this.apiUrl}}/api/${this.api_path}/products/all`;
      axios.get(url)
        .then(res=>{
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        })
    }
  },
  mounted(){
    // 取得 Token（Token 僅需要設定一次）
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    // 預設把 token 加入 headers 裡
    axios.defaults.headers.common['Authorization'] = token;
    // 預設驗證登入
    this.checkLogin();
  }
});

app.mount('#app');