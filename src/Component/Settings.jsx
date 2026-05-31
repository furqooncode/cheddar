import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from '../Client/Toggletheme.jsx';
import NavBottom from './NavBottom.jsx';
import ConfirmationModal from './ConfirmationModal.jsx';
import supabase from '../lib/util.jsx';

const SECTIONS = [
  {
    id: "account",
    label: "Account",
    items: [
      { id: "profile",   label: "Edit Profile",      icon: "fas fa-id-card",       arrow: true },
      { id: "email",     label: "Change Email",       icon: "fas fa-envelope",      arrow: true },
      { id: "password",  label: "Change Password",    icon: "fas fa-lock",          arrow: true },
      { id: "phone",     label: "Phone Number",       icon: "fas fa-phone",         arrow: true },
    ],
  },
  {
    id: "address",
    label: "Address Book",
    items: [
      { id: "addresses", label: "Saved Addresses",    icon: "fas fa-home",          arrow: true },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    items: [
      { id: "push",        label: "Push Notifications",  icon: "fas fa-mobile-alt",    toggle: true },
      { id: "email_notif", label: "Email Notifications", icon: "fas fa-envelope-open", toggle: true },
      { id: "sms",         label: "SMS Alerts",           icon: "fas fa-comment-dots",  toggle: true },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    items: [
      { id: "bank", label: "Bank Details for Refunds", icon: "fas fa-piggy-bank", arrow: true },
    ],
  },
  {
    id: "preferences",
    label: "Preferences",
    items: [
      { id: "language", label: "Language",  icon: "fas fa-globe",  arrow: true, value: "English" },
      { id: "theme",    label: "Dark Mode", icon: "fas fa-adjust", toggle: true },
    ],
  },
];

// Shimmer bone
const shimmerStyle = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.6s infinite',
}
function Bone({ className, style }) {
  return <div className={`rounded-xl ${className}`} style={{ ...shimmerStyle, ...style }} />
}

export default function Settings() {
  const { colors, isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [toggles, setToggles] = useState({ push: true, email_notif: false, sms: false });
  const [modal, setModal] = useState({ isOpen: false, popmsg: "", actionmsg: "", action: () => {} });

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(user)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setFetching(false)
      }
    }
    loadUser()
  }, [])

  const fullName = user?.user_metadata?.fullName || user?.user_metadata?.username || 'Cheddar User'
  const email = user?.email || ''
  const initials = fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()

  const handleToggle = (id) => setToggles((prev) => ({ ...prev, [id]: !prev[id] }))

  const openModal = (popmsg, actionmsg, actionFn) => {
    setModal({ isOpen: true, popmsg, actionmsg, action: actionFn })
  }
  const closeModal = () => setModal((prev) => ({ ...prev, isOpen: false }))

  // All account items navigate to /editprofile
  const handleItemClick = (item) => {
    if (item.toggle) return
    navigate('/chd/editprofile')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/Login')
  }

  const handleDeleteAccount = async () => {
    // TODO: wire to backend for full account deletion
    alert('Account deletion requires backend setup')
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: colors.background, color: colors.primaryText }}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Header */}
      <div className="z-10 px-5 pt-12 pb-4 border-b" style={{ backgroundColor: colors.background, borderColor: colors.border }}>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: colors.primaryText }}>User Control</h1>
        <p className="text-sm mt-0.5" style={{ color: colors.secondaryText }}>Manage your account & preferences</p>
      </div>

      <div className="px-4 pt-5 space-y-6 w-full">

        {/* Profile Card */}
        {fetching ? (
          <div className="rounded-2xl p-4 flex items-center gap-4 border" style={{ backgroundColor: colors.container, borderColor: colors.border }}>
            <Bone className="w-16 h-16 rounded-full" style={{ backgroundColor: colors.border }} />
            <div className="flex-1 flex flex-col gap-2">
              <Bone className="h-4 w-32" style={{ backgroundColor: colors.border }} />
              <Bone className="h-3 w-44" style={{ backgroundColor: colors.border }} />
              <Bone className="h-3 w-20" style={{ backgroundColor: colors.border }} />
            </div>
          </div>
        ) : fetchError ? (
          <div
            className="rounded-2xl p-4 flex items-center gap-3 border"
            style={{ backgroundColor: colors.container, borderColor: colors.error + '44' }}
          >
            <i className="fas fa-exclamation-circle text-sm" style={{ color: colors.error }} />
            <p className="text-sm" style={{ color: colors.error }}>Failed to load profile: {fetchError}</p>
          </div>
        ) : (
          <div
            className="rounded-2xl p-4 flex items-center gap-4 border active:scale-[0.98] transition-transform cursor-pointer"
            style={{ backgroundColor: colors.container, borderColor: colors.border }}
            onClick={() => navigate('/chd/editprofile')}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black flex-shrink-0"
              style={{ backgroundColor: colors.accent + "22", color: colors.accent }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base truncate" style={{ color: colors.primaryText }}>{fullName}</p>
              <p className="text-sm truncate" style={{ color: colors.secondaryText }}>{email}</p>
              <p className="text-xs font-medium mt-1" style={{ color: colors.accent }}>Edit Profile →</p>
            </div>
            <i className="fas fa-chevron-right text-sm" style={{ color: colors.border }} />
          </div>
        )}

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div key={section.id}>
            <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: colors.secondaryText }}>
              {section.label}
            </p>
            <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: colors.container, borderColor: colors.border }}>
              {section.items.map((item, index) => (
                <div key={item.id}>
                  <div
                    className="flex items-center gap-4 px-4 py-3.5 active:opacity-70 transition-opacity cursor-pointer"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.accent + "18" }}>
                      <i className={`${item.icon} text-sm`} style={{ color: colors.accent }} />
                    </div>
                    <span className="flex-1 text-sm font-medium" style={{ color: colors.text }}>{item.label}</span>

                    {item.value && (
                      <span className="text-xs mr-1" style={{ color: colors.secondaryText }}>{item.value}</span>
                    )}

                    {item.toggle ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: colors.secondaryText }}>
                          {item.id === "theme" ? (isDark ? "Dark" : "Light") : ""}
                        </span>
                        <div
                          className="w-11 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0 cursor-pointer"
                          style={{
                            backgroundColor: item.id === "theme"
                              ? (isDark ? colors.accent : colors.border)
                              : (toggles[item.id] ? colors.accent : colors.border),
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            item.id === "theme" ? toggleTheme() : handleToggle(item.id)
                          }}
                        >
                          <div
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                            style={{
                              transform: (item.id === "theme" ? isDark : toggles[item.id])
                                ? "translateX(22px)" : "translateX(4px)",
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <i className="fas fa-chevron-right text-xs" style={{ color: colors.border }} />
                    )}
                  </div>
                  {index < section.items.length - 1 && (
                    <div className="ml-16 h-px" style={{ backgroundColor: colors.border }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Account Actions */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-2 px-1" style={{ color: colors.secondaryText }}>
            Account Actions
          </p>
          <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: colors.container, borderColor: colors.border }}>
            {/* Logout */}
            <div
              className="flex items-center gap-4 px-4 py-3.5 cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => openModal("Are you sure you want to log out?", "Log Out", handleLogout)}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.deepAccent + "22" }}>
                <i className="fas fa-sign-out-alt text-sm" style={{ color: colors.deepAccent }} />
              </div>
              <span className="flex-1 text-sm font-medium" style={{ color: colors.text }}>Log Out</span>
              <i className="fas fa-chevron-right text-xs" style={{ color: colors.border }} />
            </div>

            <div className="ml-16 h-px" style={{ backgroundColor: colors.border }} />

            {/* Delete Account */}
            <div
              className="flex items-center gap-4 px-4 py-3.5 cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => openModal("This action cannot be undone. Delete your account permanently?", "Delete Account", handleDeleteAccount)}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.error + "18" }}>
                <i className="fas fa-trash-alt text-sm" style={{ color: colors.error }} />
              </div>
              <span className="flex-1 text-sm font-medium" style={{ color: colors.error }}>Delete Account</span>
              <i className="fas fa-chevron-right text-xs" style={{ color: colors.border }} />
            </div>
          </div>
        </div>

        <p className="text-center text-xs pb-4" style={{ color: colors.border }}>Cheddar v1.0.0</p>
      </div>

      

      <ConfirmationModal
        isOpen={modal.isOpen}
        onClose={closeModal}
        popmsg={modal.popmsg}
        actionmsg={modal.actionmsg}
        action={modal.action}
      />
    </div>
  );
}