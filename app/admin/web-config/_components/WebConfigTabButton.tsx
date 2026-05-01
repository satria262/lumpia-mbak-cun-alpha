import { type WebConfigTabId, type WebConfigTabItem } from "./WebConfigTypes";

export function WebConfigTabButton({
  tab,
  isActive,
  onSelect,
}: {
  tab: WebConfigTabItem;
  isActive: boolean;
  onSelect: (tabId: WebConfigTabId) => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      aria-controls={`web-config-panel-${tab.id}`}
      id={`web-config-tab-${tab.id}`}
      onClick={() => onSelect(tab.id)}
      className={`h-12 border-b-2 text-sm font-bold transition ${
        isActive
          ? "border-[#526b2d] text-[#526b2d]"
          : "border-transparent text-[#b0a99e] hover:text-[#6f6a5c]"
      }`}
    >
      {tab.label}
    </button>
  );
}
