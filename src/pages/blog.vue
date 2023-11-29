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
          <header class="major major-info">
            <h2>博客列表</h2>
          </header>
          <div class="blog-box">
            <div class="posts">
              <!-- 获取生成所有的路由，使其在打包时，能够生成所有的静态页 -->
              <div style="display: none;">
                <nuxt-link v-for="_post in sortArticlesList" :to="`/posts/${_post.title}`"
                  :key="_post._id">阅读更多</nuxt-link>
              </div>
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
                  <li>
                    <nuxt-link :to="`/posts/${_post.title}`">阅读更多</nuxt-link>
                  </li>
                </ul>
              </article>
              <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="currentPage"
                :total="total" @current-change="handleCurrentChange" />
            </div>
            <div class="posts-tags">
              <el-tag disable-transitions typ v-for="_tags in  tagsArticlesList " :type="_tags.type" effect="dark"
                :key="_tags.tags" @click="handleTagClick(_tags.tags)">{{
                  _tags.tags }}</el-tag>
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
import { ref, computed, watch } from "vue"

export default defineComponent({
  async setup() {
    let { toggle, currentToggle, toDetail } = publicMethos();
    let articlesList = ref();
    const useArticle = articlesInfo();
    await useArticle.getAllArticle();
    articlesList.value = await useArticle.allArticle
    // 定义计算属性
    const sortArticlesList = computed(() => {
      // 在这里进行数据处理
      return articlesList.value.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    // 筛选出文章的tags标签
    const tagsArticlesList = computed(() => {
      const tagsObject = articlesList.value.reduce((result: any, item: any) => {
        item.tags.forEach((tag: string) => {
          result[tag] = { tags: tag, type: getRandomType() };
        });
        return result;
      }, {});

      function getRandomType() {
        const types = ['success', 'info', '', 'danger', 'warning'];
        const randomIndex = Math.floor(Math.random() * types.length);
        return types[randomIndex];
      }
      return tagsObject;
    });
    let total = ref(articlesList.value.length)
    let filterArticleList = ref(sortArticlesList.value) //筛选之后的文章，默认是所有
    const pageSize = ref(6)
    let currentPage = ref(1)
    let currentData = ref()
    // 分页的方法
    const computePagination = (articleData: any) => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return currentData.value = articleData.slice(start, end);
    };
    const handleCurrentChange = (val: number) => {
      currentPage.value = val;
    }
    // 点击标签筛选
    const handleTagClick = (value: string) => {
      // 使用 filter 方法筛选包含点击标签的数据项
      filterArticleList.value = sortArticlesList.value.filter((item: any) => {
        return item.tags.some((tag: any) => tag === value);
      });
      total.value = filterArticleList.value.length
      currentData.value = computePagination(filterArticleList.value);
    }
    // 使用 watch 监听 页码 的变化
    watch(currentPage, () => {
      currentData.value = computePagination(filterArticleList.value);
    });
    currentData.value = computePagination(filterArticleList.value);

    return {
      toggle,
      pageSize,
      currentPage,
      currentToggle,
      toDetail,
      total,
      currentData,
      tagsArticlesList,
      sortArticlesList,
      handleCurrentChange,
      handleTagClick
    };
  },
});
</script>
<style lang="less" scoped>
.blog-box {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: flex-start;

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

    li {
      &:hover {
        text-decoration: underline;
        color: #f56a6a;
      }
    }

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


  .posts-tags {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    gap: 16px;
    cursor: pointer;
    width: 20%;
    flex-wrap: wrap;
  }

}

@media screen and (max-width:991px) {
  .blog-box {
    flex-direction: column-reverse;

    .posts {
      width: 100%;
    }

    .posts-tags {
      width: 100%;
     justify-content: flex-start;
    }
  }
}
</style>
