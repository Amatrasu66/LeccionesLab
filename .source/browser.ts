// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"python/basics/control-flow.mdx": () => import("../content/docs/python/basics/control-flow.mdx?collection=docs"), "python/basics/functions.mdx": () => import("../content/docs/python/basics/functions.mdx?collection=docs"), "python/basics/operators-and-expressions.mdx": () => import("../content/docs/python/basics/operators-and-expressions.mdx?collection=docs"), "python/basics/strings.mdx": () => import("../content/docs/python/basics/strings.mdx?collection=docs"), "python/basics/syntax-and-types.mdx": () => import("../content/docs/python/basics/syntax-and-types.mdx?collection=docs"), "python/basics/variables.mdx": () => import("../content/docs/python/basics/variables.mdx?collection=docs"), "python/collections/dictionaries.mdx": () => import("../content/docs/python/collections/dictionaries.mdx?collection=docs"), "python/collections/lists.mdx": () => import("../content/docs/python/collections/lists.mdx?collection=docs"), "python/collections/sets.mdx": () => import("../content/docs/python/collections/sets.mdx?collection=docs"), "python/collections/tuples.mdx": () => import("../content/docs/python/collections/tuples.mdx?collection=docs"), "python/getting-started.mdx": () => import("../content/docs/python/getting-started.mdx?collection=docs"), "python/index.mdx": () => import("../content/docs/python/index.mdx?collection=docs"), "python/reference/built-in-functions.mdx": () => import("../content/docs/python/reference/built-in-functions.mdx?collection=docs"), }),
};
export default browserCollections;