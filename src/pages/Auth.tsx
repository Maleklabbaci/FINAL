import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import * as React from "react";

export default function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Vérifiez votre email pour confirmer votre inscription !");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <h2 className="text-3xl font-bold text-center mb-2 text-slate-900">
            {isLogin ? "Bon retour !" : "Créer un compte"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isLogin ? "Connectez-vous à votre espace" : "Rejoignez la communauté Portfola"}
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button className="w-full py-6 text-lg" disabled={loading}>
              {loading ? "Chargement..." : (isLogin ? "Se connecter" : "S'inscrire")}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <>
                Pas encore de compte ?{" "}
                <Link to="/signup" className="text-primary font-semibold hover:underline">
                  S'inscrire
                </Link>
              </>
            ) : (
              <>
                Déjà un compte ?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Se connecter
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
