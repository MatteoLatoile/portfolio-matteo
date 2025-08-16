import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { fullname, email, phone, entreprise, objet, message } = body;

  if (!fullname || !email || !message) {
    return NextResponse.json(
      { error: "Champs obligatoires manquants" },
      { status: 400 }
    );
  }

  // 1️⃣ Save in Supabase
  const { error } = await supabase
    .from("contacts")
    .insert([{ fullname, email, phone, entreprise, objet, message }]);

  if (error) {
    console.error("❌ Erreur Supabase :", error);
    return NextResponse.json({ error: "Erreur Supabase" }, { status: 500 });
  }

  // 2️⃣ Send confirmation email
  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // ⚠️ remplacer avec ton domaine vérifié
      to: email,
      subject: "Merci pour votre message 🙌",
      html: `
        <p>Bonjour <b>${fullname}</b>,</p>
        <p>Merci d’avoir pris contact via mon portfolio. Voici un rappel de votre message :</p>
        <blockquote>${message}</blockquote>
        <p>Je reviens vers vous très vite 👋</p>
        <br/>
        <p>— Mattéo</p>
      `,
    });
  } catch (err) {
    console.error("❌ Erreur envoi email :", err);
  }

  return NextResponse.json({ success: true });
}
