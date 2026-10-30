import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

const searchAPI = createFromSource(source);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  if (!query || !query.trim()) {
    // Return published pages dynamically from the source loader
    const pages = source.getPages().map((page) => {
      const segments = page.url.split('/').filter(Boolean);
      const breadcrumbs = ['Documentation'];
      if (segments.length >= 2) {
        breadcrumbs.push(segments[1].charAt(0).toUpperCase() + segments[1].slice(1));
      }
      if (segments.length >= 4) {
        const sectionName =
          segments[2].toLowerCase() === 'oop'
            ? 'OOP'
            : segments[2]
                .split('-')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
        breadcrumbs.push(sectionName);
      }
      return {
        id: page.url,
        type: 'page' as const,
        content: page.data.title,
        description: page.data.description || '',
        url: page.url,
        breadcrumbs,
      };
    });
    return Response.json(pages);
  }

  return searchAPI.GET(request);
}
