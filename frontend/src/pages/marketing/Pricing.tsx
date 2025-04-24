
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const Pricing = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card title="Free Plan">
            <p className="text-4xl font-bold mb-4">$0</p>
            <ul className="mb-6 space-y-2 text-sm text-gray-700">
              <li>✓ 1 Project</li>
              <li>✓ 100 Comments</li>
              <li>✓ Basic AI Insights</li>
            </ul>
            <Button className="w-full">Get Started</Button>
          </Card>

          <Card title="Pro Plan">
            <p className="text-4xl font-bold mb-4">$29/mo</p>
            <ul className="mb-6 space-y-2 text-sm text-gray-700">
              <li>✓ 10 Projects</li>
              <li>✓ 10k Comments</li>
              <li>✓ Advanced Clustering</li>
              <li>✓ Exportable Reports</li>
            </ul>
            <Button className="w-full">Upgrade</Button>
          </Card>

          <Card title="Enterprise Plan">
            <p className="text-4xl font-bold mb-4">Custom</p>
            <ul className="mb-6 space-y-2 text-sm text-gray-700">
              <li>✓ Unlimited Projects</li>
              <li>✓ API Access</li>
              <li>✓ Dedicated Support</li>
              <li>✓ SLA & DPA</li>
            </ul>
            <Button className="w-full">Contact Sales</Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
