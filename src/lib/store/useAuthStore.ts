import { create } from 'zustand';
import { AuthService } from '../api/auth';

export type Role = 'PLAYER' | 'ORGANIZER' | 'UMPIRE';

export type Workspace = {
  id: string;
  organizationName: string;
  roles: Role[];
};

type AuthState = {
  isAuthenticated: boolean;
  workspaces: Workspace[];
  activeWorkspaceId: string | null;
  activeRole: Role | null;
  userEmail: string | null;
  login: (email: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  setActiveWorkspaceAndRole: (workspaceId: string, role: Role) => void;
};

// Mock data fallback
const mockWorkspaces: Workspace[] = [
  {
    id: 'ws-1',
    organizationName: 'Athlon Official',
    roles: ['ORGANIZER', 'PLAYER', 'UMPIRE'],
  },
  {
    id: 'ws-2',
    organizationName: 'City Tennis Club',
    roles: ['PLAYER'],
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  workspaces: mockWorkspaces,
  activeWorkspaceId: null,
  activeRole: null,
  userEmail: null,

  login: async (email: string) => {
    try {
      // Attempt to hit the real API
      const res = await AuthService.login(email);
      // Store token if needed: localStorage.setItem('token', res.data.token);
    } catch (error) {
      console.warn('API Login failed, using local simulation for development', error);
    }

    // Basic simulation: if email has 'organizer' or 'umpire', assign role accordingly
    const lowerEmail = email.toLowerCase();
    
    let activeRole: Role = 'PLAYER';
    if (lowerEmail.includes('organizer')) activeRole = 'ORGANIZER';
    else if (lowerEmail.includes('umpire')) activeRole = 'UMPIRE';
    
    set({ 
      isAuthenticated: true,
      userEmail: email,
      activeRole,
      activeWorkspaceId: 'ws-1'
    });
  },
  
  register: async (data: any) => {
    try {
      await AuthService.register(data);
    } catch (error) {
      console.warn('API Register failed, proceeding with local simulation', error);
    }
    
    // Simulate successful login after registration
    const email = data.email || '';
    const lowerEmail = email.toLowerCase();
    let activeRole: Role = 'PLAYER';
    if (lowerEmail.includes('organizer')) activeRole = 'ORGANIZER';
    else if (lowerEmail.includes('umpire')) activeRole = 'UMPIRE';
    
    set({
      isAuthenticated: true,
      userEmail: email,
      activeRole,
      activeWorkspaceId: 'ws-1'
    });
  },
  logout: () => {
    // localStorage.removeItem('token');
    set({
      isAuthenticated: false,
      activeWorkspaceId: null,
      activeRole: null,
      userEmail: null,
    });
  },
  setActiveWorkspaceAndRole: (workspaceId, role) =>
    set({
      activeWorkspaceId: workspaceId,
      activeRole: role,
    }),
}));
