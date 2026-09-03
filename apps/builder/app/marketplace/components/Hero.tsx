type Props = {
  templateCount: number;
};

export function Hero({ templateCount }: Props) {
  return (
    <section
      style={{
        height: "420px",
        boxSizing: "border-box",
        padding: "64px 24px",
        background: "linear-gradient(135deg, #453d89, #c8499a)",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ margin: "0 0 18px", color: "#f49a7d", fontWeight: 800 }}>
          Quantumberg marketplace / {templateCount} live templates
        </p>
        <h1
          style={{
            maxWidth: 780,
            margin: 0,
            fontSize: "clamp(42px, 7vw, 84px)",
            lineHeight: 0.98,
            letterSpacing: -2.5,
          }}
        >
          Start with something <em style={{ color: "#f49a7d" }}>remarkable.</em>
        </h1>
        <p
          style={{
            maxWidth: 560,
            margin: "28px 0 0",
            color: "#b9c8c0",
            fontSize: 18,
            lineHeight: 1.6,
          }}
        >
          A considered collection of ready-to-customize websites for ambitious
          ideas, teams, and businesses.
        </p>
        <a
          href="#template-catalogue"
          style={{
            display: "inline-block",
            marginTop: 34,
            padding: "13px 20px",
            borderRadius: 999,
            background: "#f49a7d",
            color: "#17221f",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Explore templates -&gt;
        </a>
      </div>
    </section>
  );
}
