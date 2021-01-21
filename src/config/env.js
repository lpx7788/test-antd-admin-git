// 配置编译环境和线上环境之间的切换
let baseUrl = "";

const env = process.env;

// 开发环境地址
if (env.NODE_ENV == "development") {
  baseUrl = {
    apiHostName: "http://192.168.230:8080/"
  };
}
//生产环境地址
else if (env.NODE_ENV == "production") {
  baseUrl = {
    apiHostName: "http://192.168.230:8080/"
  };
}
//测试环境地址
else if (env.NODE_ENV == "test") {
  baseUrl = {
    apiHostName: "http://192.168.230:8080/"
  };
}

module.exports = {
  baseUrl
};
