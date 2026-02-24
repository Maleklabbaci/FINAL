import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Upload, Share2, UserPlus, Star, Shield, Zap, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-16 pb-32 space-y-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
                Crée ton portfolio professionnel en <span className="text-primary">2 minutes</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                La plateforme idéale pour les freelances et créatifs en Algérie et au MENA. Montrez votre travail, trouvez des clients.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
                    Commencer gratuitement <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/explorer">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full">
                    Explorer les talents
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-4000"></div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Comment ça marche ?</h2>
              <p className="mt-4 text-lg text-gray-600">Trois étapes simples pour lancer votre carrière.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                {
                  icon: <UserPlus className="h-12 w-12 text-primary" />,
                  title: "1. Inscris-toi",
                  description: "Crée ton compte en quelques secondes et complète ton profil professionnel."
                },
                {
                  icon: <Upload className="h-12 w-12 text-primary" />,
                  title: "2. Uploade tes projets",
                  description: "Ajoute tes meilleures réalisations, images, vidéos ou liens externes."
                },
                {
                  icon: <Share2 className="h-12 w-12 text-primary" />,
                  title: "3. Partage ton lien",
                  description: "Obtiens ton lien unique portfola.dz/ton-nom et partage-le avec tes clients."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
                >
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Tout ce dont tu as besoin</h2>
              <p className="mt-4 text-lg text-gray-600">Des outils puissants pour gérer ta présence en ligne.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Globe className="h-6 w-6" />, title: "Domaine Personnalisé", desc: "Connecte ton propre nom de domaine pour une image pro." },
                { icon: <Zap className="h-6 w-6" />, title: "Rapide & Optimisé", desc: "Ton portfolio charge instantanément, partout dans le monde." },
                { icon: <Shield className="h-6 w-6" />, title: "Sécurisé", desc: "Tes données et tes projets sont en sécurité avec nous." },
                { icon: <Users className="h-6 w-6" />, title: "Réseau Freelance", desc: "Sois visible par les entreprises qui recrutent." },
                { icon: <Star className="h-6 w-6" />, title: "Analytics", desc: "Suis les vues sur ton profil et tes projets." },
                { icon: <CheckCircle className="h-6 w-6" />, title: "Support Local", desc: "Une équipe basée en Algérie pour t'aider." },
              ].map((feature, i) => (
                <div key={i} className="flex items-start p-6 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg text-primary">
                    {feature.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                    <p className="mt-2 text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">Des tarifs adaptés à tous</h2>
              <p className="mt-4 text-lg text-gray-400">Commence gratuitement, évolue quand tu es prêt.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col">
                <div className="mb-4">
                  <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm font-medium">Gratuit</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">0 DZD<span className="text-lg text-gray-400 font-normal">/mois</span></h3>
                <p className="text-gray-400 mb-6">Pour démarrer ton activité.</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> 5 projets max</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Lien portfola.dz</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Stats basiques</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Badge Portfola</li>
                </ul>
                <Button className="w-full bg-slate-700 hover:bg-slate-600">Commencer</Button>
              </div>

              {/* Pro Plan */}
              <div className="bg-primary rounded-2xl p-8 border border-primary relative transform scale-105 shadow-2xl flex flex-col">
                <div className="absolute top-0 right-0 bg-accent text-slate-900 px-3 py-1 rounded-bl-xl rounded-tr-xl text-sm font-bold">Populaire</div>
                <div className="mb-4">
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">Pro</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">500 DZD<span className="text-lg text-white/70 font-normal">/mois</span></h3>
                <p className="text-white/80 mb-6">Pour les freelances sérieux.</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-white mr-2" /> Projets illimités</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-white mr-2" /> Domaine personnalisé</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-white mr-2" /> Analytics avancés</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-white mr-2" /> Sans badge Portfola</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-white mr-2" /> Priorité annuaire</li>
                </ul>
                <Button className="w-full bg-white text-primary hover:bg-gray-100">Choisir Pro</Button>
              </div>

              {/* Agency Plan */}
              <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col">
                <div className="mb-4">
                  <span className="bg-slate-700 text-white px-3 py-1 rounded-full text-sm font-medium">Agence</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">1500 DZD<span className="text-lg text-gray-400 font-normal">/mois</span></h3>
                <p className="text-gray-400 mb-6">Pour les équipes et agences.</p>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Tout du plan Pro</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Jusqu'à 5 membres</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Page agence dédiée</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-primary mr-2" /> Mise en avant</li>
                </ul>
                <Button className="w-full bg-slate-700 hover:bg-slate-600">Contacter</Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Prêt à lancer ta carrière ?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">Rejoins des milliers de créatifs algériens qui utilisent Portfola.</p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-10 py-6 rounded-full">
                Créer mon portfolio maintenant
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
