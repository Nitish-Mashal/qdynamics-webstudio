import { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { dashboardPath } from "~/shared/router-utils";
export const Dashboard = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const templates = [
    {
      id: 1,
      title: "Modern Villa",
      category: "Real Estate",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      premium: true,
    },
    {
      id: 2,
      title: "Startup Landing",
      category: "Business",
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
    },
    {
      id: 3,
      title: "Portfolio Pro",
      category: "Personal",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    },
    {
      id: 4,
      title: "Ecommerce Store",
      category: "Shop",
      image: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b",
      premium: true,
    },
  ];

  const categories = ["All", "Real Estate", "Business", "Personal", "Shop"];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F5F7FB",
        fontFamily: "Times New Roman",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <div
        style={{
          width: 250,
          background: "#111827",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 24,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src="/image.png" alt="logo" style={{ height: "30px" }} />
            <h2 style={{ color: "#111827" }}>Template</h2>
          </div>

          {[
            "Dashboard",
            "My Templates",
            "My Projects",
            "Leads",
            "Analytics",
            "Domains & Hosting",
            "Billing",
            "Team Members",
            "",
            "",
            "",
          ].map((item) => (
            <div
              key={item}
              onClick={() => {
                if (item === "My Templates") {
                  navigate(dashboardPath("projects"));
                }

                if (item === "Dashboard") {
                  navigate("/dashboard");
                }
              }}
              style={{
                padding: "14px 18px",
                borderRadius: 10,
                marginBottom: 8,
                background: item === "Dashboard" ? "#4F46E5" : "transparent",
                cursor: "pointer",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div>
          <div
            style={{
              background: "#1F2937",
              borderRadius: 15,
              padding: 20,
            }}
          >
            <h4>Upgrade to Premium</h4>

            <p
              style={{
                fontSize: 13,
                color: "#C7C7C7",
              }}
            >
              Unlock premium templates, custom domain and more.
            </p>

            <button
              style={{
                marginTop: 15,
                width: "100%",
                padding: 12,
                border: "none",
                borderRadius: 8,
                background: "#4F46E5",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Upgrade Now
            </button>
          </div>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <img
              src="https://i.pravatar.cc/45"
              style={{
                width: 45,
                height: 45,
                borderRadius: "50%",
              }}
            />

            <div>
              <div>John Doe</div>

              <div
                style={{
                  fontSize: 12,
                  color: "#9CA3AF",
                }}
              >
                john@email.com
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN ================= */}

      <div
        style={{
          flex: 1,
          padding: 30,
        }}
      >
        {/* HEADER */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 30,
                color: "#dc35b8",
              }}
            >
              Dashboard
            </h1>

            <p
              style={{
                color: "#6B7280",
                fontSize: 14,
              }}
            >
              Manage your real estate landing pages, leads and growth.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <button
              style={{
                background: "#4F46E5",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px 22px",
                cursor: "pointer",
              }}
            >
              Create New
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 13,
                    color: "#888",
                  }}
                >
                  Welcome Back
                </div>

                <strong>John Doe</strong>
              </div>

              <img
                src="https://i.pravatar.cc/50"
                style={{
                  width: 45,
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
        </div>

        {/* STAT CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: 20,
            fontSize: 12,
          }}
        >
          {[
            ["", "Total Projects", "24"],
            ["", "Total Leads", "1,245"],
            ["", "Page Views", "56,789"],
            ["", "Conversion Rate", "3.68%"],
            ["", "Active Domains", "12"],
          ].map((item) => (
            <div
              key={item[1]}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: 25,
                boxShadow: "0 10px 25px rgba(0,0,0,.05)",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  marginBottom: 12,
                }}
              >
                {item[0]}
              </div>

              <div
                style={{
                  color: "#888",
                  fontSize: 14,
                }}
              >
                {item[1]}
              </div>

              <h2
                style={{
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                {item[2]}
              </h2>
            </div>
          ))}
        </div>
        {/* ================= PROJECTS + ANALYTICS ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 25,
            marginTop: 30,
          }}
        >
          {/* ================= MY PROJECTS ================= */}

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 25,
              boxShadow: "0 8px 25px rgba(0,0,0,.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 22,
                  }}
                >
                  My Projects
                </h2>

                <p
                  style={{
                    color: "#888",
                    marginTop: 5,
                    fontSize: 12,
                  }}
                >
                  Manage your landing pages
                </p>
              </div>

              <button
                onClick={() => navigate(dashboardPath("projects"))}
                style={{
                  background: "#EEF2FF",
                  color: "#4F46E5",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                View All
              </button>
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#F8FAFC",
                    textAlign: "left",
                  }}
                >
                  <th style={{ padding: 15 }}>Project</th>
                  <th>Status</th>
                  <th>Visitors</th>
                  <th>Leads</th>
                  <th>Updated</th>
                </tr>
              </thead>

              <tbody>
                {[
                  [
                    "Luxury Villa",
                    "Published",
                    "12,540",
                    "245",
                    "2 hours ago",
                    "#22C55E",
                  ],
                  [
                    "Apartment Landing",
                    "Draft",
                    "8,210",
                    "152",
                    "Yesterday",
                    "#F59E0B",
                  ],
                  [
                    "Commercial Space",
                    "Published",
                    "5,488",
                    "101",
                    "3 days ago",
                    "#22C55E",
                  ],
                  [
                    "Farm House",
                    "Review",
                    "2,765",
                    "43",
                    "5 days ago",
                    "#3B82F6",
                  ],
                ].map((row) => (
                  <tr
                    key={row[0]}
                    style={{
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <td style={{ padding: 16, fontWeight: 600 }}>{row[0]}</td>

                    <td>
                      <span
                        style={{
                          background: row[5],
                          color: "#fff",
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontSize: 12,
                        }}
                      >
                        {row[1]}
                      </span>
                    </td>

                    <td>{row[2]}</td>

                    <td>{row[3]}</td>

                    <td>{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= ANALYTICS ================= */}

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 25,
              boxShadow: "0 8px 25px rgba(0,0,0,.05)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: 22,
              }}
            >
              Analytics Overview
            </h2>

            <p
              style={{
                color: "#888",
                fontSize: 12,
              }}
            >
              Monthly Performance
            </p>

            <div
              style={{
                height: 280,
                borderRadius: 15,
                marginTop: 20,
                background: "linear-gradient(180deg,#EEF2FF,#FFFFFF)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4F46E5",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              Chart Coming Soon
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 25,
              }}
            >
              <div>
                <p
                  style={{
                    color: "#888",
                    marginBottom: 5,
                  }}
                >
                  Visitors
                </p>

                <h3>56,780</h3>
              </div>

              <div>
                <p
                  style={{
                    color: "#888",
                    marginBottom: 5,
                  }}
                >
                  Leads
                </p>

                <h3>1,245</h3>
              </div>
            </div>
          </div>
        </div>
        {/* ================= BOTTOM SECTION ================= */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 25,
            marginTop: 30,
          }}
        >
          {/* ================= QUICK ACTIONS ================= */}

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 25,
              boxShadow: "0 8px 25px rgba(0,0,0,.05)",
            }}
          >
            <h2 style={{ marginTop: 0, fontSize: 22 }}>Quick Actions</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: 15,
                marginTop: 20,
              }}
            >
              {[
                ["", "New Project"],
                ["", "Templates"],
                ["", "Invite Team"],
                ["", "Settings"],
              ].map((item) => (
                <div
                  key={item[1]}
                  style={{
                    background: "#F8FAFC",
                    borderRadius: 15,
                    padding: 20,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "0.3s",
                  }}
                >
                  <div style={{ fontSize: 32 }}>{item[0]}</div>

                  <div
                    style={{
                      marginTop: 12,
                      fontWeight: 600,
                    }}
                  >
                    {item[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RECENT TEMPLATES ================= */}

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 25,
              boxShadow: "0 8px 25px rgba(0,0,0,.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 22 }}>Recent Templates</h2>

              <span
                style={{
                  color: "#4F46E5",
                  cursor: "pointer",
                }}
              >
                View All
              </span>
            </div>

            {[
              "Luxury Villa",
              "Modern Apartment",
              "Office Space",
              "Restaurant",
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 65,
                    height: 55,
                    borderRadius: 10,
                    background: "linear-gradient(135deg,#6366F1,#A855F7)",
                  }}
                />

                <div>
                  <div style={{ fontWeight: 600 }}>{item}</div>

                  <div
                    style={{
                      color: "#888",
                      fontSize: 13,
                    }}
                  >
                    Updated today
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= NOTIFICATIONS ================= */}

          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 25,
              boxShadow: "0 8px 25px rgba(0,0,0,.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ margin: 0, fontSize: 22 }}>Notifications</h2>

              <span
                style={{
                  color: "#4F46E5",
                  cursor: "pointer",
                }}
              >
                See All
              </span>
            </div>

            <div style={{ marginTop: 20 }}>
              {[
                {
                  title: "New Lead Received",
                  desc: "Luxury Villa Landing",
                  color: "#22C55E",
                },
                {
                  title: "Template Published",
                  desc: "Modern Apartment",
                  color: "#3B82F6",
                },
                {
                  title: "Domain Connected",
                  desc: "estatepro.com",
                  color: "#F59E0B",
                },
                {
                  title: "Payment Successful",
                  desc: "Premium Subscription",
                  color: "#8B5CF6",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: item.color,
                    }}
                  />

                  <div>
                    <div style={{ fontWeight: 600 }}>{item.title}</div>

                    <div
                      style={{
                        color: "#888",
                        fontSize: 13,
                      }}
                    >
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
