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
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Mon Profil</h1>
        <p className="text-gray-500">Gérez vos informations personnelles et professionnelles.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informations de base</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom complet</label>
                <input
                  {...form.register("full_name")}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="John Doe"
                />
                {form.formState.errors.full_name && (
                  <p className="text-red-500 text-xs">{form.formState.errors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Nom d'utilisateur</label>
                <div className="flex items-center">
                  <span className="bg-gray-100 border border-r-0 rounded-l-md px-3 py-2 text-gray-500 text-sm">portfola.dz/</span>
                  <input
                    {...form.register("username")}
                    className="w-full px-3 py-2 border rounded-r-md"
                    placeholder="johndoe"
                  />
                </div>
                {form.formState.errors.username && (
                  <p className="text-red-500 text-xs">{form.formState.errors.username.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              <textarea
                {...form.register("bio")}
                className="w-full px-3 py-2 border rounded-md h-24"
                placeholder="Décrivez-vous en quelques mots..."
              />
              <p className="text-xs text-gray-500 text-right">{(form.watch("bio") || "").length}/300</p>
              {form.formState.errors.bio && (
                <p className="text-red-500 text-xs">{form.formState.errors.bio.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Catégorie</label>
                <select {...form.register("category")} className="w-full px-3 py-2 border rounded-md bg-white">
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Ville</label>
                <select {...form.register("city")} className="w-full px-3 py-2 border rounded-md bg-white">
                  {ALGERIAN_CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Compétences (séparées par des virgules)</label>
              <input
                {...form.register("skills")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="React, Photoshop, Marketing Digital..."
              />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium text-gray-900">Réseaux Sociaux & Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">WhatsApp</label>
                  <input {...form.register("whatsapp")} className="w-full px-3 py-2 border rounded-md" placeholder="+213..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn</label>
                  <input {...form.register("linkedin")} className="w-full px-3 py-2 border rounded-md" placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Behance</label>
                  <input {...form.register("behance")} className="w-full px-3 py-2 border rounded-md" placeholder="https://behance.net/..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram</label>
                  <input {...form.register("instagram")} className="w-full px-3 py-2 border rounded-md" placeholder="https://instagram.com/..." />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
