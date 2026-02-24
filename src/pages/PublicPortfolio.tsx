import { useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Link as LinkIcon, Mail, Phone, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PublicPortfolio() {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
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
            .eq('user_id', profileData.user_id)
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
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-white text-4xl font-bold">
                {profile.full_name.charAt(0)}
              </div>
            )}
          </div>
          
          <div className="flex-grow space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{profile.full_name}</h1>
              <p className="text-xl text-primary font-medium">{profile.category}</p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" /> {profile.city}
              </div>
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary">
                  <LinkIcon className="h-4 w-4 mr-1" /> Site web
                </a>
              )}
            </div>

            <p className="text-gray-600 max-w-2xl">{profile.bio}</p>

            <div className="flex flex-wrap gap-2">
              {profile.skills?.map((skill: string, i: number) => (
                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <Button className="w-full md:w-auto">
              <Mail className="mr-2 h-4 w-4" /> Me contacter
            </Button>
            {profile.whatsapp && (
              <Button variant="outline" className="w-full md:w-auto border-green-500 text-green-600 hover:bg-green-50">
                <Phone className="mr-2 h-4 w-4" /> WhatsApp
              </Button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        <h2 className="text-2xl font-bold mb-6 text-slate-900">Projets</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">Aucun projet publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {project.cover_url ? (
                    <img src={project.cover_url} alt={project.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ExternalLink className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{project.title}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{project.category}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2">{project.description}</p>
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
