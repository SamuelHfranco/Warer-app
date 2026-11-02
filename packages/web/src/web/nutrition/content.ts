export const NHS_SOURCE =
  "https://www.nhs.uk/live-well/eat-well/food-types/how-does-sugar-in-our-diet-affect-our-health/";
export const nih = (topic: string) => `https://ods.od.nih.gov/factsheets/${topic}-Consumer/`;
export type Recipe = {
  id: string;
  name: string;
  subtitle: string;
  type: "Jugo" | "Licuado";
  color: string;
  image: string;
  tag: string;
  benefit: string;
  ingredients: string[];
  steps: string[];
  tip: string;
  source: string;
};
export const recipes: Recipe[] = [
  {
    id: "verde",
    name: "Verde fresco",
    subtitle: "Pepino · espinaca · limón",
    type: "Licuado",
    color: "#edf4dc",
    image: "green",
    tag: "Vitamina K",
    benefit:
      "La espinaca aporta vitamina K, necesaria para la coagulación normal y la salud de los huesos.",
    ingredients: [
      "80 g de pepino lavado",
      "20 g de espinaca lavada",
      "1 cucharadita de jugo de limón",
      "Agua potable hasta completar 300 ml",
    ],
    steps: [
      "Corta el pepino y retira las hojas dañadas de la espinaca.",
      "Licúa los vegetales con el limón y un poco de agua hasta obtener una mezcla uniforme.",
      "Añade agua hasta completar 300 ml. Divide en dos vasos de 150 ml, sin colar.",
    ],
    tip: "Conservar la pulpa retiene más fibra que extraer y colar el jugo. Si tomas warfarina, consulta antes de cambiar mucho tu consumo de vitamina K.",
    source: nih("VitaminK"),
  },
  {
    id: "citrico",
    name: "Sol de naranja",
    subtitle: "Naranja · zanahoria · jengibre",
    type: "Jugo",
    color: "#fff0db",
    image: "orange",
    tag: "Vitamina C + carotenoides",
    benefit:
      "La naranja aporta vitamina C; la zanahoria aporta betacaroteno, que el cuerpo puede convertir en vitamina A para funciones como la visión.",
    ingredients: [
      "1 naranja pequeña, pelada",
      "1 zanahoria pequeña (60 g), lavada",
      "Una lámina fina de jengibre, opcional",
      "Agua potable hasta completar 300 ml",
    ],
    steps: [
      "Extrae el jugo de naranja y zanahoria con un exprimidor y extractor.",
      "Mezcla los jugos; añade un poco de jengibre si te gusta.",
      "Completa con agua hasta 300 ml y divide en dos porciones de 150 ml.",
    ],
    tip: "La fruta entera conserva más fibra. No agregues azúcar ni miel; un jugo natural también contiene azúcares libres.",
    source: nih("VitaminA"),
  },
  {
    id: "sandia",
    name: "Sandía de verano",
    subtitle: "Sandía · limón · menta",
    type: "Jugo",
    color: "#fbe7e7",
    image: "pink",
    tag: "Una opción refrescante",
    benefit:
      "La sandía aporta agua y sabor. Puede ser una alternativa sin azúcar añadida a las bebidas endulzadas, pero no reemplaza el agua ni la fruta entera.",
    ingredients: [
      "200 g de sandía sin cáscara ni semillas",
      "1 cucharadita de jugo de limón",
      "2 hojas de menta lavadas",
      "Agua potable hasta completar 300 ml",
    ],
    steps: [
      "Licúa la sandía con el limón y la menta.",
      "Cuela solo si prefieres un jugo sin pulpa; al colar se pierde parte de la fibra.",
      "Añade agua hasta completar 300 ml y sirve dos vasos de 150 ml.",
    ],
    tip: "Sin azúcar añadida no significa sin azúcar. Mantén la porción pequeña y acompáñala con una comida.",
    source: NHS_SOURCE,
  },
  {
    id: "betabel",
    name: "Rojo de huerta",
    subtitle: "Betabel · naranja · limón",
    type: "Licuado",
    color: "#f3e6ef",
    image: "beet",
    tag: "Vegetales + vitamina C",
    benefit:
      "Combina un vegetal con naranja, que aporta vitamina C. Esta vitamina participa en la formación de colágeno y ayuda a absorber el hierro vegetal.",
    ingredients: [
      "50 g de betabel cocido, sin sal ni azúcar",
      "Media naranja pequeña, pelada",
      "1 cucharadita de jugo de limón",
      "Agua potable hasta completar 300 ml",
    ],
    steps: [
      "Corta el betabel ya cocido y retira las semillas de la naranja.",
      "Licúa con el limón y un poco de agua, sin colar.",
      "Completa hasta 300 ml y reparte en dos vasos de 150 ml.",
    ],
    tip: "El betabel puede colorear temporalmente la orina o las heces. Esta bebida no es un tratamiento para la anemia.",
    source: nih("VitaminC"),
  },
  {
    id: "frutos",
    name: "Frutos del bosque",
    subtitle: "Fresas · frutos rojos · yogur",
    type: "Licuado",
    color: "#f1e9f5",
    image: "berry",
    tag: "Vitamina C + calcio",
    benefit:
      "Las fresas aportan vitamina C y el yogur aporta calcio, necesario para los huesos, los músculos y la comunicación nerviosa.",
    ingredients: [
      "80 g de fresas y frutos rojos lavados",
      "100 g de yogur natural sin azúcar",
      "Agua potable hasta completar 300 ml",
    ],
    steps: [
      "Retira las hojas de las fresas. Si utilizas fruta congelada, sigue las indicaciones de seguridad del envase.",
      "Licúa la fruta con el yogur y agua, sin colar.",
      "Completa hasta 300 ml y divide en dos porciones de 150 ml.",
    ],
    tip: "Contiene lácteos. Si usas una alternativa vegetal, elige una fortificada con calcio y revisa la etiqueta.",
    source: nih("Calcium"),
  },
  {
    id: "platano",
    name: "Plátano suave",
    subtitle: "Plátano · leche · canela",
    type: "Licuado",
    color: "#f5efdF",
    image: "banana",
    tag: "Potasio + calcio",
    benefit:
      "El plátano aporta potasio para la función muscular y nerviosa; la leche aporta calcio. Los nutrientes de una bebida vegetal dependen de su fortificación.",
    ingredients: [
      "Medio plátano mediano (60 g)",
      "150 ml de leche pasteurizada sin azúcar añadida",
      "Una pizca de canela, opcional",
      "Agua potable hasta completar 300 ml",
    ],
    steps: [
      "Pela el plátano y córtalo en trozos.",
      "Licúa con la leche y la canela hasta que quede suave.",
      "Completa con agua hasta 300 ml y sirve dos porciones de 150 ml.",
    ],
    tip: "Contiene lácteos. No necesita miel. Si tienes enfermedad renal o restricciones de potasio, sigue las indicaciones de tu equipo médico.",
    source: nih("Potassium"),
  },
];
export type Food = { name: string; image: string; detail: string; idea: string };
export type Nutrient = {
  id: string;
  name: string;
  symbol: string;
  color: string;
  benefit: string;
  note: string;
  source: string;
  foods: Food[];
};
const food = (name: string, image: string, detail: string, idea: string): Food => ({
  name,
  image,
  detail,
  idea,
});
export const nutrients: Nutrient[] = [
  {
    id: "k",
    name: "Vitamina K",
    symbol: "K",
    color: "#eaf1dd",
    benefit:
      "Participa en la coagulación normal de la sangre y en proteínas relacionadas con la salud ósea.",
    note: "Si tomas warfarina, mantener un consumo constante de vitamina K es importante. Consulta antes de hacer cambios grandes.",
    source: nih("VitaminK"),
    foods: [
      food(
        "Kale",
        "k-0",
        "Hoja verde que aporta vitamina K1 y fibra.",
        "Añádelo a una ensalada o saltéalo con aceite de oliva.",
      ),
      food(
        "Ciruelas pasas",
        "k-1",
        "Aportan vitamina K y fibra; son fruta deshidratada.",
        "Úsalas en pequeñas cantidades en avena o yogur.",
      ),
      food("Espárragos", "k-2", "Aportan vitamina K y folato.", "Prepáralos al vapor o al horno."),
      food(
        "Acelga",
        "k-3",
        "Verdura de hoja verde que aporta vitamina K1.",
        "Cocínala en un salteado o una sopa.",
      ),
      food(
        "Chícharos",
        "k-4",
        "Aportan vitamina K, fibra y proteína vegetal.",
        "Combínalos con arroz u otras verduras.",
      ),
      food(
        "Natto",
        "k-5",
        "Soya fermentada que contiene vitamina K2; las cantidades varían.",
        "Pruébalo como acompañamiento. Contiene soya.",
      ),
    ],
  },
  {
    id: "ca",
    name: "Calcio",
    symbol: "Ca",
    color: "#edf2e7",
    benefit:
      "Es necesario para huesos y dientes, contracción muscular y transmisión de señales nerviosas.",
    note: "La cantidad y absorción cambian según el alimento. Revisa las etiquetas de productos fortificados; no todos contienen el mismo calcio.",
    source: nih("Calcium"),
    foods: [
      food(
        "Leche",
        "ca-0",
        "Aporta calcio y proteína; utiliza leche pasteurizada.",
        "Tómala sin azúcar añadida o agrégala a la avena.",
      ),
      food(
        "Queso",
        "ca-1",
        "Aporta calcio y proteína; el sodio y las grasas varían por tipo.",
        "Úsalo como complemento y revisa la etiqueta.",
      ),
      food(
        "Bok choy",
        "ca-2",
        "Verdura de hoja verde que aporta calcio.",
        "Saltéalo con otras verduras.",
      ),
      food(
        "Almendras",
        "ca-3",
        "Aportan calcio, magnesio y grasas insaturadas.",
        "Añade un puñado pequeño a tu comida. Contienen frutos secos.",
      ),
      food(
        "Sardinas",
        "ca-4",
        "Las sardinas con espinas comestibles aportan calcio.",
        "Úsalas en tostadas o ensaladas; revisa el sodio de la conserva.",
      ),
      food(
        "Higos secos",
        "ca-5",
        "Aportan algo de calcio y fibra; son fruta deshidratada.",
        "Combina una pequeña cantidad con yogur natural.",
      ),
    ],
  },
  {
    id: "b",
    name: "Biotina",
    symbol: "B7",
    color: "#f8eddf",
    benefit:
      "Ayuda a las enzimas a metabolizar grasas, carbohidratos y proteínas. Su deficiencia es poco frecuente.",
    note: "No hay evidencia sólida de que tomar biotina extra mejore el cabello o las uñas sin una deficiencia. Los suplementos pueden interferir con análisis clínicos.",
    source: nih("Biotin"),
    foods: [
      food(
        "Almendras",
        "b-0",
        "Los frutos secos aportan biotina y grasas insaturadas.",
        "Úsalas sin sal como complemento; contienen frutos secos.",
      ),
      food(
        "Huevo cocido",
        "b-1",
        "Aporta biotina y proteína. La clara cruda puede reducir la absorción de biotina.",
        "Cocina bien el huevo y acompáñalo con verduras.",
      ),
      food("Camote", "b-2", "Aporta biotina y betacaroteno.", "Hornéalo o cocínalo al vapor."),
      food(
        "Espinaca",
        "b-3",
        "Aporta pequeñas cantidades de biotina y otros micronutrientes.",
        "Inclúyela dentro de una alimentación variada.",
      ),
      food(
        "Salmón",
        "b-4",
        "Aporta biotina, proteína y omega‑3 EPA y DHA.",
        "Cocínalo al horno; contiene pescado.",
      ),
      food(
        "Semillas de girasol",
        "b-5",
        "Aportan biotina, vitamina E y grasas insaturadas.",
        "Espolvoréalas sin sal sobre ensaladas.",
      ),
    ],
  },
  {
    id: "mg",
    name: "Magnesio",
    symbol: "Mg",
    color: "#e9edf5",
    benefit:
      "Interviene en la función muscular y nerviosa, la producción de energía y numerosas reacciones del organismo.",
    note: "Una dieta variada puede aportar magnesio sin recurrir a suplementos. Los alimentos no son un tratamiento por sí solos para el estrés.",
    source: nih("Magnesium"),
    foods: [
      food(
        "Almendras",
        "mg-0",
        "Aportan magnesio, fibra y grasas insaturadas.",
        "Sírvelas sin sal junto a fruta; contienen frutos secos.",
      ),
      food(
        "Espinaca",
        "mg-1",
        "Las hojas verdes aportan magnesio.",
        "Saltéala o incorpórala a una tortilla.",
      ),
      food(
        "Aguacate",
        "mg-2",
        "Aporta magnesio, potasio y grasas insaturadas.",
        "Añádelo a una ensalada o tostada.",
      ),
      food(
        "Frijoles negros",
        "mg-3",
        "Aportan magnesio, fibra y proteína vegetal.",
        "Úsalos bien cocidos; enjuaga las conservas para reducir el sodio.",
      ),
      food(
        "Chocolate oscuro",
        "mg-4",
        "El cacao aporta magnesio; el azúcar y las grasas dependen del producto.",
        "Elige una porción pequeña y revisa la etiqueta.",
      ),
      food(
        "Plátano",
        "mg-5",
        "Aporta algo de magnesio y potasio.",
        "Cómetelo entero para conservar la fibra.",
      ),
    ],
  },
  {
    id: "p",
    name: "Potasio",
    symbol: "K⁺",
    color: "#f5efdd",
    benefit:
      "Ayuda a la función muscular y nerviosa y al equilibrio de líquidos dentro de las células.",
    note: "Si tienes enfermedad renal o tomas ciertos medicamentos, puede que necesites limitar el potasio. No aumentes su consumo sin indicación profesional.",
    source: nih("Potassium"),
    foods: [
      food(
        "Calabaza",
        "p-0",
        "Aporta potasio y carotenoides.",
        "Cocínala al horno o en una crema sin exceso de sal.",
      ),
      food(
        "Frijoles negros",
        "mg-3",
        "Las legumbres aportan potasio, fibra y proteína vegetal.",
        "Combínalos con verduras y cereales.",
      ),
      food(
        "Sandía",
        "p-2",
        "Aporta agua y algo de potasio; no es de las fuentes más concentradas.",
        "Prefiérela en trozos en lugar de jugo.",
      ),
      food(
        "Naranja",
        "p-3",
        "Aporta potasio y vitamina C.",
        "Cómela entera para aprovechar su fibra.",
      ),
      food(
        "Aguacate",
        "p-4",
        "Aporta potasio, fibra y grasas insaturadas.",
        "Úsalo para complementar tus comidas.",
      ),
      food(
        "Plátano",
        "p-5",
        "Aporta potasio y carbohidratos.",
        "Disfrútalo entero o como parte de una comida.",
      ),
    ],
  },
  {
    id: "o",
    name: "Omega‑3",
    symbol: "ω3",
    color: "#e6eef2",
    benefit:
      "Son grasas que forman parte de las membranas celulares. Las fuentes vegetales aportan ALA; pescados y mariscos aportan EPA y DHA.",
    note: "ALA no equivale a EPA y DHA: el organismo convierte solo una pequeña parte. Estas fuentes no garantizan mejorar la memoria ni previenen enfermedades por sí solas.",
    source: nih("Omega3FattyAcids"),
    foods: [
      food(
        "Sardinas",
        "o-0",
        "Pescado que aporta omega‑3 EPA y DHA.",
        "Combínalas con verduras; revisa el sodio de las conservas.",
      ),
      food(
        "Nueces",
        "o-1",
        "Aportan omega‑3 ALA y grasas insaturadas.",
        "Añádelas a una ensalada; contienen frutos secos.",
      ),
      food(
        "Ostras",
        "o-2",
        "Aportan EPA y DHA, además de zinc.",
        "Consúmelas bien cocidas; contienen mariscos.",
      ),
      food(
        "Semillas de cáñamo",
        "o-3",
        "Aportan ALA y proteína vegetal.",
        "Añádelas a yogur o ensaladas.",
      ),
      food(
        "Salmón",
        "b-4",
        "Pescado que aporta EPA, DHA y proteína.",
        "Cocínalo al horno o a la plancha.",
      ),
      food(
        "Semillas de chía",
        "o-5",
        "Aportan ALA y fibra.",
        "Hidrátalas o mézclalas bien con un alimento húmedo.",
      ),
    ],
  },
  {
    id: "fe",
    name: "Hierro",
    symbol: "Fe",
    color: "#f4e9e5",
    benefit:
      "Es necesario para la hemoglobina, que transporta oxígeno en la sangre, y para otras funciones del organismo.",
    note: "La vitamina C mejora la absorción del hierro vegetal. Si sospechas anemia, busca evaluación médica: no se diagnostica ni trata solo con una lista de alimentos.",
    source: nih("Iron"),
    foods: [
      food(
        "Carne de res",
        "fe-0",
        "Aporta hierro hemo, que se absorbe mejor que el hierro vegetal.",
        "Elige cortes magros y alterna con fuentes vegetales.",
      ),
      food(
        "Espinaca",
        "fe-1",
        "Aporta hierro no hemo; su absorción es menor por compuestos del vegetal.",
        "Combínala con pimiento o cítricos, sin depender solo de ella.",
      ),
      food(
        "Lentejas",
        "fe-2",
        "Aportan hierro no hemo, proteína vegetal y fibra.",
        "Sírvelas bien cocidas con verduras ricas en vitamina C.",
      ),
      food(
        "Garbanzos",
        "fe-3",
        "Aportan hierro no hemo, proteína y fibra.",
        "Úsalos en ensaladas con limón o pimiento.",
      ),
      food(
        "Tofu",
        "fe-4",
        "Aporta hierro y proteína vegetal; el calcio depende de cómo se fabrica.",
        "Saltéalo con verduras. Contiene soya.",
      ),
      food(
        "Semillas de calabaza",
        "fe-5",
        "Aportan hierro no hemo y magnesio.",
        "Añade semillas sin sal a ensaladas o sopas.",
      ),
    ],
  },
];
