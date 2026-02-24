import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, CheckCircle } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Email invalide"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Mot de passe oublié ?</h2>
          <p className="text-gray-500">
            Entrez votre email pour recevoir un lien de réinitialisation.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-6">
            <div className="bg-green-50 text-green-600 p-4 rounded-xl flex flex-col items-center justify-center border border-green-100">
              <CheckCircle className="w-12 h-12 mb-2 text-green-500" />
              <p className="font-medium">Email envoyé !</p>
              <p className="text-sm mt-1">Vérifiez votre boîte de réception.</p>
            </div>
            <Link to="/login">
              <Button variant="outline" className="w-full rounded-xl">
                Retour à la connexion
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Email</label>
              <input
                {...form.register("email")}
                className={`w-full px-4 py-3 rounded-xl border ${form.formState.errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/20 focus:border-primary'} outline-none transition-all`}
                placeholder="nom@exemple.com"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full py-6 rounded-full text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Envoyer le lien"}
            </Button>

            <div className="text-center">
              <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-primary flex items-center justify-center gap-2 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour à la connexion
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
