import { useEffect, useState } from 'react';
import { useAuth, loginWithRedirect, logout } from 'zitejs/auth';
import { checkAdmin } from 'zitejs/api';
import { Button } from '@project/components/ui/button';
import { Loader2 } from 'lucide-react';
import LeadsBoard from '../components/dashboard/LeadsBoard';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [admin, setAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) { loginWithRedirect(); return; }
    checkAdmin({}).then((r) => setAdmin(r.isAdmin)).catch(() => setAdmin(false));
  }, [isLoading, user]);

  if (isLoading || !user || admin === null) {
    return <div className="grid min-h-screen place-items-center"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }
  if (!admin) {
    return (
      <div className="grid min-h-screen place-items-center px-4 text-center">
        <div>
          <h1 className="font-display text-2xl font-bold">No access</h1>
          <p className="mt-2 text-muted-foreground">{user.email} isn't allowed to view this dashboard.</p>
          <Button className="mt-6" variant="outline" onClick={() => logout()}>Sign out</Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <a href="/" className="font-display text-lg font-bold">Joblo Web <span className="font-sans text-sm font-medium text-muted-foreground">· Leads</span></a>
          <Button variant="ghost" size="sm" onClick={() => logout()}>Sign out</Button>
        </div>
      </header>
      <LeadsBoard />
    </div>
  );
}
