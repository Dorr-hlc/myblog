<template>
  <div id="wrapper">
    <!-- Sidebar -->
    <myAside @change="toggle" />
    <!-- Main -->
    <div id="main" :class="{ inactive: currentToggle }">
      <div class="inner">
        <!-- Header -->
        <MyHeader />
        <!-- Section -->
        <section>
          <header class="major">
            <h2>博客列表</h2>
          </header>
          <div class="blog-box">
            <div class="posts">
              <article v-for="_post in currentData" :key="_post._id">
                <div class="info">
                  <div class="time">
                    <span class="post-time">{{ new Date(_post.date).toLocaleDateString() }}</span>
                    <span class="post-year"></span>
                  </div>

                  <h3>{{ _post.title }}</h3>
                </div>

                <p class="desc">
                  {{ _post.description }}
                </p>

                <ul class="actions">
                  <li @click="toDetail(_post.title)">阅读更多</li>
                </ul>
              </article>
              <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="currentPage"
                :total="total" @current-change="handleCurrentChange" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { articlesInfo } from "@/store/articles";
import publicMethos from "@/hooks/publicMethos";

export default defineComponent({
  async setup() {
    let { toggle, currentToggle, toDetail } = publicMethos();
    let articlesList = ref();
    const useArticle = articlesInfo();
    await useArticle.getAllArticle();
    articlesList.value = await useArticle.allArticle;
    const total = ref(articlesList.value.length)
    const pageSize = ref(8)
    const currentPage = ref(1)
    const currentData = ref()
    const computePagination = () => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return currentData.value = articlesList.value.slice(start, end);
    };
    const handleCurrentChange = (val: number) => {
      currentPage.value = val;
      currentData.value = computePagination();
    }

    currentData.value = computePagination();
    
    return {
      toggle,
      pageSize,
      currentPage,
      currentToggle,
      toDetail,
      total,
      currentData,
      handleCurrentChange,
    };
  },
});
</script>
<style lang="less" scoped>
.blog-box {
  display: flex;
  align-items: center;

  article {
    position: relative;
    width: 100%;
    background: #fff;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    padding: 24px;

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    &::before {
      position: absolute;
      left: 0px;
      top: 0px;
      content: "";
      display: inline-block;
      width: 6px;
      height: 100%;
      background: #f56a6a;
      border-radius: 10px 0 0 10px;
    }

    &::after {
      content: none;
    }
  }

  ul.actions {
    justify-content: flex-end;
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #000;

    h3 {
      margin: 0px;
    }

    .time {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #f56a6a;
      color: #fff;
      font-size: 16px;
      line-height: 1;
      font-weight: 600;
      border-radius: 4px;
      padding: 2px 5px;
      margin-right: 10px;

      span {
        display: inline-block;
      }

      .post-year {
        font-size: 14px;
      }
    }
  }

  .desc {
    margin: 30px 0;
  }

  .posts {
    width: 80%;
  }

  @media screen and (max-width:991px) {
    .posts {
      width: 100%;
    }
  }
}
</style>
