import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTheme from '../Client/Toggletheme.jsx'
import supabase from '../lib/util.jsx'

export default function EditProfile() {
  const { colors } = useTheme()
  const navigate = useNavigate()
  const [focused, setFocused] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    phonenumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  // Load current user data
  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setForm((prev) => ({
          ...prev,
          email: user.email || '',
          fullName: user.user_metadata?.fullName || '',
          username: user.user_metadata?.username || '',
          phonenumber: user.user_metadata?.phonenumber || '',
        }))
      }
      setFetching(false)
    }
    loadUser()
  }, [])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleUpdate = async () => {
    if (form.password && form.password !== form.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (form.password && form.password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      const updates = {
        data: {
          fullName: form.fullName,
          username: form.username,
          phonenumber: form.phonenumber,
        },
      }

      // Update email if changed
      if (form.email) updates.email = form.email

      // Update password if provided
      if (form.password) updates.password = form.password

      const { error } = await supabase.auth.updateUser(updates)
      if (error) throw error

      setSuccess(true)
      setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }))
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      alert('Update failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const initials = form.username
    ? form.username.slice(0, 2).toUpperCase()
    : form.fullName
    ? form.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '??'

  const inputStyle = (name) => ({
    background: focused === name ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
    border: `1.5px solid ${focused === name ? colors.accent : colors.border}`,
    color: colors.primaryText,
    outline: 'none',
    transition: 'all 0.2s ease',
    boxShadow: focused === name ? `0 0 0 3px rgba(193,154,107,0.08)` : 'none',
    caretColor: colors.accent,
  })

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.background }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: colors.accent, borderTopColor: 'transparent' }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full pb-24" style={{ background: colors.background, color: colors.primaryText }}>

      {/* Header */}
      <div
        className="px-5 pt-12 pb-4 flex items-center gap-3 border-b"
        style={{ borderColor: colors.border }}
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}` }}
        >
          <i className="fas fa-arrow-left text-xs" style={{ color: colors.secondaryText }} />
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: colors.primaryText }}>Edit Profile</h1>
          <p className="text-xs mt-0.5" style={{ color: colors.secondaryText }}>Update your personal information</p>
        </div>
      </div>

      <div className="px-5 pt-6 flex flex-col gap-6 max-w-lg mx-auto">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black"
            style={{ backgroundColor: `${colors.accent}22`, color: colors.accent, border: `2px solid ${colors.accent}44` }}
          >
            {initials}
          </div>
          <p className="text-xs" style={{ color: colors.secondaryText }}>
            {form.username ? `@${form.username}` : 'Set a username below'}
          </p>
        </div>

        {/* Personal Info */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: colors.container, borderColor: colors.border }}
        >
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />
          <div className="p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
              Personal Info
            </p>

            <Field label="Full Name" colors={colors}>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Hamzat Erinola"
                onFocus={() => setFocused('fullName')}
                onBlur={() => setFocused(null)}
                className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                style={inputStyle('fullName')}
              />
            </Field>

            <Field label="Username" colors={colors}>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-sm"
                  style={{ color: colors.secondaryText }}
                >@</span>
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="furqncode"
                  onFocus={() => setFocused('username')}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-8 pr-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                  style={inputStyle('username')}
                />
              </div>
            </Field>

            <Field label="Phone Number" colors={colors}>
              <input
                name="phonenumber"
                value={form.phonenumber}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                type="tel"
                onFocus={() => setFocused('phonenumber')}
                onBlur={() => setFocused(null)}
                className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                style={inputStyle('phonenumber')}
              />
            </Field>
          </div>
        </div>

        {/* Account Info */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: colors.container, borderColor: colors.border }}
        >
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }} />
          <div className="p-5 flex flex-col gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.accent }}>
              Account
            </p>

            <Field label="Email" colors={colors}>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused(null)}
                className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                style={inputStyle('email')}
              />
            </Field>

            <Field label="New Password" colors={colors}>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
                type="password"
                onFocus={() => setFocused('password')}
                onBlur={() => setFocused(null)}
                className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                style={inputStyle('password')}
              />
            </Field>

            {form.password.length > 0 && (
              <Field label="Confirm Password" colors={colors}>
                <input
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat new password"
                  type="password"
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => setFocused(null)}
                  className="w-full px-4 py-3.5 rounded-xl text-sm placeholder:opacity-30"
                  style={inputStyle('confirmPassword')}
                />
              </Field>
            )}
          </div>
        </div>

        {/* Save button */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="w-full py-4 rounded-2xl text-sm font-black tracking-widest uppercase transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: success
              ? 'rgba(74,112,67,0.2)'
              : `linear-gradient(135deg, #e8c98a 0%, ${colors.accent} 50%, #a6804e 100%)`,
            color: success ? '#4A7043' : '#1A1A1A',
            border: success ? '1px solid rgba(74,112,67,0.4)' : 'none',
            boxShadow: success ? 'none' : '0 6px 20px rgba(193,154,107,0.3)',
            letterSpacing: '0.1em',
          }}
        >
          <i className={`fas ${loading ? 'fa-spinner fa-spin' : success ? 'fa-check' : 'fa-save'} text-xs`} />
          {loading ? 'Saving...' : success ? 'Profile Updated!' : 'Save Changes'}
        </button>

      </div>
    </div>
  )
}

function Field({ label, children, colors }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-widest" style={{ color: colors.secondaryText }}>
        {label}
      </label>
      {children}
    </div>
  )
}