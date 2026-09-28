type Props = {
  templateCount: number;
};

const categories = [
  "All templates",
  "Business",
  "Portfolio",
  "SaaS",
  "Agency",
  "E-commerce",
];

const featuredTemplates = [
  {
    title: "Lumina Studio",
    category: "Agency",
    description: "A bold digital agency website built for creative teams.",
    gradient: "linear-gradient(135deg, #d8b4fe, #818cf8)",
  },
  {
    title: "Vertex",
    category: "SaaS",
    description: "A clean SaaS landing page designed for modern products.",
    gradient: "linear-gradient(135deg, #99f6e4, #60a5fa)",
  },
  {
    title: "Northstar",
    category: "Business",
    description:
      "A professional business website with a confident visual system.",
    gradient: "linear-gradient(135deg, #fde68a, #fb7185)",
  },
];

export function Hero({ templateCount }: Props) {
  return (
    <main
      style={{
        background: "#f7f7f5",
        color: "#17221f",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* HERO */}
      <section
        style={{
          minHeight: "620px",
          boxSizing: "border-box",
          padding: "80px 24px 70px",
          background:
            "radial-gradient(circle at 85% 20%, rgba(244,154,125,.35), transparent 30%), linear-gradient(135deg, #29235f 0%, #453d89 45%, #9f4d91 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.14)",
            right: -120,
            top: -120,
          }}
        />

        <div
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,.1)",
            right: 80,
            bottom: -150,
          }}
        />

        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,.1)",
              border: "1px solid rgba(255,255,255,.16)",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 28,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#f49a7d",
              }}
            />
            {templateCount} live templates
          </div>

          {/* Heading */}
          <h1
            style={{
              maxWidth: 850,
              margin: 0,
              fontSize: "clamp(30px, 8vw, 70px)",
              lineHeight: 0.98,
              letterSpacing: "-4px",
              fontWeight: 800,
            }}
          >
            Build something{" "}
            <em
              style={{
                color: "#f49a7d",
                fontStyle: "normal",
              }}
            >
              remarkable.
            </em>
          </h1>

          {/* Description */}
          <p
            style={{
              maxWidth: 610,
              margin: "30px 0 0",
              color: "rgba(255,255,255,.72)",
              fontSize: 19,
              lineHeight: 1.65,
            }}
          >
            Discover beautifully crafted, ready-to-customize websites for
            ambitious ideas, teams, creators, and businesses.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 36,
            }}
          >
            <a
              href="#template-catalogue"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "15px 22px",
                borderRadius: 999,
                background: "#f49a7d",
                color: "#17221f",
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Explore templates
              <span>→</span>
            </a>

            <a
              href="#categories"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "15px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.18)",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Browse categories
            </a>
          </div>

          {/* Hero mini cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
              maxWidth: 720,
              marginTop: 70,
            }}
          >
            {[
              ["01", "Ready to customize"],
              ["02", "Responsive by default"],
              ["03", "Built for Webstudio"],
            ].map(([number, label]) => (
              <div
                key={number}
                style={{
                  padding: "18px",
                  borderRadius: 18,
                  background: "rgba(255,255,255,.08)",
                  border: "1px solid rgba(255,255,255,.12)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    color: "#f49a7d",
                    fontSize: 12,
                    fontWeight: 800,
                    marginBottom: 8,
                  }}
                >
                  {number}
                </div>

                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        style={{
          borderBottom: "1px solid #e4e4df",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            padding: "28px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 24,
          }}
        >
          {[
            [String(templateCount), "Live templates"],
            ["100%", "Responsive"],
            ["∞", "Customizable"],
            ["24/7", "Build anytime"],
          ].map(([value, label]) => (
            <div key={label}>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: -1,
                }}
              >
                {value}
              </div>

              <div
                style={{
                  marginTop: 4,
                  color: "#777a76",
                  fontSize: 13,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section
        id="template-catalogue"
        style={{
          padding: "90px 24px",
          background: "#f7f7f5",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 30,
              flexWrap: "wrap",
              marginBottom: 36,
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 10px",
                  color: "#9f4d91",
                  fontSize: 13,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Curated collection
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: "clamp(34px, 5vw, 56px)",
                  letterSpacing: -2,
                }}
              >
                Featured templates
              </h2>
            </div>

            <a
              href="#categories"
              style={{
                color: "#17221f",
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              View all →
            </a>
          </div>

          {/* Template cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 22,
            }}
          >
            {featuredTemplates.map((template) => (
              <article
                key={template.title}
                style={{
                  background: "#fff",
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "1px solid #e6e6e1",
                }}
              >
                {/* Preview */}
                <div
                  style={{
                    height: 230,
                    background: template.gradient,
                    padding: 18,
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      background: "rgba(255,255,255,.65)",
                      borderRadius: 14,
                      padding: 16,
                    }}
                  >
                    <div
                      style={{
                        width: "45%",
                        height: 8,
                        borderRadius: 20,
                        background: "rgba(23,34,31,.2)",
                      }}
                    />

                    <div
                      style={{
                        width: "75%",
                        height: 24,
                        borderRadius: 5,
                        background: "rgba(23,34,31,.65)",
                        marginTop: 35,
                      }}
                    />

                    <div
                      style={{
                        width: "55%",
                        height: 8,
                        borderRadius: 20,
                        background: "rgba(23,34,31,.2)",
                        marginTop: 12,
                      }}
                    />

                    <div
                      style={{
                        width: 100,
                        height: 30,
                        borderRadius: 20,
                        background: "rgba(23,34,31,.75)",
                        marginTop: 24,
                      }}
                    />
                  </div>
                </div>

                {/* Card content */}
                <div style={{ padding: 24 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: "#9f4d91",
                      fontWeight: 800,
                      marginBottom: 9,
                    }}
                  >
                    {template.category}
                  </div>

                  <h3
                    style={{
                      margin: 0,
                      fontSize: 24,
                      letterSpacing: -0.8,
                    }}
                  >
                    {template.title}
                  </h3>

                  <p
                    style={{
                      color: "#777a76",
                      lineHeight: 1.6,
                      margin: "10px 0 20px",
                    }}
                  >
                    {template.description}
                  </p>

                  <a
                    href="#"
                    style={{
                      color: "#17221f",
                      fontWeight: 800,
                      textDecoration: "none",
                    }}
                  >
                    Preview template →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section
        id="categories"
        style={{
          padding: "90px 24px",
          background: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              color: "#9f4d91",
              fontWeight: 800,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Find your starting point
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "clamp(34px, 5vw, 56px)",
              letterSpacing: -2,
            }}
          >
            Browse by category
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              marginTop: 36,
            }}
          >
            {categories.map((category, index) => (
              <a
                key={category}
                href="#template-catalogue"
                style={{
                  padding: "16px 20px",
                  borderRadius: 999,
                  background: index === 0 ? "#17221f" : "#f2f2ed",
                  color: index === 0 ? "#fff" : "#17221f",
                  textDecoration: "none",
                  fontWeight: 700,
                  border: "1px solid #e4e4df",
                }}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section
        style={{
          padding: "90px 24px",
          background: "#17221f",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              maxWidth: 720,
            }}
          >
            <p
              style={{
                margin: "0 0 10px",
                color: "#f49a7d",
                fontSize: 13,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Why marketplace
            </p>

            <h2
              style={{
                margin: 0,
                fontSize: "clamp(36px, 5vw, 60px)",
                letterSpacing: -2,
                lineHeight: 1.05,
              }}
            >
              Less time building. More time creating.
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
              marginTop: 60,
            }}
          >
            {[
              [
                "01",
                "Start faster",
                "Skip the blank canvas and start with a professionally designed foundation.",
              ],
              [
                "02",
                "Make it yours",
                "Every template can be customized to match your brand, content, and goals.",
              ],
              [
                "03",
                "Stay responsive",
                "Create polished experiences that look great across screen sizes.",
              ],
              [
                "04",
                "Ship confidently",
                "Use a strong starting point and focus your energy on what makes your idea unique.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                style={{
                  padding: 26,
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,.12)",
                  background: "rgba(255,255,255,.04)",
                }}
              >
                <div
                  style={{
                    color: "#f49a7d",
                    fontSize: 12,
                    fontWeight: 800,
                  }}
                >
                  {number}
                </div>

                <h3
                  style={{
                    margin: "22px 0 10px",
                    fontSize: 21,
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "rgba(255,255,255,.62)",
                    lineHeight: 1.6,
                    fontSize: 14,
                  }}
                >
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "100px 24px",
          background:
            "linear-gradient(135deg, #f49a7d 0%, #f2b29b 50%, #e6a5d0 100%)",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(40px, 6vw, 72px)",
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            Your next website starts here.
          </h2>

          <p
            style={{
              maxWidth: 560,
              margin: "24px auto 0",
              color: "#493c39",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Explore the collection, choose a direction, and turn it into
            something completely your own.
          </p>

          <a
            href="#template-catalogue"
            style={{
              display: "inline-block",
              marginTop: 32,
              padding: "15px 25px",
              borderRadius: 999,
              background: "#17221f",
              color: "#fff",
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Explore {templateCount} templates →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "32px 24px",
          background: "#111916",
          color: "rgba(255,255,255,.55)",
        }}
      >
        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <strong style={{ color: "#fff" }}>Quantumberg Marketplace</strong>

          <span style={{ fontSize: 13 }}>Build something remarkable.</span>
        </div>
      </footer>
    </main>
  );
}
