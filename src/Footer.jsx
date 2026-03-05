import colors from './color.jsx'

export default function Footer() {
  return (
    <footer style={{ background: colors.container, borderTop: `1px solid ${colors.border}` }}
      className="w-full px-6 py-14 lg:ml-0">

      <div className="max-w-[1200px] mx-auto">

        {/* Top section */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 pb-10"
          style={{ borderBottom: `1px solid ${colors.border}` }}>

          {/* Brand */}
          <div className="flex flex-col gap-3 lg:max-w-[260px]">
            <h2 className="text-3xl tracking-[0.2em] uppercase"
              style={{ color: colors.primaryText, fontFamily: 'Georgia, serif' }}>
              Cheddar
            </h2>
            <p className="text-sm leading-relaxed"
              style={{ color: colors.secondaryText }}>
              Luxury cloth crafted for those who move with intention. Timeless. Refined. Yours.
            </p>

            {/* Socials */}
     <div className="flex gap-3 mt-2">
             {[
                { icon: 'fa-instagram', href: '#' },
                { icon: 'fa-tiktok', href: '#' },
                { icon: 'fa-x-twitter', href: '#' },
                { icon: 'fa-pinterest', href: '#' },
              ].map(({ icon, href }) => (
      <a key={icon} href={href}
       className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-sm transition-all hover:scale-110"
           style={{
          border: `1px solid ${colors.border}`,
       color: colors.secondaryText,
      background: colors.background,
                  }}
     onMouseEnter={e => e.currentTarget.style.color = colors.accent}
       onMouseLeave={e => e.currentTarget.style.color = colors.secondaryText}>
      <i className={`fab ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Shop',
                links: ['New Arrivals', 'Collections', 'Sale', 'Lookbook'],
              },
              {
                title: 'Help',
                links: ['FAQ', 'Shipping & Returns', 'Size Guide', 'Contact Us'],
              },
              {
                title: 'Company',
                links: ['About Us', 'Sustainability', 'Careers', 'Press'],
              },
            ].map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-3">
      <h4 className="text-xs tracking-[0.2em] uppercase font-semibold"
            style={{
            color: colors.primaryText
            }}>
                  {title}
                </h4>
                {links.map(link => (
                  <a key={link} href="#"
                    className="text-sm transition-all"
                    style={{ color: colors.secondaryText }}
                    onMouseEnter={e => e.currentTarget.style.color = colors.accent}
                    onMouseLeave={e => e.currentTarget.style.color = colors.secondaryText}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 lg:max-w-[240px]">
            <h4 className="text-xs tracking-[0.2em] uppercase font-semibold"
              style={{ color: colors.primaryText }}>
              Stay in the loop
            </h4>
            <p className="text-sm" style={{ color: colors.secondaryText }}>
              New drops, exclusive offers, and style notes — straight to your inbox.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <input
                type="email"
                placeholder="your@email.com"
                className="px-4 py-3 text-sm outline-none rounded-lg"
                style={{
                  background: colors.background,
                  border: `1px solid ${colors.border}`,
                  color: colors.primaryText,
                }} />
              <button
                className="px-4 py-3 text-sm rounded-lg tracking-widest uppercase font-semibold transition-all"
                style={{ background: colors.accent, color: colors.background }}
                onMouseEnter={e => e.currentTarget.style.background = colors.linkHover}
                onMouseLeave={e => e.currentTarget.style.background = colors.accent}>
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-center text-xs tracking-widest uppercase"
            style={{ color: colors.secondaryText }}>
            © {new Date().getFullYear()} Cheddar Luxury. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#"
                className="text-xs tracking-wide transition-all"
                style={{ color: colors.secondaryText }}
                onMouseEnter={e => e.currentTarget.style.color = colors.accent}
                onMouseLeave={e => e.currentTarget.style.color = colors.secondaryText}>
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}
