export default function NotificationsPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-extrabold mb-4">Notifications</h1>
      <p className="text-(--text-muted)">Stay updated on your upcoming matches and results.</p>
      
      <div className="mt-8 bg-(--surface) border border-(--border) p-8 rounded-2xl text-center">
        <h3 className="font-bold text-xl mb-2">You're all caught up!</h3>
        <p className="text-(--text-muted)">There are no new notifications at this time.</p>
      </div>
    </div>
  );
}
