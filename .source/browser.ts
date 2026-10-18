// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"python/basics/functions.mdx": () => import("../content/docs/python/basics/functions.mdx?collection=docs"), "python/basics/variables.mdx": () => import("../content/docs/python/basics/variables.mdx?collection=docs"), "python/getting-started.mdx": () => import("../content/docs/python/getting-started.mdx?collection=docs"), "python/index.mdx": () => import("../content/docs/python/index.mdx?collection=docs"), "python/reference/built-in-functions.mdx": () => import("../content/docs/python/reference/built-in-functions.mdx?collection=docs"), }),
};
export default browserCollections;