import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Web development",
    description: "Responsive websites and web applications designed around how your business works.",
    href: "/services/web-development",
  },
  {
    number: "02",
    title: "Business digitisation",
    description: "Practical help moving everyday workflows from paper and scattered spreadsheets into clearer digital processes.",
    href: "/services/business-digitisation",
  },
  {
    number: "03",
    title: "Custom software",
    description: "Business systems shaped around your requirements, beginning with discovery and a clearly defined scope.",
    href: "/services/custom-software",
  },
  {
    number: "04",
    title: "IT support",
    description: "A planned service area with responsibilities and scope agreed before work begins.",
    href: "/services/it-support",
  },
];

const steps = [
  ["01", "Discover", "Understand your goals, current process and constraints."],
  ["02", "Scope", "Agree on priorities, deliverables and a practical plan."],
  ["03", "Build", "Develop in clear stages and share progress."],
  ["04", "Test", "Check the work carefully before handover."],
  ["05", "Support", "Discuss the support needed after delivery."],
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function ArrowIcon() {
  return <span aria-hidden="true" className="arrow-icon">↗</span>;
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label="Nexora Technologies home">
            <BrandMark />
            <span className="brand-copy">
              <strong>Nexora</strong>
              <span>TECHNOLOGIES</span>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="/services">Services</a>
            <a href="/products">Products</a>
            <a href="/about">About</a>
            <a href="/faq">FAQs</a>
          </nav>
          <a className="button button-small button-primary header-cta" href="/contact">
            Discuss a project <ArrowIcon />
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> TECHNOLOGY THAT MOVES YOU FORWARD</div>
              <h1>Practical technology for <span>growing businesses.</span></h1>
              <p className="hero-description">
                We help businesses make everyday work clearer with thoughtful websites,
                custom software and practical digital solutions.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="/contact">Discuss your project <ArrowIcon /></a>
                <a className="button button-quiet" href="/services">Explore services <span aria-hidden="true">→</span></a>
              </div>
              <div className="hero-note">
                <span className="note-line" />
                <p>Clear scope. Useful solutions. Built around your needs.</p>
              </div>
            </div>
            <div className="hero-art" aria-label="Abstract geometric illustration representing connected digital systems">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="art-core"><BrandMark /><span>N</span></div>
              <div className="art-node node-top"><span className="node-symbol">⌘</span><span>Systems</span></div>
              <div className="art-node node-right"><span className="node-symbol">↗</span><span>Growth</span></div>
              <div className="art-node node-bottom"><span className="node-symbol">⌁</span><span>Workflows</span></div>
              <div className="art-node node-left"><span className="node-symbol">◇</span><span>Ideas</span></div>
              <div className="art-spark spark-one" />
              <div className="art-spark spark-two" />
              <div className="art-spark spark-three" />
            </div>
          </div>
          <div className="container hero-bottom">
            <span>BUILT FOR REAL-WORLD WORK</span>
            <span className="hero-bottom-line" />
            <span>SIERRA LEONE · ENGLISH AT LAUNCH</span>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading section-heading-row">
              <div>
                <p className="eyebrow eyebrow-blue">WHAT WE DO</p>
                <h2>Technology with a <span>clear purpose.</span></h2>
              </div>
              <p className="section-intro">The right solution starts with understanding the problem. Explore practical services that can support your next step.</p>
            </div>
            <div className="service-grid">
              {services.map((service) => (
                <a className="service-card" href={service.href} key={service.number}>
                  <span className="card-number">{service.number}</span>
                  <span className="service-icon" aria-hidden="true">{service.number === "01" ? "↗" : service.number === "02" ? "⌘" : service.number === "03" ? "◇" : "⌁"}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="card-link">Explore service <ArrowIcon /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section product-section">
          <div className="container product-panel">
            <div className="product-copy">
              <p className="eyebrow">IN DEVELOPMENT</p>
              <span className="product-status"><span /> Planned product</span>
              <h2>Meet the idea behind <span>Nexora Business.</span></h2>
              <p>A planned business software product intended to help teams organise everyday operations. Its availability and final features have not yet been confirmed.</p>
              <a className="button button-light" href="/products/nexora-business">Explore the product <ArrowIcon /></a>
            </div>
            <div className="product-visual" aria-hidden="true">
              <div className="dashboard-window">
                <div className="window-top"><span /><span /><span /><i /></div>
                <div className="window-content">
                  <div className="window-sidebar"><b /><i /><i /><i /><i /></div>
                  <div className="window-main">
                    <span className="skeleton skeleton-short" />
                    <div className="window-stat-row"><i /><i /><i /></div>
                    <div className="window-chart"><span /><span /><span /><span /><span /><span /><span /></div>
                    <div className="window-lines"><i /><i /><i /></div>
                  </div>
                </div>
              </div>
              <div className="visual-label"><span className="visual-label-dot" /> CONCEPT PREVIEW <span>NOT LIVE</span></div>
            </div>
          </div>
        </section>

        <section className="section process-section">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow eyebrow-blue">HOW WE WORK</p>
              <h2>A clear process, from <span>first conversation to handover.</span></h2>
              <p className="section-intro process-intro">Good outcomes begin with shared understanding. The exact approach depends on the project and its scope.</p>
            </div>
            <div className="process-grid">
              {steps.map(([number, title, description]) => (
                <div className="process-step" key={number}>
                  <span className="process-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="container closing-panel">
            <div className="closing-decoration" aria-hidden="true"><BrandMark /></div>
            <div>
              <p className="eyebrow">YOUR NEXT STEP STARTS HERE</p>
              <h2>Have a business challenge<br />you want to solve?</h2>
              <p>Tell us what you are trying to achieve. We can start with a conversation about the problem and what a sensible next step could look like.</p>
            </div>
            <a className="button button-light" href="/contact">Start a conversation <ArrowIcon /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <Link className="brand footer-brand" href="/" aria-label="Nexora Technologies home">
            <BrandMark />
            <span className="brand-copy"><strong>Nexora</strong><span>TECHNOLOGIES</span></span>
          </Link>
          <p className="footer-tagline">Building What Comes Next.</p>
          <div className="footer-links">
            <a href="/services">Services</a><a href="/products">Products</a><a href="/about">About</a><a href="/contact">Contact</a>
            <a href="/privacy">Privacy</a><a href="/terms">Terms</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Nexora Technologies. All rights reserved.</span>
          <span>Built with purpose. Designed for people.</span>
        </div>
      </footer>
    </>
  );
}
