import Link from "next/link";
import { apiFetch } from "../../lib/api";
import type { LoanRequest, Tool } from "../../lib/loan-types";
import { clearSessionToken } from "../../lib/session";
import { redirect } from "next/navigation";

async function logout() {
  "use server";
  await clearSessionToken();
  redirect("/login");
}

type LoanRequestsPageProps = { searchParams: Promise<{ toolId?: string }> };


export default async function LoanRequestsPage({ searchParams }: LoanRequestsPageProps) {
  // Esta consulta solo prepara las opciones que se necesitan para el selector del filtro.
  
  // TODO FRONT-A: leer searchParams y consultar las solicitudes con apiFetch.
  // TODO FRONT-A: agregar el formulario GET de filtro usando tools y la opción All tools.
  // TODO FRONT-A: mostrar las solicitudes y sus enlaces al comprobante correspondiente.
  
  const {toolId} = await searchParams;
  const path = toolId
  ? `/loan-requests?toolId=${encodeURIComponent(toolId)}`
  : "/loan-request";
  const response = await apiFetch(path);

  if(!response.ok){
    throw new Error (
      "The tools could not be obtained"
    );
  }

  const requests: LoanRequest[] = await response.json();

  return (
    <main>
      <h1>Loan requests</h1>
      <Link className="button" href="/loan-requests/new">New request</Link>
      <form action={logout}><button type="submit">Cerrar sesión</button></form>
      <div className="actions">
        <Link href="/loan-requests">All</Link>
        <Link href="/loan-requests?toolId=toolId">
          ToolId
        </Link>
      </div>
      <section className="panel" aria-label="Loan requests">
        {requests.map((request) => (
          <article key={request.id}>
            <h2>{request.purpose}</h2>
            <p>Days: {request.days}</p>
            <p>Tool: {request.tool.name}</p>
            <Link href={`/loans-requests/${request.id}`}>
              View details
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}

