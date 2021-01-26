//向外面暴露自定义的模块
;export default{
    //把对象转化为JSONString 保存到localStorage
    save(obj){
        localStorage.setItem("todomvc",JSON.stringify(obj))
    },
    //从localStorage 获取JSONString 转化为JSON
    get(){
       let obj = JSON.parse(localStorage.getItem("todomvc")) 

       if(obj == null){
           return {
               todos:[],
               visibility:"all"
           }
       }else{
           return obj
       }
    }
}