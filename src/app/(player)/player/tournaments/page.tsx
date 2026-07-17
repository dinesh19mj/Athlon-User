export default function TournamentsPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-extrabold mb-4">Tournaments</h1>
      <p className="text-(--text-muted)">Find and register for upcoming tournaments.</p>
      
      <div className="mt-8 bg-(--surface) border border-(--border) p-8 rounded-2xl text-center">
        <h3 className="font-bold text-xl mb-2">No active tournaments</h3>
        <p className="text-(--text-muted)">Check back later for new events in your area.</p>
      </div>
    </div>
  );
}
