import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Callout } from '@/components/ui/callout';
import { CodeBlock } from '@/components/ui/code-block';
import { CopyPageButton } from '@/components/docs/copy-page-button';
import { ArticlePager } from '@/components/docs/article-pager';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MDX = page.data.body;

  // Determine section kicker
  const slugPath = params.slug ? params.slug.join('/') : '';
  let kicker = 'DOCUMENTATION';
  if (slugPath.includes('reference')) {
    kicker = 'TECHNICAL REFERENCE';
  } else if (slugPath.includes('oop')) {
    kicker = 'OBJECT-ORIENTED PROGRAMMING';
  } else if (slugPath.includes('intermediate')) {
    kicker = 'INTERMEDIATE FEATURES';
  } else if (slugPath.includes('modules')) {
    kicker = 'MODULES & STANDARD LIBRARY';
  } else if (slugPath.includes('collections')) {
    kicker = 'STRINGS & COLLECTIONS';
  } else if (slugPath.includes('basics')) {
    kicker = 'PYTHON FOUNDATIONS';
  } else if (slugPath.includes('getting-started') || slugPath === 'python') {
    kicker = 'GETTING STARTED';
  }

  // Calculate previous and next article navigation dynamically
  const pages = source.getPages();
  const currentIndex = pages.findIndex((p) => p.url === page.url);
  const previous =
    currentIndex > 0
      ? { title: pages[currentIndex - 1].data.title, url: pages[currentIndex - 1].url }
      : null;
  const next =
    currentIndex >= 0 && currentIndex < pages.length - 1
      ? { title: pages[currentIndex + 1].data.title, url: pages[currentIndex + 1].url }
      : null;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      breadcrumb={{
        enabled: true,
      }}
      tableOfContent={{
        style: 'clerk',
      }}
    >
      <div className="w-full max-w-4xl min-w-0">
        {/* Section Kicker */}
        <div className="mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C4B5FD] select-none">
            {kicker}
          </span>
        </div>

        {/* Title Row with Clean Copy Page Control */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-2 border-b border-[#302B36]/60">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#F4F0F7] leading-[1.2]">
            {page.data.title}
          </h1>
          <div className="shrink-0 self-start sm:self-center">
            <CopyPageButton />
          </div>
        </div>

        {/* Lead Description */}
        {page.data.description && (
          <p className="text-[16px] leading-[1.7] text-[#B8B1C2] mb-8 font-normal">
            {page.data.description}
          </p>
        )}

        {/* Prose Article Body */}
        <DocsBody className="prose text-[#F4F0F7] max-w-none">
          <MDX
            components={{
              ...defaultMdxComponents,
              Callout,
              CodeBlock,
            }}
          />
        </DocsBody>

        {/* Contextual Previous/Next Navigation */}
        <ArticlePager previous={previous} next={next} />
      </div>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  return {
    title: `${page.data.title} — LeccionesLab`,
    description: page.data.description,
  };
}
