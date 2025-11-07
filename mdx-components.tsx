import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as ObsidianComponents from 'fumadocs-obsidian/ui';
import type { MDXComponents } from 'mdx/types';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...ObsidianComponents,
    ...components,
  };
}
