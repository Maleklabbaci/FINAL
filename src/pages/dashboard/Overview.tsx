import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Folder, MousePointerClick, ArrowUpRight } from "lucide-react";

export default function Overview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Vue d'ensemble</h1>
        <p className="text-gray-500">Bienvenue sur votre tableau de bord.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vues du profil</CardTitle>
            <Eye className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              +12% ce mois-ci
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets publiés</CardTitle>
            <Folder className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-gray-500 mt-1">
              1 restant (Plan Gratuit)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clics sur liens</CardTitle>
            <MousePointerClick className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              +5% ce mois-ci
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity or Empty State */}
      <div className="bg-white rounded-xl border p-8 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-2">Complétez votre profil</h3>
          <p className="text-gray-500 mb-6">
            Votre profil est incomplet. Ajoutez vos compétences et vos réseaux sociaux pour être plus visible.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
            Compléter mon profil
          </button>
        </div>
      </div>
    </div>
  );
}
