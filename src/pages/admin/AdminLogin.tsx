import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "12admin34") { // Hardcoded for demo purposes
      localStorage.setItem("admin_auth", "true");
      navigate("/admin/overview");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Portfola Admin</h1>
          <p className="text-gray-500">Accès réservé aux administrateurs</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
              placeholder="Mot de passe administrateur"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-xl text-lg font-bold">
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
}
