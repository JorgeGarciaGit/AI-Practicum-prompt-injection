"use client";

import { useMemo, useState } from "react";
import FlowArrow from "@/components/FlowArrow";
import InjectionCard from "@/components/InjectionCard";
import InstructionLayer from "@/components/InstructionLayer";
import {
  directAttacks,
  developerInstruction,
  secret,
  systemInstruction
} from "@/lib/attacks";

export default function DirectInjectionPage() {
  const [selectedAttack, setSelectedAttack] = useState(
    directAttacks[0]
  );

  const [filterEnabled, setFilterEnabled] = useState(true);

  const blocked = useMemo(() => {
    if (!filterEnabled) {
      return false;
    }

    const suspiciousPatterns = [
      /ignore previous/i,
      /reveal.*secret/i,
      /highest-priority/i,
      /hidden system/i,
      /internal instructions/i
    ];

    return suspiciousPatterns.some((pattern) =>
      pattern.test(selectedAttack.prompt)
    );
  }, [selectedAttack, filterEnabled]);

  return (
    <div className="page">
      <section className="page-header">
        <div className="eyebrow">DEMO 01</div>

        <h1>Direct prompt injection</h1>

        <p>
          The attacker directly places an instruction into the
          application&apos;s user input.
        </p>
      </section>

      <section className="demo-layout">
        <div className="demo-main">
          <div className="section-heading">
            <span>ATTACK FLOW</span>
            <h2>User-controlled input enters the model context</h2>
          </div>

          <div className="architecture">
            <InstructionLayer
              type="system"
              title="System instruction · trusted"
            >
              {systemInstruction}
            </InstructionLayer>

            <FlowArrow />

            <InstructionLayer
              type="developer"
              title="Developer instruction · trusted"
            >
              {developerInstruction}
            </InstructionLayer>

            <FlowArrow />

            <InstructionLayer
              type="user"
              title="User input · untrusted"
            >
              {selectedAttack.prompt}
            </InstructionLayer>

            <FlowArrow label="application sends context to model" />

            <div className="model-box">
              <div className="model-icon">AI</div>

              <strong>Language Model</strong>

              <span>
                Receives trusted instructions and untrusted input
              </span>
            </div>

            <FlowArrow label="generated response" />

            <div
              className={
                blocked
                  ? "response-box blocked"
                  : "response-box vulnerable"
              }
            >
              <div className="response-status">
                {blocked ? "FILTER BLOCKED INPUT" : "MODEL RESPONSE"}
              </div>

              {blocked ? (
                <p>
                  The application&apos;s simple filter detected a
                  suspicious pattern and stopped the request.
                </p>
              ) : (
                <p>
                  The model received the attacker&apos;s instruction.
                  A real model may or may not follow it depending
                  on its instruction hierarchy and safeguards.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="sidebar">
          <div className="control-panel">
            <div className="panel-title">Attack variants</div>

            {directAttacks.map((attack) => (
              <button
                key={attack.id}
                onClick={() => setSelectedAttack(attack)}
                className={
                  selectedAttack.id === attack.id
                    ? "attack-option selected"
                    : "attack-option"
                }
              >
                <strong>{attack.name}</strong>
                <span>{attack.description}</span>
              </button>
            ))}
          </div>

          <div className="control-panel">
            <div className="panel-title">Input filter</div>

            <button
              className={
                filterEnabled
                  ? "toggle enabled"
                  : "toggle"
              }
              onClick={() => setFilterEnabled(!filterEnabled)}
            >
              <span className="toggle-indicator" />
              {filterEnabled ? "Enabled" : "Disabled"}
            </button>

            <p className="panel-note">
              This intentionally simple filter demonstrates a
              defensive layer. It is not a reliable security
              boundary.
            </p>
          </div>
        </aside>
      </section>

      <section className="attack-example">
        <InjectionCard
          title={selectedAttack.name}
          description={selectedAttack.description}
          content={selectedAttack.prompt}
          dangerous
        />
      </section>

      <section className="takeaway">
        <div>
          <div className="eyebrow">SECURITY TAKEAWAY</div>

          <h2>
            Filtering can reduce obvious attacks, but attackers can
            change the wording.
          </h2>
        </div>

        <p>
          A production application should not rely on keyword
          matching as its only security mechanism. Prompt
          instructions and user-controlled data should remain
          conceptually separate.
        </p>
      </section>

      <section className="secret-demo">
        <div className="secret-label">PROTECTED DATA</div>

        <code>{secret}</code>

        <p>
          This value represents information that the application
          should not expose simply because a user asks the model to
          reveal it.
        </p>
      </section>
    </div>
  );
}