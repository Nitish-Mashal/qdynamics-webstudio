type Props = {
  title: string;
  icon: string;
  totalTemplates: number;
  isActive: boolean;
  onClick: () => void;
};

export function CategoryCard({
  title,
  icon,
  totalTemplates,
  isActive,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: isActive ? "1px solid #17221f" : "1px solid #dfe7e1",
        borderRadius: 16,
        padding: 20,
        background: isActive ? "#e5eee8" : "#fff",
        color: "#17221f",
        textAlign: "left",
        transition: "all 0.2s ease",
        cursor: "pointer",
        boxSizing: "border-box",
        width: "100%",
        font: "inherit",
      }}
    >
      <div
        style={{
          fontSize: 26,
          marginBottom: 24,
          color: "#e05b45",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: "0 0 10px",
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#6b7280",
          fontSize: 13,
        }}
      >
        {totalTemplates} {totalTemplates === 1 ? "template" : "templates"}
      </p>
    </button>
  );
}
