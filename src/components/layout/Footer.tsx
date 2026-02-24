import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold text-primary">
              Portfola
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              La plateforme de référence pour les freelances et créatifs en Algérie et au MENA.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Plateforme</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/explorer" className="text-base text-gray-500 hover:text-primary">
                  Explorer les talents
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-base text-gray-500 hover:text-primary">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-base text-gray-500 hover:text-primary">
                  Fonctionnalités
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/help" className="text-base text-gray-500 hover:text-primary">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-primary">
                  Nous contacter
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-primary">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Suivez-nous</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Portfola. Tous droits réservés. Fait avec ❤️ en Algérie.
          </p>
        </div>
      </div>
    </footer>
  );
}
