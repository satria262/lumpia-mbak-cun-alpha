import { logoutAdmin } from "../actions";
import { AdminIcon } from "./AdminIcons";

type AdminHeaderProps = {
  title: string;
  subtitle: string;
};

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  return (
    <header className="flex flex-col gap-6 border-b border-[#eee7d8] bg-[#fbfaf6] px-6 py-4 md:px-10 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-4xl font-bold tracking-[-0.04em] text-[#221d16]">
          {title}
        </h1>
        <p className="mt-1 text-sm text-[#6f6a5c]">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex space-x-1 items-center px-2 py-1 rounded-lg text-[#6f6a5c] transition hover:bg-[#f0eee8] hover:text-[#526b2d]"
            aria-label="Logout admin"
            title="Logout"
          >
            <AdminIcon name="out" className="h-5 w-5" />
            <p className="text-sm">Logout</p>
          </button>
        </form>
      </div>
    </header>
  );
}
