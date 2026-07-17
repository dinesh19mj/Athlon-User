export default function MatchesPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-extrabold mb-4">My Matches</h1>
      <p className="text-(--text-muted)">View your past and upcoming match schedule.</p>
      
      <div className="mt-8 bg-(--surface) border border-(--border) p-8 rounded-2xl text-center">
        <h3 className="font-bold text-xl mb-2">No scheduled matches</h3>
        <p className="text-(--text-muted)">Register for a tournament to see your fixtures here.</p>
      </div>
    </div>
  );
}
