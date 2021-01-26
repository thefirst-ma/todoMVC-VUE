<template>
    <!-- 利用v-bind绑定class类 来改变li的样式信息 -->
  <li class="todo" :class="{completed:todo.done,editing:isEdit}">

    <div class="view">
      <input type="checkbox" class="toggle" :checked="todo.done" @click="toggletodo(todo)"/>
      <label @dblclick="changeEdit" >{{todo.text}}</label>
      <!-- 在子组件的模板中使用接收到的父组件中定义的方法 -->
      <button class="destroy" @click="deltodo(todo)"></button>
    </div>
    <input type="text" 
            :value="todo.text" 
            class="edit" 
            style="display: none" 
            v-show="isEdit" 
            @keyup.enter="finishEdit(todo)"
            @blur="finishEdit(todo)"
            ref="content"/>
  </li>
</template>

<script>
export default {
  name: "ListTodo",
  data(){
    return{
      //默认不处于编辑状态
      isEdit:false
    }
  },
  
  props: {//利用自定义属性接收父组件中传来的数据
    todo: {
      type: Object,
      require: true,
    },
    //接收父组件传来的删除一个todo的方法
    deltodo:{
        type:Function
        // require:true
    },
    //修改一个todo的样式
    toggletodo:{
        type:Function
    },
    //接收父组件编辑todo方法
    editTodo:{
      type:Function
    }
  },
  methods:{
    //改变编辑款框的状态
    changeEdit(){
      this.isEdit = !this.isEdit
    },
    //结束编辑 将数据传给父组件
    finishEdit(todo){
      //this.$refs.content 获取dom元素
      let newText= this.$refs.content.value.trim()
      //调用父组件的editTodo
      this.editTodo({todo,txt:newText})
      //改变编辑框
      this.isEdit = false
    }
  },
};
</script>

<style lang="less" scoped>
</style>
