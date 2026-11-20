"use client";

import { useState } from "react";
import Link from "next/link";
import { STATUS_CODES, getStatus } from "../lib/status-codes";
import "./errors.css";

export default function StatusExplorer() {
  const [selected, setSelected] = useState(404);
  const current = getStatus(selected);

  const groups = [
    { label: "Something on your side (4xx)", items: STATUS_CODES.filter((s) => s.group === "client") },
    { label: "Something on our side (5xx)", items: STATUS_CODES.filter((s) => s.group === "server") },
  ];

  return (
    <div className="container stx">
      <div>
        {groups.map((g) => (
          <div key={g.label}>
            <p className="stx-group">{g.label}</p>
            {g.items.map((s) => (
              <button
                key={s.code}
                type="button"
                className="stx-item"
                aria-pressed={s.code === selected}
                onClick={() => setSelected(s.code)}
              >
                <b>{s.code}</b>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        ))}
      </div>

      <article className="stx-detail" aria-live="polite">
        <p className="err-code" aria-hidden="true">{current.code}</p>
        <h2>
          <span className="sr-only">{current.code}. </span>
          {current.title}
        </h2>
        <p>{current.lead}</p>
        <p className="stx-todo">
          <strong>What to do</strong>
          {current.todo}
        </p>
        {current.code === 404 && (
          <Link href="/no-such-page" className="btn-outline">See the real 404 page</Link>
        )}
      </article>
    </div>
  );
}
