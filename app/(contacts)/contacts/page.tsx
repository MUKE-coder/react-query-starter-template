import { Star } from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { getContacts } from "@/actions/actions";
import Link from "next/link";

export default async function ContactsPage() {
  const { success, contacts = [], error } = await getContacts();

  if (!success) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Sidebar count={contacts.length} />
      <main className="flex-1 ml-64">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              Contacts ({contacts.length})
            </h1>
          </div>

          <div className="border rounded-lg">
            <div className="grid grid-cols-[1fr,1.5fr,1fr] p-3 border-b bg-muted/50">
              <div>Name</div>
              <div>Email</div>
              <div>Phone number</div>
            </div>

            {contacts.length > 0 ? (
              <div className="divide-y">
                {contacts.map((contact) => (
                  <Link
                    key={contact.id}
                    href={`/contacts/${contact.id}`}
                    className="grid grid-cols-[1fr,1.5fr,1fr] p-3 items-center hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        {contact.name[0]}
                      </div>
                      <span>{contact.name}</span>
                    </div>
                    <div>{contact.email}</div>
                    <div>{contact.phone}</div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="">
                <p className="p-4">No Contacts</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
