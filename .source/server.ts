// @ts-nocheck
import * as __fd_glob_8 from "../content/docs/python/reference/built-in-functions.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/python/index.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/python/getting-started.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/python/basics/variables.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/python/basics/functions.mdx?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/python/reference/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/python/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/python/basics/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "python/basics/meta.json": __fd_glob_1, "python/meta.json": __fd_glob_2, "python/reference/meta.json": __fd_glob_3, }, {"python/basics/functions.mdx": __fd_glob_4, "python/basics/variables.mdx": __fd_glob_5, "python/getting-started.mdx": __fd_glob_6, "python/index.mdx": __fd_glob_7, "python/reference/built-in-functions.mdx": __fd_glob_8, });