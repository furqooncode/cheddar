import useTheme from '../Client/Toggletheme.jsx';

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
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.6s infinite',
        ...style,
      }}
    />
  );
}

function ProductCardSkeleton({ colors }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ border: `1px solid ${colors.border}`, backgroundColor: colors.container }}
    >
      {/* Image */}
      <Bone className="w-full rounded-none" style={{ aspectRatio: '3/4', backgroundColor: colors.container }} />

      {/* Info */}
      <div className="p-3 flex flex-col gap-2" style={{ backgroundColor: colors.container }}>
        {/* Name */}
        <Bone className="h-3 w-4/5" style={{ backgroundColor: colors.border }} />
        <Bone className="h-3 w-3/5" style={{ backgroundColor: colors.border }} />

        {/* Description */}
        <Bone className="h-2.5 w-full" style={{ backgroundColor: colors.border }} />
        <Bone className="h-2.5 w-4/6" style={{ backgroundColor: colors.border }} />

        {/* Size + color */}
        <div className="flex items-center justify-between mt-1">
          <Bone className="h-6 w-10 rounded-lg" style={{ backgroundColor: colors.border }} />
          <Bone className="w-4 h-4 rounded-full" style={{ backgroundColor: colors.border }} />
        </div>

        {/* Price + cart */}
        <div className="flex items-end justify-between mt-1">
          <div className="flex flex-col gap-1">
            <Bone className="h-3 w-16" style={{ backgroundColor: colors.border }} />
            <Bone className="h-3 w-12" style={{ backgroundColor: colors.border }} />
          </div>
          <Bone className="w-10 h-10 rounded-full" style={{ backgroundColor: colors.border }} />
        </div>
      </div>
    </div>
  );
}

export default function BrowseSkeleton() {
  const { colors } = useTheme();

  return (
    <div className="min-h-screen w-full" style={{ background: colors.background }}>
      <style>{css}</style>

      {/* Header */}
      <div
        className="w-full px-4 md:px-10 lg:px-16 pt-10 pb-8 flex flex-col gap-3"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <Bone className="h-3 w-16" style={{ backgroundColor: colors.border }} />
        <Bone className="h-8 w-48" style={{ backgroundColor: colors.container }} />
        <Bone className="h-3 w-24" style={{ backgroundColor: colors.border }} />
      </div>

      <div className="w-full px-4 md:px-10 lg:px-16 py-6 flex flex-col gap-6">

        {/* Search bar */}
        <Bone className="w-full h-12 rounded-xl" style={{ backgroundColor: colors.container }} />

        {/* Filter pills */}
        <div className="flex gap-2 overflow-hidden">
          {[60, 80, 90, 70, 65, 75].map((w, i) => (
            <Bone
              key={i}
              className="h-8 flex-shrink-0 rounded-xl"
              style={{ width: w, backgroundColor: colors.container }}
            />
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} colors={colors} />
          ))}
        </div>

      </div>
    </div>
  );
}
