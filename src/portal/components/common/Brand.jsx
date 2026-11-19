export default function Brand({ compact = false }) {
  return (
    <div className="brand">
      <img className="brand-logo" src="/assets/klef-logo.png" alt="KLEF university logo" />
      <div>
        <strong>Koneru Lakshmaiah Education Foundation</strong>
        {!compact && <span>Deemed to be University</span>}
      </div>
    </div>
  );
}
