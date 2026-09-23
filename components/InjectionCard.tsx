interface InjectionCardProps {
  title: string;
  description: string;
  content: string;
  dangerous?: boolean;
}

export default function InjectionCard({
  title,
  description,
  content,
  dangerous = false
}: InjectionCardProps) {
  return (
    <div
      className={
        dangerous
          ? "injection-card injection-card-danger"
          : "injection-card"
      }
    >
      <div className="card-header">
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        <span className={dangerous ? "badge danger" : "badge"}>
          {dangerous ? "UNTRUSTED" : "EXAMPLE"}
        </span>
      </div>

      <div className="code-block">
        {content}
      </div>
    </div>
  );
}