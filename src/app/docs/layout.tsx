import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col w-full bg-[#111014]">
      <DocsLayout
        tree={source.pageTree}
        nav={{
          enabled: false,
        }}
        sidebar={{
          collapsible: true,
          defaultOpenLevel: 2,
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
