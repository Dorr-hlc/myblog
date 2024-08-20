<template>
  <div id="wrapper">
    <!-- Sidebar -->

    <MyAside @change="toggle"></MyAside>
    <!-- Main -->
    <div id="main" :class="{ inactive: currentToggle }">
      <div class="inner">
        <!-- Header -->
        <MyHeader></MyHeader>
        <!-- Banner -->
        <section id="banner">
          <div class="content" data-aos="fade-right" data-aos-duration="800">
            <header>
              <h1>
                嗨咯，欢迎来到<br />
                Hlc的个人站点
              </h1>
              <p>记录工作，生活的个人网站</p>
            </header>
            <p>
              作为一名web前端开发人员，我负责构建和维护网站和应用程序。我有扎实的HTML、CSS和JavaScript编程技能，能够将设计师提供的设计转化为交互性强、易于使用的网站和应用程序。
              能够根据项目需求选择合适的工具。我了解响应式设计和移动优先设计的原则，并能够开发适用于各种设备和屏幕大小的网站和应用程序。
              我也了解后端开发，熟悉Node.js和Express框架，能够与后端开发人员合作构建完整的应用程序。我了解数据库设计和管理，能够使用MySQL和MongoDB等数据库管理工具。
              我注重代码质量和可维护性，熟悉版本控制工具，例如Git和SVN，能够使用这些工具进行协作开发。
            </p>
            <!-- <ul class="actions">
              <li>
                <NuxtLink to="#" class="button big">了解更多</NuxtLink>
              </li>
            </ul> -->
          </div>
          <span class="image object" data-aos="fade-up" data-aos-duration="800">
            <img src="~assets/images/pexels-kevin-bidwell-2042281.jpg" alt="" />
          </span>
        </section>
        <!-- Section -->
        <section>
          <header class="major">
            <h2>关于我</h2>
          </header>
          <div class="features">
            <article data-aos="fade-right" data-aos-duration="800">
              <span class="icon fa-gem"></span>
              <div class="content">
                <h3>用户体验设计</h3>
                <p>
                  我非常注重用户体验设计，通过仔细考虑用户需求和习惯，我可以优化您的网站，使其更加易于使用和可访问，从而提高用户的满意度和忠诚度。
                </p>
              </div>
            </article>
            <article data-aos="fade-right" data-aos-duration="1200">
              <span class="icon solid fa-paper-plane"></span>
              <div class="content">
                <h3>技术栈广泛</h3>
                <p>
                  我拥有多年的前端开发经验，熟练掌握HTML、CSS、JavaScript等多种技术，并且不断学习和掌握最新的技术和趋势，因此可以将我的广泛技术栈作为我的优势来展示我的全面性和专业性。
                </p>
              </div>
            </article>
            <article data-aos="fade-right" data-aos-duration="1400">
              <span class="icon solid fa-rocket"></span>
              <div class="content">
                <h3>协作能力</h3>
                <p>
                  我拥有很强的协作能力，与其他团队成员如设计师、后端工程师等等紧密合作，我了解如何与他人合作，提供建设性的反馈，促进项目进展，并确保项目成功完成。
                </p>
              </div>
            </article>
            <article data-aos="fade-right" data-aos-duration="1600">
              <span class="icon solid fa-signal"></span>
              <div class="content">
                <h3>持续学习</h3>
                <p>
                  作为前端开发人员，我始终保持学习的状态，并随时掌握最新的技术和趋势。我了解学习新技能的重要性，因此我将我的持续学习能力作为我的优势，展示我的学习能力和适应能力。
                </p>
              </div>
            </article>
          </div>
        </section>

        <!-- Section -->
        <section>
          <header class="major">
            <h2>最新博客</h2>
          </header>
          <div class="posts">
            <article data-aos="fade-up" data-aos-duration="800" v-for="article in articlesList" :key="article._path">
              <a href="#" class="image"><img src="~assets/images/pexels-andrea-davis-3653849.jpg" alt="" /></a>
              <h3>{{ article.title }}</h3>
              <p>
                {{ article.description }}
              </p>
              <ul class="actions">
                <li>
                  <div @click="toDetail(article.title)" class="button">
                    更多
                  </div>
                </li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { articlesInfo } from "@/store/articles";
import publicMethos from "@/hooks/publicMethos";
import clickEffect from "@/assets/js/Click"
import { onMounted } from "vue";
export default defineComponent({
  async setup() {
    let { toggle, currentToggle, toDetail } = publicMethos();
    onMounted(() => {
      clickEffect()
    })
    const articlesList = ref();
    const useArticle = articlesInfo();
    await useArticle.getRecentArticle();
    articlesList.value = await useArticle.recentArticle;
    return {
      articlesList,
      toggle,
      currentToggle,
      toDetail,
    };
  },


});
</script>

<style lang="less" scoped>
.posts {
  flex-direction: row;
}

article {
  margin: 0 6em 0 0;
}

#banner p {
  line-height: 40px;
  font-size: 20px;
}

.features {
  gap: 40px;
  justify-content: center;

  article {
    margin: 0px;
  }
}

@media screen and (max-width:991px) {
  #banner p {
  line-height: 40px;
  font-size: 14px;
}
  .posts {
    width: 100%;
    margin: auto;
    flex-direction: column;
    gap: 40px;
    article {
      margin: 0px;
      width: 100%;
   

      &::before {
        content: none;
      }
    }
  }
}
</style>
