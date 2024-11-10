import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { data } = await axios.get(`http://localhost:3000/atividades-esg`);

    return NextResponse.json({ message: "Inputs found", data });
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch inputs" },
      { status: 500 }
    );
  }
}
