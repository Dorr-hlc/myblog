<template>
  <div>
    <div id="sidebar" :class="{ inactive: selectedNavItem }">
      <div class="inner">
        <!-- Search -->
        <section id="search" class="alt">
          <form method="post" action="#">
            <input type="text" name="query" id="query" placeholder="搜索" />
          </form>
        </section>

        <!-- Menu -->
        <nav id="menu">
          <header class="major">
            <h2>菜单</h2>
          </header>
          <ul>
            <li>
              <nuxt-link to="/">主页</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/blog">blog</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/tour">旅游</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/life">生活</nuxt-link>
            </li>
          </ul>
        </nav>

        <section>
          <ul class="contact">
            <li class="icon solid fa-envelope">1726660621@qq.com</li>
            <li class="icon solid fa-phone">17380127492</li>
            <li class="icon solid fa-home">四川省成都市水碾河</li>
          </ul>
        </section>

        <!-- Footer -->
        <footer id="footer">
          <p class="copyright">@版权所有-HLC的个人博客，记录生活，成长学习</p>
        </footer>
      </div>
      <nuxt-link to="javascript:;" class="toggle" @click="toggleAside">Toggle</nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
let selectedNavItem = ref(false);
const emit = defineEmits();
let toggleAside = () => {
  selectedNavItem.value = !selectedNavItem.value;
  emit("change", selectedNavItem);
};


</script>

<style lang="less" scoped></style>
