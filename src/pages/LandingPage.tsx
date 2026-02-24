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
        <section className="relative overflow-hidden gradient-hero pt-32 pb-48 space-y-24 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-5xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight drop-shadow-sm">
                Crée ton portfolio pro en <span className="text-accent">2 minutes</span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
                Rejoins des milliers de freelancers algériens qui partagent leur travail avec Portfola. Simple, beau et efficace.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/signup">
                  <Button size="lg" className="text-lg px-10 py-8 rounded-full shadow-2xl shadow-primary/50 hover:shadow-white/20 transition-all w-full sm:w-auto bg-white text-primary hover:bg-gray-50 hover:scale-105 border-0">
                    Commencer gratuitement
                  </Button>
                </Link>
                <Link to="/explorer">
                  <Button variant="outline" size="lg" className="text-lg px-10 py-8 rounded-full w-full sm:w-auto border-2 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white backdrop-blur-sm">
                    Voir un exemple
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-purple-500/30 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-blue-500/30 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[45rem] h-[45rem] bg-pink-500/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Wave separator */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-secondary"></path>
            </svg>
          </div>
        </section>

        {/* How it works */}
        <section className="py-32 bg-secondary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-primary font-bold tracking-wider uppercase text-sm bg-primary/10 px-4 py-2 rounded-full">Processus</span>
              <h2 className="text-4xl md:text-5xl font-bold text-dark mt-6 mb-4">Comment ça marche ?</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">Trois étapes simples pour lancer votre carrière.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -z-10 rounded-full"></div>

              {[
                {
                  icon: <UserPlus className="h-10 w-10 text-white" />,
                  step: "1",
                  title: "Inscris-toi",
                  description: "Crée ton compte en 30 secondes"
                },
                {
                  icon: <Upload className="h-10 w-10 text-white" />,
                  step: "2",
                  title: "Uploade tes projets",
                  description: "Photos, vidéos, liens Drive"
                },
                {
                  icon: <Share2 className="h-10 w-10 text-white" />,
                  step: "3",
                  title: "Partage ton lien",
                  description: "portfola.dz/tonnom"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -10 }}
                  className="text-center bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 backdrop-blur-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
                  <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-2xl bg-primary shadow-lg shadow-primary/30 mb-8 relative z-10 transform group-hover:scale-110 transition-transform duration-300 rotate-3 group-hover:rotate-0">
                    {item.icon}
                    <div className="absolute -top-3 -right-3 bg-accent text-dark text-sm font-bold h-8 w-8 flex items-center justify-center rounded-full border-4 border-white shadow-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-32 bg-white relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="text-accent font-bold tracking-wider uppercase text-sm bg-accent/10 px-4 py-2 rounded-full text-yellow-700">Fonctionnalités</span>
              <h2 className="text-4xl md:text-5xl font-bold text-dark mt-6 mb-4">Tout ce dont tu as besoin</h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">Des outils puissants pour gérer ta présence en ligne.</p>
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
                <div key={i} className="bg-secondary/50 p-8 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-transparent hover:border-gray-100 group">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-4 bg-white rounded-2xl text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold text-dark mb-2">{feature.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-32 bg-dark text-white relative overflow-hidden">
           {/* Background blobs */}
           <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Des tarifs simples et transparents</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Commence gratuitement, évolue quand tu es prêt.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
              {/* Free Plan */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-colors">
                <div className="mb-6">
                  <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">FREE</span>
                </div>
                <h3 className="text-5xl font-bold mb-2">0 DZD</h3>
                <p className="text-gray-400 mb-10 text-lg">Pour démarrer.</p>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-primary mr-4 shrink-0" /> <span className="text-gray-300">5 projets</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-primary mr-4 shrink-0" /> <span className="text-gray-300">Lien portfola.dz/nom</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-primary mr-4 shrink-0" /> <span className="text-gray-300">Stats basiques</span></li>
                </ul>
                <Button className="w-full bg-white/10 border border-white/10 text-white hover:bg-white hover:text-dark py-7 rounded-2xl font-bold text-lg transition-all">
                  Commencer
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-b from-primary to-[#5B32D1] rounded-3xl p-10 border border-primary/50 relative transform md:-translate-y-6 shadow-2xl shadow-primary/30">
                <div className="absolute top-0 right-0 bg-accent text-dark px-6 py-2 rounded-bl-2xl rounded-tr-2xl text-sm font-extrabold tracking-wider">POPULAIRE</div>
                <div className="mb-6">
                  <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">PRO</span>
                </div>
                <h3 className="text-6xl font-bold mb-2 text-white">500<span className="text-2xl text-white/70 font-normal ml-2">DZD/mois</span></h3>
                <p className="text-white/80 mb-10 text-lg">Pour les freelances sérieux.</p>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-accent mr-4 shrink-0" /> <span className="text-white font-medium">Projets illimités</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-accent mr-4 shrink-0" /> <span className="text-white font-medium">Domaine personnalisé</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-accent mr-4 shrink-0" /> <span className="text-white font-medium">Analytics avancés</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-accent mr-4 shrink-0" /> <span className="text-white font-medium">Sans badge Portfola</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-accent mr-4 shrink-0" /> <span className="text-white font-medium">Priorité annuaire</span></li>
                </ul>
                <Button className="w-full bg-white text-primary hover:bg-accent hover:text-dark py-7 rounded-2xl font-bold text-lg shadow-xl transition-all hover:scale-105">
                  Choisir Pro
                </Button>
              </div>

              {/* Agency Plan */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-colors">
                <div className="mb-6">
                  <span className="bg-white/10 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">AGENCE</span>
                </div>
                <h3 className="text-5xl font-bold mb-2">1500<span className="text-2xl text-gray-400 font-normal ml-2">DZD/mois</span></h3>
                <p className="text-gray-400 mb-10 text-lg">Pour les équipes.</p>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-primary mr-4 shrink-0" /> <span className="text-gray-300">Tout du plan Pro</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-primary mr-4 shrink-0" /> <span className="text-gray-300">5 membres équipe</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-primary mr-4 shrink-0" /> <span className="text-gray-300">Page agence</span></li>
                  <li className="flex items-center"><CheckCircle className="h-6 w-6 text-primary mr-4 shrink-0" /> <span className="text-gray-300">Placement featured</span></li>
                </ul>
                <Button className="w-full bg-white/10 border border-white/10 text-white hover:bg-white hover:text-dark py-7 rounded-2xl font-bold text-lg transition-all">
                  Contacter
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-32 bg-secondary text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl shadow-primary/10 border border-primary/5">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-dark">Prêt à lancer ta carrière ?</h2>
              <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">Rejoins la communauté des meilleurs talents en Algérie.</p>
              <Link to="/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold text-xl px-16 py-9 rounded-full shadow-xl shadow-primary/30 hover:scale-105 transition-all">
                  Créer mon portfolio maintenant
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
