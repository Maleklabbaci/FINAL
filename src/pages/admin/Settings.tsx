import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"; // Need to create or mock this if not exists, using simple checkbox for now if needed, but let's assume standard UI
import { Input } from "@/components/ui/input"; // Assuming standard input
import { Label } from "@/components/ui/label"; // Assuming standard label
import { Bell, Shield, CreditCard, Save, Star, Trash2 } from "lucide-react";

// Mock UI components for settings
const SettingSection = ({ title, icon: Icon, children }: any) => (
  <Card className="border-0 shadow-sm mb-6">
    <CardHeader className="border-b border-gray-50 pb-4">
      <CardTitle className="flex items-center gap-2 text-lg">
        <Icon className="w-5 h-5 text-gray-500" />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-6">
      {children}
    </CardContent>
  </Card>
);

export default function AdminSettings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres Plateforme</h1>
        <p className="text-gray-500">Configuration globale de Portfola.</p>
      </div>

      <SettingSection title="Maintenance & Accès" icon={Shield}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="font-medium text-gray-900">Mode Maintenance</h4>
            <p className="text-sm text-gray-500">Rend le site inaccessible aux utilisateurs (sauf admins).</p>
          </div>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-gray-200 cursor-pointer">
             <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Inscriptions</h4>
            <p className="text-sm text-gray-500">Autoriser les nouveaux utilisateurs à s'inscrire.</p>
          </div>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-green-500 cursor-pointer">
             <span className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></span>
          </div>
        </div>
      </SettingSection>

      <SettingSection title="Tarification (DA)" icon={CreditCard}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Plan Pro (Mensuel)</label>
            <input type="number" className="w-full px-3 py-2 border rounded-lg" defaultValue={1500} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Plan Agence (Mensuel)</label>
            <input type="number" className="w-full px-3 py-2 border rounded-lg" defaultValue={4500} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Remise Annuelle (%)</label>
            <input type="number" className="w-full px-3 py-2 border rounded-lg" defaultValue={20} />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button className="bg-gray-900 text-white hover:bg-gray-800">
            <Save className="w-4 h-4 mr-2" /> Enregistrer les tarifs
          </Button>
        </div>
      </SettingSection>

      <SettingSection title="Freelancers en Vedette" icon={Star}>
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Sélectionnez les freelancers à afficher sur la page d'accueil.</p>
          <div className="flex gap-2">
            <Input placeholder="Rechercher par nom ou email..." className="max-w-sm" />
            <Button variant="outline">Ajouter</Button>
          </div>
          <div className="space-y-2 mt-4">
            {["Amine Benali", "Sarah K.", "Karim T."].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                    {name.charAt(0)}
                  </div>
                  <span className="font-medium text-sm">{name}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </SettingSection>

      <SettingSection title="Notifications" icon={Bell}>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Message global (Bannière)</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" placeholder="Ex: Maintenance prévue ce soir..." />
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Envoyer notification</Button>
          </div>
        </div>
      </SettingSection>
    </div>
  );
}
