import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  Database,
  FileCode2,
  FolderOpen,
  Globe2,
  HardDrive,
  Layers,
  Monitor,
  Network,
  Server,
  Users,
} from "lucide-react";
import { MOODLE, PLATFORMS, SOURCES, TECHNOLOGIES } from "./content";
import "./index.css";

type Source = { label: string; url: string };
type Slide = {
  id: string;
  chapter: string;
  title: string;
  intro?: string;
  sources: Source[];
  body: ReactNode;
};
const SourceLinks = ({ sources }: { sources: Source[] }) => (
  <div className="sources">
    <span>Código de referencia</span>
    {sources.map((source) => (
      <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
        {source.label}
        <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    ))}
  </div>
);
const Note = ({ children }: { children: ReactNode }) => (
  <p className="note">{children}</p>
);
const Connector = ({ children }: { children: ReactNode }) => (
  <div className="connector">
    <ArrowDown size={20} aria-hidden="true" />
    <span>{children}</span>
  </div>
);

const slides: Slide[] = [
  {
    id: "portada",
    chapter: "Arquitectura y ecosistema",
    title: "eXeLearning",
    sources: [SOURCES.stack],
    body: (
      <div className="cover-layout">
        <div>
          <p className="cover-version">ARQUITECTURA 4.0</p>
          <h1>
            El editor.
            <br />
            La arquitectura.
            <br />
            <em>Las integraciones.</em>
          </h1>
          <p className="cover-description">
            Cómo se construyen, se comparten y se publican recursos educativos
            desde el navegador.
          </p>
          <div className="cover-topics">
            <span>01 / Núcleo</span>
            <span>02 / Ejecución</span>
            <span>03 / Ecosistema</span>
          </div>
        </div>
        <div
          className="cover-diagram"
          aria-label="El editor web se reutiliza en el servidor online, el escritorio y otras plataformas"
        >
          <div className="diagram-center">
            <Code2 size={42} />
            <strong>eXeLearning</strong>
            <span>Editor web compartido</span>
          </div>
          <div className="diagram-branches">
            <div>
              <Server />
              <span>Online</span>
            </div>
            <div>
              <Monitor />
              <span>Escritorio</span>
            </div>
            <div>
              <Layers />
              <span>Plataformas</span>
            </div>
          </div>
          <p>
            Un núcleo de edición.
            <br />
            Distintos entornos de uso.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "arquitectura",
    chapter: "01 / Núcleo",
    title: "La edición vive en el navegador",
    intro:
      "Los servicios online añaden colaboración, autenticación y almacenamiento compartido.",
    sources: [SOURCES.document, SOURCES.relay, SOURCES.persistence],
    body: (
      <div className="architecture-layout">
        <div className="architecture-map">
          <div className="architecture-node client">
            <Globe2 />
            <div>
              <span>NAVEGADOR</span>
              <h3>Editor + documento Yjs</h3>
              <p>Interfaz, iDevices y archivos locales</p>
            </div>
          </div>
          <Connector>HTTP para guardar · WebSocket para sincronizar</Connector>
          <div className="architecture-node">
            <Server />
            <div>
              <span>SERVICIOS ONLINE</span>
              <h3>Bun + Elysia</h3>
              <p>API, permisos y relé de colaboración</p>
            </div>
          </div>
          <Connector>Persistencia del proyecto</Connector>
          <div className="storage-row">
            <div>
              <Database />
              <strong>Base de datos</strong>
              <span>Estado Yjs y metadatos</span>
            </div>
            <div>
              <HardDrive />
              <strong>Archivos en disco</strong>
              <span>Imágenes, audio y vídeo</span>
            </div>
          </div>
        </div>
        <aside className="side-explanation">
          <span className="large-number">01</span>
          <h3>Responsabilidades separadas</h3>
          <p>
            El navegador mantiene el estado de edición. El servidor conserva los
            proyectos online y controla el acceso.
          </p>
          <Note>
            «Sin estado» describe el relé WebSocket: otros servicios
            reconstruyen documentos Yjs para cargar o compactar datos.
          </Note>
        </aside>
      </div>
    ),
  },
  {
    id: "tecnologias",
    chapter: "01 / Núcleo",
    title: "Cada tecnología tiene una función",
    intro: "Lenguajes, bibliotecas y servicios agrupados por responsabilidad.",
    sources: [SOURCES.stack, SOURCES.ui, SOURCES.database],
    body: (
      <div className="technology-list">
        {TECHNOLOGIES.map(([layer, stack, purpose], i) => (
          <div className="technology-row" key={layer}>
            <span className="row-number">0{i + 1}</span>
            <h3>{layer}</h3>
            <div>
              <strong>{stack}</strong>
              <p>{purpose}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "documento",
    chapter: "01 / Núcleo",
    title: "El documento y sus archivos",
    intro:
      "La estructura y los metadatos se sincronizan. Los binarios se almacenan por separado.",
    sources: [SOURCES.document, SOURCES.assets],
    body: (
      <div className="two-columns">
        <section>
          <div className="section-label">
            <FileCode2 /> DOCUMENTO
          </div>
          <h3>Yjs organiza el proyecto</h3>
          <div className="code-tree" aria-label="Jerarquía del documento Yjs">
            <div>Y.Doc</div>
            <div className="indent">
              navigation <span>páginas</span>
            </div>
            <div className="indent two">
              blocks <span>bloques</span>
            </div>
            <div className="indent three">
              components <span>iDevices</span>
            </div>
            <div className="indent">
              metadata <span>propiedades</span>
            </div>
            <div className="indent">
              assets <span>metadatos de archivos</span>
            </div>
          </div>
          <p>El documento local utiliza IndexedDB para persistir su estado.</p>
        </section>
        <section>
          <div className="section-label">
            <FolderOpen /> ARCHIVOS
          </div>
          <h3>Una referencia, varios almacenes</h3>
          <ol className="steps compact">
            <li>
              <strong>Memoria</strong>
              <span>Acceso a los blobs durante la edición.</span>
            </li>
            <li>
              <strong>Cache API</strong>
              <span>Persistencia local; IndexedDB como alternativa.</span>
            </li>
            <li>
              <strong>Servidor o archivo ELPX</strong>
              <span>Guardado del proyecto según el entorno.</span>
            </li>
          </ol>
          <Note>
            SHA-256 permite identificar contenido repetido. Las referencias a
            los archivos forman parte del documento.
          </Note>
        </section>
      </div>
    ),
  },
  {
    id: "colaboracion",
    chapter: "01 / Núcleo",
    title: "Sincronizar y guardar son procesos distintos",
    sources: [SOURCES.relay, SOURCES.autosave, SOURCES.assets],
    body: (
      <>
        <div className="sync-strip">
          <div>
            <Users />
            <strong>Edición local</strong>
            <span>El cambio entra en Y.Doc</span>
          </div>
          <ArrowRight className="flow-arrow" aria-hidden="true" />
          <div>
            <Network />
            <strong>Relé WebSocket</strong>
            <span>Reenvía las actualizaciones</span>
          </div>
          <ArrowRight className="flow-arrow" aria-hidden="true" />
          <div>
            <Check />
            <strong>Estado convergente</strong>
            <span>Yjs combina los cambios</span>
          </div>
        </div>
        <div className="two-columns sync-details">
          <section>
            <h3>Persistencia del proyecto</h3>
            <p>
              El guardado envía el estado y los archivos pendientes. Las
              sesiones colaborativas online disponen de autoguardado cuando ha
              participado otro colaborador.
            </p>
          </section>
          <section>
            <h3>Transferencia de archivos</h3>
            <p>
              El servidor coordina quién tiene un archivo y su disponibilidad.
              La transferencia HTTP queda separada de los deltas Yjs.
            </p>
          </section>
        </div>
        <Note>
          Redis es opcional para coordinar varias instancias. La convergencia
          del documento no equivale a eliminar todos los conflictos de edición.
        </Note>
      </>
    ),
  },
  {
    id: "ejecucion",
    chapter: "02 / Ejecución",
    title: "Dos formas de ejecutar el editor",
    intro:
      "El iframe integra el editor en una plataforma. Electron lo empaqueta para el escritorio.",
    sources: [SOURCES.stack, SOURCES.desktop, SOURCES.embedding],
    body: (
      <>
        <div className="runtime-columns">
          <section>
            <Server size={34} />
            <span className="section-label">ONLINE</span>
            <h3>Con servicios de eXeLearning</h3>
            <p>
              API, usuarios, proyectos compartidos y colaboración por WebSocket.
            </p>
            <div className="runtime-footer">Bun + Elysia + base de datos</div>
          </section>
          <section>
            <Globe2 size={34} />
            <span className="section-label">ESTÁTICO</span>
            <h3>Edición en el navegador</h3>
            <p>
              Sin backend de eXeLearning. Conserva almacenamiento local y
              permite guardar archivos.
            </p>
            <div className="runtime-footer">
              HTML + JavaScript + APIs del navegador
            </div>
          </section>
        </div>
        <div className="delivery-row">
          <div>
            <Monitor />
            <p>
              <strong>Electron</strong>Distribuye el editor estático para
              Windows, macOS y Linux, con acceso a archivos mediante IPC.
            </p>
          </div>
          <div>
            <Layers />
            <p>
              <strong>Iframe</strong>Permite a la plataforma anfitriona abrir,
              editar y guardar proyectos con un protocolo de mensajes.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "integracion",
    chapter: "02 / Ejecución",
    title: "La plataforma guarda. El editor edita.",
    intro:
      "El editor estático se reutiliza dentro de un iframe y devuelve el proyecto actualizado.",
    sources: [SOURCES.embedding],
    body: (
      <div className="two-columns">
        <section>
          <div className="section-label">
            <Layers /> PLATAFORMA ANFITRIONA
          </div>
          <h3>Usuarios, permisos y archivos</h3>
          <p>
            WordPress, Moodle, Omeka S o Nextcloud conservan el proyecto con sus
            propios mecanismos de almacenamiento.
          </p>
          <div className="protocol-endpoint">
            <Code2 />
            <div>
              <strong>Editor eXeLearning</strong>
              <span>Iframe + EmbeddingBridge</span>
            </div>
          </div>
        </section>
        <section>
          <ol className="steps">
            <li>
              <strong>Preparar el editor</strong>
              <span>
                <code>EXELEARNING_READY</code> habilita la apertura.
              </span>
            </li>
            <li>
              <strong>Abrir el proyecto</strong>
              <span>
                <code>OPEN_FILE</code> envía el ELPX. Se espera{" "}
                <code>DOCUMENT_LOADED</code>.
              </span>
            </li>
            <li>
              <strong>Solicitar el archivo</strong>
              <span>
                <code>REQUEST_SAVE</code> recibe <code>SAVE_FILE</code>.
              </span>
            </li>
            <li>
              <strong>Guardar en la plataforma</strong>
              <span>
                El plugin envía el archivo a su backend y verifica el resultado.
              </span>
            </li>
          </ol>
        </section>
      </div>
    ),
  },
  {
    id: "moodle",
    chapter: "03 / Ecosistema",
    title: "Moodle: tres módulos, distintos objetivos",
    intro:
      "La diferencia está en la publicación y la evaluación, no solo en poder abrir el editor.",
    sources: MOODLE.map((item) => ({ label: item.name, url: item.url })),
    body: (
      <div className="moodle-comparison">
        {MOODLE.map((item, i) => (
          <section key={item.name} className={i === 2 ? "highlight" : ""}>
            <span className="comparison-number">0{i + 1}</span>
            <code>{item.name}</code>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <dl>
              <dt>Calificación</dt>
              <dd>{item.grading}</dd>
              <dt>Editor</dt>
              <dd>{item.editor}</dd>
            </dl>
          </section>
        ))}
      </div>
    ),
  },
  {
    id: "plataformas",
    chapter: "03 / Ecosistema",
    title: "Más allá del aula virtual",
    intro:
      "El mismo editor se adapta a la forma de trabajar de cada plataforma.",
    sources: PLATFORMS.map((item) => ({ label: item.code, url: item.url })),
    body: (
      <div className="platform-list">
        {PLATFORMS.map((item, i) => (
          <section key={item.name}>
            <div className="platform-heading">
              <span className="row-number">0{i + 1}</span>
              <h3>{item.name}</h3>
              <span>{item.purpose}</span>
            </div>
            <div>
              <strong>{item.stack}</strong>
              <p>{item.detail}</p>
              <div className="storage-note">{item.storage}</div>
            </div>
          </section>
        ))}
      </div>
    ),
  },
  {
    id: "publicacion",
    chapter: "03 / Ecosistema",
    title: "Del proyecto editable al recurso publicado",
    sources: [SOURCES.stack, SOURCES.desktop],
    body: (
      <>
        <div className="export-layout">
          <div className="native-file">
            <FileCode2 size={48} />
            <h3>ELPX</h3>
            <p>Proyecto editable</p>
            <span>Importación de ELP anteriores</span>
          </div>
          <ArrowRight className="export-arrow" aria-hidden="true" />
          <div className="export-formats">
            <div>
              <Globe2 />
              <strong>HTML5</strong>
              <span>Sitio web</span>
            </div>
            <div>
              <BookOpen />
              <strong>SCORM 1.2 / 2004</strong>
              <span>Paquetes para LMS</span>
            </div>
            <div>
              <Layers />
              <strong>IMS CP</strong>
              <span>Paquete de contenidos</span>
            </div>
            <div>
              <BookOpen />
              <strong>EPUB 3</strong>
              <span>Libro electrónico</span>
            </div>
          </div>
        </div>
        <div className="engineering">
          <h3>Construcción y distribución</h3>
          <p>
            <strong>Docker sobre Alpine</strong> para el servidor ·{" "}
            <strong>electron-builder</strong> para escritorio
          </p>
          <p>
            <strong>Bun test, Vitest y Playwright</strong> para pruebas ·{" "}
            <strong>Biome</strong> para comprobaciones de código
          </p>
        </div>
        <Note>
          Las capacidades corresponden a las revisiones enlazadas del código. Su
          disponibilidad en una instalación depende de la versión distribuida.
        </Note>
      </>
    ),
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const contentRef = useRef<HTMLElement>(null);
  const move = (step: number) =>
    setCurrent((index) =>
      Math.max(0, Math.min(slides.length - 1, index + step)),
    );
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        (target instanceof HTMLElement &&
          target.closest(
            'a, button, input, textarea, select, [contenteditable="true"]',
          ))
      )
        return;
      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        move(1);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "Home") {
        event.preventDefault();
        setCurrent(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        setCurrent(slides.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [current]);
  const slide = slides[current];
  return (
    <div className="presentation">
      <header className="topbar">
        <a
          className="brand"
          href="https://github.com/exelearning/exelearning"
          target="_blank"
          rel="noreferrer"
        >
          <span className="brand-mark">eXe</span>
          <span>
            Learning<span className="brand-divider"> / </span>
            <span className="brand-subtitle">Arquitectura</span>
          </span>
        </a>
        <span className="chapter">{slide.chapter}</span>
      </header>
      <main
        className="slide-scroll"
        ref={contentRef}
        tabIndex={0}
        aria-label="Contenido de la diapositiva"
      >
        <article
          className={`slide ${current === 0 ? "cover" : ""}`}
          key={slide.id}
          aria-labelledby="slide-title"
        >
          {current > 0 && (
            <div className="slide-heading">
              <span className="eyebrow">
                EXELEARNING / {String(current).padStart(2, "0")}
              </span>
              <h1 id="slide-title">{slide.title}</h1>
              {slide.intro && <p>{slide.intro}</p>}
            </div>
          )}
          {current === 0 && (
            <h2 className="sr-only" id="slide-title">
              eXeLearning: arquitectura e integraciones
            </h2>
          )}
          <div className="slide-body">{slide.body}</div>
          <SourceLinks sources={slide.sources} />
        </article>
      </main>
      <footer className="navigation">
        <span className="slide-count" aria-live="polite" aria-atomic="true">
          {String(current + 1).padStart(2, "0")}{" "}
          <span>
            / {slides.length} · {slide.title}
          </span>
        </span>
        <nav className="slide-dots" aria-label="Diapositivas">
          {slides.map((item, index) => (
            <button
              key={item.id}
              aria-label={`${index + 1}. ${item.title}`}
              aria-current={current === index ? "step" : undefined}
              onClick={() => setCurrent(index)}
            >
              <span />
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Diapositiva anterior"
            disabled={current === 0}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={20} />
          </button>
          <button
            aria-label="Diapositiva siguiente"
            disabled={current === slides.length - 1}
            onClick={() => move(1)}
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </footer>
      <div className="progress" aria-hidden="true">
        <span style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
      </div>
    </div>
  );
}
