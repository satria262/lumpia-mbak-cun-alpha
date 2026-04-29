export function LatestOrdersTable() {
  return (
    <section
      aria-labelledby="latest-orders-title"
      className="rounded-lg bg-white shadow-[0_16px_38px_-34px_rgba(70,52,26,0.42)] h-fit"
    >
      <div className="flex flex-col px-5 py-4 space-y-6">
        <div>
          <h2 id="latest-orders-title" className="text-[#526b2d] font-semibold text-2xl">
            Informasi Website
          </h2>
          <p className="text-sm">Pengaturan konten publik di halaman utama</p>
        </div>
        <div>
          <p className="font-semibold text-[#6f6a5c] text-md uppercase">Headline Utama</p>
          <p className="text-xl border-[#eee8dc] border rounded-lg p-4 mt-2 text-[#526b2d] font-semibold">
            Cita Rasa Otentik Semarangan
          </p>
        </div>
        <div>
          <p className="font-semibold text-[#6f6a5c] text-md uppercase">Deskripsi / Sub-Headline</p>
          <p className="text-sm border-[#eee8dc] border rounded-lg p-4 mt-2">Temukan resep warisan keluarga yang diturunkan lintas generasi. Kulit lumpia yang digoreng dengan minyak panas yang pas sehingga menciptakan kulit golden brown yang renyah membalut rebung pilihan dan bahan-bahan premium segar dari pertanian.</p>
        </div>
        <div className="flex justify-between items-center font-semibold text-sm">
          <p className="uppercase text-[#6f6a5c]">Seo & Metadata</p>
          <div className="flex items-center space-x-1">
            <span className="bg-[#22C55E] size-3 rounded-full" aria-hidden="true"></span>
            <p className="text-[#22C55E] uppercase">Optimized</p>
          </div>
        </div>
      </div>
    </section>
  );
}
