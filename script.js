const aulas = [
  {
    titulo: "Revisão - M1L1 Introdução ao desenvolvimento de jogos (prática 1)",
    turma: "Unity",
    id: "el7AxmyePD0",
    conteudo: [
      { tipo: "link",   texto: "Página para fazer download do Unity Hub", url: "https://docs.unity.com/en-us/hub/install-hub" },
      { tipo: "link",   texto: "Página para fazer download do Visual Studio Code", url: "https://code.visualstudio.com/" },
      { tipo: "texto",  texto: "Aqui o mais importante é conseguir criar conta no Unity, fazer download do Unity e do editor de código" },
      { tipo: "imagem", src: "images/unitypage1.png", alt: "Página da Unity para fazer download" },
      { tipo: "imagem", src: "images/vscodepagina1.png", alt: "Página da Visual Studio Code para fazer download" },
    ]
  },
  {
    titulo: "Revisão - M1L1 Introdução ao desenvolvimento de jogos (prática 2)",
    turma: "Unity",
    id: "Eu6Rx3tuLVM"
  },
  {
    titulo: "Revisão - M1L1 Introdução ao desenvolvimento de jogos (prática 3)",
    turma: "Unity",
    id: "8jtBwzyNi14"
  },
  {
    titulo: "Revisão - M1L2 Introdução a scripts (prática 1)",
    turma: "Unity",
    id: "YH2HcwOLvvY",
  }
];

const PLACEHOLDER = "ID_DO_VIDEO";
const filtros = document.getElementById("filtros");
const lista = document.getElementById("lista");
let turmaAtual = "Todas";

function formatarData(iso) {
  if (!iso) return "";
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
}

function desenharFiltros() {
  const turmas = ["Todas", ...new Set(aulas.map(a => a.turma).filter(Boolean))];

  if (turmas.length <= 2) {
    filtros.hidden = true;
    return;
  }

  filtros.innerHTML = "";
  turmas.forEach(t => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = t;
    b.setAttribute("aria-pressed", String(t === turmaAtual));
    b.addEventListener("click", () => {
      turmaAtual = t;
      desenharFiltros();
      desenharLista();
    });
    filtros.appendChild(b);
  });
}

function desenharConteudo(itens) {
  const box = document.createElement("div");
  box.className = "conteudo";

  itens.forEach(item => {
    let el;

    if (item.tipo === "link") {
      el = document.createElement("a");
      el.href = item.url;
      el.textContent = item.texto;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      el.className = "link-extra";
    } else if (item.tipo === "texto") {
      el = document.createElement("p");
      el.textContent = item.texto;
    } else if (item.tipo === "imagem") {
      el = document.createElement("img");
      el.src = item.src;
      el.alt = item.alt || "";
      el.loading = "lazy";
    }

    if (el) box.appendChild(el);
  });

  return box;
}

function desenharLista() {
  lista.innerHTML = "";
  const visiveis = aulas.filter(a => turmaAtual === "Todas" || a.turma === turmaAtual);

  if (visiveis.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhuma gravação disponível ainda.</p>';
    return;
  }

  visiveis.forEach(a => {
    const sec = document.createElement("section");
    sec.className = "aula";

    const h2 = document.createElement("h2");
    h2.textContent = a.titulo;

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = [a.turma, formatarData(a.data)].filter(Boolean).join(" - ");

    sec.append(h2, meta);

    if (!a.id || a.id === PLACEHOLDER) {
      const aviso = document.createElement("p");
      aviso.className = "aviso";
      aviso.textContent = "Vídeo ainda não configurado: troque ID_DO_VIDEO pelo ID do YouTube no script.js.";
      sec.appendChild(aviso);
    } else {
      const box = document.createElement("div");
      box.className = "player";
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + encodeURIComponent(a.id);
      iframe.title = a.titulo;
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; encrypted-media; picture-in-picture; fullscreen";
      iframe.allowFullscreen = true;
      box.appendChild(iframe);
      sec.appendChild(box);
    }

    if (a.conteudo && a.conteudo.length) {
      sec.appendChild(desenharConteudo(a.conteudo));
    }

    lista.appendChild(sec);
  });
}

desenharFiltros();
desenharLista();