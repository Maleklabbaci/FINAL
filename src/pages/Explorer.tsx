import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { CATEGORIES, ALGERIAN_CITIES } from "@/constants";

export default function Explorer() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, [selectedCategory, selectedCity]);

  async function fetchProfiles() {
    setLoading(true);
    try {
      let query = supabase
        .from('profiles')
        .select('*');

      if (selectedCategory) {
        query = query.eq('category', selectedCategory);
      }

      if (selectedCity) {
        query = query.eq('city', selectedCity);
      }

      // Simple search implementation (Supabase text search is better but this works for MVP)
      if (searchTerm) {
        query = query.ilike('full_name', `%${searchTerm}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      setProfiles(data || []);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProfiles();
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Explorez les talents algériens</h1>
          <p className="text-xl text-gray-600">Trouvez le freelance idéal pour votre prochain projet.</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-12">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input 
                type="text" 
                placeholder="Rechercher par nom ou compétence..." 
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select 
                className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Toutes catégories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Toutes villes</option>
                {ALGERIAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </form>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-12">Chargement...</div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Aucun talent trouvé. Essayez d'autres filtres.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <Link to={`/u/${profile.username}`} key={profile.id} className="block group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100">
                  <div className="h-24 bg-gradient-to-r from-primary/10 to-accent/10"></div>
                  <div className="px-6 pb-6 relative">
                    <div className="absolute -top-12 left-6 h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm">
                      {profile.avatar_url ? (
                        <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-2xl font-bold">
                          {profile.full_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-14">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">{profile.full_name}</h3>
                      <p className="text-primary font-medium text-sm mb-2">{profile.category}</p>
                      <div className="flex items-center text-gray-500 text-xs mb-4">
                        <MapPin className="h-3 w-3 mr-1" /> {profile.city}
                      </div>
                      
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">{profile.bio || "Pas de bio disponible."}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {(profile.skills || []).slice(0, 3).map((skill: string, i: number) => (
                          <span key={i} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs border border-gray-100">
                            {skill}
                          </span>
                        ))}
                        {(profile.skills || []).length > 3 && (
                          <span className="text-xs text-gray-400 flex items-center px-1">+{profile.skills.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
