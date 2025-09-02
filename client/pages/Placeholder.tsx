import Layout from "@/components/eventx/Layout";

export default function Placeholder({ title = "Coming soon" }: { title?: string }) {
  return (
    <Layout>
      <div className="bg-card rounded-xl p-10 border shadow-sm text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">This section will be generated next. Tell me what you want here and I will build it.</p>
      </div>
    </Layout>
  );
}
