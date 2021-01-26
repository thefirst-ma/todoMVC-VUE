<template>
  <div id="app">
    <section class="todoapp">
      <AddTodo @addTodo="addlist"></AddTodo>
      <section class="main" style="">
        <input
          type="checkbox"
          class="toggle-all"
          :checked="isAlldone"
          @click="toggleAlltodo(!isAlldone)"
        />
        <ul class="todo-list">
          <!-- 利用Vue中的v-for 指令循环出全部数据 -->
          <!-- 利用ListTodo 中的自定义属性 接收父组件中传递来的数据 -->
          <!-- 利用ListTodo 中的自定义属性deltodo 接收父组件中传递来的方法 -->
          <ListTodo
            v-for="(item, index) in filtertodos"
            :todo="item"
            :deltodo="deltodo"
            :toggletodo="toggletodo"
            :editTodo="editTodo"
          ></ListTodo>
          <!-- <li class="todo completed">
						<div class="view">
							<input type="checkbox" class="toggle"> 
							<label>react</label> 
							<button class="destroy"></button>
						</div> 
						<input type="text" class="edit" style="display: none;">
					</li> -->
        </ul>
      </section>
      <footer class="footer" style="">
        <span class="todo-count"
          ><strong>{{ unDoneNumber }}</strong> items left</span
        >
        <ul class="filters">
          <li>
            <a
              href=""
              :class="{ selected: visibility == 'all' }"
              @click.prevent="changevisibility('all')"
              >all</a
            >
          </li>
          <li>
            <a
              href=""
              :class="{ selected: visibility == 'active' }"
              @click.prevent="changevisibility('active')"
              >active</a
            >
          </li>
          <li>
            <a
              href=""
              :class="{ selected: visibility == 'completed' }"
              @click.prevent="changevisibility('completed')"
              >completed</a
            >
          </li>
        </ul>
        <button
          class="clear-completed"
          @click="deldonetodo"
          v-show="todos.length > unDoneNumber"
        >
          clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
require("./assets/todo-mvc.css"); //引入自定义的样式
import ListTodo from "./components/ListTodo"; //导入自定义的组件
import AddTodo from "./components/AddTodo";
import localStorage from "./utils/localStorage"; //导入自定义的工具类

export default {
  name: "App",
  data() {
    //自定义数据

    return localStorage.get();
    //标志位
    // flag:false,
    // //基本数据
    // todos:[
    //   {text:"学习王者",done:false},
    //   {text:"学习LOL",done:false},
    //   {text:"学习QQ飞车",done:false},
    //   {text:"学习Vue",done:false},
    // ],
    // // 定义是否显示全部的数据
    // visibility:"all",
  },
  methods: {
    //接收子组件传递的数据 添加到todos中
    addlist(todo) {
      this.todos.push(todo); //把接收到的todo插入数据list
    },
    //删除一个todo
    deltodo(todo) {
      //先查找这个todo是否存在于todos中 如果存在返回索引值
      let index = this.todos.findIndex((item) => item == todo);
      console.log(index);
      if (index != -1) {
        // 根据索引值删除通道
        this.todos.splice(index, 1);
      }
    },
    //修改一个todo的样式
    toggletodo(todo) {
      let index = this.todos.findIndex((item) => item == todo);
      if (index != -1) {
        this.todos[index].done = !todo.done;
      }
    },
    //修改全部的todo样式
    toggleAlltodo(done) {
      this.todos.forEach((element) => {
        element.done = done;
      });
    },
    //删除已完成的全部todo
    deldonetodo() {
      let arr = this.todos.filter((item) => item.done == false);
      console.log(arr);
      this.todos = arr;
    },
    //改变todos的显示
    changevisibility(e) {
      this.visibility = e;
    },
    //定义编辑方法 传给子组件
    editTodo(obj) {
      //仅修改了当前输入框里的文字样式 没有改变data中的数据
      // obj.todo.text = obj.txt
      let index = this.todos.findIndex((item) => item == obj.todo);
      console.log(index);
      this.todos[index].text = obj.txt;
    },
  },
  computed: {
    //计算属性在使用是可以看做是一个数据
    //判断全部的数据是否已经完成 是返回true
    isAlldone() {
      return this.todos.every((item) => item.done == true);
    },
    // 计算未完成的todo
    unDoneNumber() {
      let num = 0;
      this.todos.forEach((item) => {
        if (item.done == false) {
          num++;
        }
      });
      return num;
    },
    //当点击按钮时,动态计算todos的状态
    filtertodos() {
      if (this.visibility == "all") {
        return this.todos;
      } else if (this.visibility == "active") {
        let arr = this.todos.filter((item) => item.done == false);
        return arr;
      } else if (this.visibility == "completed") {
        let arr = this.todos.filter((item) => item.done == true);
        return arr;
      }
    },
  },
  watch: {
    todos:{
      deep:true,
      handler() {
        localStorage.save({ todos: this.todos, visibility: this.visibility });
      },
    },
    visibility() {
      localStorage.save({ todos: this.todos, visibility: this.visibility });
    },
  },
  components: {
    ListTodo, //挂载自定义的列表组件 到根组件上面
    AddTodo, //添加自定义的添加组件
  },
};
</script>

<style lang="less">
</style>
