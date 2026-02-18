# Iresh Ekanayaka's Personal Website

This is the source code for my personal website, built with [Astro](https://astro.build) and deployed on [Vercel](https://vercel.com).

## About

I'm Iresh Ekanayaka, a DevOps & SRE Engineer with experience at companies like NEXT, Sysco LABS, Wiley (John Wiley & Sons), and HCL Tech. I'm passionate about Linux, cloud technologies (AWS, Azure), infrastructure automation (Terraform, Ansible), container orchestration (Kubernetes, OpenShift), and monitoring solutions (Dynatrace, Prometheus, Grafana).

Currently pursuing a Master of Information Security (MIS) at University of Colombo School of Computing, I share knowledge through blogs, community events, and technical presentations. This website hosts my personal blog where I write about DevOps practices, SRE principles, Linux system administration, and cloud infrastructure.

## Project Structure

```text
├── public/               # Static assets (images, fonts, favicon)
│   ├── assets/          # Images for blog posts
│   └── fonts/           # Web fonts
├── src/
│   ├── assets/          # Icons and images used in components
│   ├── components/      # Reusable UI components
│   │   └── ui/          # React components
│   ├── content/         # Content collections
│   │   └── blog/        # Blog posts in Markdown format (organized by year)
│   ├── layouts/         # Page layouts and templates
│   ├── pages/           # Routes and pages
│   ├── styles/          # Global styles and CSS
│   └── utils/           # Utility functions
├── astro.config.mjs     # Astro configuration
├── vercel.json          # Vercel deployment and CSP configuration
├── package.json         # Project dependencies and scripts
├── tailwind.config.mjs  # Tailwind CSS configuration
└── LICENSE              # Dual license (CC BY 4.0 + MIT)
```

## Commands

| Command                | Action                                      |
| :--------------------- | :------------------------------------------ |
| `npm install`          | Installs dependencies                       |
| `npm run dev`          | Starts local dev server at `localhost:4321` |
| `npm run build`        | Build the production site to `./dist/`      |
| `npm run preview`      | Preview the build locally, before deploying |

## Deployment

This site is set up for easy deployment on Vercel. Just connect your GitHub repository to Vercel, and it will automatically build and deploy the site when changes are pushed.

## License

This repository uses dual licensing:

- **Documentation & Blog Posts**: Licensed under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/)
- **Code & Code Snippets**: Licensed under the [MIT License](LICENSE)

## Credits

This site is based on the excellent [steipete.me](https://github.com/steipete/steipete.me) template by Peter Steinberger, used under the MIT License.

See the [LICENSE](LICENSE) file for full details.

## Special Thanks

Special thanks to [Sat Naing](https://github.com/satnaing) for creating the excellent [AstroPaper theme](https://astro-paper.pages.dev/) that served as the foundation for this website. Their thoughtful design and clean architecture made it a joy to build upon.
