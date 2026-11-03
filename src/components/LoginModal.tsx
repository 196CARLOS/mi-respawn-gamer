import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, Mail, Phone, User, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, LogIn } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_EMAIL } from '../data/games';

export const LoginModal: React.FC = () => {
  const { activeModal, setActiveModal, loginUser, isLoggedIn, logoutUser, currentUser, updateUserAvatar } = useStore();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [emailInput, setEmailInput] = useState(OFFICIAL_EMAIL);
  const [phoneInput, setPhoneInput] = useState(OFFICIAL_PHONE);
  const [nameInput, setNameInput] = useState(currentUser.name || 'Roberto Carlos Giménez');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar || '🎮');

  const avatarOptions = ['🎮', '⚡', '🛡️', '👑', '🐉', '🎯', '🔥', '💎', '🚀'];

  if (activeModal !== 'login') return null;

  const handleClose = () => {
    setActiveModal('none');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(emailInput, phoneInput, nameInput);
    updateUserAvatar(selectedAvatar);
    setActiveModal('none');
  };

  const handleDemoLogin = () => {
    loginUser(OFFICIAL_EMAIL, OFFICIAL_PHONE, 'Roberto Carlos Giménez');
    updateUserAvatar('🎮');
    setActiveModal('none');
  };

  const handleLogout = () => {
    logoutUser();
    setActiveModal('none');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#0b1220] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 bg-[#080d19] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-sm shadow-md shadow-emerald-950/50">
              R
            </div>
            <div>
              <h3 className="text-base font-black text-white">
                {isLoggedIn ? 'Mi Cuenta Gamer' : isRegisterMode ? 'Crear Cuenta en Mi Respawn' : 'Iniciar Sesión'}
              </h3>
              <p className="text-[11px] text-slate-400 font-medium">
                {isLoggedIn ? 'Sesión activa y monedero sincronizado' : 'Accede a tus pedidos, pines y monedero'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-[#131f38] hover:bg-[#1a294a] border border-slate-700 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 bg-[#0b1220]">
          {isLoggedIn ? (
            /* Logged in View */
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#080d19] border border-emerald-500/40 flex items-center justify-center text-2xl shadow-xs">
                  {currentUser.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-black text-white truncate">{currentUser.name}</div>
                  <div className="text-xs text-slate-400 truncate">{currentUser.email}</div>
                  <div className="text-[11px] text-emerald-400 font-mono font-bold mt-0.5">{currentUser.phone}</div>
                </div>
                <span className="text-[10px] font-black text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                  Nivel {currentUser.vipTier}
                </span>
              </div>

              {/* Avatar Selector */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Cambiar Avatar Gamer
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {avatarOptions.map(av => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => {
                        setSelectedAvatar(av);
                        updateUserAvatar(av);
                      }}
                      className={`w-9 h-9 rounded-lg border text-lg flex items-center justify-center transition-all cursor-pointer ${
                        currentUser.avatar === av
                          ? 'border-emerald-400 bg-emerald-950/80 scale-105 shadow-xs ring-1 ring-emerald-400/50'
                          : 'border-slate-800 bg-[#0e172a] hover:bg-[#131f38]'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2.5 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer border border-rose-900/60"
                >
                  Cerrar Sesión
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('dashboard');
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-950/50 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Ir al Panel de Usuario</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Login / Register Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegisterMode && (
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Nombre Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Roberto Carlos Giménez"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#080d1a] border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:border-emerald-400"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#080d1a] border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Teléfono WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+595 9XX XXX XXX"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#080d1a] border border-slate-700 rounded-xl text-xs text-white font-mono font-bold focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Contraseña</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#080d1a] border border-slate-700 rounded-xl text-xs text-white font-medium focus:outline-none focus:border-emerald-400"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{isRegisterMode ? 'Registrarme y Acceder' : 'Iniciar Sesión'}</span>
              </button>

              {/* 1-Click Fast Demo Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2.5 bg-[#131f38] hover:bg-[#1a294a] text-slate-200 font-bold text-xs rounded-xl transition-all border border-slate-700 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Acceso Rápido 1-Clic (Demo Gamer)</span>
              </button>

              {/* Toggle Register/Login */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-xs text-emerald-400 hover:underline font-bold cursor-pointer"
                >
                  {isRegisterMode ? '¿Ya tienes cuenta? Inicia Sesión aquí' : '¿No tienes cuenta? Regístrate gratis en 10s'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
