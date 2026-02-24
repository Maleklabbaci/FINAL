import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, Bell, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-dark mb-2 tracking-tight">Paramètres</h1>
        <p className="text-gray-500">Gérez vos préférences et votre compte.</p>
      </div>

      <div className="space-y-6">
        <Card className="border-0 shadow-lg shadow-gray-100 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" />
              Compte
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-2xl">
              <div>
                <p className="font-bold text-dark">Email</p>
                <p className="text-sm text-gray-500">user@example.com</p>
              </div>
              <Button variant="outline" className="rounded-full">Modifier</Button>
            </div>
            <div className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-2xl">
              <div>
                <p className="font-bold text-dark">Plan actuel</p>
                <p className="text-sm text-gray-500">Gratuit</p>
              </div>
              <Button className="rounded-full bg-accent text-dark hover:bg-accent/90 border-0">Mettre à niveau</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-gray-100 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gray-50/50 border-b border-gray-100">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between p-2">
              <span className="font-medium text-gray-700">Email marketing</span>
              <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
