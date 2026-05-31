import { useNavigate } from "react-router-dom";
import useTheme from "../Client/Toggletheme.jsx";

export default function NotFound() {
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: colors.background }}>
      <div className="max-w-xl text-center p-8 rounded-3xl border" style={{ background: colors.container, borderColor: colors.border }}>
        <h1 className="text-5xl font-bold mb-4" style={{ color: colors.primaryText }}>404</h1>
        <p className="text-lg mb-6" style={{ color: colors.secondaryText }}>
          Oops! The page you were looking for could not be found.
        </p>
        <p className="text-sm mb-8" style={{ color: colors.secondaryText }}>
          The route you requested does not exist. Please check the URL or return to a safe page.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate("/Welcome")}
            className="px-6 py-3 rounded-xl font-semibold"
            style={{ background: colors.accent, color: "#fff" }}
          >
            Back to Welcome
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl font-semibold border"
            style={{ borderColor: colors.border, color: colors.text }}
          >
            Go to Previous Page!!
          </button>
        </div>
      </div>
    </div>
  );
}
