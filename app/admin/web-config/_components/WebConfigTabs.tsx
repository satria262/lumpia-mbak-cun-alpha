"use client";

import { useMemo, useState } from "react";

import { HeroContentTab } from "./HeroContentTab";
import { IdentityBrandingTab } from "./IdentityBrandingTab";
import { OperationsLinksTab } from "./OperationsLinksTab";
import { SeoMetaTab } from "./SeoMetaTab";
import { StatusPill } from "./WebConfigFields";
import { WebConfigTabButton } from "./WebConfigTabButton";
import {
  type WebConfigTabId,
  type WebConfigTabItem,
  type WebConfigValues,
} from "./WebConfigTypes";

const tabs: WebConfigTabItem[] = [
  {
    id: "identity",
    label: "Identity & Branding",
    description: "Nama, subtitle, judul section produk, dan favicon.",
  },
  {
    id: "hero",
    label: "Hero & Content",
    description: "Headline utama dan narasi pembuka halaman beranda.",
  },
  {
    id: "operations",
    label: "Operations & Links",
    description: "Tombol CTA, jam buka, alamat, dan kanal eksternal.",
  },
  {
    id: "seo",
    label: "SEO & Meta",
    description: "Title dan description untuk halaman beranda.",
  },
];

export function WebConfigTabs({
  initialValues,
}: {
  initialValues: WebConfigValues;
}) {
  
  const [activeTab, setActiveTab] = useState<WebConfigTabId>("identity");
  const currentTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-[#eee8dc] bg-white p-5 shadow-[0_18px_45px_-36px_rgba(70,52,26,0.45)]">
        <div className="overflow-x-auto border-b border-[#eee8dc]">
          <div className="flex min-w-[42rem] gap-8" role="tablist">
            {tabs.map((tab) => (
              <WebConfigTabButton
                key={tab.id}
                tab={tab}
                isActive={tab.id === activeTab}
                onSelect={setActiveTab}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-[var(--font-noto-serif)] text-2xl font-semibold text-[#211d16]">
              {currentTab.label}
            </p>
            <p className="mt-1 text-sm leading-6 text-[#6f6a5c]">
              {currentTab.description}
            </p>
          </div>
          {activeTab === "operations" ? <StatusPill /> : null}
        </div>
      </section>

      <div
        role="tabpanel"
        id={`web-config-panel-${activeTab}`}
        aria-labelledby={`web-config-tab-${activeTab}`}
      >
        {activeTab === "identity" ? (
          <IdentityBrandingTab values={initialValues} />
        ) : null}

        {activeTab === "hero" ? (
          <HeroContentTab values={initialValues} />
        ) : null}

        {activeTab === "operations" ? (
          <OperationsLinksTab values={initialValues} />
        ) : null}

        {activeTab === "seo" ? <SeoMetaTab values={initialValues} /> : null}
      </div>
    </div>
  );
}
