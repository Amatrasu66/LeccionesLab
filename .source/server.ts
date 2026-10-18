// @ts-nocheck
import * as __fd_glob_17 from "../content/docs/python/reference/built-in-functions.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/python/index.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/python/getting-started.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/python/collections/tuples.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/python/collections/sets.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/python/collections/lists.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/python/collections/dictionaries.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/python/basics/variables.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/python/basics/syntax-and-types.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/python/basics/strings.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/python/basics/operators-and-expressions.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/python/basics/functions.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/python/basics/control-flow.mdx?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/python/reference/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/python/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/python/collections/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/python/basics/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "python/basics/meta.json": __fd_glob_1, "python/collections/meta.json": __fd_glob_2, "python/meta.json": __fd_glob_3, "python/reference/meta.json": __fd_glob_4, }, {"python/basics/control-flow.mdx": __fd_glob_5, "python/basics/functions.mdx": __fd_glob_6, "python/basics/operators-and-expressions.mdx": __fd_glob_7, "python/basics/strings.mdx": __fd_glob_8, "python/basics/syntax-and-types.mdx": __fd_glob_9, "python/basics/variables.mdx": __fd_glob_10, "python/collections/dictionaries.mdx": __fd_glob_11, "python/collections/lists.mdx": __fd_glob_12, "python/collections/sets.mdx": __fd_glob_13, "python/collections/tuples.mdx": __fd_glob_14, "python/getting-started.mdx": __fd_glob_15, "python/index.mdx": __fd_glob_16, "python/reference/built-in-functions.mdx": __fd_glob_17, });