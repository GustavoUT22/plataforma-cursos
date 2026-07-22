export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Filtrar inscripciones">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={`tab-item${activeTab === tab.key ? " active" : ""}`}
          role="tab"
          aria-selected={activeTab === tab.key}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}