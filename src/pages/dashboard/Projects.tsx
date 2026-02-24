import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Image as ImageIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Mock data for now
const MOCK_PROJECTS = [
  { id: 1, title: "Redesign Site E-commerce", category: "Web Design", image: "https://picsum.photos/seed/1/400/300" },
  { id: 2, title: "Campagne Marketing 2024", category: "Marketing", image: "https://picsum.photos/seed/2/400/300" },
];

export default function Projects() {
  const [projects, setProjects] = useState(MOCK_PROJECTS);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Mes Projets</h1>
          <p className="text-gray-500">Gérez votre portfolio et vos réalisations.</p>
        </div>
        <Link to="/dashboard/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Nouveau Projet
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden group">
            <div className="relative aspect-video bg-gray-100">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <Button variant="secondary" size="sm">Modifier</Button>
                <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg truncate">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.category}</p>
            </CardContent>
          </Card>
        ))}

        {/* Empty State / Add New Card */}
        <Link to="/dashboard/projects/new" className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-8 hover:border-primary hover:bg-primary/5 transition-colors aspect-video">
          <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-400">
            <Plus className="h-6 w-6" />
          </div>
          <span className="font-medium text-gray-900">Ajouter un projet</span>
          <span className="text-sm text-gray-500 mt-1">Image, Vidéo ou Lien</span>
        </Link>
      </div>
    </div>
  );
}
