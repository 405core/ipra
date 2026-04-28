import { defineConfig, type DefaultTheme } from 'vitepress';
import { fileURLToPath } from 'node:url';
import { posix } from 'node:path';
import { readdirSync, readFileSync, statSync } from 'node:fs';

type FrontmatterMeta = {
  title?: string;
  description?: string;
  order?: number;
};

type PageMeta = {
  relativePath: string;
  directoryPath: string;
  fileName: string;
  isIndex: boolean;
  title: string;
  description: string;
  order?: number;
  link: string;
};

type SectionNode = {
  directoryPath: string;
  segment: string;
  indexPage?: PageMeta;
  pages: PageMeta[];
  children: SectionNode[];
  title: string;
  description: string;
  order?: number;
};

const docsRoot = fileURLToPath(new URL('../', import.meta.url));
const ignoredDirectories = new Set(['.vitepress', '.git', 'node_modules', 'public']);
const siteBase = process.env.DOCS_BASE ?? '/';

const rootSection = buildContentTree(collectMarkdownPages(docsRoot));
const nav = buildNav(rootSection);
const sidebar = buildSidebar(rootSection);

export default defineConfig({
  title: 'IPRA 知识库',
  description: '项目文档、协作规范与实施知识的可视化入口。',
  lang: 'zh-CN',
  base: siteBase,
  srcDir: '.',
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,
  head: [
    ['meta', { name: 'theme-color', content: '#f3f0e7' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'IPRA 知识库' }],
  ],
  markdown: {
    config(markdownIt) {
      const originalFence = markdownIt.renderer.rules.fence?.bind(markdownIt.renderer.rules);

      markdownIt.renderer.rules.fence = (tokens, index, options, env, self) => {
        const token = tokens[index];
        const language = token.info.trim();

        if (language === 'mermaid' || language === 'mmd') {
          return `<MermaidBlock id="mermaid-${index}" graph="${encodeURIComponent(token.content)}" />`;
        }

        if (originalFence) {
          return originalFence(tokens, index, options, env, self);
        }

        return self.renderToken(tokens, index, options);
      };
    },
  },
  themeConfig: {
    logo: {
      src: '/ipra-mark.svg',
      alt: 'IPRA 知识库',
    },
    nav,
    sidebar,
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '重置搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到结果',
                footer: {
                  selectText: '选择',
                  selectKeyAriaLabel: '回车键',
                  navigateText: '切换',
                  navigateUpKeyAriaLabel: '上方向键',
                  navigateDownKeyAriaLabel: '下方向键',
                  closeText: '关闭',
                  closeKeyAriaLabel: 'Esc 键',
                },
              },
            },
          },
        },
      },
    },
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '最近更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
    sidebarMenuLabel: '文档导航',
    returnToTopLabel: '返回顶部',
    darkModeSwitchLabel: '主题切换',
    lightModeSwitchTitle: '浅色模式',
    darkModeSwitchTitle: '深色模式',
  },
});

function collectMarkdownPages(rootDirectory: string): PageMeta[] {
  const markdownFiles = walkMarkdownFiles(rootDirectory)
    .filter((filePath) => filePath.endsWith('.md'))
    .sort((left, right) =>
      toPosixRelative(left).localeCompare(toPosixRelative(right), 'zh-Hans-CN')
    );

  return markdownFiles.map((filePath) => {
    const source = readFileSync(filePath, 'utf8');
    const relativePath = toPosixRelative(filePath);
    const directoryPath = posix.dirname(relativePath) === '.' ? '' : posix.dirname(relativePath);
    const fileName = posix.basename(relativePath, '.md');
    const isIndex = fileName === 'index';
    const frontmatter = parseFrontmatter(source);
    const body = stripFrontmatter(source);
    const headingTitle = extractFirstHeading(body);

    const title =
      frontmatter.title ??
      headingTitle ??
      humanizeSegment(isIndex ? posix.basename(directoryPath) || '首页' : fileName);

    return {
      relativePath,
      directoryPath,
      fileName,
      isIndex,
      title,
      description: frontmatter.description ?? '',
      order: frontmatter.order,
      link: toPageLink(relativePath, isIndex),
    };
  });
}

function buildContentTree(pages: PageMeta[]): SectionNode {
  const rootNode = createSectionNode('');

  for (const page of pages) {
    const section = ensureSection(rootNode, page.directoryPath);

    if (page.isIndex) {
      section.indexPage = page;
      continue;
    }

    section.pages.push(page);
  }

  decorateSection(rootNode);
  sortSection(rootNode);
  return rootNode;
}

function createSectionNode(directoryPath: string): SectionNode {
  return {
    directoryPath,
    segment: directoryPath ? posix.basename(directoryPath) : '',
    pages: [],
    children: [],
    title: directoryPath ? humanizeSegment(posix.basename(directoryPath)) : '知识库',
    description: '',
  };
}

function ensureSection(rootNode: SectionNode, directoryPath: string): SectionNode {
  if (!directoryPath) {
    return rootNode;
  }

  const segments = directoryPath.split('/');
  let currentNode = rootNode;
  let currentPath = '';

  for (const segment of segments) {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    let child = currentNode.children.find((entry) => entry.directoryPath === currentPath);

    if (!child) {
      child = createSectionNode(currentPath);
      currentNode.children.push(child);
    }

    currentNode = child;
  }

  return currentNode;
}

function decorateSection(section: SectionNode): void {
  if (section.indexPage) {
    section.title = section.indexPage.title;
    section.description = section.indexPage.description;
    section.order = section.indexPage.order;
  }

  for (const child of section.children) {
    decorateSection(child);
  }
}

function sortSection(section: SectionNode): void {
  section.pages.sort(compareByOrderAndTitle);
  section.children.sort((left, right) => {
    const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.title.localeCompare(right.title, 'zh-Hans-CN');
  });

  for (const child of section.children) {
    sortSection(child);
  }
}

function buildNav(rootNode: SectionNode): DefaultTheme.NavItem[] {
  const navItems: DefaultTheme.NavItem[] = [{ text: '首页', link: '/' }];

  for (const page of rootNode.pages) {
    navItems.push({
      text: page.title,
      link: page.link,
      activeMatch: `^${escapeForActiveMatch(page.link)}`,
    });
  }

  for (const section of rootNode.children) {
    const landingLink = findSectionLanding(section);

    if (!landingLink) {
      continue;
    }

    navItems.push({
      text: section.title,
      link: landingLink,
      activeMatch: `^${escapeForActiveMatch(landingLink)}`,
    });
  }

  return navItems;
}

function buildSidebar(rootNode: SectionNode): DefaultTheme.SidebarItem[] {
  const sidebarItems: DefaultTheme.SidebarItem[] = [];

  if (rootNode.pages.length > 0) {
    sidebarItems.push({
      text: '项目总览',
      items: rootNode.pages.map((page) => ({
        text: page.title,
        link: page.link,
      })),
    });
  }

  for (const section of rootNode.children) {
    sidebarItems.push(toSidebarItem(section, 0));
  }

  return sidebarItems;
}

function toSidebarItem(section: SectionNode, depth: number): DefaultTheme.SidebarItem {
  const landingLink = findSectionLanding(section);
  const items: DefaultTheme.SidebarItem[] = [
    ...section.pages.map((page) => ({
      text: page.title,
      link: page.link,
    })),
    ...section.children.map((child) => toSidebarItem(child, depth + 1)),
  ];

  if (items.length === 0) {
    return {
      text: section.title,
      link: landingLink,
    };
  }

  return {
    text: section.title,
    link: landingLink,
    collapsed: depth > 0,
    items,
  };
}

function findSectionLanding(section: SectionNode): string {
  if (section.indexPage) {
    return section.indexPage.link;
  }

  if (section.pages.length > 0) {
    return section.pages[0].link;
  }

  for (const child of section.children) {
    const link = findSectionLanding(child);

    if (link) {
      return link;
    }
  }

  return '/';
}

function compareByOrderAndTitle(left: PageMeta, right: PageMeta): number {
  const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
  const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

  if (leftOrder !== rightOrder) {
    return leftOrder - rightOrder;
  }

  return left.title.localeCompare(right.title, 'zh-Hans-CN');
}

function walkMarkdownFiles(directoryPath: string): string[] {
  const files: string[] = [];

  for (const entry of readdirSync(directoryPath)) {
    if (ignoredDirectories.has(entry)) {
      continue;
    }

    const absolutePath = posix.join(directoryPath, entry);
    const stats = statSync(absolutePath);

    if (stats.isDirectory()) {
      files.push(...walkMarkdownFiles(absolutePath));
      continue;
    }

    if (stats.isFile() && entry.endsWith('.md')) {
      files.push(absolutePath);
    }
  }

  return files;
}

function parseFrontmatter(source: string): FrontmatterMeta {
  const frontmatterBlock = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!frontmatterBlock) {
    return {};
  }

  const result: FrontmatterMeta = {};

  for (const line of frontmatterBlock[1].split(/\r?\n/)) {
    const pair = line.match(/^\s*([A-Za-z][A-Za-z0-9_-]*)\s*:\s*(.+?)\s*$/);

    if (!pair) {
      continue;
    }

    const [, rawKey, rawValue] = pair;
    const value = unwrapValue(rawValue);

    if (rawKey === 'title' && value) {
      result.title = value;
    }

    if (rawKey === 'description' && value) {
      result.description = value;
    }

    if (rawKey === 'order') {
      const numericValue = Number(value);

      if (!Number.isNaN(numericValue)) {
        result.order = numericValue;
      }
    }
  }

  return result;
}

function stripFrontmatter(source: string): string {
  return source.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, '');
}

function extractFirstHeading(source: string): string | undefined {
  const heading = source.match(/^\s*#\s+(.+?)\s*$/m);
  return heading ? heading[1].trim() : undefined;
}

function unwrapValue(value: string): string {
  const trimmed = value.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function humanizeSegment(segment: string): string {
  if (!segment) {
    return '知识库首页';
  }

  return segment
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => {
      if (/^[A-Za-z0-9]+$/.test(part)) {
        return part.slice(0, 1).toUpperCase() + part.slice(1);
      }

      return part;
    })
    .join(' ');
}

function toPageLink(relativePath: string, isIndex: boolean): string {
  if (isIndex) {
    const directoryPath = posix.dirname(relativePath);
    return directoryPath === '.' ? '/' : `/${directoryPath}/`;
  }

  return `/${relativePath.replace(/\.md$/, '')}`;
}

function toPosixRelative(filePath: string): string {
  return posix.relative(docsRoot, filePath);
}

function escapeForActiveMatch(link: string): string {
  return link.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
