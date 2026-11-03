import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PackageOption, VerifiedGameProfile } from '../types';
import { verifyGamePlayerId, VerificationProgress } from '../utils/idVerification';
import {
  X,
  CheckCircle2,
  User,
  Server,
  Zap,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Layers,
  HelpCircle,
  Check,
  Heart,
  ShoppingCart,
  MessageSquare,
  Lock,
  RefreshCw,
  AlertTriangle,
  BadgeCheck,
  Sparkles
} from 'lucide-react';
import { GameLogo } from './GameLogo';

export const QuickRechargeModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    selectedGame,
    selectedPackage,
    setSelectedPackage,
    formatPrice,
    savedPlayerIds,
    addSavedPlayerId,
    toggleWishlist,
    isInWishlist,
    addToCart,
    setActivePlayerId,
    setActivePlayerNickname,
    setActiveServer,
    setActiveVerifiedProfile,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'packages' | 'info'>('packages');
  const [playerId, setPlayerId] = useState<string>('');
  const [selectedServer, setSelectedServer] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationProgress, setVerificationProgress] = useState<VerificationProgress | null>(null);
  const [verifiedProfile, setVerifiedProfile] = useState<VerifiedGameProfile | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const [addedToCartToast, setAddedToCartToast] = useState(false);
  const [saveIdChecked, setSaveIdChecked] = useState<boolean>(true);
  const [bannerError, setBannerError] = useState<boolean>(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize modal state when opened
  useEffect(() => {
    if (selectedGame && activeModal === 'recharge') {
      setBannerError(false);
      const match = savedPlayerIds.find(p => p.gameId === selectedGame.id);
      if (match) {
        setPlayerId(match.playerId);
        if (match.server) setSelectedServer(match.server);
        // Pre-verify saved ID
        setVerifiedProfile({
          playerId: match.playerId,
          gameId: selectedGame.id,
          gameName: selectedGame.name,
          nickname: match.nickname,
          level: 68,
          server: match.server || 'Servidor Guardado',
          rank: 'Verificado',
          avatarIcon: '⚡',
          verifiedAt: 'Guardado',
          status: 'active',
          publisherVerified: true,
        });
        setVerificationError(null);
      } else {
        setPlayerId('');
        setVerifiedProfile(null);
        setVerificationError(null);
      }

      if (selectedGame.serverOptions && selectedGame.serverOptions.length > 0) {
        setSelectedServer(selectedGame.serverOptions[0]);
      }
      setActiveTab('packages');
    }
  }, [selectedGame, activeModal, savedPlayerIds]);

  // Handle player ID input change
  const handlePlayerIdChange = (newId: string) => {
    setPlayerId(newId);
    setVerifiedProfile(null);
    setVerificationError(null);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Trigger auto-verification after 700ms when user enters a reasonable ID length
    const clean = newId.trim();
    if (clean.length >= 6) {
      debounceTimerRef.current = setTimeout(() => {
        executeVerification(clean, selectedServer);
      }, 700);
    }
  };

  // Perform server verification
  const executeVerification = async (idToVerify?: string, serverToVerify?: string) => {
    const targetId = (idToVerify || playerId).trim();
    if (!selectedGame || !targetId) {
      setVerificationError('Por favor ingresa tu ID o UID de jugador.');
      return;
    }

    if (targetId.length < 4) {
      setVerificationError('El ID de jugador debe contener al menos 4 caracteres.');
      return;
    }

    setIsVerifying(true);
    setVerificationError(null);
    setVerifiedProfile(null);

    try {
      const res = await verifyGamePlayerId(
        selectedGame.id,
        selectedGame.name,
        targetId,
        serverToVerify || selectedServer,
        (progress) => setVerificationProgress(progress)
      );

      if (res.success && res.profile) {
        setVerifiedProfile(res.profile);
        setVerificationError(null);
        setActivePlayerId(res.profile.playerId);
        setActivePlayerNickname(res.profile.nickname);
        setActiveServer(res.profile.server || selectedServer);
        setActiveVerifiedProfile(res.profile);
      } else {
        setVerificationError(res.error || 'No se pudo verificar el perfil en el servidor oficial.');
        setVerifiedProfile(null);
      }
    } catch {
      setVerificationError('Error al contactar los servidores del juego. Intenta de nuevo.');
      setVerifiedProfile(null);
    } finally {
      setIsVerifying(false);
      setVerificationProgress(null);
    }
  };

  if (activeModal !== 'recharge' || !selectedGame) return null;

  const handleClose = () => {
    setActiveModal('none');
  };

  const isRechargeReady = () => {
    if (!selectedPackage) return false;
    if (selectedGame.requiresPlayerId) {
      return Boolean(verifiedProfile && playerId.trim().length > 0);
    }
    return true;
  };

  const handleContinueToCheckout = () => {
    if (selectedGame.requiresPlayerId && !verifiedProfile) {
      setVerificationError('Debes validar tu ID de jugador antes de continuar al pago seguro.');
      return;
    }

    if (!selectedPackage) {
      alert('Por favor selecciona un paquete.');
      return;
    }

    // Save ID if user opted in
    if (selectedGame.requiresPlayerId && saveIdChecked && verifiedProfile) {
      const exists = savedPlayerIds.some(
        p => p.playerId === verifiedProfile.playerId && p.gameId === selectedGame.id
      );
      if (!exists) {
        addSavedPlayerId({
          gameId: selectedGame.id,
          gameName: selectedGame.name,
          playerId: verifiedProfile.playerId,
          server: selectedServer,
          nickname: verifiedProfile.nickname,
        });
      }
    }

    // Pass data into store context
    if (verifiedProfile) {
      setActivePlayerId(verifiedProfile.playerId);
      setActivePlayerNickname(verifiedProfile.nickname);
      setActiveServer(verifiedProfile.server || selectedServer);
      setActiveVerifiedProfile(verifiedProfile);
    }

    setActiveModal('checkout');
  };

  const handleAddToCart = () => {
    if (selectedGame.requiresPlayerId && !verifiedProfile) {
      setVerificationError('Valida la existencia de tu perfil antes de añadir este producto al carrito.');
      return;
    }

    if (!selectedPackage) {
      alert('Por favor selecciona un paquete.');
      return;
    }

    addToCart(
      selectedGame,
      selectedPackage,
      verifiedProfile ? verifiedProfile.playerId : playerId,
      selectedServer,
      verifiedProfile ? verifiedProfile.nickname : undefined
    );

    setAddedToCartToast(true);
    setTimeout(() => {
      setAddedToCartToast(false);
      setActiveModal('cart');
    }, 400);
  };

  const relevantSavedIds = savedPlayerIds.filter(p => p.gameId === selectedGame.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b1220] border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header with Real Game Image Banner */}
        <div className="relative h-32 sm:h-36 w-full overflow-hidden bg-[#060913] border-b border-slate-800">
          {selectedGame.imageUrl && !bannerError ? (
            <img
              src={selectedGame.imageUrl}
              alt={selectedGame.name}
              onError={() => setBannerError(true)}
              className="w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-r ${selectedGame.gradient}`} />
          )}

          {/* Dark Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/40" />

          {/* Header Controls and Info */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 shadow-xs">
                  {selectedGame.publisher}
                </span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-emerald-500/30">
                  {selectedGame.category === 'recarga_id' ? 'Recarga Directa por ID' : 'Entrega Digital Inmediata'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleWishlist(selectedGame.id)}
                  className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold ${
                    isInWishlist(selectedGame.id)
                      ? 'bg-rose-500 text-white border-rose-400'
                      : 'bg-black/40 border-white/20 text-white hover:text-rose-400 hover:bg-black/60'
                  }`}
                  title={isInWishlist(selectedGame.id) ? 'En Favoritos' : 'Guardar en Favoritos'}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(selectedGame.id) ? 'fill-white' : ''}`} />
                  <span className="hidden sm:inline">
                    {isInWishlist(selectedGame.id) ? 'Guardado' : 'Guardar'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 text-white/80 hover:text-white rounded-xl bg-black/40 hover:bg-black/60 border border-white/20 transition-colors cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Title & Delivery Time */}
            <div className="flex items-end justify-between">
              <div className="flex items-center gap-3">
                <GameLogo gameIdOrSlug={selectedGame.id} size="md" className="shrink-0" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2 drop-shadow">
                    {selectedGame.name}
                  </h2>
                  <p className="text-xs text-slate-300 font-medium">
                    {selectedGame.tagline}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold backdrop-blur-md">
                <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Despacho &lt; 60 seg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-slate-800 bg-[#080d19] px-6 gap-4 pt-2">
          <button
            onClick={() => setActiveTab('packages')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'packages'
                ? 'border-emerald-400 text-emerald-300 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Paquetes y Validación de ID</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`pb-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'info'
                ? 'border-emerald-400 text-emerald-300 font-extrabold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Descripción & Guía de Canje</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[68vh] overflow-y-auto bg-[#0b1220] scrollbar-thin scrollbar-thumb-slate-700">
          {activeTab === 'packages' ? (
            <>
              {/* Step 1: Player ID input & Verification Section */}
              {selectedGame.requiresPlayerId ? (
                <div className="p-4 rounded-2xl bg-[#0d1527] border border-slate-800 space-y-3.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <label className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-4 h-4 text-emerald-400" />
                      <span>1. Validación de ID de Jugador ({selectedGame.idFieldName})</span>
                    </label>

                    {relevantSavedIds.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-400">Guardados:</span>
                        {relevantSavedIds.map(saved => (
                          <button
                            key={saved.id}
                            type="button"
                            onClick={() => {
                              setPlayerId(saved.playerId);
                              if (saved.server) setSelectedServer(saved.server);
                              executeVerification(saved.playerId, saved.server);
                            }}
                            className="px-2 py-0.5 rounded bg-[#131f38] border border-slate-700 text-emerald-300 hover:border-emerald-400 font-mono font-bold text-[11px] cursor-pointer shadow-xs transition-colors"
                          >
                            {saved.nickname}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ID Input with Verification Button */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={playerId}
                        onChange={(e) => handlePlayerIdChange(e.target.value)}
                        placeholder={selectedGame.idPlaceholder}
                        disabled={isVerifying}
                        className="w-full px-4 py-2.5 bg-[#080d1a] text-sm text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 font-mono font-bold disabled:bg-slate-900"
                      />

                      {verifiedProfile && (
                        <div className="absolute right-3 top-2.5">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => executeVerification()}
                      disabled={isVerifying || !playerId.trim()}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0 shadow-md shadow-emerald-900/30 cursor-pointer"
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Verificando...</span>
                        </>
                      ) : (
                        <>
                          <BadgeCheck className="w-4 h-4 text-emerald-200" />
                          <span>Verificar ID</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Server selector if present */}
                  {selectedGame.serverOptions && selectedGame.serverOptions.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Server className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold">Servidor / Región:</span>
                      <select
                        value={selectedServer}
                        onChange={(e) => {
                          setSelectedServer(e.target.value);
                          if (verifiedProfile) {
                            executeVerification(playerId, e.target.value);
                          }
                        }}
                        className="bg-[#080d1a] border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-emerald-400 font-medium"
                      >
                        {selectedGame.serverOptions.map(srv => (
                          <option key={srv} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* CARGADOR ANIMADO (Animated Loader while verifying) */}
                  {isVerifying && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 animate-in fade-in duration-200 space-y-2.5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                          <div className="w-8 h-8 rounded-full border-2 border-emerald-400/30 border-t-emerald-400 animate-spin" />
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 absolute" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-emerald-300 flex items-center justify-between">
                            <span>Comprobando perfil en servidores de {selectedGame.publisher}...</span>
                            <span className="text-[11px] font-mono font-extrabold text-emerald-400">
                              {verificationProgress ? `Paso ${verificationProgress.step}/${verificationProgress.totalSteps}` : 'Consultando...'}
                            </span>
                          </div>
                          <p className="text-[11px] text-emerald-300/80 truncate mt-0.5 font-medium">
                            {verificationProgress?.message || 'Estableciendo enlace seguro con la API...'}
                          </p>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                          style={{
                            width: verificationProgress ? `${(verificationProgress.step / verificationProgress.totalSteps) * 100}%` : '50%'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* VERIFIED PROFILE CARD */}
                  {verifiedProfile && !isVerifying && (
                    <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-[#0d1c2d] to-[#0a1524] border-2 border-emerald-500/60 text-xs text-white shadow-lg shadow-emerald-950/50 animate-in zoom-in-95 duration-200 space-y-2.5">
                      <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
                        <div className="flex items-center gap-1.5 font-black text-emerald-300 text-[11px] uppercase tracking-wider">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Perfil Verificado en Servidor Oficial</span>
                        </div>
                        <span className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-black">
                          Listo para Recarga
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-[#080d19] border border-emerald-500/40 flex items-center justify-center text-xl shadow-xs">
                            {verifiedProfile.avatarIcon || '🎮'}
                          </div>
                          <div>
                            <div className="text-sm font-black text-white flex items-center gap-1.5">
                              <span>{verifiedProfile.nickname}</span>
                              <span className="text-[10px] font-mono text-emerald-300 font-semibold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                                UID: {verifiedProfile.playerId}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2 mt-0.5">
                              <span className="text-emerald-400 font-bold">Nivel {verifiedProfile.level}</span>
                              <span>·</span>
                              <span>{verifiedProfile.rank || 'Rango Élite'}</span>
                              <span>·</span>
                              <span className="text-slate-400">{verifiedProfile.server}</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setVerifiedProfile(null);
                            setPlayerId('');
                          }}
                          className="text-[11px] text-slate-400 hover:text-rose-400 font-bold underline cursor-pointer transition-colors"
                        >
                          Cambiar ID
                        </button>
                      </div>
                    </div>
                  )}

                  {/* VERIFICATION ERROR / NOT FOUND ALERT */}
                  {verificationError && !isVerifying && (
                    <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 flex items-start gap-2.5 animate-in fade-in duration-150">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-bold text-rose-300">Error de verificación</div>
                        <p className="text-[11px] text-rose-200/80 mt-0.5">{verificationError}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => executeVerification()}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-bold shrink-0 cursor-pointer transition-colors"
                      >
                        Reintentar
                      </button>
                    </div>
                  )}

                  {/* Save ID Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="saveId"
                      checked={saveIdChecked}
                      onChange={(e) => setSaveIdChecked(e.target.checked)}
                      className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-[#080d1a]"
                    />
                    <label htmlFor="saveId" className="text-xs text-slate-400 cursor-pointer font-medium">
                      Guardar este ID verificado en mi perfil para futuras compras en 1 clic
                    </label>
                  </div>
                </div>
              ) : (
                /* Instant digital pin delivery message */
                <div className="p-4 rounded-2xl bg-[#0d162a] border border-emerald-500/30 text-xs text-slate-300 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                    <Zap className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xs mb-0.5">Entrega Digital Instantánea</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      Este producto genera un código PIN oficial alfanumérico en pantalla con copia en 1 clic y confirmación inmediata a tu WhatsApp. No requiere ingresar ID de jugador.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 2: Choose Package */}
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                  {selectedGame.requiresPlayerId ? '2. Selecciona la cantidad a recargar' : '1. Selecciona tu paquete o membresía'}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedGame.packages.map((pkg: PackageOption) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setSelectedPackage(pkg)}
                        className={`relative p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/60 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/60'
                            : 'bg-[#0e172a]/90 border-slate-800 hover:border-slate-700 hover:bg-[#131f38]'
                        }`}
                      >
                        {pkg.badge && (
                          <span className="absolute -top-2 right-3 text-[10px] font-black text-slate-950 bg-emerald-400 px-2 py-0.5 rounded shadow-xs">
                            {pkg.badge}
                          </span>
                        )}

                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-sm font-extrabold text-white">{pkg.amount}</div>
                            <div className="text-xs text-slate-400 mt-0.5 font-medium">{pkg.name}</div>
                          </div>
                          {pkg.bonus && (
                            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/30 shrink-0">
                              {pkg.bonus}
                            </span>
                          )}
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-800 flex items-baseline justify-between">
                          <span className="text-[11px] text-slate-400 font-medium">Total a pagar</span>
                          <div className="text-right">
                            {pkg.originalPriceUSD && (
                              <span className="text-[11px] text-slate-500 line-through mr-1.5 font-mono">
                                {formatPrice(pkg.originalPriceUSD)}
                              </span>
                            )}
                            <span className="text-sm font-black text-emerald-400 font-mono tabular-nums">
                              {formatPrice(pkg.priceUSD)}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* TAB 2: DETAILED DESCRIPTION & FAQ */
            <div className="space-y-5 text-xs text-slate-300 leading-relaxed font-normal">
              <div className="p-4 rounded-xl bg-[#0d1527] border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Acerca de {selectedGame.name}
                </h4>
                <p className="font-medium text-slate-400 leading-relaxed">
                  {selectedGame.detailedDescription || selectedGame.description}
                </p>
              </div>

              {selectedGame.deliveryProcess && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>¿Cómo se Entrega el Producto?</span>
                  </h4>
                  <p className="font-medium text-emerald-200/90 leading-relaxed">
                    {selectedGame.deliveryProcess}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedGame.requirements && (
                  <div className="p-3.5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-2">
                    <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                      Requisitos:
                    </span>
                    <ul className="space-y-1.5 text-slate-400 text-[11px] font-medium">
                      {selectedGame.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedGame.features && (
                  <div className="p-3.5 rounded-xl bg-[#0d1527] border border-slate-800 space-y-2">
                    <span className="font-bold text-white uppercase tracking-wider text-[11px] block">
                      Beneficios & Garantías:
                    </span>
                    <ul className="space-y-1.5 text-slate-400 text-[11px] font-medium">
                      {selectedGame.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {selectedGame.faq && selectedGame.faq.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Preguntas Frecuentes sobre {selectedGame.name}</span>
                  </h4>
                  <div className="space-y-2">
                    {selectedGame.faq.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-[#0d1527] border border-slate-800">
                        <div className="font-bold text-white text-xs mb-1">{item.question}</div>
                        <div className="text-slate-400 text-[11px]">{item.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Security guarantee banner */}
          <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Garantía de entrega o reembolso 100%</span>
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />
              <span>Despacho Automatizado</span>
            </span>
          </div>
        </div>

        {/* Modal Footer with Verification Gating */}
        <div className="p-4 bg-[#080d19] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Total con entrega inmediata</span>
            <span className="text-base font-black text-emerald-400 font-mono tabular-nums">
              {selectedPackage ? formatPrice(selectedPackage.priceUSD) : '$ 0.00'}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {activeTab === 'info' ? (
              <button
                type="button"
                onClick={() => setActiveTab('packages')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Elegir Paquete y Recargar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cerrar
                </button>

                {/* Add to Cart button (Gated by verification) */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!isRechargeReady()}
                  className="px-4 py-2.5 bg-[#131f38] hover:bg-[#1a294a] disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 border border-slate-700 shadow-xs cursor-pointer"
                  title={
                    selectedGame.requiresPlayerId && !verifiedProfile
                      ? 'Valida tu ID de juego primero para agregar al carrito'
                      : 'Añadir a la orden múltiple de compras'
                  }
                >
                  <ShoppingCart className="w-4 h-4 text-emerald-400" />
                  <span>{addedToCartToast ? '¡Agregado!' : 'Añadir al Carrito'}</span>
                </button>

                {/* Buy Now button (Gated by verification) */}
                <button
                  type="button"
                  onClick={handleContinueToCheckout}
                  disabled={!isRechargeReady()}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer"
                  title={
                    selectedGame.requiresPlayerId && !verifiedProfile
                      ? 'Valida tu ID de jugador antes de continuar al pago'
                      : 'Continuar al pago seguro'
                  }
                >
                  {selectedGame.requiresPlayerId && !verifiedProfile ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Validar ID para Pagar</span>
                    </>
                  ) : (
                    <>
                      <span>Comprar Ahora</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
