import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import { LoanRequest } from "../../../lib/loan-types";

type ReceiptPageProps = { params: Promise<{ id: string }> };

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  // TODO FRONT-C: leer params y consultar el detalle con apiFetch.
  // TODO FRONT-C: mostrar ID, purpose, days y tool.name de la solicitud recibida.
  
  const { id } = await params;

  const response = await apiFetch(`/loan-requests/${id}`);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Could not be queried ");
  }

  const request: LoanRequest = await response.json();

  return (
    <main>
      <h1>Loan receipt</h1>
      <Link href="/loan-requests">Back to requests</Link>
      <section className="panel" aria-label="Request details">
        <p>ID: {request.id}</p>
        <p>Purpose: {request.purpose}</p>
        <p>Days: {request.days}</p>
        <p>Tool: {request.tool.name}</p>
      </section>

    </main>
  );
}

