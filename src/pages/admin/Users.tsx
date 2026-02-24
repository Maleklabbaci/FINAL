import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, MoreVertical, Download, Trash2, Ban, Eye } from "lucide-react";
import { useState } from "react";

const MOCK_USERS = [
  { id: 1, name: "Amine Benali", email: "amine@example.com", plan: "Pro", city: "Alger", status: "Actif", date: "2024-02-20" },
  { id: 2, name: "Sarah K.", email: "sarah@example.com", plan: "Gratuit", city: "Oran", status: "Actif", date: "2024-02-19" },
  { id: 3, name: "Karim T.", email: "karim@example.com", plan: "Agence", city: "Constantine", status: "Suspendu", date: "2024-02-18" },
  { id: 4, name: "Lina M.", email: "lina@example.com", plan: "Gratuit", city: "Annaba", status: "Actif", date: "2024-02-15" },
  { id: 5, name: "Yacine B.", email: "yacine@example.com", plan: "Pro", city: "Sétif", status: "Actif", date: "2024-02-10" },
];

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Utilisateurs</h1>
          <p className="text-gray-500">Gérez les comptes utilisateurs de la plateforme.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" /> Exporter CSV
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
              placeholder="Rechercher un utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                  <th className="px-6 py-3">Utilisateur</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Ville</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Statut</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_USERS.map((user) => (
                  <tr key={user.id} className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.plan === 'Pro' ? 'bg-purple-100 text-purple-700' :
                        user.plan === 'Agence' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{user.city}</td>
                    <td className="px-6 py-4 text-gray-500">{user.date}</td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-medium ${
                        user.status === 'Actif' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          user.status === 'Actif' ? 'bg-green-600' : 'bg-red-600'
                        }`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-orange-600"><Ban className="w-4 h-4" /></Button>
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
