import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-dark text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tight">
              Portfola<span className="text-primary">.</span>
            </Link>
            <p className="mt-6 text-sm text-gray-400 leading-relaxed">
              La plateforme de référence pour les freelances et créatifs en Algérie et au MENA.
              Montrez votre travail, trouvez des clients.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/explorer" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Explorer
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Légal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/terms" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-400 hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-6">Suivez-nous</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white hover:bg-primary/20 p-2 rounded-full transition-all">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white hover:bg-primary/20 p-2 rounded-full transition-all">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white hover:bg-primary/20 p-2 rounded-full transition-all">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white hover:bg-primary/20 p-2 rounded-full transition-all">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; 2025 Portfola. Tous droits réservés.
          </p>
          <p className="text-sm text-gray-600 mt-2 md:mt-0">
            Fait avec ❤️ pour l'Algérie
          </p>
        </div>
      </div>
    </footer>
  );
}
