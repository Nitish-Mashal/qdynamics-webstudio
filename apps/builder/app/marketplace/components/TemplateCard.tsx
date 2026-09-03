import { useState } from "react";

type Props = {
  title: string;
  category: string;
  description: string;
  thumbnailAssetId?: string;
  previewUrl: string;
};

export function TemplateCard({
  title,
  category,
  description,
  thumbnailAssetId,
  previewUrl,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const openPreview = () => {
    window.open(previewUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      role="link"
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={openPreview}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPreview();
        }
      }}
      style={{
        border: isFocused ? "1px solid #e05b45" : "1px solid #dfe7e1",
        borderRadius: 18,
        overflow: "hidden",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
        cursor: "pointer",
        transform: isHovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 18px 38px rgba(23, 34, 31, 0.14)"
          : "0 4px 12px rgba(23, 34, 31, 0.04)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
      }}
    >
      <div
        style={{
          height: 220,
          background: thumbnailAssetId ? "#e5eee8" : "#dce9e1",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 18,
          color: "#2563eb",
          fontWeight: 600,
        }}
      >
        {thumbnailAssetId ? (
          <img
            src={thumbnailAssetId}
            alt={`${title} preview`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 400ms ease",
            }}
          />
        ) : (
          "Image preview"
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            background:
              "linear-gradient(180deg, rgba(23,34,31,0.46) 0%, rgba(23,34,31,0) 42%, rgba(23,34,31,0.18) 100%)",
          }}
        >
          <span
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.92)",
              color: "#17221f",
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            {category}
          </span>
          <span
            style={{
              padding: "7px 10px",
              borderRadius: 999,
              background: "#f49a7d",
              color: "#17221f",
              fontSize: 11,
              fontWeight: 800,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(-5px)",
              transition: "opacity 180ms ease, transform 180ms ease",
            }}
          >
            View live -&gt;
          </span>
        </div>
      </div>

      <div
        style={{
          padding: 22,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          style={{
            color: "#e05b45",
            fontSize: 11,
            fontWeight: 800,
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          Featured template
        </div>

        <h3
          style={{
            margin: "0 0 12px",
            fontSize: 24,
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: -0.4,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            color: "#65716d",
            lineHeight: 1.55,
            fontSize: 14,
            flex: 1,
          }}
        >
          {description}
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            openPreview();
          }}
          style={{
            marginTop: 26,
            padding: "12px 16px",
            border: "1px solid #17221f",
            borderRadius: 999,
            background: "#17221f",
            color: "#fff",
            cursor: "pointer",
            width: "100%",
            fontSize: 14,
            fontWeight: 800,
          }}
        >
          Open live preview <span aria-hidden>-&gt;</span>
        </button>
      </div>
    </div>
  );
}
