import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Clock3,
  GlassWater,
  Info,
  Leaf,
  Search,
  X,
} from "lucide-react";
import { NHS_SOURCE, nutrients, recipes, type Food, type Recipe } from "./content";
import "./wellness.css";

const asset = (file: string) => `/images/nutrition/${file}.webp`;
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
function DetailDialog({
  title,
  close,
  children,
}: {
  title: string;
  close: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  return (
    <dialog ref={ref} onCancel={close} aria-label={title} className="wellness-dialog">
      <div className="modal-inner">
        <div className="modal-heading">
          <h2>{title}</h2>
          <button className="icon-button" aria-label="Cerrar información" onClick={close}>
            <X size={19} />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
export default function Wellness() {
  const [recipeFilter, setRecipeFilter] = useState("Todos");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [nutrientId, setNutrientId] = useState("k");
  const [query, setQuery] = useState("");
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const nutrient = nutrients.find((n) => n.id === nutrientId)!;
  const visibleRecipes = recipes.filter(
    (r) =>
      recipeFilter === "Todos" ||
      (recipeFilter === "Jugos" ? r.type === "Jugo" : r.type === "Licuado"),
  );
  const visibleFoods = nutrient.foods.filter((f) => normalize(f.name).includes(normalize(query)));
  return (
    <div className="wellness-content">
      <section
        id="jugos"
        className="wellness-section juice-section"
        aria-labelledby="juice-heading"
      >
        <div className="wellness-heading">
          <div>
            <span className="eyebrow">
              <Leaf size={13} /> SABOR QUE SUMA
            </span>
            <h2 id="juice-heading">
              Un vaso lleno de <span>posibilidades.</span>
            </h2>
            <p>
              Jugos y licuados caseros: conoce sus ingredientes, sus nutrientes y cómo disfrutarlos.
            </p>
          </div>
          <span className="wellness-number">01 / JUGOS</span>
        </div>
        <div className="juice-toolbar">
          <div className="wellness-filters" aria-label="Filtrar recetas">
            {["Todos", "Jugos", "Licuados"].map((f) => (
              <button
                key={f}
                aria-pressed={recipeFilter === f}
                className={recipeFilter === f ? "is-active" : ""}
                onClick={() => setRecipeFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
          <span>
            <Check size={13} /> Sin azúcar añadida en las recetas
          </span>
        </div>
        <div className="juice-grid">
          {visibleRecipes.map((recipe) => (
            <article className="juice-card" key={recipe.id}>
              <button
                className="juice-photo-button"
                onClick={() => setSelectedRecipe(recipe)}
                aria-label={`Ver receta: ${recipe.name}`}
              >
                <img
                  src={asset(`juice-${recipe.image}`)}
                  alt={`Fotografía ilustrativa de ${recipe.name}`}
                  loading="lazy"
                />
                <span className="juice-type">{recipe.type}</span>
                <span className="juice-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </button>
              <div className="juice-card-body">
                <div className="juice-index">
                  <span>RECETA {String(recipes.indexOf(recipe) + 1).padStart(2, "0")}</span>
                  <span>
                    <Clock3 size={11} /> 5 min
                  </span>
                </div>
                <h3>{recipe.name}</h3>
                <p className="juice-ingredients">{recipe.subtitle}</p>
                <span className="juice-tag" style={{ background: recipe.color }}>
                  {recipe.tag}
                </span>
                <p className="juice-benefit">{recipe.benefit}</p>
                <button className="juice-recipe-link" onClick={() => setSelectedRecipe(recipe)}>
                  Ingredientes y preparación <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="juice-advice">
          <span className="advice-icon">
            <GlassWater size={23} />
          </span>
          <div>
            <h3>Un vaso pequeño. El agua, siempre primero.</h3>
            <p>
              Como referencia general, el NHS aconseja un máximo de{" "}
              <strong>150 ml al día de jugos y licuados combinados</strong>, preferentemente con una
              comida. La fruta entera conserva mejor su fibra. Incluso sin azúcar añadida, estas
              bebidas contienen azúcares.
            </p>
            <a href={NHS_SOURCE} target="_blank" rel="noreferrer">
              Leer la recomendación del NHS <ArrowUpRight size={13} />
            </a>
          </div>
          <span className="serving-number">
            150<span>ml / día</span>
          </span>
        </aside>
        <p className="wellness-footnote">
          <Info size={13} /> Recetas orientativas; fotografías ilustrativas. No se añaden a tu
          registro de agua. Los beneficios descritos corresponden a sus ingredientes, no a
          resultados garantizados.
        </p>
      </section>
      <section
        id="nutricion"
        className="wellness-section food-section"
        aria-labelledby="food-heading"
      >
        <div className="wellness-heading">
          <div>
            <span className="eyebrow">
              <BookOpen size={13} /> CONOCE LO QUE COMES
            </span>
            <h2 id="food-heading">
              Nutrirte también es <span>conocer.</span>
            </h2>
            <p>
              Guía nutricional de alimentos: explora sus nutrientes y encuentra ideas para tu plato.
            </p>
          </div>
          <span className="wellness-number">02 / ALIMENTOS</span>
        </div>
        <div className="nutrient-filters" aria-label="Seleccionar nutriente">
          {nutrients.map((n) => (
            <button
              key={n.id}
              aria-pressed={nutrientId === n.id}
              onClick={() => {
                setNutrientId(n.id);
                setQuery("");
                setSelectedFood(null);
              }}
              className={nutrientId === n.id ? "is-active" : ""}
            >
              {n.name}
            </button>
          ))}
        </div>
        <div
          className="nutrient-feature"
          style={{ "--nutrient-color": nutrient.color } as React.CSSProperties}
        >
          <div className="nutrient-intro">
            <div className="nutrient-overline">ALIMENTOS QUE APORTAN</div>
            <h3>{nutrient.name}</h3>
            <span className="nutrient-symbol">{nutrient.symbol}</span>
            <div className="nutrient-function">
              <span>¿PARA QUÉ SIRVE?</span>
              <p>{nutrient.benefit}</p>
            </div>
            <a href={nutrient.source} target="_blank" rel="noreferrer">
              Fuente: NIH · ficha del nutriente <ArrowUpRight size={14} />
            </a>
          </div>
          <div className="food-browser">
            <div className="food-browser-top">
              <span>{visibleFoods.length} alimentos para explorar</span>
              <label className="food-search">
                <Search size={14} />
                <input
                  aria-label={`Buscar alimentos con ${nutrient.name}`}
                  placeholder="Buscar alimento…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button aria-label="Borrar búsqueda" onClick={() => setQuery("")}>
                    <X size={13} />
                  </button>
                )}
              </label>
            </div>
            <div className="food-photo-grid">
              {visibleFoods.map((f) => (
                <button
                  key={f.name}
                  className="food-photo-card"
                  onClick={() => setSelectedFood(f)}
                  aria-label={`Información nutricional: ${f.name}`}
                >
                  <div className="food-circle">
                    <img src={asset(f.image)} alt={f.name} loading="lazy" />
                    <span>
                      <PlusLabel />
                    </span>
                  </div>
                  <h4>{f.name}</h4>
                  <span className="food-detail-hint">
                    Ver aportes y consejos <ArrowUpRight size={11} />
                  </span>
                </button>
              ))}
            </div>
            {!visibleFoods.length && (
              <div className="food-no-results">
                <Search size={25} />
                <p>No hay coincidencias en {nutrient.name.toLowerCase()}.</p>
                <button onClick={() => setQuery("")}>
                  Mostrar todos los alimentos <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="nutrient-context">
          <Info size={16} />
          <p>{nutrient.note}</p>
        </div>
        <div className="wellness-science-note">
          <strong>Información, no promesas.</strong>
          <p>
            Las cantidades varían por variedad, porción y preparación. Estos ejemplos no son un
            ranking ni implican que todos sean fuentes igualmente concentradas. Ningún alimento por
            sí solo trata el estrés, aumenta de forma garantizada la dopamina ni previene
            enfermedades. Esta guía no sustituye una consulta nutricional.
          </p>
        </div>
      </section>
      {selectedRecipe && (
        <DetailDialog title={selectedRecipe.name} close={() => setSelectedRecipe(null)}>
          <img
            className="recipe-dialog-photo"
            src={asset(`juice-${selectedRecipe.image}`)}
            alt={`Bebida ilustrativa: ${selectedRecipe.name}`}
          />
          <div className="recipe-meta">
            <span>{selectedRecipe.type}</span>
            <span>
              <Clock3 size={13} /> 5 minutos
            </span>
            <span>2 porciones de 150 ml</span>
          </div>
          <h3>Ingredientes</h3>
          <ul className="recipe-ingredient-list">
            {selectedRecipe.ingredients.map((i) => (
              <li key={i}>
                <Check size={13} />
                {i}
              </li>
            ))}
          </ul>
          <h3>Preparación</h3>
          <ol className="recipe-steps">
            {selectedRecipe.steps.map((step, i) => (
              <li key={step}>
                <span>{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div className="recipe-tip">
            <Info size={15} />
            <p>{selectedRecipe.tip}</p>
          </div>
          <p className="recipe-benefit-full">{selectedRecipe.benefit}</p>
          <div className="recipe-source-links">
            <a target="_blank" rel="noreferrer" href={selectedRecipe.source}>
              Fuente del beneficio / recomendación <ArrowUpRight size={13} />
            </a>
            <a target="_blank" rel="noreferrer" href={NHS_SOURCE}>
              Porciones y azúcares · NHS <ArrowUpRight size={13} />
            </a>
          </div>
          <p className="wellness-footnote">
            Lava los ingredientes, utiliza agua potable y utensilios limpios. Consume recién
            preparado o refrigera inmediatamente. La receta es orientativa y no sustituye consejo
            médico.
          </p>
          <button className="primary-button" onClick={() => setSelectedRecipe(null)}>
            Listo, a disfrutar <Check size={16} />
          </button>
        </DetailDialog>
      )}
      {selectedFood && (
        <DetailDialog title={selectedFood.name} close={() => setSelectedFood(null)}>
          <div className="food-dialog-photo">
            <img src={asset(selectedFood.image)} alt={selectedFood.name} />
          </div>
          <span className="food-dialog-nutrient" style={{ background: nutrient.color }}>
            {nutrient.name}
          </span>
          <h3>Información nutricional</h3>
          <p className="food-dialog-copy">{selectedFood.detail}</p>
          <h3>Una idea para tu plato</h3>
          <p className="food-dialog-copy">{selectedFood.idea}</p>
          <div className="recipe-tip">
            <Info size={15} />
            <p>
              El contenido nutricional cambia según la porción y la preparación. Esta ficha describe
              aportes generales, no cantidades medidas ni una recomendación individual.
            </p>
          </div>
          <a className="food-dialog-source" href={nutrient.source} target="_blank" rel="noreferrer">
            Consultar ficha de {nutrient.name} · NIH <ArrowUpRight size={14} />
          </a>
        </DetailDialog>
      )}
    </div>
  );
}
function PlusLabel() {
  return <span aria-hidden="true">+</span>;
}
