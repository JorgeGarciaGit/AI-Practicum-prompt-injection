interface InstructionLayerProps {
  type: "system" | "developer" | "user" | "external";
  title: string;
  children: string;
}

export default function InstructionLayer({
  type,
  title,
  children
}: InstructionLayerProps) {
  return (
    <div className={`instruction-layer ${type}`}>
      <div className="instruction-title">
        <span className="instruction-dot" />
        {title}
      </div>

      <div className="instruction-content">
        {children}
      </div>
    </div>
  );
}