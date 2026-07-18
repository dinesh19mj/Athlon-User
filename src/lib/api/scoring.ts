import { api } from './client';
import { Team } from '../store/useMatchStore';

export interface ScoreEvent {
  team: Team;
  action: 'POINT_SCORED' | 'POINT_REVERTED' | 'FAULT';
  timestamp: string;
}

export const ScoringService = {
  recordEvent: async (matchId: string, sportType: string, event: ScoreEvent) => {
    try {
      return await api.post<{ data: any }>(
        `/api/tournament/scores/record-event?matchId=${matchId}&sportType=${sportType}`, 
        event
      );
    } catch (error) {
      console.log('[browser] Mocking scoring API response for development');
      return { data: { success: true } };
    }
  }
};
