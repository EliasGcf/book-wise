<p align="center">
  <img src=".github/logo.svg">
</p>

<p align="center">
  <a href="LICENSE"><img alt="GitHub" src="https://img.shields.io/github/license/EliasGcf/book-wise?color=%239694F5"></a>
</p>

<p align="center">
  <a href="#-layout">Layout</a> •
  <a href="#-technologies">Technologies</a> •
  <a href="#-getting-started">Getting started</a> •
  <a href="#-license">License</a>
</p>

## 🔖 Layout

You can view the project layout through the link below:

<!-- TODO: Fix link -->
- [BookWise - Figma](https://www.figma.com/@rocketseat)

Remembering that you need to have a [Figma](http://figma.com) account to access it.

## 🚀 Technologies

- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/) (AppDir)
- [NextAuth](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Prisma](https://www.prisma.io/)

## 💻 Getting started

### Requirements

- [Node.js](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)
- [Docker & DockerCompose](https://docs.docker.com/)

**Clone the project and access the folder**

```bash
git clone https://github.com/EliasGcf/book-wise.git && cd book-wise
```

**Follow the steps below**

```bash
# Install the dependencies
$ pnpm install

# Make a copy of '.env.local.example' to '.env.local'
# and set with YOUR environment variables.
$ cp .env.local.example .env.local

# Start the database
$ docker compose up -d

# Start the application
$ pnpm run dev
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with 💜 by <a href="https://www.linkedin.com/in/eliasgcf/">Elias Gabriel</a>
</p>
