import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

// Clave API configurada directamente
const API_KEY = 'AIzaSyDBqQe7zilcN3L_KOZWegULKKWpHKSKASU';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeRoutineWithGemini = async (
  profile: UserProfile,
  fileBase64: string,
  mimeType: string
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Falta la API Key.");
  }

  const modelId = "gemini-2.5-flash";

  // Constructing the complex system prompt based on user requirements
  const systemPrompt = `
    Actúa como un Entrenador Personal de Élite y experto en biomecánica. Tu tarea es analizar la rutina de ejercicios que se te proporciona en la imagen o PDF adjunto.
    
    Primero, verifica estrictamente si el archivo subido es una rutina de ejercicios o contenido relacionado con fitness. 
    SI NO LO ES: Responde únicamente con "ERROR_INVALID_CONTENT: El archivo subido no parece ser una rutina de ejercicios válida. Por favor sube una captura, foto o PDF de tu plan de entrenamiento."
    SI LO ES: Procede con el análisis profundo utilizando el siguiente perfil del usuario y reglas lógicas.

    PERFIL DEL USUARIO:
    - Objetivo: ${profile.objective}
    - Tipo de rutina (Split): ${profile.splitType}
    - Experiencia: ${profile.experience}
    - Volumen semanal: ${profile.weeklySets}
    - Descansos: ${profile.restTime}
    - Tipo de ejercicios predominante: ${profile.exerciseType}
    - Progresión: ${profile.progression}
    - Equilibrio muscular percibido: ${profile.balance}
    - Sensación de volumen basura: ${profile.junkVolumeFeeling}
    - Hace HIIT/Funcional: ${profile.functionalHiit}

    REGLAS DE ANÁLISIS (Usar estrictamente para dar feedback):

    1. ANÁLISIS DE OBJETIVO Y EXPERIENCIA:
       Ajusta tu tono y recomendaciones según si es ${profile.experience} buscando ${profile.objective}.

    2. DETECCIÓN DE VOLUMEN BASURA:
       - El usuario reporta ${profile.weeklySets} series semanales.
       - Si es "más de 20 series" O si reportó sentir pérdida de rendimiento ("${profile.junkVolumeFeeling}" es Sí), ADVIERTE sobre "Volumen Basura".
       - Explica que más no es mejor. Sugiere reducir series y aumentar intensidad (RIR/RPE).
       - Si el descanso es "${profile.restTime}" (ej: <1 min) y el objetivo es Fuerza, crítica esto severamente y sugiere descansos de 3min+.

    3. SELECCIÓN DE EJERCICIOS:
       - El usuario indicó: ${profile.exerciseType}.
       - Si es principalmente monoarticular, sugiere ejercicios compuestos (Sentadilla, Peso Muerto, Press Banca, Dominadas) para eficiencia.
       - Si es multiarticular, valida la elección para fuerza/masa.

    4. PROGRESIÓN Y VARIEDAD:
       - Método actual: ${profile.progression}.
       - Si no hay progresión, explica la importancia de la sobrecarga progresiva.
       - Si no hay variedad de ángulos, sugiere rotar ejercicios para estimular todas las fibras.

    5. EQUILIBRIO AGONISTA/ANTAGONISTA:
       - Usuario dice estar equilibrado: ${profile.balance}.
       - Aún así, revisa la rutina visualmente. Si ves mucho empuje (pecho/hombro/tríceps) y poca tracción (espalda/bíceps/facepulls), señala el riesgo de lesión y postura.

    6. HIIT/FUNCIONAL:
       - Usuario hace HIIT: ${profile.functionalHiit}.
       - Si es Sí, recuerda limitar a 2-3 sesiones para no quemar el SNC.

    FORMATO DE SALIDA (Markdown):
    Usa un formato atractivo y estructurado.
    1. **Veredicto General**: Resumen corto y directo (ej: "Rutina Sólida pero con Volumen Excesivo").
    2. **Análisis por Puntos**:
       - Volumen e Intensidad (Detectar volumen basura aquí).
       - Selección de Ejercicios.
       - Equilibrio Muscular.
    3. **La Rutina Corregida**:
       Genera una tabla o lista con la rutina MEJORADA basada en la subida, aplicando tus correcciones. Explica brevemente los cambios clave.
    4. **Consejo Final**: Una frase motivadora y técnica.

    No saludes excesivamente, ve al grano. Sé profesional pero accesible.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [
        {
          role: 'user',
          parts: [
            { text: systemPrompt },
            {
              inlineData: {
                mimeType: mimeType,
                data: fileBase64
              }
            }
          ]
        }
      ]
    });

    return response.text || "No se pudo generar un análisis. Intenta nuevamente.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Hubo un error al conectar con el entrenador AI. Verifica tu conexión o intenta más tarde.");
  }
};