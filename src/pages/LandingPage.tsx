import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Upload, Share2, UserPlus, Star, Shield, Zap, Globe, Users, MessageCircle, Smartphone, Link as LinkIcon, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-secondary font-sans">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-secondary via-white to-primary/5 pt-20 pb-32 space-y-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Crée ton portfolio professionnel en <span className="text-primary">2 minutes</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                Rejoins des milliers de freelancers algériens qui partagent leur travail avec Portfola.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto bg-primary hover:bg-primary/90 text-white">
                    Commencer gratuitement
                  </Button>
                </Link>
                <Link to="/explorer">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full w-full sm:w-auto border-gray-300 hover:bg-gray-50 text-gray-700">
                    Voir un exemple
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl mix-blend-multiply animate-blob"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Comment ça marche ?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-100 -z-10"></div>

              {[
                {
                  icon: <UserPlus className="h-8 w-8 text-primary" />,
                  step: "1",
                  title: "Inscris-toi",
                  description: "Crée ton compte en 30 secondes"
                },
                {
                  icon: <Upload className="h-8 w-8 text-primary" />,
                  step: "2",
                  title: "Uploade tes projets",
                  description: "Photos, vidéos, liens Drive"
                },
                {
                  icon: <Share2 className="h-8 w-8 text-primary" />,
                  step: "3",
                  title: "Partage ton lien",
                  description: "portfola.dz/tonnom"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center bg-white p-6 rounded-xl"
                >
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-secondary border-4 border-white shadow-sm mb-6 relative z-10">
                    {item.icon}
                    <div className="absolute -top-2 -right-2 bg-accent text-slate-900 text-xs font-bold h-6 w-6 flex items-center justify-center rounded-full border-2 border-white">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Tout ce dont tu as besoin</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Zap className="h-6 w-6" />, title: "Upload automatique", desc: "Photos et vidéos depuis ton appareil ou Google Drive" },
                { icon: <LinkIcon className="h-6 w-6" />, title: "Lien unique", desc: "portfola.dz/tonnom partageable partout" },
                { icon: <BarChart3 className="h-6 w-6" />, title: "Statistiques", desc: "Vois qui visite ton portfolio" },
                { icon: <Smartphone className="h-6 w-6" />, title: "100% Mobile", desc: "Parfait sur téléphone" },
                { icon: <MessageCircle className="h-6 w-6" />, title: "Contact WhatsApp", desc: "Tes clients te contactent directement" },
                { icon: <Globe className="h-6 w-6" />, title: "Annuaire", desc: "Sois trouvé par les clients algériens" },
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-3 bg-primary/10 rounded-xl text-primary">
                      {feature.icon}
                    </div>
                    <div className="ml-5">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Des tarifs simples et transparents</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
              {/* Free Plan */}
              <div className="bg-secondary/30 rounded-3xl p-8 border border-gray-200">
                <div className="mb-4">
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide">FREE</span>
                </div>
                <h3 className="text-4xl font-bold mb-2 text-slate-900">0 DZD</h3>
                <p className="text-gray-500 mb-8">Pour démarrer.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-700">5 projets</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-700">Lien portfola.dz/nom</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-700">Stats basiques</span></li>
                </ul>
                <Button className="w-full bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 py-6 rounded-xl font-bold shadow-sm">
                  Commencer
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 relative transform md:-translate-y-4 shadow-2xl">
                <div className="absolute top-0 right-0 bg-accent text-slate-900 px-4 py-1 rounded-bl-xl rounded-tr-2xl text-sm font-bold">POPULAIRE</div>
                <div className="mb-4">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-bold tracking-wide">PRO</span>
                </div>
                <h3 className="text-4xl font-bold mb-2 text-white">500 DZD<span className="text-lg text-gray-400 font-normal">/mois</span></h3>
                <p className="text-gray-400 mb-8">Pour les pros.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-300">Projets illimités</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-300">Stats avancées</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-300">Sans badge Portfola</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-300">Priorité annuaire</span></li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl font-bold shadow-lg shadow-primary/25">
                  Choisir Pro
                </Button>
              </div>

              {/* Agency Plan */}
              <div className="bg-secondary/30 rounded-3xl p-8 border border-gray-200">
                <div className="mb-4">
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-bold tracking-wide">AGENCE</span>
                </div>
                <h3 className="text-4xl font-bold mb-2 text-slate-900">1500 DZD<span className="text-lg text-gray-500 font-normal">/mois</span></h3>
                <p className="text-gray-500 mb-8">Pour les équipes.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-700">Tout du plan Pro</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-700">5 membres équipe</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-700">Page agence</span></li>
                  <li className="flex items-start"><CheckCircle className="h-5 w-5 text-primary mr-3 shrink-0" /> <span className="text-gray-700">Placement featured</span></li>
                </ul>
                <Button className="w-full bg-white border border-gray-300 text-slate-900 hover:bg-gray-50 py-6 rounded-xl font-bold shadow-sm">
                  Contacter
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Prêt à lancer ta carrière ?</h2>
            <Link to="/signup">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-slate-900 font-bold text-lg px-12 py-8 rounded-full shadow-xl">
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
