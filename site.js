(() => {
  'use strict';
  const root = new URL('.', document.currentScript.src);
  const page = document.body.dataset.page || 'home';
  const requestedLanguage = new URL(location.href).searchParams.get('lang');
  const lang = ['pl','en','es'].includes(requestedLanguage) ? requestedLanguage : 'pl';
  const en = lang === 'en';
  const t = (pl, english) => {
    if (lang !== 'es') return en ? english : pl;
    if (Object.hasOwn(window.AOM_ES, english)) return window.AOM_ES[english];
    console.warn('Missing Spanish translation:', english);
    return english;
  };
  const text = value => Array.isArray(value) ? value[{pl:0,en:1,es:2}[lang]] : value;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const asset = path => new URL('assets/' + path, root).href;
  const href = path => {
    const url = new URL(path, root);
    url.searchParams.set('lang', lang);
    return url.href;
  };
  const img = (name, alt, extra = '') => `<img src="${esc(asset('images/' + name))}" alt="${esc(alt)}" loading="lazy" decoding="async" ${extra}>`;
  const link = (path, title, type = 'arrow-link') => `<a class="${type}" href="${esc(href(path))}">${title}<span aria-hidden="true">→</span></a>`;
  const email = () => `<a class="email" href="mailto:${AOM.email}">${AOM.email}</a>`;
  const artworkPrice = p => Number.isFinite(p.price) && p.currency ? new Intl.NumberFormat({pl:'pl-PL',en:'en-GB',es:'es-ES'}[lang], {style:'currency',currency:p.currency,minimumFractionDigits:0,maximumFractionDigits:0,useGrouping:'always'}).format(p.price) : '';
  const eyebrow = title => `<div class="eyebrow">${title}</div>`;
  const paragraphs = value => text(value).split(/\n\s*\n/).map(p => '<p>'+esc(p)+'</p>').join('');
  function reviewMarkup(review, artwork = '') {
    const quoteLang = lang === 'pl' && review.originalLanguage === 'en' ? 'en' : lang;
    const translated = lang === 'es' || (en && review.originalLanguage === 'pl');
    const translationNote = review.originalLanguage === 'en' ? t('Tłumaczenie z języka angielskiego','Translated from English') : t('Tłumaczenie z języka polskiego','Translated from Polish');
    return '<figure class="client-review"><blockquote lang="'+quoteLang+'"><p>'+esc(text(review.quote))+'</p></blockquote><figcaption>— '+esc(text(review.author))+(artwork?'<span>'+esc(artwork)+'</span>':'')+(translated?'<small>'+esc(translationNote)+'</small>':'')+'</figcaption></figure>';
  }
  function testimonials() {
    return '<section class="light reviews-section"><div class="wrap">'+eyebrow(t('Opinie','Testimonials'))+'<h2>'+t('Sztuka w osobistych historiach.','Art in personal stories.')+'</h2><div class="reviews-grid">'+AOM.paintings.filter(p=>p.testimonial).map(p=>reviewMarkup(p.testimonial,text(p.title))).join('')+'</div></div></section>';
  }
  const route = page.startsWith('detail:') ? (AOM.murals.some(p => 'detail:' + p.id === page) ? 'murals' : 'paintings') : page;
  const navItems = [['home','index.html','Portfolio','Portfolio'],['murals','murale.html','Murale','Murals'],['interiors','wnetrza.html','Wnętrza','Interiors'],['paintings','obrazy-na-zamowienie.html','Malarstwo','Paintings'],['contact','kontakt.html','Kontakt','Contact']];
  const nav = () => navItems.map(([id,path,pl,english]) => `<a href="${esc(href(path))}" ${route === id ? 'aria-current="page"' : ''}>${t(pl,english)}</a>`).join('');
  function languages() {
    return `<div class="languages" aria-label="${t('Wersja językowa','Language')}">${['pl','en','es'].map(code => {
      const url = new URL(location.href); url.searchParams.set('lang', code);
      return `<a href="${esc(url.href)}" lang="${code}" hreflang="${code}" aria-label="${({pl:'Polski',en:'English',es:'Español'})[code]}" ${lang === code ? 'aria-current="true"' : ''}>${code.toUpperCase()}</a>`;
    }).join('<span aria-hidden="true">|</span>')}</div>`;
  }
  function brandCrop(file, viewBox, width, height, className) {
    return `<svg class="${className}" viewBox="${viewBox}" aria-hidden="true" focusable="false"><image href="${asset('brand/'+file)}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"></image></svg>`;
  }
  function brand(secondary = false) {
    const original='brand-wordmark-original.png';
    const artwork=secondary
      ? brandCrop('brand-champagne-original.png','644 1701 3272 4279',4500,8000,'brand-gold')
      : brandCrop(original,'850 1855 1039 1039',4500,4750,'brand-mark')+brandCrop(original,'1971 2197 1992 312',4500,4750,'brand-lettering');
    return `<a class="brand ${secondary?'brand-secondary':'brand-primary'}" href="${href('index.html')}" aria-label="Art of Meaning by Magdalena Babicka — ${t('strona główna','home')}">${artwork}</a>`;
  }
  const socials = () => `<div class="socials">${AOM.social.map(s => `<a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name} — ${t('nowa karta','new tab')}">${img(s.icon,'', 'width="22" height="22"')}</a>`).join('')}</div>`;
  function header() {
    return `<a class="skip" href="#main">${t('Przejdź do treści','Skip to content')}</a><header class="site-header"><div class="wrap header-inner">${brand()}<button type="button" class="menu-toggle" aria-expanded="false" aria-controls="main-nav">${t('Menu','Menu')}</button><nav class="nav" id="main-nav" aria-label="${t('Menu główne','Main navigation')}">${nav()}${languages()}</nav></div></header>`;
  }
  function footer() {
    return `<footer class="site-footer wrap"><div class="footer-inner">${brand(route==='interiors')}<div class="footer-contact"><h3>${t('Porozmawiajmy o Twoim projekcie','Discuss your project')}</h3>${email()}<br>${link('kontakt.html',t('Napisz do mnie','Contact me'))}</div><nav class="footer-nav" aria-label="${t('Menu w stopce','Footer navigation')}">${nav()}</nav>${languages()}</div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Art of Meaning</span><a href="${href('polityka-prywatnosci.html')}">${t('Polityka prywatności','Privacy policy')}</a></div></footer>`;
  }
  function backgroundVideo(name, posterImage = null) {
    return `<div class="hero-media"><video class="background-video" autoplay muted loop playsinline preload="metadata" poster="${posterImage ? asset('images/' + posterImage) : asset('videos/' + name + '-poster-00001.jpg')}" aria-label="${t('Proces tworzenia muralu','The mural painting process')}"><source src="${asset('videos/' + name + '.mp4')}" type="video/mp4"></video></div><div class="hero-shade"></div><div class="video-controls"><button type="button" class="video-control video-pause" aria-label="${t('Wstrzymaj film','Pause video')}">Ⅱ</button><button type="button" class="video-control video-sound" aria-label="${t('Włącz dźwięk','Unmute video')}" aria-pressed="false">♪</button></div>`;
  }
  function home() {
    const areas = [
      ["murale.html","Magda-patrzy-na-mural.avif",t("Murale Artystyczne","Artistic Murals"),t("Ręcznie malowane ściany, które nadają przestrzeni sens, głębię i osobisty wymiar.","Hand-painted walls that give a space meaning, depth and a personal dimension.")],
      ["obrazy-na-zamowienie.html","business-darling.png",t("Obrazy Premium","Premium Paintings"),t("Unikalna sztuka do wnętrz prywatnych i komercyjnych.","Unique art for private and commercial interiors.")],
      ["wnetrza.html","interior-nocturne.png",t("Projektowanie Wnętrz","Interior Design"),t("Artystyczne projektowanie, w którym mural lub obraz jest punktem wyjścia do stworzenia wyjątkowej przestrzeni.","An artistic approach to interior design, with a mural or painting as the starting point for a distinctive space.")]
    ];
    return `<section class="hero-home">${backgroundVideo('0731')}<div class="wrap hero-home-copy"><h1>Art of Meaning</h1><p class="lead">${t('Sztuka przekazu by Magdalena Babicka','Art with meaning by Magdalena Babicka')}</p></div></section>
      <section aria-labelledby="areas-heading"><div class="wrap areas-intro">${eyebrow(t('Obszary twórczości','Creative disciplines'))}<h2 id="areas-heading">${t('Murale. Obrazy. Wnętrza.','Murals. Paintings. Interiors.')}</h2><p class="lead">${t('Sztuka, która tworzy przestrzeń ze znaczeniem.','Art that creates spaces with meaning.')}</p></div><div class="areas-grid">${areas.map(([url,image,title,description]) => `<article><a class="area-image${url==='obrazy-na-zamowienie.html'?' painting-cover':''}" href="${href(url)}">${img(image,title)}</a><div class="area-copy"><h3>${title}</h3><p>${description}</p>${link(url,t('Zobacz więcej','Explore more'))}</div></article>`).join('')}</div></section>
      <section class="wrap about" id="o-artystce" aria-labelledby="artist-heading"><div>${eyebrow(t("O artystce","About the artist"))}<h2 id="artist-heading">Magdalena<br>Babicka</h2><p class="intro">${t("Artystka i projektantka wnętrz. Twórczyni Art of Meaning.","Artist and interior designer. Founder of Art of Meaning.")}</p><p>${t("Łączę malarstwo, autorskie murale i projektowanie wnętrz, tworząc spójną opowieść o miejscu i ludziach, którzy z niego korzystają. Punktem wyjścia jest dla mnie charakter przestrzeni — jej światło, proporcje i emocje, które ma budzić.","I bring painting, bespoke murals and interior design together to create a coherent story about a place and the people who use it. Each project begins with the character of the space — its light, proportions and the emotions it should evoke.")}</p><p>${t("Wykształcenie artystyczne oraz wiedzę z zakresu architektury wnętrz łączę z doświadczeniem zdobytym przy projektach w Polsce i Hiszpanii. Pracuję z kompozycją, kolorem i materiałem, dbając zarówno o wyraz artystyczny, jak i funkcję wnętrza.","I combine artistic training and knowledge of interior architecture with experience gained on projects in Poland and Spain. I work with composition, colour and materials, giving equal consideration to artistic expression and the function of an interior.")}</p><p>${t("Każdą współpracę zaczynam od rozmowy i uważnego poznania potrzeb. Od pierwszej koncepcji po dopracowanie detali szukam rozwiązań, w których sztuka i przestrzeń tworzą przemyślaną całość.","Every collaboration begins with a conversation and a clear understanding of your needs. From the initial concept to the final details, I seek solutions in which art and space form a thoughtful whole.")}</p><blockquote class="artist-quote"><p>“${t("Wierzę, że sztuka może współgrać z przestrzenią — wydobywać jej charakter i nadawać codziennym miejscom osobisty wymiar.","I believe art can work in harmony with a space — revealing its character and giving the places we inhabit a personal dimension.")}”</p><cite>Magdalena Babicka</cite></blockquote>${link('kontakt.html',t("Porozmawiajmy o Twoim projekcie","Discuss your project"))}</div><figure class="portrait">${img(AOM.artistPortrait,t("Magdalena Babicka z pędzlem","Magdalena Babicka holding a paintbrush"),'width="3888" height="5184"')}</figure></section>`;
  }
  function muralFacts(m) {
    const facts = [['icon_time_work.svg',`${m.days} ${t('dni pracy','days of work')}`],['icon_space.svg',`${m.area} m²`],['icon_place.svg',text(m.city)]];
    return `<div class="project-facts">${facts.map(([icon,label]) => `<span class="fact">${img(icon,'')}<span>${label}</span></span>`).join('')}</div>`;
  }
  function contactBand(kind = 'mural') {
    return `<section class="wrap contact-band"><div>${eyebrow(t('Kontakt','Contact'))}<h2>${kind === 'mural' ? t('Porozmawiajmy<br>o Twoim muralu','Discuss your<br>mural') : t('Porozmawiajmy<br>o Twoim projekcie','Discuss your<br>project')}</h2>${email()}<p><a href="tel:${AOM.phone}">+48 533 128 055</a><br>${t('Polska i Hiszpania · współpraca zdalna','Poland and Spain · remote collaboration')}</p>${socials()}</div><div>${link('kontakt.html',t('Zapytaj o wycenę','Request a quotation'),'outline')}<small>${t('Opisz swój pomysł, miejsce i przybliżone wymiary. Wspólnie ustalimy kierunek oraz zakres współpracy.','Share your ideas, location and approximate dimensions. Together we will establish the direction and scope.')}</small></div></section>`;
  }
  function murals() {
    const steps = [
      [t("Twoja Wizja i Wstępna Wycena","Your Vision & Initial Quote"),t("Wszystko zaczyna się od Twojej wizji. Napisz do mnie, co Ci w duszy gra. Prześlij inspiracje, zdjęcia i przybliżone wymiary ściany. Na tej podstawie przygotuję dla Ciebie szybką wycenę.","Each project begins with your vision. Share your ideas and aspirations, inspiration, photographs and approximate wall dimensions. I will use these to prepare an initial quotation.")],
      [t("Konsultacja i Plan Działania","Consultation & a Plan of Action"),t("To moment, w którym dogłębnie poznaję Twoje potrzeby. Dzięki wiedzy z zakresu projektowania wnętrz doradzam najlepsze rozwiązania i upewniam się, że malowidło idealnie wkomponuje się w przestrzeń. Jeśli ściana wymaga specjalistycznego przygotowania podłoża – nie martw się, współpracuję z zaufanymi fachowcami.","This is when I get to know your needs in depth. Drawing on my knowledge of interior design, I advise on the best solutions and make sure the painting fits perfectly into the space. If the wall needs specialist surface preparation, do not worry — I work with trusted professionals.")],
      [t("Projekt i Akceptacja Wizualizacji","Design & Visualisation Approval"),t("Zanim pędzel dotknie ściany, otrzymasz ode mnie unikalny projekt z wizualizacją. To Twój czas, by upewnić się, że wszystko jest perfekcyjne. Ponieważ Twoje pełne zadowolenie jest dla mnie najważniejsze, przed realizacją pokażę Ci wizualizację z projektora, abyś mógł zobaczyć, jak będzie to wyglądać w rzeczywistości.","Before a brush touches the wall, you will receive a unique design and visualisation from me. This is your time to make sure everything is perfect. Your complete satisfaction matters most to me, so before painting I will show you the visualisation using a projector, allowing you to see how it will look in reality.")],
      [t("Realizacja premium","Premium Execution"),t("Gdy projekt jest zatwierdzony, a formalności i profesjonalizm za nami, przystępuję do działania. Perfekcyjnie zabezpieczam Twoją przestrzeń, korzystam wyłącznie z farb premium i z rzemieślniczą precyzją przenoszę wizję na ścianę. Wszystko w ustalonym terminie i z dbałością o najmniejszy szczegół.","Once the design is approved and the formalities and professional arrangements are taken care of, I get to work. I carefully protect your space, use only premium paints and bring the vision to the wall with the precision of a craftsperson. Everything is completed within the agreed timeframe and with attention to the smallest detail.")]
    ];
    return `<section class="mural-hero">${backgroundVideo('Intro-main-1-1')}<div class="wrap mural-hero-copy">${eyebrow(t('Murale / malarstwo ścienne','Murals / wall painting'))}<h1>${t('Sztuka wpisana<br>w <em>przestrzeń.</em>','Art that belongs<br>in your <em>space.</em>')}</h1><p>${t('Autorskie malowanie ścian i sufitów. Indywidualny projekt, który nadaje miejscu niepowtarzalny charakter.','Original wall and ceiling paintings. An individual design that gives a place its own character.')}</p><div class="hero-actions">${link('kontakt.html',t('Zapytaj o wycenę','Request a quotation'),'outline')}${link('murale.html#realizacje',t('Zobacz realizacje','View projects'))}</div></div></section>
      <section class="wrap mural-intro" id="realizacje">${eyebrow(t('Wybrane realizacje','Selected projects'))}<h2>${t('Murale, które<br>tworzą charakter miejsca.','Murals that shape<br>the character of a place.')}</h2><p>${t('Każdy projekt powstaje z myślą o konkretnej przestrzeni.','Every project begins with a particular space in mind.')}</p><a class="arrow-link" href="${esc(AOM.youtubePlaylists)}" target="_blank" rel="noopener noreferrer">${t('Filmy i playlisty na YouTube','Films and playlists on YouTube')} <span aria-hidden="true">→</span></a></section>
      <div class="wrap mural-list">${AOM.murals.map(m => `<article class="mural-project">${img(m.image,text(m.title))}<div class="shade"></div><div class="mural-description"><p class="type">${text(m.type)}</p><h3>${text(m.title)}</h3></div><div class="mural-bottom"><div class="mural-links"><a class="star-link" href="${href(m.id + '.html')}">${img('point_star.svg','')}${t('Zobacz projekt','View project')}</a><button class="play-link video-open" type="button" data-mural="${m.id}">▷ ${t('Film na YouTube','Film on YouTube')}</button></div>${muralFacts(m)}</div></article>`).join('')}</div>
      <section class="light process" id="jak-pracuje"><div class="wrap"><div class="process-intro"><div>${eyebrow(t('Jak pracuję','How I work'))}<h2>${t('Twój mural<br>w 4 krokach','Your mural<br>in 4 steps')}</h2><p>${t('Cały proces zaprojektowałam tak, by maksymalnie oszczędzić Twój czas i energię. Prowadzę Cię na każdym etapie – od pierwszej rozmowy aż po moment, w którym Twoja ściana zyska duszę.','The process is designed to respect your time and energy. I guide you through every stage — from the first conversation to the moment your wall gains its soul.')}</p></div>${img('process-emblem.svg','', 'class="process-symbol"')}</div><div class="steps">${steps.map(([title,description],i) => `<article class="step">${img(`process-step-${i+1}.svg`,'')}<h3>${title}</h3><p>${description}</p></article>`).join('')}</div></div></section>${contactBand()}`;
  }
  function artCard(p, i) {
    const detailsUrl = ['who-is-hunting','business-darling'].includes(p.id) ? `obrazy-na-zamowienie/${p.id}.html` : `obrazy-na-zamowienie/${p.id}.html`;
    return `<article class="art-card" data-status="${p.status || 'unknown'}" data-index="${i}"><div class="art-mask">${img(p.image,text(p.title))}${p.status === 'archive' ? '<span class="sold-tag">SOLD</span>' : ''}<div class="art-overlay"><h3>${esc(text(p.title))}</h3>${link(detailsUrl,t('Zobacz obraz','View artwork'))}</div></div><div class="art-caption"><h3>${esc(text(p.title))}</h3><p>${p.size || t('Wymiary do potwierdzenia','Dimensions to be confirmed')}${p.status === 'archive' ? ' · SOLD' : ''}</p>${artworkPrice(p) ? `<span class="price">${esc(artworkPrice(p))}</span>` : `<a class="price" href="${href('kontakt.html?artwork='+encodeURIComponent(text(p.title)))}">${p.status === 'archive' ? t('Zamów podobny obraz','Commission a similar work') : t('Zapytaj o cenę','Enquire about price')}</a>`}</div></article>`;
  }
  function paintings() {
    return `<section class="wrap painting-intro">${eyebrow(t('Malarstwo / Magdalena Babicka','Painting / Magdalena Babicka'))}<h1>${esc(text(AOM.paintingIntroduction.heading))}</h1>${paragraphs(AOM.paintingIntroduction.description)}${link('obrazy-na-zamowienie.html#kolekcja',t('Zobacz kolekcję','Explore the collection'))}</section>
      <section class="wrap collection" id="kolekcja"><div class="collection-top"><div>${eyebrow(t('Kolekcja','Collection'))}<h2>${t('Wybrane obrazy','Selected paintings')}</h2></div><div class="filters" role="group" aria-label="${t('Filtruj obrazy','Filter paintings')}">${[['all',t('Wszystkie','All')],['available',t('Dostępne','Available')],['archive',t('Archiwum','Archive')]].map(([filter,label]) => `<button type="button" class="filter" data-art-filter="${filter}" aria-pressed="${filter === 'all'}">${label}</button>`).join('')}</div></div><div class="art-grid">${AOM.paintings.map(artCard).join('')}</div><p class="empty" id="art-empty" hidden>${t('W tej kategorii nie ma obecnie obrazów.','There are currently no paintings in this category.')}</p><div class="collection-more"><button type="button" class="outline" id="more-art">${t('Zobacz całą kolekcję','View the full collection')} <span aria-hidden="true">↓</span></button></div></section>
      <section class="light commission" id="zamowienie"><div class="wrap">${eyebrow(t('Na zamówienie','Commissions'))}<div class="commission-grid"><figure class="commission-image has-artwork">${img(AOM.familyPortrait,t('Portret rodzinny trzech osób w ramie na drewnianej sztaludze','A framed family portrait of three people on a wooden easel'),'width="1254" height="1254"')}<figcaption>${t('Portret rodzinny — przykład zamówienia.','Family portrait — a commission example.')}</figcaption></figure><div><h2>${t('Twój pomysł.<br>Autorski obraz.','Your idea.<br>An original painting.')}</h2><p>${t('Portret, osobisty motyw lub obraz dopasowany do wnętrza — projekt powstaje na podstawie uzgodnionego tematu i formatu.','A portrait, a personal motif or a painting for your interior — each work begins with an agreed subject and format.')}</p><div class="commission-prices"><div><span>${t('Format i technika','Format and medium')}</span><span>${t('Ustalane indywidualnie','Agreed individually')}</span></div><div><span>${t('Wycena','Quote')}</span><span>${t('Po ustaleniu zakresu','After agreeing the scope')}</span></div></div>${link('kontakt.html?project=painting',t('Zapytaj o obraz','Enquire about a painting'))}</div></div></div></section>${testimonials()}<section class="wrap painting-contact">${eyebrow(t('Kontakt','Contact'))}<h2>${t('Znajdź obraz dla siebie.','Find your painting.')}</h2><p>${t('Napisz, która praca Cię zainteresowała, lub opowiedz mi o swoim pomyśle.','Let me know which artwork interests you, or describe a commission you have in mind.')}</p>${email()}</section>`;
  }
  function interiorCard(p) {
    return `<article class="interior-card" data-interior-type="${p.type}" data-interior-id="${p.id}"><div class="interior-mask">${img(p.image,text(p.title))}<div class="interior-overlay"><h3>${text(p.title)}</h3><button type="button" class="arrow-link interior-open" data-id="${p.id}">${t('Zobacz koncepcję','View concept')} <span aria-hidden="true">→</span></button></div></div><p>${text(p.title)}<small>${t('Koncepcja / wizualizacja','Concept / visualisation')}</small></p></article>`;
  }
  function interiors() {
    const services = [
      [t('Konsultacje','Consultations'),t('Konkretne wskazówki dotyczące układu, materiałów, kolorów i oświetlenia.','Focused guidance on layout, materials, colours and lighting.'),t('Kierunek zmian i zalecenia.','A direction for change and recommendations.')],
      [t('Koncepcje wnętrz','Interior concepts'),t('Układ funkcjonalny i kierunek estetyczny tworzące spójną wizję wnętrza.','A functional layout and aesthetic direction that form a coherent vision.'),t('Rozwiązania dopasowane do potrzeb.','Solutions tailored to your needs.')],
      [t('Wizualizacje','Visualisations'),t('Przestrzeń w realistycznej odsłonie — z wybranymi materiałami, kolorem i światłem.','A realistic view of the space, with selected materials, colour and light.'),t('Zobacz przestrzeń przed realizacją.','See your space before implementation.')],
      [t('Koordynacja projektu','Project coordination'),t('Uzgodnienia z wykonawcami i wsparcie na kolejnych etapach realizacji.','Coordination with contractors and support throughout implementation.'),t('Zakres ustalamy indywidualnie.','The scope is agreed individually.')]
    ];
    return `<section class="interior-hero"><div class="interior-hero-copy">${eyebrow(t('Art of Meaning / Wnętrza','Art of Meaning / Interiors'))}<h1>${t('Wnętrza,<br>które<br>opowiadają<br>historie.','Interiors<br>that<br>tell<br>stories.')}</h1><p>${t('Sztuka, materiały i światło w równowadze. Projektowanie wnętrz prywatnych i przestrzeni hospitality.','Art, materials and light in balance. Interior design for private spaces and hospitality.')}</p><div class="hero-actions">${link('kontakt.html?project=interior',t('Poznajmy się','Arrange a consultation'))}${link('wnetrza.html#portfolio',t('Zobacz portfolio','View portfolio'))}</div></div><figure class="interior-hero-figure"><div class="media">${img('interior-nocturne.png',t('Nokturn w śródziemnomorskim salonie — wizualizacja wnętrza','Nocturne in a Mediterranean lounge — interior visualisation'), 'fetchpriority="high"')}</div><figcaption class="media-meta"><span>${t('Nokturn w śródziemnomorskim salonie','Nocturne in a Mediterranean lounge')}</span><span>${t('Koncepcja / wizualizacja','Concept / visualisation')}</span></figcaption></figure></section>
      <section class="wrap services">${eyebrow(t('Koncepcja / przestrzeń / współpraca','Concept / space / collaboration'))}<h2>${t('Zakres współpracy','How we can work together')}</h2><p>${t('Możesz zacząć od wybranego etapu lub pełnego projektu wnętrza. Wspólnie ustalimy zakres najlepiej dopasowany do Twojej przestrzeni.','Start with one stage or a complete interior project. Together we will agree on the scope that best suits your space.')}</p><div class="services-grid">${services.map(([title,description,note]) => `<article class="service"><h3>${title}</h3><p>${description}</p><small>${note}</small></article>`).join('')}</div><div class="download-row"><div><h3>${t('Potrzebujesz więcej szczegółów?','Would you like more details?')}</h3><p>${t('Porozmawiajmy o Twojej przestrzeni.','Discuss your space and its possibilities.')}</p></div><div class="download-missing"><span>${t('Zakres współpracy','Scope of services')}<small>${t('Dokument PDF w przygotowaniu','PDF document forthcoming')}</small></span></div><div class="download-missing"><span>${t('Kwestionariusz projektowy','Project questionnaire')}<small>${t('Dokument PDF w przygotowaniu','PDF document forthcoming')}</small></span></div></div></section>
      <section class="wrap interior-portfolio" id="portfolio"><div class="collection-top"><div>${eyebrow(t('Wybrane przestrzenie','Selected spaces'))}<h2>Portfolio</h2></div><div class="filters" role="group" aria-label="${t('Filtruj wnętrza','Filter interiors')}">${[['all',t('Wszystkie','All')],['residential',t('Prywatne','Residential')],['commercial',t('Komercyjne','Commercial')]].map(([filter,label]) => `<button type="button" class="filter" data-interior-filter="${filter}" aria-pressed="${filter === 'all'}">${label}</button>`).join('')}</div></div><div class="interior-grid">${AOM.interiors.slice(0,2).map(interiorCard).join('')}<article class="future" data-future><span aria-hidden="true">＋</span><h3>${t('Nowe realizacje','New projects')}</h3><p>${t('Miejsce na kolejne przestrzenie','Room for new spaces')}</p></article><article class="future" data-future><span aria-hidden="true">＋</span><h3>${t('Kolejne historie','More stories')}</h3><p>${t('Portfolio w rozwoju','An evolving portfolio')}</p></article></div><div class="collection-more"><button type="button" class="outline" id="more-interiors">${t('Zobacz wszystkie koncepcje','View all concepts')} <span aria-hidden="true">↓</span></button></div></section>
      <section class="light comparison-section"><div class="wrap">${eyebrow(t('Sztuka zmienia wnętrze','Art transforms a space'))}<h2>${t('Ta sama przestrzeń. Inny wymiar.','The same space. A different dimension.')}</h2><p>${t('Zobacz, jak autorska dekoracja zmienia odbiór wnętrza.','Explore how original artwork changes the experience of an interior.')}</p><div class="comparison"><div class="comparison-layer"><div class="comparison-missing"><span>${t('Wersja bez malowidła — oczekujemy na pasującą wizualizację tej samej przestrzeni.','Without the mural — a matching visualisation of this same space is still required.')}</span></div></div><div class="comparison-layer after">${img('interior-nocturne.png',t('Wizualizacja wnętrza z ornamentalnym sufitem','Interior visualisation with an ornamental ceiling'))}</div><span class="comparison-label left">${t('Bez malowidła / brak pliku','Without artwork / file pending')}</span><span class="comparison-label right">${t('Koncepcja z malowidłem','Concept with artwork')}</span><div class="comparison-divider"><span aria-hidden="true">↔</span></div><label class="sr-only" for="comparison-range">${t('Przesuń granicę porównania','Move the comparison divider')}</label><input id="comparison-range" type="range" min="0" max="100" value="50" aria-valuetext="50%"></div><p class="comparison-note">${t('Przesuń suwak lub użyj strzałek klawiatury. To wizualizacja koncepcyjna, nie dokumentacja realizacji.','Drag the slider or use the arrow keys. This is a concept visualisation, not a completed-project record.')}</p></div></section><section class="wrap interior-cta"><div>${eyebrow(t('Współpraca','Collaboration'))}<h2>${t('Od konsultacji po pełny projekt wnętrza.','From consultation to a complete interior.')}</h2><p>${t('Porozmawiajmy o Twoim miejscu i zakresie współpracy.','Discuss your space and the scope of your project.')}</p></div>${link('kontakt.html?project=interior',t('Napisz wiadomość','Contact me'),'outline')}</section>`;
  }
  function field(name,label,type='text',required=false,full=false) {
    return `<label class="field ${full?'full':''}" for="${name}"><span>${label}${required?' *':''}</span><input id="${name}" name="${name}" type="${type}" ${required?'required':''} maxlength="${name==='email'?'254':'180'}" autocomplete="${({firstName:'given-name',lastName:'family-name',email:'email',company:'organization'})[name]||'off'}"></label>`;
  }

  function activationPanel() {
    if (page !== 'contact' || new URL(location.href).searchParams.get('activate') !== '1') return '';
    return '<section class="wrap activation-panel"><h2>'+t('Jednorazowa aktywacja formularza','One-time form activation')+'</h2><p>'+t('Panel dla właścicielki strony. Przycisk wyśle prośbę aktywacyjną do FormSubmit dla contact@artofmeaning.art. Następnie otwórz wiadomość w tej skrzynce i potwierdź adres. To nie jest potwierdzenie dostarczenia zapytania klienta.','Website owner setup. This button requests FormSubmit activation for contact@artofmeaning.art. Open that inbox and confirm the address. This is not confirmation of a customer enquiry being delivered.')+'</p><form method="post" action="'+esc(AOM.contact.endpoint.replace('/ajax/','/'))+'"><input type="hidden" name="name" value="Art of Meaning — activation"><input type="hidden" name="email" value="contact@artofmeaning.art"><input type="hidden" name="message" value="Please activate the Art of Meaning contact form for contact@artofmeaning.art."><input type="hidden" name="_subject" value="Art of Meaning — form activation"><input type="hidden" name="_next" value="'+esc(href('kontakt.html'))+'"><button type="submit" class="outline">'+t('Wyślij prośbę o aktywację','Request activation')+' →</button></form></section>';
  }
  function contact() {
    return `<section class="light"><div class="wrap contact-main"><div>${eyebrow(t('Kontakt','Contact'))}<h1>${t('Porozmawiajmy<br>o Twoim<br>projekcie.','Discuss<br>your<br>project.')}</h1><p class="intro">${t('Planujesz mural, autorski obraz lub projekt wnętrza? Opowiedz mi o swoim pomyśle — wspólnie ustalimy zakres współpracy.','Planning a mural, an original painting or an interior? Share your ideas so we can establish the scope of your project.')}</p><div class="contact-direct">${eyebrow(t('Napisz bezpośrednio','Write directly'))}${email()}<a href="tel:${AOM.phone}">+48 533 128 055</a><p>${t('Polska i Hiszpania · współpraca zdalna','Poland and Spain · remote collaboration')}</p></div><div class="contact-advice"><strong>${t('Nie wiesz, od czego zacząć?','Not sure where to begin?')}</strong><p>${t('Możemy zacząć od konsultacji i określenia kierunku projektu.','We can start with a consultation and establish the direction of your project.')}</p></div>${socials()}</div><form class="contact-form" id="contact-form" method="post" action="${esc(AOM.contact.endpoint.replace('/ajax/','/'))}"><h2>${t('Opowiedz mi o swoim pomyśle','Describe your project')}</h2><div class="form-grid">${field('firstName',t('Imię','First name'),'text',true)}${field('lastName',t('Nazwisko','Last name'))}${field('email',t('E-mail','Email'),'email',true,true)}${field('company',t('Firma (opcjonalnie)','Company (optional)'),'text',false,true)}<label class="field full" for="project"><span>${t('Rodzaj projektu','Project type')} *</span><select id="project" name="project" required><option value="">${t('Wybierz usługę','Choose a service')}</option><option value="mural">${t('Mural / malowanie sufitu','Mural / ceiling painting')}</option><option value="painting">${t('Obraz / portret na zamówienie','Painting / commissioned portrait')}</option><option value="interior">${t('Projekt wnętrza','Interior design')}</option><option value="consultation">${t('Konsultacja','Consultation')}</option></select></label>${field('location',t('Lokalizacja projektu','Project location'))}${field('budget',t('Budżet (opcjonalnie)','Budget (optional)'))}<label class="field full" for="message"><span>${t('Wiadomość','Message')} *</span><textarea id="message" name="message" required maxlength="6000" placeholder="${t('Opisz pomysł, przestrzeń i planowany termin.','Describe your idea, space and proposed timeline.')}"></textarea></label></div><div class="form-trap" aria-hidden="true"><label for="website-field">Website<input id="website-field" name="_honey" tabindex="-1" autocomplete="off"></label></div><p class="form-meta">${t('* Pola wymagane. Odpowiem na podany adres e-mail.','* Required fields. I will reply to the email address you provide.')}<br>${t('Informacje o przetwarzaniu danych znajdziesz w','Read about data processing in the')} <a href="${href('polityka-prywatnosci.html')}">${t('Polityce prywatności','Privacy policy')}</a>.</p><div class="form-action"><button class="solid" type="submit">${t('Wyślij zapytanie','Send enquiry')} <span aria-hidden="true">→</span></button></div><div id="form-status" class="form-status" role="status" aria-live="polite"></div></form></div></section>`;
  }
  function muralDetailHero(m) {
    return `<section class="mural-detail-hero" aria-labelledby="mural-project-title">${backgroundVideo(m.video,m.image)}<div class="wrap mural-detail-hero-copy">${eyebrow(text(m.type))}<h1 id="mural-project-title">${esc(text(m.title))}</h1><div class="hero-actions"><button type="button" class="outline video-open" data-mural="${m.id}">▷ ${t('Zobacz pełny film na YouTube','Watch the full film on YouTube')}</button></div></div></section>`;
  }
  function detail(id) {
    const mural = AOM.murals.find(m => m.id === id);
    const painting = AOM.paintings.find(p => p.id === id);
    const p = mural || painting;
    if (!p) return `<section class="wrap section"><h1>${t('Nie znaleziono pracy','Artwork not found')}</h1>${link('index.html',t('Wróć do portfolio','Back to portfolio'))}</section>`;
    const back = mural ? 'murale.html#realizacje' : 'obrazy-na-zamowienie.html#kolekcja';
    return `${mural?muralDetailHero(mural):''}<section class="wrap detail${mural?' mural-detail':''}"><div class="detail-grid">${img(p.image,text(p.title),'class="detail-image"')}<div>${eyebrow(mural?t('O realizacji','About the project'):(p.size||t('Malarstwo','Painting')))}${mural?`<h2>${t('Historia tego miejsca.','The story of this place.')}</h2>`:`<h1>${esc(text(p.title))}</h1>`}${!mural && artworkPrice(p) ? `<p class="detail-price">${esc(artworkPrice(p))}</p>` : ''}<div class="detail-copy">${p.description?paragraphs(p.description):'<p>'+t('Opis tej pracy zostanie uzupełniony. Jeśli obraz Cię zainteresował, napisz do mnie.','The description for this artwork is forthcoming. Please contact me for further information.')+'</p>'}</div>${mural?muralFacts(mural):`<p>${p.status==='archive'?t('SOLD — praca archiwalna.','SOLD — archive work.'):t('Obraz dostępny.','Available painting.')} ${p.status==='archive'?t('Możesz zapytać o indywidualne zamówienie.','You can enquire about a bespoke commission.'):artworkPrice(p)?'':t('Zapytaj o cenę.','Enquire about price.')}</p>`}${link('kontakt.html?artwork='+encodeURIComponent(text(p.title)),t('Zapytaj o pracę','Enquire about this work'))}<p>${link(back,t('Wróć do kolekcji','Back to the collection'))}</p></div></div>${p.testimonial?reviewMarkup(p.testimonial):''}${mural?`<p><a class="arrow-link" href="${mural.youtube}" target="_blank" rel="noopener noreferrer">${t('Otwórz film na YouTube','Open the film on YouTube')} <span aria-hidden="true">→</span></a></p><p><a class="arrow-link" href="${esc(AOM.youtubePlaylists)}" target="_blank" rel="noopener noreferrer">${t('Więcej filmów i playlist','More films and playlists')} <span aria-hidden="true">→</span></a></p><div class="detail-gallery">${mural.gallery.map((image,i)=>img(image,text(mural.title)+' — '+t('detal','detail')+' '+(i+1))).join('')}</div>`:''}</section>`;
  }
  function privacy() {
    return `<section class="wrap legal"><h1>${t('Polityka prywatności','Privacy policy')}</h1><p>${t('Administratorem danych jest Magdalena Babicka, Art of Meaning. Kontakt:','The data controller is Magdalena Babicka, Art of Meaning. Contact:')} ${email()}.</p><h2>${t('Kontakt przez tę stronę','Contact through this website')}</h2><p>${t('Formularz na stronie Kontakt przekazuje podane dane do usługi FormSubmit w celu wysłania wiadomości na contact@artofmeaning.art. Przekazywane są imię, nazwisko, adres e-mail, treść zapytania oraz pozostałe dobrowolnie uzupełnione pola. Dane służą obsłudze zapytania; nie są zapisywane przez tę stronę w pamięci przeglądarki. Komunikat potwierdza przyjęcie zgłoszenia przez usługę wysyłkową, nie odczytanie wiadomości przez odbiorcę.','The Contact form passes the data you provide to FormSubmit to send a message to contact@artofmeaning.art. This includes your name, email address, enquiry and any optional fields you complete. The information is used to respond to your enquiry; this website does not store it in browser storage. The confirmation acknowledges acceptance by the sending service, not that the recipient has read the email.')}</p><h2>${t('Serwisy zewnętrzne','External services')}</h2><p>${t('Odnośniki do YouTube i profili społecznościowych prowadzą do odrębnych serwisów. Ich zasady przetwarzania danych obowiązują po przejściu na te strony. Czcionki, obrazy i filmy tej wersji są przechowywane lokalnie; krótkie ujęcia w tle odtwarzają się lokalnie. Pełny odtwarzacz YouTube w trybie rozszerzonej prywatności jest ładowany dopiero po kliknięciu przycisku filmu. Wtedy nawiązywane jest połączenie z YouTube; można również wybrać wersję lokalną.','Links to YouTube and social profiles lead to separate services. Their data policies apply when you visit them. Fonts, images and films in this version are hosted locally; short background clips play locally. The full YouTube player uses privacy-enhanced mode and is loaded only after you click a film button. This connects to YouTube; a local version is also available.')}</p><h2>${t('Dokument źródłowy','Source document')}</h2><p>${t('Pełną dotychczasową politykę prywatności z przekazanego eksportu znajdziesz poniżej. Dokument jest w języku polskim i wymaga przeglądu przed publikacją zmienionej strony.','The full existing privacy policy from the supplied export is linked below. It is in Polish and needs review before the updated website is published.')}</p><p><a href="${asset('documents/privacy-policy-pl.html')}">${t('Otwórz dotychczasową politykę prywatności (PL)','Open the existing privacy policy (Polish)')}</a></p></section>`;
  }
  const titles = {home:t('Portfolio','Portfolio'),murals:t('Murale','Murals'),interiors:t('Wnętrza','Interiors'),paintings:t('Malarstwo','Paintings'),contact:t('Kontakt','Contact'),privacy:t('Polityka prywatności','Privacy policy')};
  document.documentElement.lang = lang;
  document.title = (page.startsWith('detail:') ? text([...AOM.murals,...AOM.paintings].find(x=>x.id===page.slice(7))?.title)||'Art of Meaning' : titles[page]) + ' — Art of Meaning';
  const description = t('Art of Meaning by Magdalena Babicka — autorskie murale, obrazy i projektowanie wnętrz.','Art of Meaning by Magdalena Babicka — original murals, paintings and interior design.');
  document.querySelector('meta[name="description"]').content = description;
  const renderers = {home,murals,interiors,paintings,contact,privacy};
  document.getElementById('app').innerHTML = header()+`<main id="main">${page.startsWith('detail:')?detail(page.slice(7)):(renderers[page]||home)()}${activationPanel()}</main>`+footer()+`<dialog class="art-dialog" id="media-dialog" aria-labelledby="dialog-title"><button type="button" class="dialog-close" aria-label="${t('Zamknij','Close')}">×</button><div id="dialog-content"></div></dialog>`;
  const menuButton=document.querySelector('.menu-toggle');
  const mainNav=document.getElementById('main-nav');
  function closeMenu(){mainNav.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent=t('Menu','Menu');}
  menuButton.addEventListener('click',()=>{const open=mainNav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?t('Zamknij','Close'):t('Menu','Menu');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mainNav.classList.contains('is-open')){closeMenu();menuButton.focus();}});
  document.addEventListener('click',e=>{if(!mainNav.contains(e.target)&&!menuButton.contains(e.target))closeMenu();});
  mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.background-video').forEach(video=>{
    const section=video.closest('section');const pause=section.querySelector('.video-pause');const sound=section.querySelector('.video-sound');
    function update(){pause.textContent=video.paused?'▷':'Ⅱ';pause.setAttribute('aria-label',video.paused?t('Odtwórz film','Play video'):t('Wstrzymaj film','Pause video'));}
    if(reduced.matches){video.autoplay=false;video.pause();}
    pause.addEventListener('click',()=>{if(video.paused)video.play().catch(()=>update());else video.pause();});
    sound.addEventListener('click',()=>{video.muted=!video.muted;sound.setAttribute('aria-pressed',String(!video.muted));sound.setAttribute('aria-label',video.muted?t('Włącz dźwięk','Unmute video'):t('Wyłącz dźwięk','Mute video'));sound.textContent=video.muted?'♪':'♫';});
    video.addEventListener('play',update);video.addEventListener('pause',update);update();
  });
  const artCards=[...document.querySelectorAll('.art-card')];let artFilter='all',allArt=false;
  function filterArt(){let count=0;for(const card of artCards){const match=artFilter==='all'||card.dataset.status===artFilter;card.hidden=!match||(!allArt&&artFilter==='all'&&count>=4);if(match)count++;}const more=document.getElementById('more-art');if(more)more.closest('.collection-more').hidden=allArt||artFilter!=='all'||count<=4;const empty=document.getElementById('art-empty');if(empty)empty.hidden=count>0;}
  document.querySelectorAll('[data-art-filter]').forEach(button=>button.addEventListener('click',()=>{artFilter=button.dataset.artFilter;document.querySelectorAll('[data-art-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));filterArt();}));
  document.getElementById('more-art')?.addEventListener('click',()=>{allArt=true;filterArt();});filterArt();
  let interiorFilter='all',allInteriors=false;
  function renderInteriors(){const grid=document.querySelector('.interior-grid');if(!grid)return;const items=AOM.interiors.filter(p=>interiorFilter==='all'||p.type===interiorFilter);grid.innerHTML=(allInteriors||interiorFilter!=='all'?items:items.slice(0,2)).map(interiorCard).join('')+(interiorFilter==='all'&&!allInteriors?`<article class="future"><span aria-hidden="true">＋</span><h3>${t('Nowe realizacje','New projects')}</h3><p>${t('Miejsce na kolejne przestrzenie','Room for new spaces')}</p></article><article class="future"><span aria-hidden="true">＋</span><h3>${t('Kolejne historie','More stories')}</h3><p>${t('Portfolio w rozwoju','An evolving portfolio')}</p></article>`:'');document.getElementById('more-interiors').closest('.collection-more').hidden=allInteriors||interiorFilter!=='all';}
  document.querySelectorAll('[data-interior-filter]').forEach(button=>button.addEventListener('click',()=>{interiorFilter=button.dataset.interiorFilter;document.querySelectorAll('[data-interior-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));renderInteriors();}));
  document.getElementById('more-interiors')?.addEventListener('click',()=>{allInteriors=true;renderInteriors();});
  const comparison=document.getElementById('comparison-range');comparison?.addEventListener('input',()=>{comparison.closest('.comparison').style.setProperty('--position',comparison.value+'%');comparison.setAttribute('aria-valuetext',comparison.value+'%');});
  const dialog=document.getElementById('media-dialog');let opener=null;
  let resumeVideos=[];
  function openDialog(content,button){resumeVideos=[...document.querySelectorAll('.background-video')].filter(v=>!v.paused);resumeVideos.forEach(v=>v.pause());opener=button;document.getElementById('dialog-content').innerHTML=content;dialog.showModal();dialog.querySelector('.dialog-close').focus();}
  function closeDialog(){dialog.close();}
  dialog.querySelector('.dialog-close').addEventListener('click',closeDialog);
  dialog.addEventListener('close',()=>{dialog.querySelectorAll('video').forEach(v=>v.pause());document.getElementById('dialog-content').replaceChildren();resumeVideos.forEach(v=>v.play().catch(()=>{}));resumeVideos=[];opener?.focus();});
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();}});
  document.addEventListener('click',event=>{
    const localButton=event.target.closest('[data-local-video]');
    if(localButton){
      const m=AOM.murals.find(m=>m.id===localButton.dataset.localVideo);if(!m)return;
      const player=dialog.querySelector('.youtube-player');
      player.innerHTML=`<video controls autoplay playsinline tabindex="0" aria-label="${esc(text(m.title))}" poster="${asset('videos/'+m.video+'-poster-00001.jpg')}"><source src="${asset('videos/'+m.video+'.mp4')}" type="video/mp4"></video>`;
      localButton.hidden=true;player.querySelector('video').focus();return;
    }
    const videoButton=event.target.closest('.video-open');
    if(videoButton){
      const m=AOM.murals.find(m=>m.id===videoButton.dataset.mural);if(!m)return;
      const id=new URL(m.youtube).searchParams.get('v');
      openDialog(`<div class="film-dialog"><h2 id="dialog-title">${esc(text(m.title))}</h2><div class="youtube-player"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&playsinline=1&rel=0&hl=${lang}" title="${esc(text(m.title))} — YouTube" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><div class="film-options"><a class="arrow-link" href="${esc(m.youtube)}" target="_blank" rel="noopener noreferrer">${t('Otwórz na YouTube','Open on YouTube')} <span aria-hidden="true">→</span></a><button type="button" class="arrow-link" data-local-video="${m.id}">${t('Odtwórz wersję lokalną','Play local version')} →</button></div></div>`,videoButton);return;
    }
    const interiorButton=event.target.closest('.interior-open');if(interiorButton){const p=AOM.interiors.find(x=>x.id===interiorButton.dataset.id);openDialog(`<div class="dialog-grid">${img(p.image,text(p.title))}<div>${eyebrow(t('Koncepcja / wizualizacja','Concept / visualisation'))}<h2 id="dialog-title">${esc(text(p.title))}</h2><p>${t('Autorska koncepcja wnętrza z przekazanych materiałów Art of Meaning.','An original interior concept by Art of Meaning.')}</p>${link('kontakt.html?project=interior',t('Porozmawiajmy o Twoim wnętrzu','Discuss your interior project'))}</div></div>`,interiorButton);}
  });
  const form=document.getElementById('contact-form');
  if(form){
    const params=new URL(location.href).searchParams;const artwork=params.get('artwork');const project=params.get('project');
    if(project&&['mural','painting','interior','consultation'].includes(project))form.elements.project.value=project;
    if(artwork)form.elements.message.value=t('Interesuje mnie praca: ','I am interested in: ')+artwork.slice(0,250);
    form.querySelectorAll('input,select,textarea').forEach(field=>{
      field.addEventListener('invalid',()=>{if(field.validity.valueMissing)field.setCustomValidity(t('Uzupełnij to pole.','Please complete this field.'));else if(field.validity.typeMismatch)field.setCustomValidity(t('Podaj poprawny adres e-mail.','Please enter a valid email address.'));});
      field.addEventListener('input',()=>{field.setCustomValidity('');document.getElementById('form-status').replaceChildren();});
    });
    form.addEventListener('submit',async event=>{
      event.preventDefault();
      if(form.dataset.sending==='true')return;
      for(const name of ['firstName','message']){
        if(!form.elements[name].value.trim())form.elements[name].setCustomValidity(t('Uzupełnij to pole.','Please complete this field.'));
      }
      if(!form.reportValidity())return;
      const status=document.getElementById('form-status');
      status.replaceChildren();
      status.dataset.state='pending';
      const submitButton=form.querySelector('button[type="submit"]');
      const originalButton=submitButton.innerHTML;
      const data=new FormData(form);
      const payload={
        language:lang,
        name:[data.get('firstName'),data.get('lastName')].filter(Boolean).map(v=>String(v).trim()).join(' '),
        email:String(data.get('email')).trim(),
        company:String(data.get('company')||'').trim(),
        project:form.elements.project.selectedOptions[0].textContent,
        location:String(data.get('location')||'').trim(),
        budget:String(data.get('budget')||'').trim(),
        message:String(data.get('message')).trim(),
        _subject:'Art of Meaning — '+form.elements.project.selectedOptions[0].textContent,
        _template:'table',
        _captcha:'false',
        _honey:String(data.get('_honey')||'')
      };
      if(payload._honey){status.textContent=t('Nie udało się wysłać wiadomości. Napisz bezpośrednio na contact@artofmeaning.art.','The message could not be sent. Please email contact@artofmeaning.art directly.');return;}
      form.dataset.sending='true';
      form.setAttribute('aria-busy','true');
      submitButton.disabled=true;
      submitButton.textContent=t('Wysyłanie…','Sending…');
      const controller=new AbortController();
      const timer=setTimeout(()=>controller.abort(),20000);
      try{
        const response=await fetch(AOM.contact.endpoint,{
          method:'POST',
          headers:{'Content-Type':'application/json','Accept':'application/json'},
          body:JSON.stringify(payload),
          signal:controller.signal,
          credentials:'omit'
        });
        const result=await response.json();
        if(!response.ok || ![true,'true'].includes(result.success))throw new Error('Submission not accepted');
        status.dataset.state='accepted';
        status.textContent=t('Dziękuję. Zgłoszenie zostało przyjęte do wysyłki. Odpowiem na podany adres e-mail.','Thank you. Your enquiry has been accepted for sending. I will reply to the email address you provided.');
        form.reset();
      }catch(error){
        status.dataset.state='error';
        status.textContent=error.name==='AbortError'
          ?t('Usługa nie potwierdziła wysyłki w wymaganym czasie. Zachowałam treść formularza. ','The sending service did not confirm in time. Your form contents have been kept. ')
          :t('Nie udało się potwierdzić wysyłki. Zachowałam treść formularza. ','Sending could not be confirmed. Your form contents have been kept. ');
        const a=document.createElement('a');
        a.href='mailto:'+AOM.email;
        a.textContent=t('Napisz bezpośrednio: ','Email directly: ')+AOM.email;
        status.append(a);
      }finally{
        clearTimeout(timer);
        form.dataset.sending='false';
        form.removeAttribute('aria-busy');
        submitButton.disabled=false;
        submitButton.innerHTML=originalButton;
      }
    });
  }
})();
