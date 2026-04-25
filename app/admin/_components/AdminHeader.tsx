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
        <label className="relative w-full sm:w-72">
          <span className="sr-only">Search orders</span>
          <AdminIcon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9c978d]"
          />
          <input
            type="search"
            placeholder="Search orders..."
            className="h-10 w-full rounded-full border border-transparent bg-[#f0eee8] pl-10 pr-4 text-sm text-[#3d382f] outline-none transition placeholder:text-[#9c978d] focus:border-[#d8cfb5] focus:bg-white"
          />
        </label>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full text-[#6f6a5c] transition hover:bg-[#f0eee8] hover:text-[#526b2d]"
          aria-label="Notifications"
        >
          <AdminIcon name="bell" className="h-5 w-5" />
        </button>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="grid h-10 w-10 place-items-center rounded-full text-[#6f6a5c] transition hover:bg-[#f0eee8] hover:text-[#526b2d]"
            aria-label="Logout admin"
            title="Logout"
          >
            <AdminIcon name="user" className="h-5 w-5" />
          </button>
        </form>
      </div>
    </header>
  );
}
