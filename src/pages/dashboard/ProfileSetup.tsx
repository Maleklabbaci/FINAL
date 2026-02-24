import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES, ALGERIAN_CITIES } from "@/constants";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

const profileSchema = z.object({
  full_name: z.string().min(2, "Le nom complet est requis"),
  username: z.string().min(3, "Le nom d'utilisateur doit faire au moins 3 caractères").regex(/^[a-zA-Z0-9_]+$/, "Lettres, chiffres et underscores uniquement"),
  bio: z.string().max(300, "La bio ne doit pas dépasser 300 caractères"),
  category: z.enum(CATEGORIES),
  city: z.enum(ALGERIAN_CITIES),
  skills: z.string(), // We'll parse this to array
  whatsapp: z.string().optional(),
  linkedin: z.string().url("URL invalide").optional().or(z.literal("")),
  behance: z.string().url("URL invalide").optional().or(z.literal("")),
  github: z.string().url("URL invalide").optional().or(z.literal("")),
  instagram: z.string().url("URL invalide").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileSetup() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: "",
      username: "",
      bio: "",
      category: "Autre",
      city: "Alger",
      skills: "",
      whatsapp: "",
      linkedin: "",
      behance: "",
      github: "",
      instagram: "",
    },
  });

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        // Fetch profile if exists
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (data) {
          form.reset({
            ...data,
            skills: data.skills ? data.skills.join(", ") : "",
          });
        }
      }
    }
    getUser();
  }, [form]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    setLoading(true);
    try {
      const skillsArray = data.skills.split(",").map(s => s.trim()).filter(Boolean);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: data.full_name,
          username: data.username,
          bio: data.bio,
          category: data.category,
          city: data.city,
          skills: skillsArray,
          whatsapp: data.whatsapp,
          linkedin: data.linkedin,
          behance: data.behance,
          github: data.github,
          instagram: data.instagram,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      alert("Profil mis à jour avec succès !");
    } catch (error: any) {
      console.error(error);
      alert("Erreur lors de la mise à jour : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-dark mb-2 tracking-tight">Mon Profil</h1>
        <p className="text-gray-500 text-lg">Gérez vos informations personnelles et professionnelles pour attirer plus de clients.</p>
      </div>

      <Card className="border-0 shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
          <CardTitle className="text-xl font-bold text-dark">Informations de base</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 ml-1">Nom complet</label>
                <input
                  {...form.register("full_name")}
                  className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400"
                  placeholder="John Doe"
                />
                {form.formState.errors.full_name && (
                  <p className="text-red-500 text-xs ml-1">{form.formState.errors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 ml-1">Nom d'utilisateur</label>
                <div className="flex items-center group">
                  <span className="bg-gray-100 border-0 rounded-l-xl px-4 py-3 text-gray-500 text-sm font-medium group-focus-within:bg-primary/5 group-focus-within:text-primary transition-colors">portfola.dz/</span>
                  <input
                    {...form.register("username")}
                    className="w-full px-5 py-3 bg-gray-50 border-0 rounded-r-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400"
                    placeholder="johndoe"
                  />
                </div>
                {form.formState.errors.username && (
                  <p className="text-red-500 text-xs ml-1">{form.formState.errors.username.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 ml-1">Bio</label>
              <textarea
                {...form.register("bio")}
                className="w-full px-5 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400 min-h-[120px] resize-none"
                placeholder="Décrivez-vous en quelques mots..."
              />
              <div className="flex justify-between items-center px-1">
                {form.formState.errors.bio ? (
                  <p className="text-red-500 text-xs">{form.formState.errors.bio.message}</p>
                ) : <span></span>}
                <p className="text-xs text-gray-400 font-medium">{(form.watch("bio") || "").length}/300</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 ml-1">Catégorie</label>
                <div className="relative">
                  <select {...form.register("category")} className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl appearance-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 cursor-pointer">
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 ml-1">Ville</label>
                <div className="relative">
                  <select {...form.register("city")} className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl appearance-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 cursor-pointer">
                    {ALGERIAN_CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 ml-1">Compétences (séparées par des virgules)</label>
              <input
                {...form.register("skills")}
                className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400"
                placeholder="React, Photoshop, Marketing Digital..."
              />
            </div>

            <div className="space-y-6 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-dark">Réseaux Sociaux & Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 ml-1">WhatsApp</label>
                  <input {...form.register("whatsapp")} className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400" placeholder="+213..." />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 ml-1">LinkedIn</label>
                  <input {...form.register("linkedin")} className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400" placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Behance</label>
                  <input {...form.register("behance")} className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400" placeholder="https://behance.net/..." />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Instagram</label>
                  <input {...form.register("instagram")} className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400" placeholder="https://instagram.com/..." />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" size="lg" className="px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 rounded-full" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
