import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkToc from 'remark-toc'
import rehypeCallouts from 'rehype-callouts'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { visit } from 'unist-util-visit'

// Maps fenced code language → MDX component name.
// To add a new diagram type, add an entry here and register the component in mdxMapping.tsx.
const DIAGRAM_LANGS: Record<string, string> = {
  mermaid: 'MermaidDiagram',
  // plantuml: 'PlantUMLDiagram',
}

function remarkDiagrams() {
  return (tree: any) => {
    visit(tree, 'code', (node: any, index: any, parent: any) => {
      const componentName = DIAGRAM_LANGS[node.lang]
      if (componentName) {
        parent.children[index] = {
          type: 'mdxJsxFlowElement',
          name: componentName,
          attributes: [{ type: 'mdxJsxAttribute', name: 'chart', value: node.value }],
          children: [],
        }
      }
    })
  }
}

export default defineConfig({
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: 'frontmatter' }],
          remarkGfm,
          [remarkToc, { tight: true }],
          remarkDiagrams,
        ],
        rehypePlugins: [
          rehypeSlug,
          [rehypeCallouts, { theme: 'obsidian' }],
          [rehypePrettyCode, {
            theme: 'github-dark',
            keepBackground: true,
          }],
        ],
        providerImportSource: '@mdx-js/react',
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})
