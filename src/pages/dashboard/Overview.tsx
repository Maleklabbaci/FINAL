import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Folder, MousePointerClick, ArrowUpRight, Sparkles, Plus, ExternalLink, Share2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Overview() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [projectsCount, setProjectsCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setUserProfile(profile || { full_name: user.email?.split('@')[0] });

        const { count } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);
        setProjectsCount(count || 0);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-dark mb-2 tracking-tight">
            Bonjour {userProfile?.full_name?.split(' ')[0] || "Freelance"} <span className="inline-block animate-wave">👋</span>
          </h1>
          <p className="text-gray-500 text-lg">Voici ce qui se passe sur votre portfolio aujourd'hui.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/projects/new">
            <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 px-6 py-6 text-base font-bold bg-primary hover:bg-primary/90 transition-all hover:scale-105">
              <Plus className="mr-2 h-5 w-5" /> Ajouter un projet
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Vues du portfolio</CardTitle>
            <div className="p-2 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
              <Eye className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-dark mb-2">1,234</div>
            <p className="text-xs text-gray-500 flex items-center font-medium">
              <span className="text-green-500 flex items-center bg-green-50 px-2 py-0.5 rounded-md mr-2">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12%
              </span>
              ce mois-ci
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Projets uploadés</CardTitle>
            <div className="p-2 bg-accent/10 rounded-xl group-hover:bg-accent/20 transition-colors">
              <Folder className="h-5 w-5 text-accent-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-dark mb-2">{projectsCount}</div>
            <p className="text-xs text-gray-500 font-medium">
              <span className="text-primary font-bold">{5 - projectsCount}</span> restants (Plan Gratuit)
            </p>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${(projectsCount / 5) * 100}%` }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Clics contact</CardTitle>
            <div className="p-2 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
              <MousePointerClick className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-dark mb-2">89</div>
            <p className="text-xs text-gray-500 flex items-center font-medium">
              <span className="text-green-500 flex items-center bg-green-50 px-2 py-0.5 rounded-md mr-2">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                5%
              </span>
              ce mois-ci
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-3xl group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-wider">Classement</CardTitle>
            <div className="p-2 bg-yellow-100 rounded-xl group-hover:bg-yellow-200 transition-colors">
              <Trophy className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-dark mb-2">#42</div>
            <p className="text-xs text-gray-500 flex items-center font-medium">
              <span className="text-green-500 flex items-center bg-green-50 px-2 py-0.5 rounded-md mr-2">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                Top 10%
              </span>
              Alger
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link to="/dashboard/projects/new" className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group text-center flex flex-col items-center justify-center gap-3 h-40">
              <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="font-bold text-dark group-hover:text-primary transition-colors">Ajouter un projet</span>
            </Link>
            <Link to={`/u/${userProfile?.username || 'me'}`} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group text-center flex flex-col items-center justify-center gap-3 h-40">
              <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ExternalLink size={24} />
              </div>
              <span className="font-bold text-dark group-hover:text-blue-600 transition-colors">Voir mon portfolio</span>
            </Link>
            <button className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group text-center flex flex-col items-center justify-center gap-3 h-40">
              <div className="h-12 w-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Share2 size={24} />
              </div>
              <span className="font-bold text-dark group-hover:text-green-600 transition-colors">Partager mon lien</span>
            </button>
          </div>

          {/* Recent Projects */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-dark">Projets récents</h3>
              <Link to="/dashboard/projects" className="text-primary font-medium hover:underline text-sm">Tout voir</Link>
            </div>
            
            {projectsCount > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Placeholder for actual projects - in real app would map */}
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group cursor-pointer">
                  <img src="https://picsum.photos/seed/1/400/300" alt="Project" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-bold">Redesign E-commerce</span>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative group cursor-pointer">
                  <img src="https://picsum.photos/seed/2/400/300" alt="Project" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-bold">Campagne Marketing</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-3xl p-8 text-center border border-dashed border-gray-200">
                <p className="text-gray-500 mb-4">Vous n'avez pas encore publié de projet.</p>
                <Link to="/dashboard/projects/new">
                  <Button variant="outline" className="rounded-full">Commencer maintenant</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
          {/* Profile Completion */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-dark">Profil complété</h3>
              <span className="text-primary font-bold">70%</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full mb-6 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '70%' }}></div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-gray-500 line-through decoration-gray-400">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-xs">✓</div>
                Créer un compte
              </li>
              <li className="flex items-center text-sm text-gray-500 line-through decoration-gray-400">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-xs">✓</div>
                Ajouter une photo
              </li>
              <li className="flex items-center text-sm text-dark font-medium">
                <div className="w-5 h-5 rounded-full border-2 border-primary mr-3"></div>
                Ajouter 3 projets
              </li>
              <li className="flex items-center text-sm text-dark font-medium">
                <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3"></div>
                Lier les réseaux sociaux
              </li>
            </ul>
          </div>

          {/* Upgrade Banner */}
          <div className="rounded-3xl p-8 relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD166] to-[#F4A261]"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Passez au niveau Pro</h3>
              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                Débloquez les projets illimités, les statistiques avancées et le badge "Vérifié".
              </p>
              <Button className="w-full bg-white text-[#F4A261] hover:bg-white/90 font-bold rounded-xl shadow-lg shadow-black/5 border-0">
                Voir les plans
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
