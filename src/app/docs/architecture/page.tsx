"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "@/components/landing-experience.module.css";

export default function ArchitectureDocsPage() {
  const [light, setLight] = useState(false);
  const reduce = useReducedMotion();

  return (
    <main className={styles.site} data-theme={light ? "light" : "dark"}>
      {/* Header / Nav */}
      <header className={styles.nav}>
        <Link href="/" className={styles.brand}>
          <Image
            src={light ? "/assets/sova-black.svg" : "/assets/sova-white.png"}
            alt="SOVA Protocol"
            width={138}
            height={48}
            priority
          />
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/docs/architecture" style={{ color: "var(--accent)" }}>Architecture</Link>
          <Link href="/docs/api">API Reference</Link>
        </nav>
        <div className={styles.navActions}>
          <button
            type="button"
            className={styles.themeButton}
            onClick={() => setLight((val) => !val)}
            aria-label={`Switch to ${light ? "dark" : "light"} mode`}
            title={`Switch to ${light ? "dark" : "light"} mode`}
          >
            <motion.span
              key={light ? "moon" : "sun"}
              initial={reduce ? false : { opacity: 0, rotate: -45, scale: 0.75 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.22 }}
            >
              {light ? <Moon size={18} weight="regular" /> : <Sun size={18} weight="regular" />}
            </motion.span>
          </button>
          <a className={styles.appLink} href="https://github.com/Dexanode/sova-protocol" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
      </header>

      {/* Hero Intro Section */}
      <section className={styles.protocol} style={{ padding: "64px 0 40px" }}>
        <div className={styles.sectionIntro}>
          <p>Technical Specification & System Architecture</p>
          <h2>SOVA Protocol Architecture</h2>
          <span>
            A comprehensive guide to SOVA Protocol&#39;s trust boundaries, smart contract registry, salted cryptographic attestations, SQLite event indexer, and Whitechain dApp integration paths.
          </span>
        </div>
      </section>

      {/* Main Content Body */}
      <section style={{ width: "min(1280px, calc(100% - 48px))", margin: "0 auto 100px", display: "flex", flexDirection: "column", gap: 56 }}>
        
        {/* 1. Overview */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: 0, color: "var(--text)" }}>
            1. Overview & Ecosystem Position
          </h3>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            SOVA Protocol operates as the <strong>verifiable reputation layer</strong> for Whitechain L2. While WhiteBIT and WB Soul provide the foundation for identity verification (Who is this user?), SOVA evaluates onchain behavior (How has this identity performed?) and publishes machine-readable scores directly onto Whitechain Sepolia.
          </p>
          <div style={{ padding: 24, borderRadius: 14, border: "1px solid var(--line)", background: "var(--surface)", fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.8, color: "var(--text)" }}>
            <div style={{ color: "var(--good)", fontWeight: 700, marginBottom: 8, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em" }}>ECOSYSTEM STACK PIPELINE</div>
            WhiteBIT (5M+ Users) ➔ Whitechain (Distribution L2) ➔ WB Soul (Identity Anchor) ➔ <strong style={{ color: "var(--accent)" }}>SOVA Engine (Reputation Primitive)</strong> ➔ Whitechain dApps
          </div>
        </div>

        {/* 2. Trust Boundaries & Key Isolation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: 0, color: "var(--text)" }}>
            2. Trust Boundaries & Isolated Signing (Phase 1.3)
          </h3>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            To protect attestation integrity, the pilot architecture strictly separates three processes so that private keys are never exposed to untrusted environments or request files:
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 8 }}>
            {[
              { step: "01. Preparer", title: "Unsigned Request", desc: "Creates synthetic disclosures, random salts, and commitment hashes without access to any private keys." },
              { step: "02. Issuer Signer", title: "EIP-712 Signer", desc: "Validates disclosures via encrypted keystore, refreshes timestamps, and signs exact EIP-712 requests." },
              { step: "03. Relayer", title: "Untrusted Submitter", desc: "Recovers signer from signature, checks skew (<240s), and submits `attestBySig` without ability to alter fields." },
            ].map((box) => (
              <div key={box.step} style={{ padding: 22, borderRadius: 14, border: "1px solid var(--line)", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ font: "700 11px var(--font-mono)", color: "var(--good)" }}>{box.step}</span>
                <span style={{ font: "600 16px var(--font-display)", color: "var(--text)" }}>{box.title}</span>
                <span style={{ color: "var(--muted)", fontSize: 13.5, lineHeight: 1.55 }}>{box.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Smart Contracts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: 0, color: "var(--text)" }}>
            3. Onchain Smart Contracts (Whitechain Sepolia)
          </h3>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            The protocol is governed by three primary smart contracts deployed and verified on Whitechain Sepolia (Chain ID 1874/1875):
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "SovaAttestationRegistry.sol", addr: "0x953a4edC84CEBdC113688310F54adce6Dc2c8bCf", role: "Authoritative storage for salted attestation hashes, score commitments, and getScore(soulId) query views." },
              { name: "SovaTimelockMultisig.sol",   addr: "0x9B1d...a341", role: "Timelocked multi-signature governance controlling registry parameters, issuer permissions, and emergency pauses." },
              { name: "SovaNetworkProof.sol",       addr: "0xC2f4...8b09", role: "Verifies EIP-712 ECDSA proofs and relay authorizations from trusted Pilot Issuers." },
            ].map((c) => (
              <div key={c.name} style={{ padding: "18px 22px", borderRadius: 14, border: "1px solid var(--line)", background: "var(--surface)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ font: "700 14px var(--font-mono)", color: "var(--text)" }}>{c.name}</span>
                  <span style={{ color: "var(--muted)", fontSize: 13.5 }}>{c.role}</span>
                </div>
                <span style={{ font: "12px var(--font-mono)", color: "var(--accent)", background: "var(--surface-2)", padding: "6px 12px", borderRadius: 8, border: "1px solid var(--line)" }}>
                  {c.addr}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Privacy & Salted Attestation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: 0, color: "var(--text)" }}>
            4. Privacy & Salted Cryptographic Attestations
          </h3>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            Raw transaction logs, individual loan balances, and sensitive financial metrics remain <strong>100% offchain</strong> in local SQLite indexes. Only salted cryptographic commitment hashes are written onchain:
          </p>

          <div className={styles.codeWindow} style={{ minHeight: "auto" }}>
            <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.65 }}>
              <code>{`// Commitment Formula
bytes32 commitment = keccak256(
    abi.encodePacked(soulId, rawMetricsHash, salt, nonce)
);

// Onchain Verification
function verifyAttestation(
    uint256 soulId, 
    bytes32 rawMetricsHash, 
    bytes32 salt
) external view returns (bool) {
    return registry.commitments(soulId) == keccak256(abi.encodePacked(soulId, rawMetricsHash, salt));
}`}</code>
            </pre>
          </div>
        </div>

        {/* 5. Persistent Indexer & Query API */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: 0, color: "var(--text)" }}>
            5. Persistent Indexer & Query Service (Phase 1.2)
          </h3>
          <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>
            The Node.js indexer syncs registry logs into a local SQLite database (`indexer-data/whitechain-sepolia.sqlite`). Each sync automatically rewinds 20 blocks to purge reorganized events, fetches in 5,000-block chunks, and transactionally rebuilds projections.
          </p>
          <div style={{ borderRadius: 14, border: "1px solid var(--line)", background: "var(--surface)", padding: 24, font: "13px var(--font-mono)", color: "var(--muted)", lineHeight: 1.8 }}>
            <div>• <strong style={{ color: "var(--text)" }}>Reorg Safety:</strong> 20-block automatic rewind window</div>
            <div>• <strong style={{ color: "var(--text)" }}>Data Storage:</strong> Local Node.js experimental SQLite module</div>
            <div>• <strong style={{ color: "var(--text)" }}>Authoritative Validation:</strong> Every query result is re-checked against SovaAttestationRegistry onchain state before returning.</div>
          </div>
        </div>

        {/* 6. Observability & Limits */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: 0, color: "var(--text)" }}>
            6. Observability & Rate Limiting Controls (Phase 1.5)
          </h3>
          <ul style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.8, margin: 0, paddingLeft: 24 }}>
            <li><strong style={{ color: "var(--text)" }}>X-Request-Id:</strong> Traced on every API request; request bodies & salts are never logged.</li>
            <li><strong style={{ color: "var(--text)" }}>Health Endpoint (/health):</strong> Returns HTTP 503 if indexer lag exceeds `SOVA_MAX_INDEX_LAG_BLOCKS` or SQLite integrity check fails.</li>
            <li><strong style={{ color: "var(--text)" }}>Rate Limiting (/v1/*):</strong> 60 requests per minute per socket connection, returning HTTP 429 Retry-After.</li>
            <li><strong style={{ color: "var(--text)" }}>Metrics (/metrics):</strong> Exposes Prometheus-formatted counters for confirmed index lag without exposing subject addresses.</li>
          </ul>
        </div>

        {/* Footer Callout */}
        <div style={{ borderRadius: 18, border: "1px solid var(--line)", background: "var(--surface)", padding: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ font: "600 20px var(--font-display)", color: "var(--text)", marginBottom: 6 }}>Ready to integrate?</div>
            <div style={{ color: "var(--muted)", fontSize: 14 }}>Explore the smart contract codebase or API specifications.</div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Link href="/docs/api" className={styles.appLink}>
              API Reference →
            </Link>
            <a href="https://github.com/Dexanode/sova-protocol" target="_blank" rel="noreferrer" className={styles.secondaryButton}>
              View GitHub ↗
            </a>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div>
          <Image src={light ? "/assets/sova-black.svg" : "/assets/sova-white.png"} alt="SOVA Protocol" width={135} height={46} />
          <p>Verifiable reputation infrastructure for onchain products.</p>
        </div>
        <div>
          <span>Protocol</span>
          <Link href="/docs/architecture">Architecture</Link>
          <Link href="/docs/api">API Reference</Link>
        </div>
        <div>
          <span>Ecosystem</span>
          <a href="https://whitechain.io" target="_blank" rel="noreferrer">Whitechain ↗</a>
          <a href="https://whitebit.com" target="_blank" rel="noreferrer">WhiteBIT ↗</a>
        </div>
        <div>
          <span>Build</span>
          <a href="https://github.com/Dexanode/sova-protocol" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mailto:hello@sovaprotocol.xyz">Contact</a>
        </div>
        <small>© 2026 SOVA Protocol. Independent project. Ecosystem references do not imply endorsement.</small>
      </footer>
    </main>
  );
}
