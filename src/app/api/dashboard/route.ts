import { NextResponse } from "next/server";
import axios from "axios";

async function fetchUsers() {
  const response = await axios.get("http://localhost:3000/usuarios");
  return response.data;
}

async function fetchDeliveries() {
  const response = await axios.get("http://localhost:3000/entregas");
  return response.data;
}

async function fetchCollaborators() {
  const response = await axios.get("http://localhost:3000/colaboradores");
  return response.data;
}

async function fetchCondos() {
  const response = await axios.get("http://localhost:3000/condominios");
  return response.data;
}

export async function GET() {
  try {
    const [users, deliveries, collaborators, condos] = await Promise.all([
      fetchUsers(),
      fetchDeliveries(),
      fetchCollaborators(),
      fetchCondos(),
    ]);

    return NextResponse.json({
      users,
      deliveries,
      collaborators,
      condos,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
