"use client";

import Image from "next/image";
import Link from "next/link";
import { Moon, Sun } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./landing-experience.module.css";

const REGISTRY = "0x953a4edC84CEBdC113688310F54adce6Dc2c8bCf";
const SCHEMA = "0xa4fd4d46f668808d9c08e88f8c48ae38525e9089c3623e3425ac895128ffb526";
const CLAIM = "0x2bc2f60ae0fbd643015653010057be9f6f3ae1585aa8dc514c415b54c57f1bc1";
const ISSUER = "0x9325B1eba43AD4A3104D191909fFa0DcFabB2B28";
const LOOP_WORDS = ["lending", "rewards", "access", "airdrops"];

function Short({ value }: { value: string }) {
  return <span title={value}>{value.slice(0, 8)}...{value.slice(-6)}</span>;
}

function TextLoop() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % LOOP_WORDS.length), 2200);
    return () => window.clearInterval(timer);
  }, [reduce]);
  return <span className={styles.loopWindow} aria-label={LOOP_WORDS.join(", ")}><AnimatePresence mode="wait" initial={false}><motion.span key={LOOP_WORDS[index]} initial={reduce ? false : { y: "70%", opacity: 0, filter: "blur(8px)" }} animate={{ y: 0, opacity: 1, filter: "blur(0px)" }} exit={reduce ? undefined : { y: "-70%", opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}>{LOOP_WORDS[index]}.</motion.span></AnimatePresence></span>;
}

function SpecularLink({ href, children }: { href: string; children: React.ReactNode }) {
  const x = useMotionValue(0); const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18 });
  const springY = useSpring(y, { stiffness: 180, damping: 18 });
  return <motion.div style={{ x: springX, y: springY }} className={styles.specularWrap}><Link className={styles.specularButton} href={href} onPointerMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); x.set((event.clientX - rect.left - rect.width / 2) * 0.1); y.set((event.clientY - rect.top - rect.height / 2) * 0.13); }} onPointerLeave={() => { x.set(0); y.set(0); }}><span>{children}</span><b aria-hidden="true">↗</b></Link></motion.div>;
}

function Lightfall() { return <div className={styles.lightfall} aria-hidden="true"><i /><i /><i /></div>; }

function OrbitNetwork({ light }: { light: boolean }) {
  return <div className={styles.orbitScene} aria-label="SOVA trust network">
    <div className={styles.orbitHalo} />
    <div className={`${styles.orbitTrack} ${styles.outerTrack}`} />
    <div className={`${styles.orbitTrack} ${styles.innerTrack}`} />
    <span className={`${styles.orbitNode} ${styles.issuerNode}`}>Issuer</span>
    <span className={`${styles.orbitNode} ${styles.consumerNode}`}>Consumer</span>
    <span className={`${styles.orbitNode} ${styles.userNode}`}>User</span>
    <span className={`${styles.orbitNode} ${styles.appNode}`}>dApp</span>
    <div className={styles.orbitCore}><Image src={light ? "/assets/sova-black.svg" : "/assets/sova-white.png"} alt="SOVA Protocol" width={118} height={42} priority /><span>Registry</span></div>
    <div className={styles.chainChip}>Whitechain <b>1874</b></div>
  </div>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.22 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>{children}</motion.div>;
}

function ProofReceipt() {
  const ref = useRef<HTMLDivElement>(null); const mx = useMotionValue(0); const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [5, -5]); const rotateY = useTransform(mx, [-0.5, 0.5], [-6, 6]);
  const reduce = useReducedMotion();
  return <motion.div ref={ref} className={styles.receipt} style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1000 }} onPointerMove={(event) => { if (reduce || !ref.current) return; const rect = ref.current.getBoundingClientRect(); mx.set((event.clientX - rect.left) / rect.width - 0.5); my.set((event.clientY - rect.top) / rect.height - 0.5); }} onPointerLeave={() => { mx.set(0); my.set(0); }}>
    <div className={styles.receiptTop}><span>Registry snapshot</span><strong>Recorded active</strong></div>
    <div className={styles.receiptTitle}><span>S</span><div><small>Attestation</small><b><Short value={CLAIM} /></b></div></div>
    <dl><div><dt>Claim state</dt><dd>Usable at capture</dd></div><div><dt>Issuer</dt><dd><Short value={ISSUER} /></dd></div><div><dt>Schema</dt><dd><Short value={SCHEMA} /></dd></div><div><dt>Network</dt><dd>Whitechain Testnet</dd></div></dl>
    <div className={styles.receiptSeal}><i aria-hidden="true">✓</i><span>Recorded from registry<br /><b><Short value={REGISTRY} /></b></span></div>
  </motion.div>;
}

const useCases = [
  { tag: "Credit", title: "Lending that can explain its trust requirements.", body: "Use repayment evidence and issuer rules without reducing a person to one universal score.", type: "credit" },
  { tag: "Growth", title: "Reward durable participation, not temporary wallet activity.", body: "Airdrops and campaigns can require fresh, usable claims from accepted issuers.", type: "growth" },
  { tag: "Identity", title: "Connect WB Soul signals with protocol evidence.", body: "Combine public Whitechain identity signals with SOVA attestations through explicit policy.", type: "identity" },
  { tag: "Access", title: "Make eligibility portable across the ecosystem.", body: "Users carry verifiable evidence. Each app keeps control over its own decision policy.", type: "access" },
];

export default function LandingExperience() {
  const [light, setLight] = useState(false); const [caseIndex, setCaseIndex] = useState(0); const reduce = useReducedMotion();
  return <main className={styles.site} data-theme={light ? "light" : "dark"}>
    <Lightfall />
    <header className={styles.nav}><Link href="/" className={styles.brand}><Image src={light ? "/assets/sova-black.svg" : "/assets/sova-white.png"} alt="SOVA Protocol" width={138} height={48} priority /></Link><nav aria-label="Primary navigation"><a href="#protocol">Protocol</a><a href="#proof">Proof</a><a href="#developers">Developers</a></nav><div className={styles.navActions}><button type="button" className={styles.themeButton} onClick={() => setLight((value) => !value)} aria-label={`Switch to ${light ? "dark" : "light"} mode`} title={`Switch to ${light ? "dark" : "light"} mode`}><motion.span key={light ? "moon" : "sun"} initial={reduce ? false : { opacity: 0, rotate: -45, scale: .75 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} transition={{ duration: .22 }}>{light ? <Moon size={18} weight="regular" /> : <Sun size={18} weight="regular" />}</motion.span></button><a className={styles.appLink} href="https://app.sovaprotocol.xyz">Open dApp</a></div></header>

    <section className={styles.hero}><motion.div className={styles.heroCopy} initial={reduce ? false : "hidden"} animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}><motion.p variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}>Verifiable reputation on Whitechain</motion.p><motion.h1 variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } }}>Evidence people carry.<br />Trust built for <TextLoop /></motion.h1><motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className={styles.heroLede}>Issuer-signed evidence helps Whitechain apps evaluate trust through transparent policies, without a hidden universal score.</motion.div><motion.div variants={{ hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } }} className={styles.heroActions}><SpecularLink href="#protocol">Explore protocol</SpecularLink><Link className={styles.secondaryButton} href="/docs/architecture">Read architecture</Link></motion.div></motion.div><motion.div className={styles.heroVisual} initial={reduce ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}><OrbitNetwork light={light} /></motion.div></section>

    <div className={styles.networkRail}><span>WhiteBIT ecosystem</span><i /><span>Whitechain execution</span><i /><strong>SOVA evidence</strong><i /><span>Consumer decisions</span></div>

    <section className={styles.protocol} id="protocol"><Reveal className={styles.sectionIntro}><p>The reputation layer</p><h2>Evidence becomes useful when every decision stays inspectable.</h2><span>SOVA keeps issuance, registry state, and consumer policy separate. That makes reputation portable without making it opaque.</span></Reveal><div className={styles.flowGrid}><Reveal className={styles.flowLead}><div className={styles.flowOrb}>S</div><h3>One attestation.<br />Many valid decisions.</h3><p>The claim remains stable. Consumers choose the schema, issuer, age, and disclosure requirements that fit their product.</p></Reveal><Reveal className={styles.flowSteps}><article><span>Issuer</span><h3>Signs structured evidence</h3><p>An authorized entity verifies an outcome and signs schema-bound data.</p><code>SIGN(payload, issuer_key)</code></article><article><span>Registry</span><h3>Anchors authoritative state</h3><p>Validity, authorization, and revocation remain directly inspectable onchain.</p><code>registry.isUsable(id)</code></article><article><span>Consumer</span><h3>Evaluates an explicit policy</h3><p>The application accepts or rejects evidence with a reason users can understand.</p><code>evaluate(claim, policy)</code></article></Reveal></div></section>

    <section className={styles.proofSection} id="proof"><Reveal className={styles.proofCopy}><p>Testnet proof</p><h2>Not a promise.<br />A registry record.</h2><span>This is a captured example of an issuer-signed claim recorded as usable on Whitechain Testnet. Applications should query the API or registry for its current state before making a decision.</span><Link href="/docs/api">Check current state via API ↗</Link></Reveal><Reveal className={styles.receiptStage}><ProofReceipt /><div className={styles.stageCaption}><b>Chain 1874</b><span>Recorded registry snapshot. Current state remains authoritative.</span></div></Reveal></section>

    <section className={styles.bentoSection}><Reveal className={styles.sectionIntro}><p>Built for the ecosystem</p><h2>Reputation infrastructure that adapts to the decision.</h2><span>No single score decides every use case. Products compose the evidence they actually need.</span></Reveal><div className={styles.bento}>{useCases.map((item) => <Reveal key={item.tag} className={`${styles.bentoCard} ${styles[item.type]}`}><span>{item.tag}</span><h3>{item.title}</h3><p>{item.body}</p></Reveal>)}</div></section>

    <section className={styles.policySection}><Reveal className={styles.policyHeading}><p>Consumer policy</p><h2>The same claim can pass here and fail there.</h2><span>That is a feature. Each product publishes what it requires, and SOVA returns the reason.</span></Reveal><Reveal className={styles.policyCarousel}><div className={styles.carouselTop}><span>Policy examples</span><div><button type="button" aria-label="Previous policy" onClick={() => setCaseIndex((caseIndex + 1) % 2)}>←</button><button type="button" aria-label="Next policy" onClick={() => setCaseIndex((caseIndex + 1) % 2)}>→</button></div></div><AnimatePresence mode="wait"><motion.div key={caseIndex} className={styles.policySlide} initial={reduce ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? undefined : { opacity: 0, x: -30 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}><div><span>{caseIndex === 0 ? "Public lending policy" : "Private credit policy"}</span><h3>{caseIndex === 0 ? "Accepted" : "Rejected"}</h3><p>{caseIndex === 0 ? "The claim is active, fresh, schema-matched, and issued by an accepted authority." : "The public claim passed, but the required private disclosure was not supplied."}</p></div><dl><div><dt>Registry usable</dt><dd>True</dd></div><div><dt>Accepted issuer</dt><dd>Matched</dd></div><div><dt>Private disclosure</dt><dd className={caseIndex === 0 ? styles.optional : styles.failed}>{caseIndex === 0 ? "Optional" : "Missing"}</dd></div></dl></motion.div></AnimatePresence></Reveal></section>

    <section className={styles.developerSection} id="developers"><Reveal><p>For builders</p><h2>Read evidence.<br />Make the decision.</h2><span>Integrate indexed attestations through REST, or verify authoritative state directly against the Solidity registry.</span><div className={styles.heroActions}><SpecularLink href="/docs/api">Open API reference</SpecularLink><a className={styles.secondaryButton} href="https://github.com/Dexanode/sova-protocol" target="_blank" rel="noreferrer">View GitHub</a></div></Reveal><Reveal className={styles.codeWindow}><div><span>GET</span><small>/v1/attestations/{CLAIM.slice(0, 8)}...</small></div><pre>{`{\n  "status": "ACTIVE",\n  "usable": true,\n  "chainId": 1874\n}`}</pre><i>200 OK</i></Reveal></section>

    <aside className={styles.notice}><b>Testnet notice</b><span>SOVA v0.1 is testnet software. Independent security audit is pending. Do not use it for production financial decisions.</span></aside>
    <footer className={styles.footer}><div><Image src={light ? "/assets/sova-black.svg" : "/assets/sova-white.png"} alt="SOVA Protocol" width={135} height={46} /><p>Verifiable reputation infrastructure for onchain products.</p></div><div><span>Protocol</span><Link href="/docs/architecture">Architecture</Link><Link href="/docs/api">API reference</Link></div><div><span>Ecosystem</span><a href="https://whitechain.io" target="_blank" rel="noreferrer">Whitechain ↗</a><a href="https://whitebit.com" target="_blank" rel="noreferrer">WhiteBIT ↗</a></div><div><span>Build</span><a href="https://github.com/Dexanode/sova-protocol" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:hello@sovaprotocol.xyz">Contact</a></div><small>© 2026 SOVA Protocol. Independent project. Ecosystem references do not imply endorsement.</small></footer>
  </main>;
}
