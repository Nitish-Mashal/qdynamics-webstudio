import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { TemplateCard } from "../components/TemplateCard";
import type { MarketplaceProduct } from "@webstudio-is/project-build";
import { useMemo, useState } from "react";

type MarketplaceTemplate = MarketplaceProduct & {
  id: string;
  projectId: string;
  authorizationToken?: string | null;
  thumbnailAssetId?: string;
  previewUrl: string;
};

type MarketplaceCategory = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  sortOrder: number;
  isActive: boolean;
};

type HomePageProps = {
  categories: MarketplaceCategory[];
  templates: MarketplaceTemplate[];
};

export function HomePage({ templates }: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categoryMap: Record<string, string> = {
    sectionTemplates: "Sections",
    pageTemplates: "Pages",
    integrationTemplates: "Integrations",
  };

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return templates.filter((template) => {
      const matchesCategory =
        activeCategory === "all" || template.category === activeCategory;
      const matchesSearch =
        query === "" ||
        `${template.name} ${template.description}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, templates]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #453d89, #c8499a)",
        color: "#17221f",
        fontFamily: "Manrope, ui-sans-serif, sans-serif",
      }}
    >
      <Navbar />

      <Hero templateCount={templates.length} />

      <section
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "72px 24px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            gap: 24,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 10px",
                color: "#e05b45",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              Curated collection
            </p>
            <h2 style={{ margin: 0, fontSize: 34, letterSpacing: -0.8 }}>
              Find your starting point
            </h2>
          </div>
          <p style={{ margin: 0, color: "#65716d", fontSize: 15 }}>
            {filteredTemplates.length} of {templates.length} templates
          </p>
        </div>

        {/* <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 14,
            marginBottom: 72,
          }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.name}
              icon={category.icon ?? "*"}
              totalTemplates={
                templates.filter(
                  (template) => template.category === category.slug
                ).length
              }
              isActive={activeCategory === category.slug}
              onClick={() => setActiveCategory(category.slug)}
            />
          ))}
        </div> */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 24,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            style={{
              border: 0,
              borderRadius: 999,
              padding: "10px 16px",
              background: activeCategory === "all" ? "#17221f" : "#e5ebe7",
              color: activeCategory === "all" ? "#fff" : "#52615b",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            All templates
          </button>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search templates"
            aria-label="Search templates"
            style={{
              marginLeft: "auto",
              width: "min(100%, 280px)",
              boxSizing: "border-box",
              border: "1px solid #d6dfd9",
              borderRadius: 999,
              padding: "11px 16px",
              background: "#fff",
              color: "#17221f",
              font: "inherit",
              outlineColor: "#e05b45",
            }}
          />
        </div>

        {filteredTemplates.length > 0 && (
          <section
            style={{
              scrollMarginTop: 90,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
                gap: 20,
              }}
            >
              {filteredTemplates.map((template) => (
                <TemplateCard
                  key={template.id}
                  title={template.name}
                  category={categoryMap[template.category] || template.category}
                  description={template.description}
                  thumbnailAssetId={template.thumbnailAssetId}
                  previewUrl={template.previewUrl}
                />
              ))}
            </div>
          </section>
        )}

        {filteredTemplates.length === 0 && (
          <section
            style={{
              padding: "56px 24px",
              textAlign: "center",
              background: "#fff",
              border: "1px solid #dfe7e1",
              borderRadius: 18,
            }}
          >
            <p style={{ margin: 0, fontSize: 18, color: "#52615b" }}>
              No templates match that search.
            </p>
          </section>
        )}
      </section>
    </div>
  );
}
