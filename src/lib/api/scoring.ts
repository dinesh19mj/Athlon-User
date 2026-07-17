import { api } from './client';
import { Team } from '../store/useMatchStore';

export interface ScoreEvent {
  team: Team;
  action: 'POINT_SCORED' | 'POINT_REVERTED' | 'FAULT';
  timestamp: string;
}

export const ScoringService = {
  recordEvent: (matchId: string, sportType: string, event: ScoreEvent) =>
    api.post<{ data: any }>(
      `/api/tournament/scores/record-event?matchId=${matchId}&sportType=${sportType}`, 
      event
    ),
};
