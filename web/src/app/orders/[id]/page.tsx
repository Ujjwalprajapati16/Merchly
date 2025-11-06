export default function OrderDetailsPage({ params }: any) {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Order #{params.id}</h1>
      <p>Order details coming soon…</p>
    </div>
  );
}
