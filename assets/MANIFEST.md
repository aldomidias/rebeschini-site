# MANIFEST — site/assets/

Inventário dos assets de imagem/ícone do site Rebeschini Advocacia (trabalhista executivos/bancários).
`sips` nesta versão de macOS **não exporta webp** (`Error: Can't write format: org.webmproject.webp`) —
por isso as fotos exportadas ficaram em **JPEG qualidade 82** (78/70/65/60 nos backgrounds mais pesados,
pra caber na meta de peso), conforme previsto no brief.

## Recortes com fundo transparente (`site/assets/photos/`) — pro novo hero

Adicionado nesta atualização, pedido urgente pro redesign do hero (referência: `site/refs/ref-hero-behance.png`
— estilo cutout, figura recortada flutuando sobre o layout, sem retângulo de foto). Gerados com
`npx hyperframes remove-background` (modelo local `u2net_human_seg`, execução CoreML), a partir dos
originais em alta resolução (não das versões já compactadas em JPEG). PNG com canal alpha.

| Arquivo | Origem | Dimensões | Peso | Descrição |
|---|---|---|---|---|
| `kewri-hero-cutout.png` | `Kewri-13.jpg` | 1066×1600 | 1,36MB | **Cutout principal.** Mesma foto/pose já usada em `kewri-sobre-900`/`kewri-06`: de pé, 3/4 do corpo (da cabeça até a coxa), blusa preta de mangas com volume, mãos nos bolsos, olhar direto, meio-sorriso confiante. Escolhida como principal por ser a pose mais "limpa" pra recorte — sem objetos cruzando o corpo (mesa, notebook) nem braços cruzando o tronco horizontalmente, o que dá um contorno mais previsível e sem buracos. Bordas de cabelo e ombro conferidas visualmente: fios finos preservados, sem halo residual do fundo cinza. |
| `kewri-hero-cutout-800.png` | `Kewri-13.jpg` | 533×800 | 336KB | Mesma imagem em resolução menor, pra hero mobile ou uso como thumbnail/preview. |
| `kewri-cutout-alt.png` | `Kewri-6.jpg` | 1066×1600 | 1,20MB | **Opção B (pose alternativa).** Mesma foto já usada em `kewri-alt-postura`/`kewri-02`: inclinada pra frente, as duas mãos apoiadas numa superfície (removida no recorte — no PNG as mãos "flutuam" na altura em que estavam apoiadas, como esperado num cutout), cabelo cacheado bem volumoso, blusa branca, calça preta, olhar direto e assertivo. Bordas do cabelo cacheado ficaram boas mas com leve suavização nos cachos mais soltos (natural em qualquer remoção de fundo com cabelo volumoso/cacheado — se o design ampliar muito essa foto, vale conferir de perto). |

**Conferência de qualidade feita:** as duas foram inspecionadas visualmente após o recorte (miniatura sobre
fundo branco) — nenhum pedaço do fundo cinza de estúdio sobrou colado ao contorno, e nenhuma parte do corpo
foi cortada indevidamente. `kewri-hero-cutout.png` teve o resultado mais nítido dos dois (cabelo liso corta
mais limpo que cabelo cacheado nesse tipo de modelo de segmentação).

**Peso:** os PNGs com alpha em 1600px de altura ficaram em ~1,2-1,4MB — pesado se comparado à meta de JPEG
do resto do site (≤350KB), mas é o padrão pra PNG (sem perdas) com transparência nessa resolução; não há
ferramenta de compressão de PNG (`pngquant`/`optipng`) disponível neste ambiente pra reduzir mais sem trocar
de formato. Se o peso for um problema em produção, considerar: (1) rodar `pngquant` numa máquina que tenha
a ferramenta antes de publicar, ou (2) usar apenas a versão `-800` como fonte de um `<picture>` com
`loading="eager"` só na dobra do hero e depender de lazy loading/CDN pra otimizar depois.

## Logos e símbolo

| Arquivo | Origem | Dimensões | Peso | Uso recomendado |
|---|---|---|---|---|
| `logo-blue.svg` | `Identidade Visual/Assinatura Visual/SVG/Assinatura Visual - Azul.svg` | vetorial | 16KB | Logo completa (nome + símbolo) em fundo claro/branco — ex: header sobre fundo dourado, footer se houver bloco claro |
| `logo-white.svg` | `Identidade Visual/Assinatura Visual/SVG/Assinatura Visual - Branca.svg` | vetorial | 16KB | Logo completa em fundo azul-marinho #003388 — header padrão, footer |
| `symbol-blue.svg` | `Identidade Visual/Símbolo/SVG/Símbolo - Azul.svg` | vetorial | 4KB | Símbolo isolado (favicon, selo, watermark) em fundo claro |
| `symbol-white.svg` | `Identidade Visual/Símbolo/SVG/Símbolo - Branco.svg` | vetorial | 4KB | Símbolo isolado em fundo azul-marinho — divisores de seção, marca d'água discreta |

Observação: não usados os SVGs alternativos de `Site/logo rebeschini advocacia black.svg` e
`logo rebeschini advocacia white.svg` (versão antiga/genérica da marca) — a Identidade Visual oficial
(Assinatura Visual) é a fonte correta.

## Ícones (`site/assets/icons/`)

| Arquivo | Origem | Peso | Uso recomendado |
|---|---|---|---|
| `shield.svg` | `Site/shield 1.svg` | 4KB | Diferencial "sigilo absoluto" |
| `medal.svg` | `Site/medal 1.svg` | 4KB | Diferencial "experiência consolidada" / prêmios |
| `trophy.svg` | `Site/trophy 1.svg` | 4KB | Alta taxa de êxito, casos vencidos |
| `handshake.svg` | `Site/handshake (1) 1.svg` | 4KB | Acordos extrajudiciais sigilosos, negociação discreta |
| `video-call.svg` | `Site/video-call 1.svg` | 8KB | Atendimento online / disponibilidade flexível, "como funciona" |
| `instagram.svg` | `Site/mdi_instagram.svg` | 4KB | Rodapé — @rebeschiniadvocaciabancarios / @kewrirebeschini |
| `linkedin.svg` | `Site/basil_linkedin-outline.svg` | 4KB | Rodapé — link LinkedIn |
| `youtube.svg` | `Site/iconoir_youtube.svg` | 4KB | Rodapé — link YouTube (se houver canal ativo; remover se não) |

Ícones não copiados por não constarem na lista pedida: `storm (1) 1.svg`, `Frame 136.001.svg`,
`Group 1171279585*.svg` (uso incerto, sem match com nenhuma seção do brief).

## Fotos (`site/assets/photos/`)

Fonte: `Fotos Kewri Rebeschini/` — 9 JPGs originais em alta resolução (~3900-6100px), fundo cinza-chumbo de estúdio.
Todas exportadas via `sips -s format jpeg -s formatOptions <qualidade> -Z <largura>`.

### HERO — `Kewri-20-2.jpg`

| Arquivo | Dimensões | Peso |
|---|---|---|
| `kewri-hero-1920.jpg` | 1920×1280 | 316KB |
| `kewri-hero-1280.jpg` | 1280×853 | 148KB |
| `kewri-hero-768.jpg` | 768×512 | 56KB |

**O que aparece:** foto em preto e branco, horizontal, fundo cinza-chumbo liso (sem textura). Dra. Kewri
em pé à direita do quadro, blusa branca, olhando para baixo em direção à colega sentada à esquerda com
notebook aberto sobre a mesa — postura ereta, gesto de instrução/condução com a caneta na mão (não é
um aperto de mão nem gesto informal). A colega está com o olhar voltado para a tela, postura de trabalho
concentrado. **Metade superior do quadro é negativo (fundo vazio)** — ideal pra sobrepor H1 + subtítulo
do hero sem tocar nas figuras. Preferida em vez de `Kewri-19` (a outra horizontal sugerida no brief)
porque o tom em P&B e a postura de condução/autoridade combinam mais com o tom sóbrio/institucional
pedido (`Kewri-19` mostra as duas se cumprimentando com "high-five", tom comemorativo demais pro
posicionamento de sigilo/seriedade do público de alta renda).

### SOBRE — `Kewri-13.jpg`

| Arquivo | Dimensões | Peso |
|---|---|---|
| `kewri-sobre-900.jpg` | 600×900 | 76KB |
| `kewri-sobre-600.jpg` | 400×600 | 32KB |

**O que aparece:** retrato solo, colorido, vertical, fundo cinza-chumbo liso. Dra. Kewri de pé, cabelo
solto sobre o ombro, blusa preta de mangas longas com leve volume, mãos nos bolsos da calça preta,
brincos discretos. Olhar direto pra câmera, meio-sorriso confiante — transmite autoridade acessível
(nem hierática, nem casual demais). Enquadramento em plano americano (da cintura pra cima com espaço de
sobra acima da cabeça), fundo neutro permite recorte ou uso direto num bloco lado a lado com texto.

### Alternativas (2)

| Arquivo | Origem | Dimensões | Peso | Descrição |
|---|---|---|---|---|
| `kewri-alt-postura-900.jpg` / `-600.jpg` | `Kewri-6.jpg` | 900×1350 / 600×900 | 112KB / 52KB | P&B, vertical. Dra. Kewri inclinada pra frente apoiada com as duas mãos numa superfície/mesa (fora do quadro), cabelo cacheado solto, blusa branca. Postura de poder/confronto direto com a câmera — mais "forte" e menos sorridente que a de SOBRE. Boa alternativa se a seção precisar de tom mais assertivo (ex: abertura de "Diferenciais" ou CTA de contato). |
| `kewri-alt-reflexiva-900.jpg` / `-600.jpg` | `Kewri-14-2.jpg` | 600×900 / 400×600 | 72KB / 30KB | **Correção (nesta atualização): a descrição original estava errada** — não é uma pose pensativa com óculos. É a versão em preto e branco do MESMO ensaio/pose de `kewri-sobre` (`Kewri-13`): Dra. Kewri de pé, blusa preta de mangas com volume, mãos nos bolsos, olhar direto e meio-sorriso, sem óculos. Útil como variante tonal (P&B) da foto de Sobre — ex: se o design quiser alternar cor/P&B entre seções, ou para hover/estado alternativo do card. |

### Conjunto completo — `kewri-01.jpg` a `kewri-09.jpg` (todas as 9 fotos, 1200w + 600w)

Adicionado nesta atualização (expansão de assets pedida após feedback do cliente — "site muito simples,
quer mais fotos"). Cobre as 9 fotos inteiras da sessão, incluindo as que antes só ficavam disponíveis na
pasta fonte. Nomeação sequencial simples (não é ordem de importância). JPEG qualidade 82, larguras 1200px
e 600px. Todas com fundo cinza-chumbo de estúdio, sem textura.

| Arquivo | Origem | Orientação | Cor | O que aparece |
|---|---|---|---|---|
| `kewri-01-1200.jpg` / `-600.jpg` | `Kewri-5-2.jpg` | Vertical | P&B | Retrato solo. Sentada, cabelo cacheado volumoso, óculos de grau, mão apoiando o queixo, camisa listrada. Olhar desviado da câmera (perfil 3/4), expressão pensativa/analítica — a pose "reflexiva" que a descrição anterior atribuía por engano a `Kewri-14-2`. |
| `kewri-02-1200.jpg` / `-600.jpg` | `Kewri-6.jpg` | Vertical | Colorida | Retrato solo. Em pé, inclinada pra frente, as duas mãos apoiadas numa mesa/superfície (fora do quadro), cabelo cacheado solto, blusa branca, calça preta. Olhar direto e firme pra câmera — postura de poder/assertividade. (Mesma foto já usada em `kewri-alt-postura`.) |
| `kewri-03-1200.jpg` / `-600.jpg` | `Kewri-9-2.jpg` | Vertical | P&B | Dupla. Colega sentada à esquerda com notebook, mão no queixo, cabelo cacheado, olhando pra tela; Dra. Kewri em pé à direita, cabelo longo liso, olhando pra câmera com leve sorriso — a única foto da dupla em que uma das duas encara diretamente o espectador. |
| `kewri-04-1200.jpg` / `-600.jpg` | `Kewri-10.jpg` | Vertical | Colorida | Retrato solo. Sentada, cabelo cacheado, óculos de grau, mão no queixo, camisa listrada azul-acinzentada — mesma pose de `kewri-01`, mas COLORIDA e com o olhar direto pra câmera (não desviado). Boa opção se a seção quiser uma versão colorida da pose reflexiva. |
| `kewri-05-1200.jpg` / `-600.jpg` | `Kewri-11.jpg` | Vertical | Colorida | Dupla, roupas escuras. Colega sentada à esquerda com notebook, cabelo grisalho/cacheado, olhando pra tela; Dra. Kewri em pé atrás, cabelo longo liso escuro, caneta próxima ao queixo, olhando pra baixo em direção à colega — gesto de orientação/revisão. |
| `kewri-06-1200.jpg` / `-600.jpg` | `Kewri-13.jpg` | Vertical | Colorida | Idêntica à foto já usada em `kewri-sobre-900/600`: retrato solo, blusa preta, mãos nos bolsos, olhar direto, meio-sorriso confiante. Mantida no conjunto numerado por completude. |
| `kewri-07-1200.jpg` / `-600.jpg` | `Kewri-14-2.jpg` | Vertical | P&B | Idêntica à foto já usada em `kewri-alt-reflexiva-900/600` (ver correção acima): versão em P&B do mesmo ensaio de `kewri-06`/Sobre — blusa preta, mãos nos bolsos, olhar direto, meio-sorriso. |
| `kewri-08-1200.jpg` / `-600.jpg` | `Kewri-19.jpg` | Horizontal | Colorida | Dupla. As duas de blusa branca/calça preta em pé junto a uma mesa com notebook, se cumprimentando em "high-five", ambas sorrindo — tom comemorativo/informal. Fundo com bastante espaço negativo nas laterais. Boa pra seção de "prova social"/cultura do escritório, não recomendada pro hero (tom celebratório demais pro posicionamento sóbrio). |
| `kewri-09-1200.jpg` / `-600.jpg` | `Kewri-20-2.jpg` | Horizontal | P&B | Idêntica à foto já usada no HERO (`kewri-hero-*`): Dra. Kewri em pé conduzindo/orientando colega sentada com notebook, metade superior do quadro vazia. Mantida no conjunto numerado por completude. |

**Duplicidade intencional:** `kewri-06`/`kewri-07`/`kewri-09` repetem, em resolução própria (1200/600w),
as mesmas fotos já publicadas como `kewri-sobre-*`, `kewri-alt-reflexiva-*` e `kewri-hero-*`. Isso é
proposital — o pedido foi exportar as 9 fotos completas com nomenclatura sequencial própria, sem mexer
nos arquivos já em uso. Se o Frontend for usar `kewri-06`/`07`/`09` em vez dos arquivos antigos, pode
descontinuar os antigos depois pra evitar peso duplicado no repositório.

Fotos avaliadas e descartadas do trio hero/sobre/alternativas nas rodadas anteriores — agora disponíveis
no conjunto completo acima: `Kewri-10` → `kewri-04`, `Kewri-11` → `kewri-05`, `Kewri-19` → `kewri-08`,
`Kewri-5-2` → `kewri-01`, `Kewri-9-2` → `kewri-03`.

## Backgrounds (`site/assets/`)

| Arquivo | Origem | Dimensões | Peso | Uso recomendado |
|---|---|---|---|---|
| `bg-quem-somos.webp` | `Site/bg1_quem_somos_rebeschini.webp` | 1920×1080 | 24KB | Background de seção "Sobre/Autoridade" — já é uma versão com duotone azul-marinho da foto `Kewri-11` (= `kewri-05` no conjunto numerado: dupla com notebook, roupas escuras), leve o suficiente pra usar como full-bleed sem srcset. *(Correção nesta atualização: a versão anterior deste manifesto citava também `Kewri-14-2` como origem — errado, `Kewri-14-2` é um retrato solo, não a foto da dupla.)* |
| `bg-home-desktop.jpg` | `Site/bg1_home_rebeschini_1.1.webp` | 1920×1000 | 192KB | Background do Hero em telas largas — duotone azul-marinho de `Kewri-19` (high-five), textura pronta que já combina com a paleta; original era webp de 1,5MB, reexportado em JPEG q60 pra caber na meta |
| `bg-home-mobile.jpg` | `Site/bg1_home_rebeschini_mobile.1.webp` | 908×1114 | 112KB | Variante recortada pra mobile do mesmo background acima; original era webp de 1,2MB, reexportado em JPEG q65 |

Descartado por não corresponder à paleta nova (fundo claro/bege, não ao tom azul-marinho dominante do
site novo, com balança de justiça em marca d'água — visual do site antigo previdenciário): `bg1 home.jpg`.
`bg2`/`bg3 home.jpg` foram copiados nesta atualização mesmo assim (ver seção abaixo), a pedido do cliente,
mas mantém-se a recomendação de não usar como background de seção — ver descrição.

## Imagens de áreas de atuação (`site/assets/areas/`)

Adicionado nesta atualização. Fotos de banco de imagens (stock), genéricas — **não são da Dra. Kewri**.
Copiadas sem alteração (já vinham leves, entre 20-36KB, dentro da meta).

| Arquivo | Origem | Dimensões | Peso | O que aparece | Uso sugerido |
|---|---|---|---|---|---|
| `area-1.webp` | `areas_de_atuacao_img1.webp` | 1000×800 | 24KB | Close de mão assinando um documento com caneta branca, papel timbrado desfocado ao fundo | Áreas ligadas a assinatura de acordo/rescisão — ex. "Rescisão de altos cargos" ou "Acordos extrajudiciais sigilosos" |
| `area-2.webp` | `areas_de_atuacao_img2.webp` | 1000×800 | 20KB | Close de mãos femininas com blazer bege segurando folhas grampeadas, aplicando um clipe/grampo azul | Área ligada a organização documental/análise contratual — ex. "Plano de saúde e benefícios corporativos" ou "Confidencialidade e não concorrência" |
| `area-3.webp` | `areas_de_atuacao_img3.webp` | 1000×800 | 34KB | Close de mãos de marceneiro/trabalhador manual com avental de couro, lápis na mão, medindo uma tábua de madeira com régua | Menos óbvio pro recorte de público executivo/bancário — se usado, encaixa melhor em "Particularidades da categoria bancária" (jornada/horas extras) só por analogia de "trabalho técnico"; senão, é o card mais dispensável do conjunto de 8 |
| `area-4.webp` | `areas_de_atuacao_img4.webp` | 1000×800 | 24KB | Martelo de juiz (gavel) desfocado à esquerda, figuras recortadas em silhueta de família (pai, criança, mãe com carrinho de bebê) ao centro, mãos de uma pessoa de toga ao fundo | Remete a Direito de Família/Judiciário genérico — sem relação direta com nenhuma das 8 áreas trabalhistas do site. Reavaliar se faz sentido usar; se usar, funciona melhor como imagem genérica de "atuação perante o Judiciário" do que ligada a uma área específica |

**Atenção pro Frontend:** nenhuma dessas 4 imagens tem relação temática direta e óbvia com as 8 áreas de
atuação do site (rescisão, assédio, remuneração variável, plano de saúde, confidencialidade, categoria
bancária, acordos extrajudiciais, vínculo PJ). São genéricas de banco de imagens do site antigo. Se o
objetivo é ilustrar as 8 áreas com fotos, recomenda-se um banco de imagens mais específico — usar essas 4
apenas se o layout novo pedir só "algumas" fotos de apoio (ex. 1 imagem a cada 2 áreas), não uma pra cada.

## Fotos e backgrounds adicionais (`site/assets/`)

Adicionado nesta atualização. **Nenhum destes arquivos passava de 300KB no original — copiados sem
recompressão.**

| Arquivo | Origem | Dimensões | Peso | O que é |
|---|---|---|---|---|
| `bg-home-2.jpg` | `Site/bg2 home.jpg` | 1920×787 | 73KB | Textura clara/bege com diagonais sutis tipo tecido/mármore, sem pessoas. Da mesma família visual de `bg1 home.jpg` (já descartado) — fundo claro, não combina com o azul-marinho dominante do site novo. Copiado a pedido, mas mantém-se a ressalva. |
| `bg-home-3.jpg` | `Site/bg3 home.jpg` | 1920×851 | 16KB | Textura clara/bege, quase lisa, com leve gradiente — mesma família de `bg-home-2.jpg`. Mesma ressalva de paleta. |
| `foto-01-home.png` | `Site/foto 01 home.png` | 818×721 | 208KB | **Foto de banco de imagens (stock), NÃO é a Dra. Kewri.** Duas mulheres genéricas de braços cruzados, fundo removido com halo/glow bege aplicado (arte pronta do site antigo). Contém elemento de design (glow) já embutido no PNG — não é uma foto "crua". |
| `foto-sobre-nos.png` | `Site/foto sobre nós.png` | 658×493 | 133KB | **Foto de banco de imagens (stock), NÃO é a Dra. Kewri.** Três mulheres genéricas de braços cruzados sorrindo, mesmo tratamento de glow, com selo "+15 ANOS DE EXPERIÊNCIA" já **impresso na própria imagem** (texto não editável — se o site novo mudar esse número ou o idioma, este arquivo fica desatualizado). |
| `foto-01-sobre-nos.webp` | `Site/foto_01_sobre_n_s_rebeschini.webp` | 1080×1080 | 16KB | Recorte quadrado (1:1, estilo post de Instagram) da MESMA foto de `kewri-06`/`kewri-sobre` (`Kewri-13.jpg`) — não é conteúdo novo, é um crop pronto pra redes sociais. |
| `foto-02-sobre-nos.webp` | `Site/foto_02_sobre_n_s_rebeschini.webp` | 1080×1080 | 56KB | Recorte quadrado (1:1) da MESMA foto de `kewri-02`/`kewri-alt-postura` (`Kewri-6.jpg`) — também não é conteúdo novo, é crop pronto pra redes sociais. |

**Atenção pro Frontend — risco de identidade visual:** `foto-01-home.png` e `foto-sobre-nos.png` são fotos
de banco de imagens genéricas (mulheres que NÃO são a Dra. Kewri), reaproveitadas do site antigo. Usá-las
no site novo criaria inconsistência (o visitante vê "a advogada" em uma seção e pessoas diferentes em
outra) e depois quebra a autenticidade que sustenta o "atendimento personalizado" citado nos diferenciais.
Recomendação: não usar essas duas no site novo, ou usá-las apenas em contexto que deixe claro que não são
retratos da titular (ex. ícone genérico de "equipe"/"parceria"), nunca como substituto de foto da Dra.
Kewri. `foto-sobre-nos.png` tem ainda o problema adicional do texto "+15 ANOS DE EXPERIÊNCIA" chapado na
imagem — se usada, esse texto duplicaria (com risco de contradição) o que já aparece como HTML editável no
hero (`hero-facts`) e nas credenciais da seção Sobre.

## Resumo de pesos vs. meta

- Hero: meta ≤350KB → `kewri-hero-1920.jpg` = 316KB ✅
- Fotos numeradas (`kewri-01` a `kewri-09`): entre 24KB e 240KB, todas ✅ (maior é `kewri-04-1200.jpg` = 240KB)
- Áreas (`area-1..4.webp`): 20-36KB ✅
- Backgrounds/fotos adicionais desta rodada: 16-208KB, nenhum passou de 300KB, nenhuma recompressão necessária ✅
- Demais assets já existentes: meta ≤200KB → entre 4KB e 192KB ✅

## Observação técnica (formato)

O ambiente não tem `sips` com suporte a escrita de webp (`org.webmproject.webp` não instalado) nem
`cwebp`/`imagemagick` disponíveis via PATH. Todas as fotos foram exportadas em JPEG qualidade 82 (ou
menor nos arquivos que precisaram caber na meta de peso), como o brief previu como fallback. Se o pane
de Frontend precisar de webp de fato (ex: para `<picture>` com fallback), rodar a conversão numa máquina
com `cwebp` instalado ou via ferramenta online, usando estes JPEGs como fonte.

---

## ATUALIZAÇÃO (21/07/2026, orquestrador) — fotos apenas da Dra. Kewri

Cliente confirmou: a segunda pessoa do ensaio NÃO deve aparecer no site. A Dra. Kewri é a de
cabelo liso escuro (confere com o site atual rebeschiniadvocacia.com). Ações:
- `kewri-01/03` sobrescritas com o conteúdo de `kewri-07` (Kewri P&B); `kewri-02/04/05` com `kewri-06` (Kewri colorida)
- `kewri-08` (era dupla high-five) → crop horizontal colorido de `Kewri-13.jpg`; `kewri-09` e `kewri-hero-*` (eram dupla) → crops horizontais de `Kewri-13`/`Kewri-14-2` (solo)
- Excluídos: `kewri-cutout-alt.png`, `kewri-alt-postura-*` (eram da outra pessoa), `bg-home-*.jpg`, `bg-quem-somos.webp` (duotones de fotos em dupla, não referenciados)
- As descrições da tabela original de kewri-01..09 ficam OBSOLETAS — hoje só existem 2 poses da Kewri (13 colorida / 14-2 P&B) + cutout. Se o cliente enviar mais fotos solo, reexportar.

## ATUALIZAÇÃO 2 (21/07/2026, orquestrador) — variedade de poses recortando as fotos em dupla

Identificação confirmada pelos nomes no Drive: a segunda pessoa é Valquíria Rebeschini.
Poses da Kewri obtidas por recorte das fotos em dupla (originais em alta):
- P3 `Kewri-9-2` (recorte dir.): em pé, P&B, olhar na câmera → slots kewri-01, kewri-03, kewri-09
- P4 `Kewri-11` (recorte dir.): colorida, contemplativa (caneta ao queixo) → kewri-02, kewri-05
- P5 `Kewri-20-2` (recorte esq.): banner P&B trabalhando, respiro negativo à esquerda → kewri-hero-1920/1280/768
- P6 `Kewri-19` (recorte fechado, sem a mão da colega): colorida, comemoração → kewri-04, kewri-08
- P1 `Kewri-13` (colorida em pé) → kewri-06, kewri-sobre, cutout · P2 `Kewri-14-2` (P&B) → kewri-07, alt-reflexiva
Distribuição confere: nenhuma página repete pose (banner P5 presente em todas; internas variam P1-P6).
