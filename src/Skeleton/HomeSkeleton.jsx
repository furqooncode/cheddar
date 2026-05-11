import useTheme from '../Client/Toggletheme.jsx';

const shimmerStyle = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s infinite',
};

const css = `
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
`;

function Bone({ className, style }) {
  return (
    <div
      className={`rounded-xl ${className}`}
      style={{ ...shimmerStyle, ...style }}
    />
  );
}

export default function HomeSkeleton() {
  const { colors } = useTheme();

  return (
    <div style={{ background: colors.background, minHeight: '100vh' }}>
      <style>{css}</style>

      <div className="p-3 sm:p-4 flex flex-col gap-5">

        {/* Announce skeleton — tall hero card */}
        <Bone
          className="w-full rounded-2xl"
          style={{ height: 320, backgroundColor: colors.container }}
        />

        {/* Filter tags row */}
        <div className="flex items-center gap-2 overflow-hidden">
          <Bone style={{ width: 20, height: 20, borderRadius: 4, flexShrink: 0, backgroundColor: colors.container }} />
          {[80, 70, 90, 85, 65].map((w, i) => (
            <Bone
              key={i}
              className="flex-shrink-0 h-7 rounded-lg"
              style={{ width: w, backgroundColor: colors.container }}
            />
          ))}
        </div>

        {/* Product cards grid — 2 cols */}
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.container }}
            >
              {/* Image area */}
              <Bone
                className="w-full rounded-none"
                style={{ aspectRatio: '3/4', backgroundColor: colors.container }}
              />

              {/* Info area */}
              <div className="p-3 flex flex-col gap-2">
                {/* Name */}
                <Bone className="h-3 w-4/5" style={{ backgroundColor: colors.border }} />
                <Bone className="h-3 w-3/5" style={{ backgroundColor: colors.border }} />

                {/* Size + color row */}
                <div className="flex items-center justify-between mt-1">
                  <Bone className="h-6 w-10 rounded-lg" style={{ backgroundColor: colors.border }} />
                  <Bone className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.border }} />
                </div>

                {/* Price + cart row */}
                <div className="flex items-end justify-between mt-1">
                  <div className="flex flex-col gap-1">
                    <Bone className="h-3 w-16" style={{ backgroundColor: colors.border }} />
                    <Bone className="h-3 w-12" style={{ backgroundColor: colors.border }} />
                  </div>
                  <Bone className="w-10 h-10 rounded-full" style={{ backgroundColor: colors.border }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>


    </div>
  );
}
