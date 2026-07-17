'use client';

import { useAuthStore } from '@/lib/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function WorkspaceSelectPage() {
  const { workspaces, setActiveWorkspaceAndRole, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSelect = (workspaceId: string, role: string) => {
    setActiveWorkspaceAndRole(workspaceId, role as any);
    if (role === 'PLAYER') router.push('/player');
    if (role === 'ORGANIZER') router.push('/organizer');
    if (role === 'UMPIRE') router.push('/umpire');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-(--bg) text-(--text) p-6">
      <h1 className="text-2xl font-semibold mb-6">Choose Workspace</h1>
      <div className="grid gap-4 max-w-md mx-auto">
        {workspaces.map((ws) => (
          <div key={ws.id} className="bg-(--surface) p-4 rounded-(--radius-card) border border-(--border)">
            <h2 className="text-xl font-bold mb-3">{ws.organizationName}</h2>
            <div className="flex flex-col gap-2">
              {ws.roles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleSelect(ws.id, role)}
                  className="bg-(--surface-elevated) hover:bg-(--primary) hover:text-black transition-colors px-4 py-2 rounded-(--radius-pill) text-left font-semibold border border-(--border)"
                >
                  Continue as {role}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
