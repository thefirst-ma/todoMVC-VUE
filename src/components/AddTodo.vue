
<template>
  <header class="header">
    <h1>todos</h1>
    <input
      type="text"
      placeholder="what need to be done?"
      class="new-todo"
      v-model="text"
      @keyup.enter="add"
    />
  </header>
</template>
<script>
export default {
  name: "AddTodo",
  data() {
    return {
        text:""
    };
  },
  methods: {
    //添加一个小事件 利用自定义事件将值传给父组件
    add() {
      this.$emit("addTodo", { text:this.text, done:false });
      this.text =""
    },
    //添加一个事件设置 todos全部完成
    
  },
};
</script>
<style lang="less">
</style>