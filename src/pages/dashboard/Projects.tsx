import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Image as ImageIcon, Trash2, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await (supabase as any)
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) return;
    try {
      const { error } = await (supabase as any)
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-dark mb-2 tracking-tight">Mes Projets</h1>
          <p className="text-gray-500 text-lg">Gérez votre portfolio et vos réalisations.</p>
        </div>
        <Link to="/dashboard/projects/new">
          <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 px-6">
            <Plus className="mr-2 h-5 w-5" /> Nouveau Projet
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-10">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden group border-0 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 rounded-3xl">
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                {project.image_url || project.cover_url ? (
                  <img 
                    src={project.image_url || project.cover_url} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <ImageIcon className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3 backdrop-blur-sm">
                  <Button variant="secondary" size="sm" className="rounded-full h-10 w-10 p-0 bg-white hover:bg-white/90 text-dark shadow-lg"><Edit2 className="h-4 w-4" /></Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project.id)} className="rounded-full h-10 w-10 p-0 shadow-lg"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl truncate text-dark mb-1">{project.title}</h3>
                <p className="text-sm font-medium text-primary bg-primary/5 inline-block px-2 py-1 rounded-md">{project.category}</p>
              </CardContent>
            </Card>
          ))}

          {/* Empty State / Add New Card */}
          <Link to="/dashboard/projects/new" className="border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-primary/5 transition-all duration-300 aspect-video group cursor-pointer bg-white/50">
            <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 text-gray-400 group-hover:bg-white group-hover:text-primary group-hover:shadow-md transition-all">
              <Plus className="h-8 w-8" />
            </div>
            <span className="font-bold text-lg text-gray-700 group-hover:text-primary transition-colors">Ajouter un projet</span>
            <span className="text-sm text-gray-500 mt-2">Image, Vidéo ou Lien</span>
          </Link>
        </div>
      )}
    </div>
  );
}
