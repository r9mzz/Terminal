import { Link } from 'react-router-dom';

export default function ListRow({
  to,
  title,
  subtitle,
}: {
  to: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Link
      to={to}
      className="block border-b border-[#1c1c1e] py-4 transition-opacity duration-300 active:opacity-60"
    >
      <div className="flex items-center justify-between">
        <span className="text-lg text-[#f5f5f7]">{title}</span>
        {subtitle && <span className="text-sm text-[#8a8a8e]">{subtitle}</span>}
      </div>
    </Link>
  );
}
