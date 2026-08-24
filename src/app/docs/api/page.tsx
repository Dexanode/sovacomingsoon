"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Sun, Check, Copy } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "@/components/landing-experience.module.css";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      type="button"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        font: "700 11px var(--font-mono)",
        color: copied ? "var(--good)" : "var(--accent)",
        background: "var(--surface-2)",
        border: "1px solid var(--line)",
        borderRadius: 6,
        padding: "5px 10px",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      {copied ? <Check size={14} weight="bold" /> : <Copy size={14} weight="regular" />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

const SOLIDITY_INTERFACE_CODE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISOVARegistry {
    enum AttestationStatus {
        NONE,
        ACTIVE,
        EXPIRED,
        REVOKED,
        ISSUER_SUSPENDED,
        ISSUER_INACTIVE,
        ISSUER_REVOKED,
        SCHEMA_INACTIVE
    }

    struct AttestationView {
        bytes32 attestationId;
        bytes32 subjectId;
        bytes32 schemaId;
        bytes32 dataHash;
        address issuer;
        uint64 issuedAt;
        uint64 expiresAt;
        uint64 issuerEpoch;
        uint64 revokedAt;
        bytes32 revocationReason;
        AttestationStatus status;
        bool usable;
    }

    function getAttestationView(bytes32 attestationId) external view returns (AttestationView memory);
    function isUsable(bytes32 attestationId) external view returns (bool);
}`;

const LENDING_POOL_EXAMPLE = `contract WhitechainLendingPool {
    ISOVARegistry public immutable registry;

    constructor(address _registry) {
        registry = ISOVARegistry(_registry);
    }

    function getBorrowCollateralRatio(bytes32 attestationId) external view returns (uint256 ratioBps) {
        // 1. Authoritative check onchain
        require(registry.isUsable(attestationId), "SOVA: Attestation unusable or revoked");

        ISOVARegistry.AttestationView memory viewData = registry.getAttestationView(attestationId);
        
        // 2. Active status & expiration validation
        require(viewData.status == ISOVARegistry.AttestationStatus.ACTIVE, "SOVA: Not active");
        require(block.timestamp <= viewData.expiresAt, "SOVA: Attestation expired");

        // 3. Dynamic collateral ratio optimization (e.g. 110% vs 150%)
        return 11000; // 110% collateral for verified high-reputation souls
    }
}`;

const CURL_EXAMPLE = `curl -X GET "https://api.sovaprotocol.xyz/v1/attestations/0x2bc2f60ae0fbd643015653010057be9f6f3ae1585aa8dc514c415b54c57f1bc1" \\
  -H "Accept: application/json"`;

const TS_SDK_EXAMPLE = `import { SovaReadClient } from "@sova-protocol/sdk";
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("https://rpc-testnet.whitechain.io");
const client = new SovaReadClient({
  registryAddress: "0x953a4edC84CEBdC113688310F54adce6Dc2c8bCf",
  provider,
});

// Direct contract read with salted disclosure verification
const isVerified = await client.verifyDisclosure({
  attestationId: "0x...",
  encodedPayload: "0x...",
  salt: "0x...",
});

console.log("Disclosure Verified Onchain:", isVerified);`;

export default function ApiDocsPage() {
  const [light, setLight] = useState(false);
  const [tab, setTab] = useState<"solidity" | "rest" | "sdk">("solidity");
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
          <Link href="/docs/architecture">Architecture</Link>
          <Link href="/docs/api" style={{ color: "var(--accent)" }}>API Reference</Link>
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
          <p>Developer Reference & Integration</p>
          <h2>Solidity & REST Query API</h2>
          <span>
            Integrate SOVA Protocol reputation queries directly into your Whitechain smart contracts via Solidity view calls or fetch registry-backed attestations via REST endpoints.
          </span>
        </div>
      </section>

      {/* Tabs & Content */}
      <section style={{ width: "min(1280px, calc(100% - 48px))", margin: "0 auto 100px" }}>
        
        {/* Tab Buttons */}
        <div style={{ display: "flex", gap: 12, borderBottom: "1px solid var(--line)", paddingBottom: 16, marginBottom: 36, overflowX: "auto" }}>
          {[
            { id: "solidity", label: "Solidity Interface (Onchain)" },
            { id: "rest",     label: "REST & OpenAPI 3.1 (Offchain)" },
            { id: "sdk",      label: "TypeScript SDK" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id as any)}
              style={{
                font: "600 13px var(--font-sans)",
                padding: "10px 18px",
                borderRadius: 10,
                border: "1px solid var(--line)",
                background: tab === t.id ? "var(--accent)" : "var(--surface)",
                color: tab === t.id ? "var(--accent-ink)" : "var(--text)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Solidity */}
        {tab === "solidity" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <div>
              <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: "0 0 10px", color: "var(--text)" }}>
                Solidity Onchain Query Interface
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: 720 }}>
                Query attestation state directly inside your Whitechain smart contracts. `SovaAttestationRegistry` provides gas-efficient view methods to verify subject scores, status enums, and expiration timestamps.
              </p>
            </div>

            {/* ISOVARegistry.sol */}
            <div className={styles.codeWindow} style={{ minHeight: "auto" }}>
              <div style={{ justifyContent: "space-between", alignItems: "center" }}>
                <span>ISOVARegistry.sol (Solidity v0.8.20)</span>
                <CopyButton text={SOLIDITY_INTERFACE_CODE} />
              </div>
              <pre style={{ margin: "20px 0 0", fontSize: 13, lineHeight: 1.65 }}>
                <code>{SOLIDITY_INTERFACE_CODE}</code>
              </pre>
            </div>

            {/* Lending Pool Example */}
            <div style={{ marginTop: 12 }}>
              <h3 style={{ font: "600 20px/1.2 var(--font-display)", margin: "0 0 10px", color: "var(--text)" }}>
                Example: Reputation-Aware Lending Pool
              </h3>
              <div className={styles.codeWindow} style={{ minHeight: "auto" }}>
                <div style={{ justifyContent: "space-between", alignItems: "center" }}>
                  <span>WhitechainLendingPool.sol</span>
                  <CopyButton text={LENDING_POOL_EXAMPLE} />
                </div>
                <pre style={{ margin: "20px 0 0", fontSize: 13, lineHeight: 1.65 }}>
                  <code>{LENDING_POOL_EXAMPLE}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: REST & OpenAPI */}
        {tab === "rest" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <div>
              <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: "0 0 10px", color: "var(--text)" }}>
                SOVA Read API (OpenAPI 3.1)
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: 720 }}>
                The reference HTTP Query API provides high-speed indexed lookups backed by Node.js SQLite (`indexer-sync`), while automatically refreshing attestation status against the authoritative registry contract on every response.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
              {[
                {
                  method: "GET", path: "/v1/subjects/{subjectId}/attestations",
                  desc: "Discover all attestations associated with a subject (WB Soul ID / wallet hash). Results are fetched from SQLite and refreshed through authoritative RPC.",
                  params: "subjectId (bytes32 hex), limit (default 50, max 100)",
                },
                {
                  method: "GET", path: "/v1/attestations/{attestationId}",
                  desc: "Read a single attestation view, including status enum (ACTIVE, EXPIRED, REVOKED, etc.) and boolean usable flag.",
                  params: "attestationId (bytes32 hex)",
                },
                {
                  method: "POST", path: "/v1/verify-disclosure",
                  desc: "Verify disclosed payload data and salt against an attestation commitment hash without leaking data onchain.",
                  params: "Body: { attestationId, encodedPayload, salt }",
                },
                {
                  method: "POST", path: "/v1/evaluate",
                  desc: "Evaluate current registry state against an explicit consumer policy (acceptedIssuers, maxAgeSeconds, requireDisclosure).",
                  params: "Body: { attestationId, policy: { acceptedIssuers, maxAgeSeconds, requireDisclosure } }",
                },
              ].map((ep) => (
                <div key={ep.path} style={{ padding: "22px 24px", border: "1px solid var(--line)", borderRadius: 14, background: "var(--surface)", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ font: "700 11px var(--font-mono)", background: "color-mix(in srgb, var(--good) 15%, transparent)", color: "var(--good)", padding: "4px 8px", borderRadius: 4 }}>
                      {ep.method}
                    </span>
                    <span style={{ font: "600 14px var(--font-mono)", color: "var(--text)" }}>
                      {ep.path}
                    </span>
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{ep.desc}</p>
                  <span style={{ font: "11px var(--font-mono)", color: "var(--muted)" }}>Parameters / Payload: {ep.params}</span>
                </div>
              ))}
            </div>

            {/* cURL Example */}
            <div style={{ marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <h3 style={{ font: "600 20px/1.2 var(--font-display)", margin: 0, color: "var(--text)" }}>
                  Example cURL Query
                </h3>
                <CopyButton text={CURL_EXAMPLE} />
              </div>
              <div className={styles.codeWindow} style={{ minHeight: "auto" }}>
                <pre style={{ margin: "10px 0 0", fontSize: 13, color: "var(--accent)" }}>
                  <code>{CURL_EXAMPLE}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: TypeScript SDK */}
        {tab === "sdk" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            <div>
              <h3 style={{ font: "600 24px/1.2 var(--font-display)", margin: "0 0 10px", color: "var(--text)" }}>
                TypeScript `SovaReadClient`
              </h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65, margin: 0, maxWidth: 720 }}>
                The `@sova-protocol/sdk` package provides a type-safe client that performs direct contract reads via Ethers/Viem and locally verifies salted payload disclosures.
              </p>
            </div>

            <div className={styles.codeWindow} style={{ minHeight: "auto" }}>
              <div style={{ justifyContent: "space-between", alignItems: "center" }}>
                <span>TypeScript SDK Example</span>
                <CopyButton text={TS_SDK_EXAMPLE} />
              </div>
              <pre style={{ margin: "20px 0 0", fontSize: 13, lineHeight: 1.65 }}>
                <code>{TS_SDK_EXAMPLE}</code>
              </pre>
            </div>
          </div>
        )}

        {/* Deployed Active Addresses */}
        <div style={{ marginTop: 56, padding: "28px", borderRadius: 16, border: "1px solid var(--line)", background: "var(--surface)" }}>
          <h3 style={{ font: "600 18px/1.2 var(--font-display)", margin: "0 0 16px", color: "var(--text)" }}>
            Whitechain Sepolia Active Addresses
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { label: "SovaAttestationRegistry", value: "0x953a4edC84CEBdC113688310F54adce6Dc2c8bCf", link: "https://testnet.whitechain.io" },
              { label: "SovaTimelockMultisig",   value: "0x9B1d...a341", link: "https://testnet.whitechain.io" },
              { label: "SOVA Read API (Health)",  value: "http://127.0.0.1:3000/health", link: null },
            ].map((row) => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "var(--surface-2)", borderRadius: 10, border: "1px solid var(--line)" }}>
                <span style={{ font: "600 13px var(--font-sans)", color: "var(--text)" }}>{row.label}</span>
                {row.link ? (
                  <a href={row.link} target="_blank" rel="noreferrer" style={{ font: "12px var(--font-mono)", color: "var(--accent)", textDecoration: "none" }}>{row.value} ↗</a>
                ) : (
                  <span style={{ font: "12px var(--font-mono)", color: "var(--muted)" }}>{row.value}</span>
                )}
              </div>
            ))}
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
