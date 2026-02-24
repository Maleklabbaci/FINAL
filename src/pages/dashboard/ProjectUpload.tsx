import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/constants";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import * as React from "react";

const projectSchema = z.object({
  title: z.string().min(3, "Le titre est requis"),
  description: z.string().min(10, "La description est requise"),
  category: z.enum(CATEGORIES),
  tags: z.string(), // comma separated
  drive_link: z.string().url("URL invalide").optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectUpload() {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const navigate = useNavigate();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Autre",
      tags: "",
      drive_link: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      // 1. Upload files to Supabase Storage
      const mediaUrls: string[] = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('projects')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('projects')
          .getPublicUrl(filePath);
        
        mediaUrls.push(publicUrl);
      }

      // 2. Insert project into database
      const tagsArray = data.tags.split(",").map(s => s.trim()).filter(Boolean);

      const { error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          title: data.title,
          description: data.description,
          category: data.category,
          tags: tagsArray,
          drive_link: data.drive_link,
          media_urls: mediaUrls,
          cover_url: mediaUrls[0] || null, // Use first image as cover
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      alert("Projet ajouté avec succès !");
      navigate("/dashboard/projects");
    } catch (error: any) {
      console.error(error);
      alert("Erreur lors de l'ajout du projet : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ajouter un projet</h1>
        <p className="text-gray-500">Partagez vos meilleures réalisations avec le monde.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Détails du projet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Titre du projet</label>
              <input
                {...form.register("title")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Mon super projet"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-xs">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                {...form.register("description")}
                className="w-full px-3 py-2 border rounded-md h-32"
                placeholder="Décrivez le contexte, les défis et les résultats..."
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-xs">{form.formState.errors.description.message}</p>
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
                <label className="text-sm font-medium">Tags (séparés par des virgules)</label>
                <input
                  {...form.register("tags")}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="UI Design, Figma, React..."
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium text-gray-900">Médias</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*,video/*" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Glissez-déposez vos fichiers ici ou cliquez pour parcourir</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, MP4 jusqu'à 10MB</p>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Lien Google Drive (Optionnel)</label>
                <input
                  {...form.register("drive_link")}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={loading}>
                {loading ? "Publication..." : "Publier le projet"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
