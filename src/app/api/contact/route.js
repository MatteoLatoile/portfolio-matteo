import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

export async function POST(request) {
  try {
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const supabaseServiceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    const resendApiKey =
      process.env.RESEND_API_KEY;

    /*
     * Les clients sont créés uniquement au moment
     * où le formulaire est envoyé.
     *
     * Cela empêche Next.js de faire planter le build
     * lorsque les variables sont absentes.
     */
    if (!supabaseUrl || !supabaseServiceRoleKey) {
      console.error(
        "Variables Supabase manquantes :",
        {
          hasSupabaseUrl: Boolean(supabaseUrl),
          hasServiceRoleKey: Boolean(
            supabaseServiceRoleKey
          ),
        }
      );

      return NextResponse.json(
        {
          error:
            "Le formulaire de contact n’est pas encore configuré.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    const {
      fullname,
      email,
      phone,
      entreprise,
      objet,
      message,
    } = body;

    if (!fullname || !email || !message) {
      return NextResponse.json(
        {
          error: "Champs obligatoires manquants.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase = createClient(
      supabaseUrl,
      supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const { error: supabaseError } = await supabase
      .from("contacts")
      .insert([
        {
          fullname,
          email,
          phone: phone || null,
          entreprise: entreprise || null,
          objet: objet || null,
          message,
        },
      ]);

    if (supabaseError) {
      console.error(
        "Erreur Supabase :",
        supabaseError
      );

      return NextResponse.json(
        {
          error:
            "Une erreur est survenue lors de l’enregistrement du message.",
        },
        {
          status: 500,
        }
      );
    }

    /*
     * L’e-mail de confirmation est facultatif.
     * Le message reste enregistré dans Supabase
     * même si Resend n’est pas encore configuré.
     */
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        await resend.emails.send({
          from:
            process.env.RESEND_FROM_EMAIL ||
            "Portfolio <onboarding@resend.dev>",

          to: email,

          subject:
            "Merci pour votre message",

          html: `
            <p>Bonjour <strong>${escapeHtml(
              fullname
            )}</strong>,</p>

            <p>
              Merci d’avoir pris contact via mon portfolio.
              Voici un rappel de votre message :
            </p>

            <blockquote
              style="
                margin: 20px 0;
                padding: 15px;
                border-left: 3px solid #c154f7;
                background: #f7f2fa;
              "
            >
              ${escapeHtml(message)}
            </blockquote>

            <p>
              Je reviendrai vers vous dès que possible.
            </p>

            <p>Mattéo Padalino</p>
          `,
        });
      } catch (emailError) {
        console.error(
          "Erreur lors de l’envoi de l’e-mail :",
          emailError
        );
      }
    } else {
      console.warn(
        "RESEND_API_KEY absente : confirmation par e-mail ignorée."
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message envoyé avec succès.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Erreur dans l’API de contact :",
      error
    );

    return NextResponse.json(
      {
        error:
          "Une erreur inattendue est survenue.",
      },
      {
        status: 500,
      }
    );
  }
}