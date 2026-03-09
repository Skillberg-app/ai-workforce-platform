export default function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the Skillberg AI Workforce Impact Platform.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Jobs", value: "—" },
          { label: "Skills Mapped", value: "—" },
          { label: "AI Impact Score", value: "—" },
          { label: "Reports Generated", value: "—" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-lg border bg-card p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
