import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/constants";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
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

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error("Error fetching project:", error);
          navigate("/dashboard/projects");
          return;
        }

        if (data) {
          form.reset({
            title: data.title,
            description: data.description || "",
            category: data.category as any,
            tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
            drive_link: data.drive_link || "",
          });
          if (data.image_url) {
            setExistingImages([data.image_url]);
          }
        }
        setLoading(false);
      };

      fetchProject();
    }
  }, [id, navigate, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      let portfolioId;
      
      // Only fetch portfolio if creating a new project or if needed
      if (!id) {
          const { data: portfolio } = await (supabase as any)
            .from('portfolios')
            .select('id')
            .eq('user_id', user.id)
            .single();

          if (portfolio) {
            portfolioId = portfolio.id;
          } else {
            const { data: profile } = await (supabase as any).from('profiles').select('username').eq('id', user.id).single();
            const slug = profile?.username || `user-${user.id.slice(0, 8)}`;
            
            const { data: newPortfolio, error: portfolioError } = await (supabase as any)
              .from('portfolios')
              .insert({
                user_id: user.id,
                title: "Mon Portfolio",
                slug: slug,
                is_published: true
              })
              .select()
              .single();
            
            if (portfolioError) throw portfolioError;
            portfolioId = newPortfolio.id;
          }
      }

      // 2. Upload files to Supabase Storage
      const mediaUrls: string[] = [...existingImages];
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

      // 3. Insert or Update project
      const tagsArray = data.tags.split(",").map(s => s.trim()).filter(Boolean);

      const projectData = {
        title: data.title,
        description: data.description,
        category: data.category,
        tags: tagsArray,
        drive_link: data.drive_link,
        image_url: mediaUrls[0] || null,
        project_url: data.drive_link,
        cover_url: mediaUrls[0] || null,
      };

      if (id) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', id);
        if (error) throw error;
        alert("Projet mis à jour avec succès !");
      } else {
        const { error } = await (supabase as any)
          .from('projects')
          .insert({
            ...projectData,
            portfolio_id: portfolioId,
            user_id: user.id,
            created_at: new Date().toISOString(),
          });
        if (error) throw error;
        alert("Projet ajouté avec succès !");
      }

      navigate("/dashboard/projects");
    } catch (error: any) {
      console.error(error);
      alert("Erreur lors de l'enregistrement du projet : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-dark mb-2 tracking-tight">{id ? "Modifier le projet" : "Ajouter un projet"}</h1>
        <p className="text-gray-500 text-lg">Partagez vos meilleures réalisations avec le monde.</p>
      </div>

      <Card className="border-0 shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden">
        <CardHeader className="bg-gray-50/50 border-b border-gray-100 p-8">
          <CardTitle className="text-xl font-bold text-dark">Détails du projet</CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 ml-1">Titre du projet</label>
              <input
                {...form.register("title")}
                className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400"
                placeholder="Mon super projet"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-xs ml-1">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 ml-1">Description</label>
              <textarea
                {...form.register("description")}
                className="w-full px-5 py-4 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400 min-h-[150px] resize-none"
                placeholder="Décrivez le contexte, les défis et les résultats..."
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-xs ml-1">{form.formState.errors.description.message}</p>
              )}
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
                <label className="text-sm font-semibold text-gray-700 ml-1">Tags (séparés par des virgules)</label>
                <input
                  {...form.register("tags")}
                  className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400"
                  placeholder="UI Design, Figma, React..."
                />
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-bold text-dark">Médias</h3>
              
              <div className="border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer relative group">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*,video/*" 
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <p className="mt-2 text-lg font-medium text-gray-900">Glissez-déposez vos fichiers ici</p>
                <p className="text-sm text-gray-500 mt-2">ou cliquez pour parcourir</p>
                <p className="text-xs text-gray-400 mt-4 font-medium uppercase tracking-wide">PNG, JPG, MP4 jusqu'à 10MB</p>
              </div>

              {(files.length > 0 || existingImages.length > 0) && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {existingImages.map((url, index) => (
                    <div key={`existing-${index}`} className="relative group bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          <img src={url} alt="preview" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 truncate flex-1">Image existante</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeExistingImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {files.map((file, index) => (
                    <div key={`new-${index}`} className="relative group bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          {file.type.startsWith('image/') ? (
                            <img src={URL.createObjectURL(file)} alt="preview" className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-xs text-gray-500">FILE</div>
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-700 truncate flex-1">{file.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeFile(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3 pt-4">
                <label className="text-sm font-semibold text-gray-700 ml-1">Lien Google Drive (Optionnel)</label>
                <input
                  {...form.register("drive_link")}
                  className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none font-medium text-gray-700 placeholder:text-gray-400"
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button type="submit" size="lg" className="px-8 py-6 text-lg font-bold shadow-lg shadow-primary/20 rounded-full" disabled={loading}>
                {loading ? "Enregistrement..." : (id ? "Mettre à jour" : "Publier le projet")}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
