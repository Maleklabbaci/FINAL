import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Link as LinkIcon, Mail, Phone, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";

type Profile = Database['public']['Tables']['profiles']['Row'];
type Project = Database['public']['Tables']['projects']['Row'];

export default function PublicPortfolio() {
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortfolio() {
      if (!username) return;
      setLoading(true);
      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // Fetch projects
        if (profileData) {
          const { data: projectsData, error: projectsError } = await supabase
            .from('projects')
            .select('*')
            .eq('user_id', profileData.id) // Use profileData.id instead of user_id as per schema
            .order('created_at', { ascending: false });
          
          if (projectsError) throw projectsError;
          setProjects(projectsData || []);
        }
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPortfolio();
  }, [username]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">Portfolio introuvable</div>;
  }

  return (
    <div className="min-h-screen bg-secondary">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-10 mb-16 flex flex-col md:flex-row items-start md:items-center gap-10 border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
          
          <div className="h-40 w-40 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 shadow-lg border-4 border-white">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-white text-5xl font-bold">
                {profile.full_name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-grow space-y-5">
            <div>
              <h1 className="text-4xl font-extrabold text-dark mb-2">{profile.full_name}</h1>
              <p className="text-xl text-primary font-bold bg-primary/5 inline-block px-3 py-1 rounded-lg">{profile.category}</p>
            </div>
            
            <div className="flex flex-wrap gap-6 text-gray-500 font-medium">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" /> {profile.city}
              </div>
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary transition-colors">
                  <LinkIcon className="h-5 w-5 mr-2 text-gray-400" /> Site web
                </a>
              )}
            </div>

            <p className="text-gray-600 max-w-3xl leading-relaxed text-lg">{profile.bio}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {profile.skills?.map((skill: string, i: number) => (
                <span key={i} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium border border-gray-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto min-w-[200px]">
            <Button className="w-full md:w-auto py-6 text-lg shadow-lg shadow-primary/20">
              <Mail className="mr-2 h-5 w-5" /> Me contacter
            </Button>
            {profile.whatsapp && (
              <Button variant="outline" className="w-full md:w-auto py-6 text-lg border-2 border-green-500/20 text-green-600 hover:bg-green-50 hover:border-green-500">
                <Phone className="mr-2 h-5 w-5" /> WhatsApp
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-dark">Projets</h2>
          <div className="h-1 flex-grow bg-gray-100 ml-8 rounded-full"></div>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">Aucun projet publié pour le moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group cursor-pointer hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {project.cover_url ? (
                    <img src={project.cover_url} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                      <ExternalLink className="h-12 w-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white text-dark px-6 py-3 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">Voir le projet</span>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-dark group-hover:text-primary transition-colors">{project.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-lg text-gray-500">{project.category}</span>
                  </div>
                  <p className="text-gray-500 text-base line-clamp-3 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      
      {/* Powered by Badge */}
      <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur shadow-lg px-4 py-2 rounded-full text-xs font-medium text-gray-500 border pointer-events-none z-50">
        Powered by <span className="text-primary font-bold">Portfola</span>
      </div>
    </div>
  );
}
