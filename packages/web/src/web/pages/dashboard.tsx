import { useEffect, useRef, useState } from "react";
import Wellness from "../nutrition/wellness";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Droplet,
  Plus,
  X,
  Settings2,
  MapPin,
  Check,
  GlassWater,
  Trash2,
  ArrowLeft,
  ArrowUp,
  Info,
  BookOpen,
} from "lucide-react";

type Entry = { id: string; amount: number; time: string; sample?: boolean };
type Store = {
  location: string;
  goal: number;
  logs: Record<string, Entry[]>;
  minerals: number[];
  seeded: boolean;
};
const locations = ["London", "Barcelona", "New York"];
const mineralNames = ["Calcium", "Magnesium", "Sodium", "Potassium"];
const mineralSymbols = ["Ca", "Mg", "Na", "K"];
const colors = ["#bedf8a", "#a8c8e3", "#e9c799", "#c4b3de"];
const today = () => new Date().toLocaleDateString("en-CA");
const keyFor = (location: string, day: string) => `${location}:${day}`;
function initial(): Store {
  try {
    const stored = JSON.parse(localStorage.getItem("hidrataccion-v1") || "null");
    if (stored && Array.isArray(stored.minerals) && stored.logs) return stored;
  } catch {}
  return {
    location: "London",
    goal: 2500,
    minerals: [80, 24, 12, 4],
    seeded: true,
    logs: {
      [keyFor("London", today())]: [
        { id: "s1", amount: 350, time: "08:15", sample: true },
        { id: "s2", amount: 500, time: "10:30", sample: true },
        { id: "s3", amount: 300, time: "12:45", sample: true },
        { id: "s4", amount: 500, time: "14:10", sample: true },
      ],
    },
  };
}

function Modal({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  return (
    <dialog ref={ref} onCancel={close}>
      <div className="modal-inner">
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="icon-button" onClick={close} aria-label="Close dialog">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

export default function Dashboard() {
  const [store, setStore] = useState<Store>(initial);
  const [date, setDate] = useState(today());
  const [modal, setModal] = useState<"log" | "settings" | "guide" | "history" | null>(null);
  const [amount, setAmount] = useState(250);
  const [goal, setGoal] = useState(store.goal);
  const [draftMinerals, setDraftMinerals] = useState(store.minerals);
  const [locationOpen, setLocationOpen] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    localStorage.setItem("hidrataccion-v1", JSON.stringify(store));
  }, [store]);
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(t);
  }, [notice]);
  const key = keyFor(store.location, date);
  const logs = store.logs[key] || [];
  const total = logs.reduce((a, b) => a + b.amount, 0);
  const percentage = Math.round((total / store.goal) * 100);
  const remaining = Math.max(store.goal - total, 0);
  const sample = logs.some((l) => l.sample);
  function add(value: number) {
    const entry = {
      id: crypto.randomUUID(),
      amount: value,
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    };
    setStore((s) => ({ ...s, logs: { ...s.logs, [key]: [...(s.logs[key] || []), entry] } }));
    setModal(null);
    setNotice(`${value} ml logged. A little sip, a little progress.`);
  }
  function remove(id: string) {
    setStore((s) => ({
      ...s,
      logs: { ...s.logs, [key]: (s.logs[key] || []).filter((l) => l.id !== id) },
    }));
  }
  function fresh() {
    setStore((s) => ({
      ...s,
      seeded: false,
      logs: Object.fromEntries(
        Object.entries(s.logs).map(([k, v]) => [k, v.filter((e) => !e.sample)]),
      ),
    }));
    setNotice("Sample entries cleared. Your own entries are safe.");
  }
  function openSettings() {
    setGoal(store.goal);
    setDraftMinerals([...store.minerals]);
    setModal("settings");
  }
  const dayLabel = new Date(date + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <div className="site-shell">
      <header className="header">
        <a className="brand" href="/" aria-label="Warer — inicio">
          <span className="brand-mark">
            <Droplet size={19} fill="currentColor" strokeWidth={1.5} />
          </span>
          Warer<span className="brand-period">.</span>
        </a>
        <nav aria-label="Main navigation">
          <button
            className="nav-active"
            onClick={() => {
              setDate(today());
              setModal(null);
            }}
          >
            Overview
          </button>
          <button onClick={() => setModal("history")}>Your history</button>
          <button onClick={() => setModal("guide")}>
            Hydration guide <ArrowUpRight size={13} />
          </button>
        </nav>
        <button className="settings-button" onClick={openSettings}>
          <Settings2 size={15} /> Preferences
        </button>
      </header>
      <main>
        <section className="intro">
          <div>
            <div className="eyebrow">
              <span className="tiny-dot" /> A LITTLE WATER. A BETTER YOU.
            </div>
            <h1>
              Good habits start
              <br />
              with{" "}
              <span className="highlight">
                a little sip.
                <svg viewBox="0 0 260 15">
                  <path d="M3 8 Q110 -2 255 7 M20 13 Q140 5 242 11" />
                </svg>
              </span>
            </h1>
            <p>Your daily hydration, made simple. Less guessing, more feeling good.</p>
          </div>
          <div className="intro-note">
            <svg viewBox="0 0 90 60" aria-hidden="true">
              <path d="M8 10 Q62 -1 69 32 Q73 59 37 44 Q25 32 45 24 Q59 18 74 26 M64 18 L76 27 L68 37" />
            </svg>
            <span>
              small sips,
              <br />
              big difference.
            </span>
          </div>
        </section>
        <nav className="wellness-section-nav" aria-label="Apartados de bienestar">
          <a href="#hidratacion">
            <Droplet size={15} /> Hidratación <span>Tu agua, día a día</span>
          </a>
          <a href="#jugos">
            <GlassWater size={15} /> Jugos saludables <ArrowUpRight size={14} />
          </a>
          <a href="#nutricion">
            <BookOpen size={15} /> Guía nutricional <ArrowUpRight size={14} />
          </a>
        </nav>
        <div className="dashboard-toolbar" id="hidratacion">
          <div className="day-label">
            <span className="tiny-dot" /> {date === today() ? "Today" : "Your day"}{" "}
            <span className="date-label">{dayLabel}</span>
          </div>
          <div className="location-control">
            <MapPin size={15} />
            <span className="location-caption">Tracking in</span>
            <button aria-expanded={locationOpen} onClick={() => setLocationOpen(!locationOpen)}>
              {store.location}
              <ChevronDown size={15} />
            </button>
            {locationOpen && (
              <div className="location-menu">
                {locations.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setStore((s) => ({ ...s, location: l }));
                      setLocationOpen(false);
                    }}
                  >
                    {l}
                    {l === store.location && <Check size={14} />}
                  </button>
                ))}
                <p>Water logs stay separate by location.</p>
              </div>
            )}
          </div>
        </div>
        <section className="dashboard-grid">
          <div className="index-panel">
            <div className="panel-top">
              <h2>Daily hydration</h2>
              <span className="soft-pill">
                <span className="tiny-dot" />
                {percentage >= 100 ? "Goal reached" : total ? "Keep it flowing" : "A fresh start"}
              </span>
            </div>
            <div className="ring-content">
              <div className="ring">
                <svg viewBox="0 0 290 290" aria-label={`${percentage}% of hydration goal`}>
                  <circle className="ring-track" cx="145" cy="145" r="123" />
                  <circle
                    className="ring-progress"
                    cx="145"
                    cy="145"
                    r="123"
                    strokeDasharray={`${(Math.min(percentage, 100) / 100) * 773} 773`}
                  />
                </svg>
                <div className="ring-center">
                  <span className="ring-label">HYDRATION INDEX</span>
                  <strong>
                    {percentage}
                    <span>%</span>
                  </strong>
                  <span className="ring-sub">of your daily goal</span>
                </div>
              </div>
              <div className="intake-summary">
                <span className="label">YOU'VE HAD</span>
                <div className="intake-value">
                  {total.toLocaleString()}
                  <span>ml</span>
                </div>
                <div className="goal-line">
                  of {store.goal.toLocaleString()} ml daily goal
                  <button className="text-icon" aria-label="Edit daily goal" onClick={openSettings}>
                    <Settings2 size={13} />
                  </button>
                </div>
                <div className="summary-divider" />
                <p>
                  <span className="mini-drop">
                    <Droplet size={15} />
                  </span>
                  {remaining ? (
                    <>
                      <strong>{remaining.toLocaleString()} ml</strong> to go.
                      <br />
                      <span className="summary-second">You're making every sip count.</span>
                    </>
                  ) : (
                    <>
                      <strong>You did it.</strong>
                      <br />
                      <span className="summary-second">Your daily goal is in the glass.</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="panel-bottom">
              <span>
                <span className="tiny-dot" />
                {sample
                  ? "Sample day · explore the tracker"
                  : "Your progress, saved on this device"}
              </span>
              {sample ? (
                <button onClick={fresh}>
                  Start fresh <ArrowUpRight size={13} />
                </button>
              ) : (
                <span>{logs.length} drinks logged</span>
              )}
            </div>
          </div>
          <div className="log-panel">
            <div className="panel-top">
              <h2>Time for a top-up?</h2>
              <span className="icon-circle">
                <Droplet size={17} />
              </span>
            </div>
            <p>One glass closer to a good day.</p>
            <div className="glass-art" aria-hidden="true">
              <svg viewBox="0 0 200 180">
                <defs>
                  <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#d8f7a5" />
                    <stop offset="1" stopColor="#c0e986" />
                  </linearGradient>
                </defs>
                <ellipse cx="100" cy="153" rx="57" ry="8" fill="#e9ece4" />
                <path
                  d="M51 34 L64 145 Q100 159 136 145 L149 34"
                  fill="#fafcf6"
                  stroke="#cbd3c4"
                  strokeWidth="2"
                />
                <path d="M57 74 L65 143 Q100 155 135 143 L143 74" fill="url(#water)" />
                <ellipse cx="100" cy="74" rx="43" ry="8" fill="#e7f8c9" stroke="#c1df9a" />
                <ellipse
                  cx="100"
                  cy="34"
                  rx="49"
                  ry="9"
                  fill="#fff"
                  stroke="#cbd3c4"
                  strokeWidth="2"
                />
                <path
                  d="M63 44 L69 132"
                  stroke="white"
                  strokeWidth="5"
                  strokeLinecap="round"
                  opacity=".85"
                />
                <circle cx="119" cy="111" r="3" fill="#ebfad7" />
                <circle cx="125" cy="91" r="2" fill="#ebfad7" />
                <path
                  d="M157 45 l9 -8 M164 62 l11 1 M44 85 l-11 -3"
                  stroke="#a7bc8d"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span>Your next good habit.</span>
            </div>
            <div className="quick-add">
              {[150, 250, 500].map((v) => (
                <button key={v} onClick={() => add(v)}>
                  <Plus size={13} />
                  {v} ml
                </button>
              ))}
            </div>
            <button
              className="primary-button"
              onClick={() => {
                setAmount(250);
                setModal("log");
              }}
            >
              <Plus size={17} /> Log water <ArrowUpRight size={17} />
            </button>
            <span className="log-note">A different amount? Make it your own.</span>
          </div>
        </section>
        <section className="mineral-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">MORE THAN JUST H₂O</span>
              <h2>
                The little things in your water<span>.</span>
              </h2>
            </div>
            <button className="link-button" onClick={openSettings}>
              Your water profile <ArrowUpRight size={15} />
            </button>
          </div>
          <div className="mineral-grid">
            {mineralNames.map((name, i) => (
              <div className="mineral" key={name}>
                <div className="mineral-top">
                  <span className="element" style={{ background: colors[i] }}>
                    {mineralSymbols[i]}
                  </span>
                  <span>{name}</span>
                  <ArrowUpRight size={14} />
                </div>
                <div className="mineral-value">
                  {+((store.minerals[i] * total) / 1000).toFixed(1)}
                  <span>mg</span>
                </div>
                <span className="mineral-note">estimated from today's water</span>
                <div className="particles" aria-hidden="true">
                  {Array.from({ length: 104 }, (_, n) => (
                    <i
                      key={n}
                      style={{
                        background:
                          n < Math.min(104, Math.round((total / store.goal) * 104))
                            ? colors[i]
                            : "#edf0e9",
                        width: `${3 + ((n * 7) % 4)}px`,
                        height: `${3 + ((n * 7) % 4)}px`,
                        transform: `translate(${((n * 11) % 5) - 2}px,${((n * 13) % 7) - 3}px)`,
                      }}
                    />
                  ))}
                </div>
                <div className="concentration">
                  <span>Water concentration</span>
                  <strong>{store.minerals[i]} mg/L</strong>
                </div>
              </div>
            ))}
          </div>
          <p className="estimate-note">
            <Info size={13} /> Estimates use your water profile, not live measurements. Edit
            concentrations from your bottle label. Not a dietary intake assessment.
          </p>
        </section>
        <section className="activity-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">ONE SIP AT A TIME</span>
              <h2>
                Your day, in glasses<span>.</span>
              </h2>
            </div>
            <span className="count-label">
              {logs.length} entries <span>·</span>{" "}
              {sample ? "Includes sample data" : "Personal log"}
            </span>
          </div>
          <div className="activity-table">
            <div className="table-header">
              <span>DRINK</span>
              <span>TIME</span>
              <span>AMOUNT</span>
              <span />
            </div>
            {logs.length ? (
              [...logs].reverse().map((l) => (
                <div className="table-row" key={l.id}>
                  <span className="drink-name">
                    <span className="drink-icon">
                      <GlassWater size={17} />
                    </span>
                    Water {l.sample && <small>Sample</small>}
                  </span>
                  <span className="muted">{l.time}</span>
                  <span className="amount-cell">
                    {l.amount} <small>ml</small>
                  </span>
                  <button
                    className="delete-button"
                    onClick={() => remove(l.id)}
                    aria-label={`Delete ${l.amount} ml entry at ${l.time}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <GlassWater size={25} />
                <p>A blank glass, a fresh start.</p>
                <button className="link-button" onClick={() => setModal("log")}>
                  Log your first sip <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </section>
        <Wellness />
        <section className="bottom-banner">
          <span className="banner-star">✳</span>
          <div>
            <h3>A little consistency goes a long way.</h3>
            <p>Build a habit that feels good. Your next sip is a great place to start.</p>
          </div>
          <button onClick={() => setModal("guide")}>
            Make hydration a habit <ArrowUpRight size={16} />
          </button>
        </section>
      </main>
      <footer>
        <a className="brand" href="/">
          Warer.
        </a>
        <span>Made for your everyday flow.</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top <ArrowUp size={13} />
        </button>
      </footer>
      {notice && (
        <output className="toast" aria-live="polite">
          <Check size={16} />
          {notice}
        </output>
      )}
      {modal === "log" && (
        <Modal title="Every sip counts." close={() => setModal(null)}>
          <p className="modal-copy">
            Add water to your {store.location} log for {dayLabel}.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (amount > 0 && amount <= 5000) add(amount);
            }}
          >
            <label>
              Water amount (ml)
              <input
                aria-label="Water amount (ml)"
                type="number"
                min="1"
                max="5000"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </label>
            <div className="modal-presets">
              {[150, 250, 350, 500, 750].map((v) => (
                <button
                  type="button"
                  className={amount === v ? "selected" : ""}
                  key={v}
                  onClick={() => setAmount(v)}
                >
                  {v} ml
                </button>
              ))}
            </div>
            <button className="primary-button" type="submit">
              <Plus size={17} /> Add to my day <ArrowRight size={17} />
            </button>
          </form>
        </Modal>
      )}
      {modal === "settings" && (
        <Modal title="Make it your own." close={() => setModal(null)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStore((s) => ({ ...s, goal, minerals: draftMinerals }));
              setModal(null);
              setNotice("Your goal and water profile are saved.");
            }}
          >
            <label>
              Daily water goal (ml)
              <input
                aria-label="Daily water goal (ml)"
                type="number"
                min="250"
                max="10000"
                step="50"
                required
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
              />
            </label>
            <p className="modal-copy">
              2,500 ml is a starting placeholder, not a medical recommendation. Choose a goal
              appropriate for you.
            </p>
            <h3>Mineral concentration</h3>
            <p className="modal-copy">
              Illustrative defaults. Replace with your bottle's values in mg per liter. Applies to
              all logged water.
            </p>
            <div className="profile-inputs">
              {mineralNames.map((m, i) => (
                <label key={m}>
                  {m} (mg/L)
                  <input
                    aria-label={`${m} (mg/L)`}
                    type="number"
                    min="0"
                    max="10000"
                    step="0.1"
                    required
                    value={draftMinerals[i]}
                    onChange={(e) =>
                      setDraftMinerals((d) =>
                        d.map((v, n) => (n === i ? Number(e.target.value) : v)),
                      )
                    }
                  />
                </label>
              ))}
            </div>
            <button className="primary-button" type="submit">
              Save preferences <Check size={17} />
            </button>
          </form>
        </Modal>
      )}
      {modal === "guide" && (
        <Modal title="Find your everyday flow." close={() => setModal(null)}>
          <div className="guide-list">
            {[
              [
                "01",
                "Start small",
                "Keep a glass nearby. Pair a sip with a habit you already have, like sitting down to work.",
              ],
              [
                "02",
                "Listen to your body",
                "Needs vary with activity, climate and health. This tracker records water; it does not measure hydration in your body.",
              ],
              [
                "03",
                "Make it yours",
                "Set a personal goal and use the mineral information on your water label. Ask a clinician about specific fluid needs or restrictions.",
              ],
            ].map(([n, t, c]) => (
              <div key={n}>
                <span>{n}</span>
                <section>
                  <h3>{t}</h3>
                  <p>{c}</p>
                </section>
              </div>
            ))}
          </div>
          <button
            className="primary-button"
            onClick={() => {
              setModal("log");
            }}
          >
            Ready for a sip <ArrowRight size={17} />
          </button>
        </Modal>
      )}
      {modal === "history" && (
        <Modal title="Your hydration history." close={() => setModal(null)}>
          <p className="modal-copy">
            Choose a date to see or update its log in {store.location}. Entries are saved in this
            browser only.
          </p>
          <label>
            Choose a day
            <input
              aria-label="Choose a day"
              type="date"
              max={today()}
              value={date}
              onChange={(e) => {
                if (e.target.value) setDate(e.target.value);
              }}
            />
          </label>
          <div className="history-total">
            <span>{dayLabel}</span>
            <strong>{total.toLocaleString()} ml</strong>
            <p>
              {logs.length} drinks · {percentage}% of current goal
            </p>
          </div>
          <button className="primary-button" onClick={() => setModal(null)}>
            <ArrowLeft size={16} /> View this day <ArrowRight size={16} />
          </button>
        </Modal>
      )}
    </div>
  );
}
