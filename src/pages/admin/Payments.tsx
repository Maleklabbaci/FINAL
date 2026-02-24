import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 350000 },
  { name: 'Feb', revenue: 452000 },
  { name: 'Mar', revenue: 410000 },
  { name: 'Apr', revenue: 520000 },
  { name: 'May', revenue: 480000 },
  { name: 'Jun', revenue: 600000 },
];

const MOCK_TRANSACTIONS = [
  { id: "TRX-9871", user: "Amine Benali", plan: "Pro (Mensuel)", amount: "1,500 DA", date: "2024-02-23", status: "Succès" },
  { id: "TRX-9872", user: "Yacine B.", plan: "Agence (Annuel)", amount: "45,000 DA", date: "2024-02-22", status: "Succès" },
  { id: "TRX-9873", user: "Karim T.", plan: "Pro (Mensuel)", amount: "1,500 DA", date: "2024-02-22", status: "Échec" },
  { id: "TRX-9874", user: "Sarah K.", plan: "Pro (Mensuel)", amount: "1,500 DA", date: "2024-02-21", status: "Succès" },
];

export default function AdminPayments() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paiements</h1>
          <p className="text-gray-500">Suivi des revenus et transactions.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" /> Exporter Rapport
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Revenus Mensuels (DA)</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                <Tooltip cursor={{fill: '#f9fafb'}} />
                <Bar dataKey="revenue" fill="#6C3FE8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
            <CardContent className="p-6">
              <p className="text-white/70 font-medium mb-1">Revenu Total (2024)</p>
              <h3 className="text-3xl font-bold mb-4">2,812,000 DA</h3>
              <div className="flex items-center text-sm bg-white/10 w-fit px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 mr-2" /> +28% vs 2023
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm">
             <CardHeader>
               <CardTitle className="text-sm">Dernière transaction</CardTitle>
             </CardHeader>
             <CardContent>
               <div className="text-2xl font-bold text-gray-900">1,500 DA</div>
               <p className="text-xs text-gray-500">Il y a 2 heures par Amine Benali</p>
             </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Transactions Récentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Utilisateur</th>
                  <th className="px-6 py-3">Plan</th>
                  <th className="px-6 py-3">Montant</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Statut</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_TRANSACTIONS.map((trx) => (
                  <tr key={trx.id} className="bg-white border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{trx.id}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{trx.user}</td>
                    <td className="px-6 py-4 text-gray-600">{trx.plan}</td>
                    <td className="px-6 py-4 font-bold text-gray-900">{trx.amount}</td>
                    <td className="px-6 py-4 text-gray-500">{trx.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        trx.status === 'Succès' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
