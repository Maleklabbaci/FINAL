import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Eye, Flag, Star, Trash2 } from "lucide-react";

const MOCK_PROJECTS = [
  { id: 1, title: "E-commerce Redesign", owner: "Amine Benali", views: 1205, date: "2024-02-20", image: "https://picsum.photos/seed/1/100/100", featured: true },
  { id: 2, title: "Brand Identity", owner: "Sarah K.", views: 850, date: "2024-02-19", image: "https://picsum.photos/seed/2/100/100", featured: false },
  { id: 3, title: "Mobile App UI", owner: "Karim T.", views: 2300, date: "2024-02-18", image: "https://picsum.photos/seed/3/100/100", featured: false },
  { id: 4, title: "Photography Portfolio", owner: "Lina M.", views: 450, date: "2024-02-15", image: "https://picsum.photos/seed/4/100/100", featured: false },
];

export default function AdminProjects() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-500">Modération et mise en avant des projets.</p>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              placeholder="Rechercher un projet..."
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-3">Projet</th>
                  <th className="px-6 py-3">Créateur</th>
                  <th className="px-6 py-3">Vues</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PROJECTS.map((project) => (
                  <tr key={project.id} className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold">{project.title}</div>
                        {project.featured && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold">FEATURED</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{project.owner}</td>
                    <td className="px-6 py-4 text-gray-600">{project.views}</td>
                    <td className="px-6 py-4 text-gray-500">{project.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className={`h-8 w-8 ${project.featured ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}><Star className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600"><Flag className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
