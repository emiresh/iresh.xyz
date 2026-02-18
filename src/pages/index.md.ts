import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const markdownContent = `# Iresh Ekanayaka

DevOps & SRE Engineer passionate about Linux, cloud technologies, and automation.

## Navigation

- [About](/about.md)
- [Recent Posts](/posts.md)
- [Archives](/archives.md)
- [RSS Feed](/rss.xml)

## Links

- Twitter: [@IreshEk](https://twitter.com/IreshEk)
- GitHub: [@emiresh](https://github.com/emiresh)
- LinkedIn: [emiresh](https://www.linkedin.com/in/emiresh/)
- Email: ireshek@gmail.com

---

*This is the markdown-only version of iresh.xyz. Visit [iresh.xyz](https://iresh.xyz) for the full experience.*`;

  return new Response(markdownContent, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
