import useTheme from '../Client/Toggletheme.jsx';
export default function ConfirmationModal({
  isOpen,
  onClose,
  popmsg,
  actionmsg,
  action,
}) {
  const { colors } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className="w-[85%] max-w-sm rounded-3xl p-6 text-center"
        style={{ backgroundColor: colors.container }}
      >
        <p
          className="text-lg font-semibold mb-6 leading-tight"
          style={{ color: colors.primaryText }}
        >
          {popmsg}
        </p>

        <div className="flex gap-3">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="flex-1 py-3.5 rounded-2xl font-medium transition-all active:scale-95"
            style={{
              backgroundColor: colors.border,
              color: colors.primaryText,
            }}
          >
            Cancel
          </button>

          {/* Action Button */}
          <button
            onClick={() => {
              action();
              onClose();
            }}
            className="flex-1 py-3.5 rounded-2xl font-medium transition-all active:scale-95"
            style={{
              backgroundColor: colors.error || "#ef4444",
              color: "white",
            }}
          >
            {actionmsg}
          </button>
        </div>
      </div>
    </div>
  );
}