import { useState } from "react";
import useTheme from '../Client/Toggletheme.jsx';
import NavBottom from './NavBottom.jsx'

const SECTIONS = [
  {
    id: "account",
    label: "Account",
    icon: "fas fa-user-circle",
    items: [
      { id: "profile", label: "Edit Profile", icon: "fas fa-id-card", arrow: true, redirect: true },
      { id: "email", label: "Change Email", icon: "fas fa-envelope", arrow: true },
      { id: "password", label: "Change Password", icon: "fas fa-lock", arrow: true },
      { id: "phone", label: "Phone Number", icon: "fas fa-phone", arrow: true },
    ],
  },
  {
    id: "address",
    label: "Address Book",
    icon: "fas fa-map-marker-alt",
    items: [
      { id: "addresses", label: "Saved Addresses", icon: "fas fa-home", arrow: true },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "fas fa-bell",
    items: [
      { id: "push", label: "Push Notifications", icon: "fas fa-mobile-alt", toggle: true },
      { id: "email_notif", label: "Email Notifications", icon: "fas fa-envelope-open", toggle: true },
      { id: "sms", label: "SMS Alerts", icon: "fas fa-comment-dots", toggle: true },
    ],
  },
  {
    id: "payment",
    label: "Payment",
    icon: "fas fa-university",
    items: [
      { id: "bank", label: "Bank Details for Refunds", icon: "fas fa-piggy-bank", arrow: true },
    ],
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: "fas fa-sliders-h",
    items: [
      { id: "language", label: "Language", icon: "fas fa-globe", arrow: true, value: "English" },
      { id: "theme", label: "Theme", icon: "fas fa-adjust", arrow: true, value: "Dark" },
    ],
  },
];

export default function Settings() {
  const { colors } = useTheme();
  const [toggles, setToggles] = useState({ push: true, email_notif: false, sms: false });

  const handleToggle = (id) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="min-h-screen pb-24"
      style={{ backgroundColor: colors.background, color: colors.primaryText }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-5 pt-12 pb-4 border-b"
        style={{ backgroundColor: colors.background, borderColor: colors.border }}
      >
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: colors.primaryText }}>
          Settings
        </h1>
        <p className="text-sm mt-0.5" style={{ color: colors.secondaryText }}>
          Manage your account & preferences
        </p>
      </div>

      <div className="px-4 pt-5 space-y-6 w-full">

        {/* Profile Card — redirect to edit profile */}
        <div
          className="rounded-2xl p-4 flex items-center gap-4 border active:scale-[0.98] transition-transform cursor-pointer"
          style={{ backgroundColor: colors.container, borderColor: colors.border }}
          onClick={() => console.log("Navigate to profile")}
        >
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
            style={{ backgroundColor: colors.accent + "22" }}
          >
            <i className="fas fa-user" style={{ color: colors.accent }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-base truncate" style={{ color: colors.primaryText }}>
              Hamzat Erinola
            </p>
            <p className="text-sm truncate" style={{ color: colors.secondaryText }}>
              hamzat@example.com
            </p>
            <p
              className="text-xs font-medium mt-1"
              style={{ color: colors.accent }}
            >
              Edit Profile →
            </p>
          </div>
          <i className="fas fa-chevron-right text-sm" style={{ color: colors.border }} />
        </div>

        {/* Sections */}
        {SECTIONS.map((section) => (
          <div key={section.id}>
            {/* Section Label */}
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2 px-1"
              style={{ color: colors.secondaryText }}
            >
              {section.label}
            </p>

            {/* Section Items */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: colors.container, borderColor: colors.border }}
            >
              {section.items.map((item, index) => (
                <div key={item.id}>
                  <div
                    className="flex items-center gap-4 px-4 py-3.5 active:opacity-70 transition-opacity cursor-pointer"
                    onClick={() => !item.toggle && console.log(`Navigate to ${item.id}`)}
                  >
                    {/* Icon */}
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: colors.accent + "18" }}
                    >
                      <i className={`${item.icon} text-sm`} style={{ color: colors.accent }} />
                    </div>

                    {/* Label */}
                    <span className="flex-1 text-sm font-medium" style={{ color: colors.text }}>
                      {item.label}
                    </span>

                    {/* Value or Toggle or Arrow */}
                    {item.value && (
                      <span className="text-xs mr-1" style={{ color: colors.secondaryText }}>
                        {item.value}
                      </span>
                    )}

                    {item.toggle ? (
                      <div
                        className="w-11 h-6 rounded-full relative transition-colors duration-200 flex-shrink-0"
                        style={{ backgroundColor: toggles[item.id] ? colors.accent : colors.border }}
                        onClick={() => handleToggle(item.id)}
                      >
                        <div
                          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
                          style={{ transform: toggles[item.id] ? "translateX(22px)" : "translateX(4px)" }}
                        />
                      </div>
                    ) : (
                      <i
                        className="fas fa-chevron-right text-xs"
                        style={{ color: colors.border }}
                      />
                    )}
                  </div>

                  {/* Divider */}
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
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2 px-1"
            style={{ color: colors.secondaryText }}
          >
            Account Actions
          </p>
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ backgroundColor: colors.container, borderColor: colors.border }}
          >
            {/* Logout */}
            <div
              className="flex items-center gap-4 px-4 py-3.5 cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => console.log("Logout")}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: colors.deepAccent + "22" }}
              >
                <i className="fas fa-sign-out-alt text-sm" style={{ color: colors.deepAccent }} />
              </div>
              <span className="flex-1 text-sm font-medium" style={{ color: colors.text }}>
                Log Out
              </span>
              <i className="fas fa-chevron-right text-xs" style={{ color: colors.border }} />
            </div>

            <div className="ml-16 h-px" style={{ backgroundColor: colors.border }} />

            {/* Delete Account */}
            <div
              className="flex items-center gap-4 px-4 py-3.5 cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => console.log("Delete account")}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: colors.error + "18" }}
              >
                <i className="fas fa-trash-alt text-sm" style={{ color: colors.error }} />
              </div>
              <span className="flex-1 text-sm font-medium" style={{ color: colors.error }}>
                Delete Account
              </span>
              <i className="fas fa-chevron-right text-xs" style={{ color: colors.border }} />
            </div>
          </div>
        </div>

        {/* App version */}
        <p className="text-center text-xs pb-4" style={{ color: colors.border }}>
          Cheddar v1.0.0
        </p>

      </div>
    <NavBottom />
    </div>
  );
}
