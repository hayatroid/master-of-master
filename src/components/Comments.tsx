import { GISCUS, SITE } from "../site.config";

const Comments = () => {
  return (
    <script
      src="https://giscus.app/client.js"
      data-repo={GISCUS.repo}
      data-repo-id={GISCUS.repoId}
      data-category={GISCUS.category}
      data-category-id={GISCUS.categoryId}
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme="light"
      data-lang={SITE.lang}
      data-loading="lazy"
      crossorigin="anonymous"
      async
    />
  );
};

export default Comments;
