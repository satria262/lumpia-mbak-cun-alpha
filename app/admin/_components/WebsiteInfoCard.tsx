export function WebsiteInfoCard() {
  return (
    <section
      aria-labelledby="website-info-title"
      className="h-fit rounded-lg bg-white shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)]"
    >
      <div className="flex flex-col space-y-6 px-5 py-4">
        <div>
          <h2
            id="website-info-title"
            className="text-2xl font-semibold text-[#526b2d]"
          >
            Informasi Website
          </h2>
          <p className="text-sm">Pengaturan konten publik di halaman utama</p>
        </div>
        <div>
          <p className="text-md font-semibold uppercase text-[#6f6a5c]">
            Headline Utama
          </p>
          <p className="mt-2 rounded-lg border border-[#eee8dc] p-4 text-xl font-semibold text-[#526b2d]">
            Cita Rasa Otentik Semarangan
          </p>
        </div>
        <div>
          <p className="text-md font-semibold uppercase text-[#6f6a5c]">
            Deskripsi / Sub-Headline
          </p>
          <p className="mt-2 rounded-lg border border-[#eee8dc] p-4 text-sm">
            Temukan resep warisan keluarga yang diturunkan lintas generasi.
            Kulit lumpia yang digoreng dengan minyak panas yang pas sehingga
            menciptakan kulit golden brown yang renyah membalut rebung pilihan
            dan bahan-bahan premium segar dari pertanian.
          </p>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold">
          <p className="uppercase text-[#6f6a5c]">Seo & Metadata</p>
          <div className="flex items-center space-x-1">
            <span
              className="size-3 rounded-full bg-[#22C55E]"
              aria-hidden="true"
            />
            <p className="uppercase text-[#22C55E]">Optimized</p>
          </div>
        </div>
      </div>
    </section>
  );
}
