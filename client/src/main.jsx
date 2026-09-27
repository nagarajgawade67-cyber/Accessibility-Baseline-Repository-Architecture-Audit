import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

function App() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("Search for a government service.");

  async function submit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setItems([]);
      setStatus("Enter a service name to search.");
      return;
    }
    setStatus("Searching…");
    try {
      const response = await fetch(`${API}/api/services?q=${encodeURIComponent(trimmed)}`);
      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      setItems(data.items);
      setStatus(`${data.items.length} service${data.items.length === 1 ? "" : "s"} found.`);
    } catch {
      setItems([]);
      setStatus("The service is temporarily unavailable. Please try again.");
    }
  }

  return (
    <>
      <header className="site-header">
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <div className="shell">
          <p className="eyebrow">Accessible public-service foundation</p>
          <h1>Find a government service</h1>
          <nav aria-label="Primary">
            <a href="#search">Search</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <main id="main-content" className="shell">
        <section id="search" aria-labelledby="search-heading">
          <h2 id="search-heading">Service search</h2>
          <form onSubmit={submit} role="search">
            <label htmlFor="service-query">Search for a service</label>
            <div className="search-row">
              <input
                id="service-query"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              <button type="submit">Search</button>
            </div>
          </form>

          <p className="status" aria-live="polite">{status}</p>

          {items.length > 0 && (
            <ul className="results" aria-label="Search results">
              {items.map((item) => (
                <li key={item.id}>
                  <a href={item.url}>{item.name}</a>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="about" aria-labelledby="about-heading">
          <h2 id="about-heading">About this foundation</h2>
          <p>
            The first vertical slice demonstrates accessible navigation,
            labelled form controls, keyboard-visible focus, and a server-backed search.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell">
          <p>Accessibility is a product requirement, not a final polish step.</p>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
