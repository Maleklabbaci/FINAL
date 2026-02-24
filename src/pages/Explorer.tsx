import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import { CATEGORIES, ALGERIAN_CITIES } from "@/constants";
import * as React from "react";

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
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-6 tracking-tight">Explorez les talents algériens</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">Trouvez le freelance idéal pour votre prochain projet parmi notre communauté grandissante.</p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-3xl shadow-xl shadow-gray-200/50 mb-16 border border-gray-100">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Rechercher par nom ou compétence..." 
                className="w-full pl-12 pr-6 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="md:col-span-3 relative">
              <select 
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl appearance-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 cursor-pointer"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Toutes catégories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>

            <div className="md:col-span-3 relative">
              <select 
                className="w-full px-6 py-4 bg-gray-50 border-0 rounded-2xl appearance-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 cursor-pointer"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">Toutes villes</option>
                {ALGERIAN_CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <MapPin className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          </form>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-500">Recherche des meilleurs talents...</p>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-dark mb-2">Aucun talent trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres ou votre recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {profiles.map((profile) => (
              <Link to={`/u/${profile.username}`} key={profile.id} className="block group h-full">
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                  <div className="h-28 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors"></div>
                  <div className="px-8 pb-8 relative flex-grow flex flex-col">
                    <div className="absolute -top-12 left-8 h-24 w-24 rounded-2xl border-4 border-white bg-white overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                      {profile.avatar_url ? (
                        <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-primary text-3xl font-bold">
                          {profile.full_name.charAt(0)}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-16 mb-4">
                      <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors mb-1">{profile.full_name}</h3>
                      <p className="text-primary font-bold text-sm uppercase tracking-wide bg-primary/5 inline-block px-2 py-1 rounded-md">{profile.category}</p>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-6">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" /> {profile.city}
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">{profile.bio || "Pas de bio disponible."}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-gray-50">
                      {(profile.skills || []).slice(0, 3).map((skill: string, i: number) => (
                        <span key={i} className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-100 group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors">
                          {skill}
                        </span>
                      ))}
                      {(profile.skills || []).length > 3 && (
                        <span className="text-xs text-gray-400 flex items-center px-2 font-medium">+{profile.skills.length - 3}</span>
                      )}
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
