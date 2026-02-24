import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function Stats() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-dark mb-2 tracking-tight">Statistiques</h1>
        <p className="text-gray-500">Analysez les performances de votre portfolio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg shadow-gray-100 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              Vues par jour
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-gray-50/50 rounded-2xl m-6 mt-0 border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Graphique à venir</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg shadow-gray-100 rounded-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-accent" />
              Sources de trafic
            </CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-gray-50/50 rounded-2xl m-6 mt-0 border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">Graphique à venir</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
