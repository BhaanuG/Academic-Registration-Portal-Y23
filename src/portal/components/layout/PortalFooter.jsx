import { Link } from "react-router";
export default function PortalFooter({ returnTo }) {
  return (
    <footer>
      <span>Koneru Lakshmaiah Education Foundation</span>
      <Link to="/KLEF/3-2/Developer/G-Bhaanu-Sai" state={{ from: returnTo || "/" }}>
        Designed &amp; Developed by GBS
      </Link>
      <span>Academic Registration Portal · CSE-2</span>
    </footer>
  );
}
