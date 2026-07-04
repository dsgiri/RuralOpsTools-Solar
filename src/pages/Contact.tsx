import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function Contact() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Contact Us</h1>
        <p className="mt-2 text-slate-600">Have a question or found a bug? Let us know.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
          <CardDescription>We usually respond within a few business days.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Name" placeholder="Jane Doe" />
          <Input label="Email" type="email" placeholder="jane@example.com" />
          
          <div className="flex flex-col w-full">
            <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase mb-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Message
            </label>
            <textarea
              id="message"
              className="w-full bg-white border border-slate-300 rounded px-4 py-2 font-mono text-lg outline-none focus:border-slate-900 disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
              placeholder="How can we help?"
            />
          </div>
          
          <Button className="w-full sm:w-auto">Submit Request</Button>
        </CardContent>
      </Card>
    </div>
  );
}
