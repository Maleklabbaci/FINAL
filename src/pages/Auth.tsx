import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { CATEGORIES, ALGERIAN_CITIES } from "@/constants";
import { Check, X, Loader2, Eye, EyeOff, AlertCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Schemas ---

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

const signupSchema = z.object({
  full_name: z.string().min(2, "Le nom complet est requis"),
  username: z.string()
    .min(3, "3 caractères minimum")
    .regex(/^[a-zA-Z0-9_]+$/, "Lettres, chiffres et underscores uniquement"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "8 caractères minimum"),
  category: z.enum(CATEGORIES),
  city: z.enum(ALGERIAN_CITIES),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

// --- Components ---

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const PasswordStrength = ({ password }: { password: string }) => {
  const strength = Math.min(
    (password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0),
    4
  );

  const colors = ["bg-gray-200", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"];
  const labels = ["", "Faible", "Moyen", "Fort", "Très fort"];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1 h-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-full flex-1 rounded-full transition-colors duration-300 ${
              strength >= level ? colors[strength] : "bg-gray-100"
            }`}
          />
        ))}
      </div>
      {password && (
        <p className={`text-xs text-right font-medium ${strength === 0 ? 'text-gray-400' : ''} ${strength === 1 ? 'text-red-500' : ''} ${strength === 2 ? 'text-yellow-500' : ''} ${strength === 3 ? 'text-blue-500' : ''} ${strength === 4 ? 'text-green-500' : ''}`}>
          {labels[strength]}
        </p>
      )}
    </div>
  );
};

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/login";
  
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Forms
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  // Username checker
  useEffect(() => {
    if (isLogin) return;
    
    const username = signupForm.watch("username");
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    const checkAvailability = async () => {
      setCheckingUsername(true);
      // Simulate API delay or real check
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('username', username)
          .single();
        
        if (error && error.code === 'PGRST116') {
          // No rows found -> available
          setUsernameAvailable(true);
        } else if (data) {
          // Row found -> taken
          setUsernameAvailable(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setCheckingUsername(false);
      }
    };

    const timeout = setTimeout(checkAvailability, 500);
    return () => clearTimeout(timeout);
  }, [signupForm.watch("username"), isLogin]);

  const onLogin = async (data: LoginFormValues) => {
    setLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) throw error;
      navigate("/dashboard");
    } catch (err: any) {
      setAuthError(err.message === "Invalid login credentials" ? "Email ou mot de passe incorrect." : err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSignup = async (data: SignupFormValues) => {
    if (usernameAvailable === false) return;
    
    setLoading(true);
    setAuthError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.full_name,
            username: data.username,
            category: data.category,
            city: data.city,
          },
        },
      });
      if (error) throw error;
      
      // Create profile entry
      // Note: Usually handled by Supabase triggers, but we can do it manually if needed.
      // For now, assume trigger or manual insert in next step.
      // Let's rely on trigger or just let them verify email first.
      
      alert("Compte créé ! Vérifiez votre email pour confirmer.");
      navigate("/login");
    } catch (err: any) {
      setAuthError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* Left Side - Brand & Testimonial */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#6C3FE8] to-[#4A2BC2] relative overflow-hidden p-12 flex-col justify-between text-white">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl mix-blend-overlay animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#FFD166]/20 rounded-full blur-3xl mix-blend-overlay"></div>
        </div>

        <div className="relative z-10">
          <Link to="/" className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
            Portfola<span className="text-[#FFD166]">.</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-[#FFD166] text-2xl">★</span>
            ))}
          </div>
          <blockquote className="text-3xl font-medium leading-tight mb-6">
            "Portfola a complètement transformé ma carrière de freelance. J'ai doublé mes clients en moins de 3 mois grâce à la visibilité de mon portfolio."
          </blockquote>
          <div>
            <p className="font-bold text-lg">Amine Benali</p>
            <p className="text-white/70">UX Designer à Alger</p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-white/50">
          © 2024 Portfola. Tous droits réservés.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
              {isLogin ? "Bon retour parmi nous" : "Créer un compte gratuitement"}
            </h2>
            <p className="mt-2 text-gray-500">
              {isLogin 
                ? "Entrez vos identifiants pour accéder à votre compte." 
                : "Rejoignez la plus grande communauté de créatifs en Algérie."}
            </p>
          </div>

          <Button 
            variant="outline" 
            className="w-full py-6 rounded-xl border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all text-gray-700 font-medium flex items-center justify-center gap-3"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Continuer avec Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400">Ou continuer avec email</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {authError && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" />
                {authError}
              </motion.div>
            )}
          </AnimatePresence>

          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Email</label>
                <input
                  {...loginForm.register("email")}
                  className={`w-full px-4 py-3 rounded-xl border ${loginForm.formState.errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} outline-none transition-all`}
                  placeholder="nom@exemple.com"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-red-500 text-xs">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-900">Mot de passe</label>
                  <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...loginForm.register("password")}
                    className={`w-full px-4 py-3 rounded-xl border ${loginForm.formState.errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} outline-none transition-all pr-10`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-red-500 text-xs">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 rounded-full text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Se connecter"}
              </Button>
            </form>
          ) : (
            <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Nom complet</label>
                <input
                  {...signupForm.register("full_name")}
                  className={`w-full px-4 py-3 rounded-xl border ${signupForm.formState.errors.full_name ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} outline-none transition-all`}
                  placeholder="John Doe"
                />
                {signupForm.formState.errors.full_name && (
                  <p className="text-red-500 text-xs">{signupForm.formState.errors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Nom d'utilisateur</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium select-none">
                    portfola.dz/
                  </div>
                  <input
                    {...signupForm.register("username")}
                    className={`w-full pl-28 pr-10 py-3 rounded-xl border ${
                      signupForm.formState.errors.username || usernameAvailable === false 
                        ? 'border-red-500 focus:ring-red-200' 
                        : usernameAvailable === true 
                          ? 'border-green-500 focus:ring-green-200' 
                          : 'border-gray-200 focus:ring-primary/20 focus:border-primary'
                    } outline-none transition-all`}
                    placeholder="johndoe"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checkingUsername ? (
                      <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                    ) : usernameAvailable === true ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : usernameAvailable === false ? (
                      <X className="w-4 h-4 text-red-500" />
                    ) : null}
                  </div>
                </div>
                {signupForm.formState.errors.username && (
                  <p className="text-red-500 text-xs">{signupForm.formState.errors.username.message}</p>
                )}
                {usernameAvailable === false && !signupForm.formState.errors.username && (
                  <p className="text-red-500 text-xs">Ce nom d'utilisateur est déjà pris.</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Email</label>
                <input
                  {...signupForm.register("email")}
                  className={`w-full px-4 py-3 rounded-xl border ${signupForm.formState.errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} outline-none transition-all`}
                  placeholder="nom@exemple.com"
                />
                {signupForm.formState.errors.email && (
                  <p className="text-red-500 text-xs">{signupForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Catégorie</label>
                  <select 
                    {...signupForm.register("category")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white appearance-none"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900">Ville</label>
                  <select 
                    {...signupForm.register("city")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all bg-white appearance-none"
                  >
                    {ALGERIAN_CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...signupForm.register("password")}
                    className={`w-full px-4 py-3 rounded-xl border ${signupForm.formState.errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} outline-none transition-all pr-10`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <PasswordStrength password={signupForm.watch("password") || ""} />
                {signupForm.formState.errors.password && (
                  <p className="text-red-500 text-xs">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full py-6 rounded-full text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                disabled={loading || usernameAvailable === false}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Créer mon compte"}
              </Button>
            </form>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-500">
              {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
              <Link 
                to={isLogin ? "/signup" : "/login"} 
                className="ml-2 font-bold text-primary hover:underline transition-all"
              >
                {isLogin ? "S'inscrire gratuitement" : "Se connecter"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
