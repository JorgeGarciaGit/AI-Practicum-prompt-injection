interface FlowArrowProps {
  label?: string;
}

export default function FlowArrow({ label }: FlowArrowProps) {
  return (
    <div className="flow-arrow">
      <div className="flow-line" />
      {label && <span className="flow-label">{label}</span>}
      <div className="flow-head">▼</div>
    </div>
  );
}