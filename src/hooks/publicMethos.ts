import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
export default function () {
  let currentToggle: any = ref(false);
  const toggle: any = () => {
    currentToggle.value = !currentToggle.value;
  };
  const router = useRouter();
  const route = useRoute();
  const { title } = route.query;
  // 使用content插件查询最近的3条文章
  async function getArticlesList() {
    return await queryContent("/articles")
      .sort({ date: 1 })
      .limit(3)
      .find();
  }
  async function getAllArticlesList() {
    return await queryContent("/articles").find();
  }
  const toDetail: any = (item: any) => {
    router.push({
      path: "/posts",
      query: {
        title: item,
      },
    });
  };
  
  return {
    toggle,
    getArticlesList,
    getAllArticlesList,
    toDetail,
    currentToggle,
    title
  }
}
