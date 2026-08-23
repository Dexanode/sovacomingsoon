import Link from "next/link";

const REGISTRY = "0x953a4edC84CEBdC113688310F54adce6Dc2c8bCf";
const SCHEMA = "0xa4fd4d46f668808d9c08e88f8c48ae38525e9089c3623e3425ac895128ffb526";
const CLAIM = "0x2bc2f60ae0fbd643015653010057be9f6f3ae1585aa8dc514c415b54c57f1bc1";
const ISSUER = "0x9325B1eba43AD4A3104D191909fFa0DcFabB2B28";

function Short({ value }: { value: string }) {
  return <span title={value}>{value.slice(0, 10)}…{value.slice(-8)}</span>;
}

export default function Home() {
  return <main>
    <header className="site-nav shell">
      <Link href="/" className="brand"><img src="/assets/sova-white.png" alt="SOVA Protocol" /></Link>
      <nav><a href="#protocol">Protocol</a><a href="#proof">Proof</a><a href="#developers">Developers</a></nav>
      <div className="network-pill"><i /> Whitechain Sepolia · 1874</div>
    </header>

    <section className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">Verifiable reputation / Whitechain</p>
        <h1>Reputation should be <em>proven.</em><br />Not guessed.</h1>
        <p className="lede">SOVA turns issuer-signed, schema-bound claims into verifiable onchain attestations. Consumers decide what qualifies through explicit, inspectable policies.</p>
        <div className="hero-actions"><Link className="button primary" href="/docs/architecture">Explore the protocol ↗</Link><Link className="button" href="/docs/api">Read the API</Link></div>
        <div className="hero-facts"><span><b>01</b> No universal score</span><span><b>02</b> Policy-driven decisions</span><span><b>03</b> Verifiable onchain</span></div>
      </div>
      <div className="proof-card" id="proof">
        <div className="proof-top"><span>LIVE ATTESTATION</span><span className="active"><i /> ACTIVE</span></div>
        <div className="proof-mark">S</div>
        <dl>
          <div><dt>STATUS</dt><dd className="green">USABLE</dd></div>
          <div><dt>NETWORK</dt><dd>WHITECHAIN SEPOLIA</dd></div>
          <div><dt>ISSUER</dt><dd><Short value={ISSUER} /></dd></div>
          <div><dt>SCHEMA</dt><dd><Short value={SCHEMA} /></dd></div>
          <div><dt>ATTESTATION</dt><dd><Short value={CLAIM} /></dd></div>
        </dl>
        <div className="proof-stamp"><span>REGISTRY VERIFIED</span><b>CHAIN / 1874</b></div>
      </div>
    </section>

    <section className="ecosystem-band"><div className="shell ecosystem-grid">
      <div><span>ECOSYSTEM</span><strong>WhiteBIT</strong><p>Exchange at the center of the broader ecosystem.</p></div><i>→</i>
      <div><span>EXECUTION</span><strong>Whitechain</strong><p>EVM-equivalent testnet where SOVA is deployed.</p></div><i>→</i>
      <div className="accent"><span>REPUTATION</span><strong>SOVA</strong><p>Evidence dApps can verify and evaluate.</p></div><i>→</i>
      <div><span>DECISION</span><strong>Consumers</strong><p>Lending, access, rewards, and onchain products.</p></div>
    </div></section>

    <section className="section shell" id="protocol">
      <div className="section-heading"><div><p className="eyebrow">The reputation layer</p><h2>Evidence in.<br />Decisions out.</h2></div><p>SOVA separates who makes a claim, where it is recorded, and how it is interpreted. One attestation can support different policies without becoming a single opaque number.</p></div>
      <div className="mechanism-grid">
        <article><span>01 / ISSUE</span><h3>Issuer-signed</h3><p>An authorized issuer signs a structured claim against a versioned schema.</p><code>SIGN(payload, issuer_key)</code></article>
        <article><span>02 / VERIFY</span><h3>Registry-backed</h3><p>The registry anchors status, validity, issuer authorization, and revocation onchain.</p><code>registry.isUsable(id)</code></article>
        <article><span>03 / DECIDE</span><h3>Policy-driven</h3><p>Each consumer declares the evidence it requires. The result stays explainable.</p><code>evaluate(attestation, policy)</code></article>
      </div>
    </section>

    <section className="policy-section shell">
      <div><p className="eyebrow">Explicit policy / Not a score</p><h2>Same claim.<br />Different requirements.</h2><p>A consumer can accept a currently usable public attestation, while another can require an additional private disclosure. Both decisions are deterministic—and both can explain why.</p><Link href="/docs/api">See integration patterns →</Link></div>
      <div className="policy-console">
        <div className="console-bar"><span>consumer_policy.json</span><span>● ● ●</span></div>
        <div className="policy-row"><span>schema</span><code><Short value={SCHEMA} /></code></div>
        <div className="policy-row"><span>attestation_status</span><code className="green">ACTIVE</code></div>
        <div className="policy-row"><span>registry_usable</span><code className="green">true</code></div>
        <div className="result accepted"><span>POLICY A</span><div><b>ACCEPTED</b><small>Required public evidence is present.</small></div></div>
        <div className="result rejected"><span>POLICY B</span><div><b>REJECTED</b><small>Private disclosure was required but not supplied.</small></div></div>
      </div>
    </section>

    <section className="chain-section"><div className="shell chain-inner">
      <div><p className="eyebrow">Deployed proof</p><h2>Built on Whitechain Sepolia.</h2><p>SOVA v0.1 is running on Whitechain&apos;s public L2 testnet with registry, schema governance, authorized issuers, relayed issuance, revocation, indexing, and policy evaluation.</p></div>
      <div className="chain-stats"><div><span>CHAIN ID</span><strong>1874</strong></div><div><span>CAMPAIGN</span><strong>22/22</strong><small>synthetic API checks passed</small></div><div><span>REGISTRY</span><strong><Short value={REGISTRY} /></strong></div><div><span>RELEASE</span><strong>v0.1</strong><small>testnet integration freeze</small></div></div>
    </div></section>

    <section className="developer-section shell" id="developers">
      <div><p className="eyebrow">For builders</p><h2>Verify in one request.<br />Decide in the next.</h2><p>Read indexed attestations through the REST API or verify authoritative state directly in the Solidity registry.</p><div className="hero-actions"><Link className="button primary" href="/docs/api">Open API reference</Link><a className="text-link" href="https://github.com/Dexanode/sova-protocol" target="_blank" rel="noreferrer">View GitHub ↗</a></div></div>
      <pre className="code-window"><span>GET</span> /v1/attestations/{CLAIM.slice(0,10)}…{`\n\n{\n  `}&quot;status&quot;: <b>&quot;ACTIVE&quot;</b>,{`\n  `}&quot;usable&quot;: <b>true</b>,{`\n  `}&quot;chainId&quot;: <strong>1874</strong>{`\n}`}</pre>
    </section>

    <aside className="notice shell"><b>TESTNET NOTICE</b><span>SOVA v0.1 is testnet software. Independent security audit is pending. Do not use it for production financial decisions.</span></aside>
    <footer><div className="shell footer-inner"><div><img src="/assets/sova-white.png" alt="SOVA Protocol" /><p>Verifiable reputation infrastructure for onchain products.</p></div><div><span>PROTOCOL</span><Link href="/docs/architecture">Architecture</Link><Link href="/docs/api">API reference</Link></div><div><span>ECOSYSTEM</span><a href="https://whitechain.io" target="_blank" rel="noreferrer">Whitechain ↗</a><a href="https://whitebit.com" target="_blank" rel="noreferrer">WhiteBIT ↗</a></div><div><span>BUILD</span><a href="https://github.com/Dexanode/sova-protocol" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:hello@sovaprotocol.xyz">Contact</a></div></div><div className="shell footer-bottom"><span>© 2026 SOVA Protocol</span><span>Independent project · Ecosystem references do not imply endorsement.</span></div></footer>
  </main>;
}
