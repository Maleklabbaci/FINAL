import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Calendar, Tag, User } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject();
    }
  }, [id]);

  async function fetchProject() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold text-dark mb-4">Projet introuvable</h1>
          <p className="text-gray-500 mb-8">Ce projet n'existe pas ou a été supprimé.</p>
          <Link to="/explorer">
            <Button>Retour à l'exploration</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <Link to={`/u/${project.profiles?.username}`} className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour au portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100">
              {project.image_url || project.cover_url ? (
                <img 
                  src={project.image_url || project.cover_url} 
                  alt={project.title} 
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-gray-400">
                  Pas d'image
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none text-gray-600">
              <h1 className="text-4xl font-extrabold text-dark mb-6 tracking-tight">{project.title}</h1>
              <div className="whitespace-pre-wrap">{project.description}</div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 sticky top-24">
              <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-gray-200">
                <div className="h-14 w-14 rounded-full bg-white border-2 border-white shadow-md overflow-hidden">
                  {project.profiles?.avatar_url ? (
                    <img src={project.profiles.avatar_url} alt={project.profiles.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold text-xl">
                      {project.profiles?.full_name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Réalisé par</p>
                  <Link to={`/u/${project.profiles?.username}`} className="text-lg font-bold text-dark hover:text-primary transition-colors">
                    {project.profiles?.full_name}
                  </Link>
                </div>
              </div>

              <div className="space-y-6">
                {project.project_url && (
                  <div>
                    <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="block w-full">
                      <Button size="lg" className="w-full rounded-xl font-bold shadow-lg shadow-primary/20">
                        Voir le projet <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                    <span className="font-medium">{new Date(project.created_at).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Tag className="h-5 w-5 mr-3 text-gray-400" />
                    <span className="font-medium bg-gray-200 px-2 py-1 rounded-md text-sm">{project.category}</span>
                  </div>
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="pt-6 border-t border-gray-200">
                    <h4 className="font-bold text-dark mb-3">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string, i: number) => (
                        <span key={i} className="bg-white border border-gray-200 px-3 py-1 rounded-lg text-sm text-gray-600 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
