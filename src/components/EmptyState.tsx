import type { LucideIcon } from 'lucide-react';

export default function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-800 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-zinc-600">
        <Icon size={20} />
      </div>
      <div className="text-sm font-medium text-zinc-400">{title}</div>
      {description && <div className="max-w-xs text-sm text-zinc-600">{description}</div>}
    </div>
  );
}
