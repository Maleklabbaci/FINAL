import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, CheckCircle, Upload, Share2, UserPlus, Star, Shield, Zap, Globe, Users, MessageCircle, Smartphone, Link as LinkIcon, BarChart3, Layout, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-white font-sans selection:bg-primary/10 selection:text-primary">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
          </div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-sm text-gray-600 backdrop-blur-xl mb-8 hover:bg-white/80 transition-colors cursor-default">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                <span className="font-medium">Nouveau : Templates Premium disponibles</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
                Ton portfolio pro <br />
                <span className="text-primary">en 2 minutes chrono.</span>
              </h1>
              
              <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                La plateforme préférée des freelancers algériens. Crée, partage et décroche des clients avec un portfolio qui te ressemble.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                    Commencer gratuitement <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/explorer" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 text-lg rounded-full border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-700 transition-all">
                    Voir un exemple
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="mt-12 flex items-center justify-center gap-4 text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/${i}/100/100`} alt="User" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <p>Rejoint par <span className="font-bold text-gray-900">2,000+</span> créatifs</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 bg-gray-50/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Tout ce qu'il te faut pour briller</h2>
              <p className="text-xl text-gray-500">Une suite d'outils puissants, emballée dans une interface simple.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {/* Large Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="md:col-span-2 bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                    <Layout className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Design Intelligent</h3>
                  <p className="text-gray-500 text-lg max-w-md">Nos templates s'adaptent automatiquement à ton contenu. Plus besoin de passer des heures à aligner des pixels.</p>
                </div>
                <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                {/* Abstract UI Mockup */}
                <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-gray-100 rounded-3xl rotate-12 group-hover:rotate-6 transition-transform duration-500 border border-gray-200 shadow-lg"></div>
              </motion.div>

              {/* Tall Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-dark text-white rounded-[2rem] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden md:row-span-2 flex flex-col justify-between"
              >
                <div className="relative z-10">
                  <div className="h-12 w-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-white backdrop-blur-sm">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Mobile First</h3>
                  <p className="text-gray-400 text-lg">Ton portfolio est magnifique sur tous les écrans, du smartphone à l'écran 4K.</p>
                </div>
                <div className="mt-8 relative h-64 w-full bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-full bg-dark/50 border-x border-white/5"></div>
                  </div>
                </div>
              </motion.div>

              {/* Medium Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics</h3>
                <p className="text-gray-500">Suis tes visites et découvre qui s'intéresse à ton travail en temps réel.</p>
              </motion.div>

              {/* Medium Card */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-600">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Domaine Perso</h3>
                <p className="text-gray-500">Connecte ton propre nom de domaine ou utilise notre sous-domaine gratuit.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Minimal Pricing */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Simple & Transparent</h2>
              <p className="text-xl text-gray-500">Commence gratuitement, sans carte bancaire.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="rounded-[2rem] p-8 border border-gray-200 hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Découverte</h3>
                    <p className="text-gray-500 mt-1">Pour tester la plateforme</p>
                  </div>
                  <span className="text-3xl font-bold text-gray-900">0 DA</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-600"><CheckCircle className="h-5 w-5 text-gray-400 mr-3" /> 5 projets maximum</li>
                  <li className="flex items-center text-gray-600"><CheckCircle className="h-5 w-5 text-gray-400 mr-3" /> Sous-domaine portfola.dz</li>
                  <li className="flex items-center text-gray-600"><CheckCircle className="h-5 w-5 text-gray-400 mr-3" /> Support par email</li>
                </ul>
                <Button variant="outline" className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 text-gray-900 font-medium">
                  Commencer gratuitement
                </Button>
              </div>

              {/* Pro Plan */}
              <div className="rounded-[2rem] p-8 bg-gray-900 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAIRE</div>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-lg font-semibold">Pro</h3>
                    <p className="text-gray-400 mt-1">Pour les freelances sérieux</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold">500 DA</span>
                    <span className="text-gray-400 text-sm block">/mois</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-5 w-5 text-primary mr-3" /> Projets illimités</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-5 w-5 text-primary mr-3" /> Domaine personnalisé</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-5 w-5 text-primary mr-3" /> Analytics avancés</li>
                  <li className="flex items-center text-gray-300"><CheckCircle className="h-5 w-5 text-primary mr-3" /> Badge "Vérifié"</li>
                </ul>
                <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium border-0">
                  Passer au Pro
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ne laisse pas ton talent dans l'ombre</h2>
              <p className="text-xl text-gray-500 mb-10">Rejoins plus de 2,000 créatifs algériens qui utilisent Portfola pour présenter leur travail.</p>
              <Link to="/signup">
                <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-gray-900 hover:bg-gray-800 text-white shadow-lg transition-all hover:-translate-y-1">
                  Créer mon portfolio
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
