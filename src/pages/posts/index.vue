<template>
  <div>
    <div id="wrapper">
      <!-- Sidebar -->
      <myAside @change="toggle" />
      <!-- Main -->
      <div id="main" :class="{ inactive: currentToggle }">
        <div class="inner">
          <!-- Header -->
          <MyHeader />
          <div class="article-content">
            <ContentRenderer :value="detail" />
          </div>
          <!-- Section -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { articlesInfo } from "@/store/articles";
import { ref } from "vue";
import publicMethos from "@/hooks/publicMethos";

export default defineComponent({
  async setup() {
    let { toggle, currentToggle, toDetail, title } = publicMethos();
    const useArticle = articlesInfo();
    const detail = ref();
    await useArticle.getAllArticle();
    detail.value = useArticle.filteredItems(title);
    return {
      toggle,
      currentToggle,
      toDetail,
      detail,
    };
  },
});
</script>
<style lang="less" scoped>
.article-content {
  margin: 40px;
}

article {
  width: 70%;
}

.user-card {
  width: 30%;
  font: 13px/23px "Raleway", Arial, sans-serif;
  color: #303336;
  padding: 40px 0;
}

.container {
  margin: 0 auto;
  width: 300px;
  height: 465px;
  background: white;
  border-radius: 3px;
  position: relative;
}

.information {
  text-align: center;
}

.avatar {
  margin: 0 auto;
  margin: -82px auto 15px;
  display: block;
}

.name {
  font-size: 22px;
}

.position {
  font-size: 16px;
  color: #8c98a8;
  margin-bottom: 24px;
}

.stats {
  margin: auto;
  border-top: 1px solid #ced5e0;
  width: 240px;
}

.stats .followers,
.stats .following,
.stats .stories {
  display: inline-block;
  padding: 6px 10px 0;
}

.stats .followers,
.stats .following {
  border-right: 1px solid #ced5e0;
}

.stats .value {
  font-size: 18px;
  font-weight: 600;
}

.stats .label {
  display: block;
  font-size: 14px;
  color: #8c98a8;
}

@media screen and (max-width:991px) {
  .article-content {
    margin: 40px auto;
  }
}
</style>
