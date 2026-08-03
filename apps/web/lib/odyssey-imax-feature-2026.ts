import type { Article, Author, Tag } from "@/lib/types";

type BuildOdysseyImaxArticleArgs = {
  authors: Author[];
  topics: Tag[];
  brands: Tag[];
};

type OdysseyRecord = Omit<Article, "author" | "tags"> & {
  tagSlugs: string[];
};

function bySlug<T extends { slug: string }>(items: T[], slug: string) {
  const item = items.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing content term: ${slug}`);
  return item;
}

const odysseyRecord: OdysseyRecord = {
  "id": "editorial-august3-odyssey-imax",
  "slug": "christopher-nolan-the-odyssey-imax-film-camera-breakthrough",
  "format": "opinion",
  "title": "The Mechanical Myth: How Christopher Nolan's The Odyssey Tamed the IMAX Beast",
  "seo": {
    "title": "How The Odyssey Became the First Film Shot Entirely on IMAX Film",
    "description": "Christopher Nolan shot The Odyssey entirely with IMAX film cameras. Here is how the Keighley camera, sound blimp and three-minute reels changed filmmaking."
  },
  "subhead": "From three-strip Technicolor to The Dark Knight and The Odyssey, cinema has repeatedly forced hostile machines to serve human imagination. Nolan's latest film turns IMAX from an action format into a complete dramatic language.",
  "excerpt": "From three-strip Technicolor to The Dark Knight and The Odyssey, cinema has repeatedly forced hostile machines to serve human imagination. Nolan's latest film turns IMAX from an action format into a complete dramatic language.",
  "whyItMatters": "The Odyssey turns a specialised large-format camera into a complete dramatic tool, preserving a difficult branch of film craft while exposing how much cinema still depends on engineers, laboratories, projectionists and physical infrastructure.",
  "body": [
    "When Dorothy Gale opened the farmhouse door in The Wizard of Oz and stepped from sepia Kansas into the colour of Oz, cinema appeared to change species.",
    "The transition still works because it is not merely decorative. The image seems to expand emotionally before the screen has physically grown. Reds become redder, greens become stranger, and the yellow brick road announces that reality has surrendered to myth.",
    "Behind that magic sat an ungainly industrial system. Three-strip Technicolor split incoming light through a beam-splitting prism and recorded separate colour information onto three black-and-white film strips. The process needed bulky equipment, careful registration and tremendous amounts of light because the film stock was slow.",
    "The camera was not a graceful extension of the human eye. It was a machine that had to be persuaded, fed and controlled.",
    "Nearly nine decades later, Christopher Nolan and cinematographer Hoyte van Hoytema confronted another machine that had earned a reputation for hostility: the 15-perforation IMAX film camera.",
    "The Odyssey, released on 17 July 2026, is the first feature film captured entirely with IMAX film cameras. That achievement matters because previous narrative productions generally treated IMAX as a special-event format for selected sequences. It could photograph a bank robbery, an aerial battle, an atomic test or a collapsing city with extraordinary scale. It was much less cooperative when two actors needed to sit close together and speak quietly.",
    "Nolan did not simply choose a larger negative for The Odyssey. He helped turn a specialised spectacle machine into a camera system capable of carrying an entire dramatic film.",
    "That is the real story.",
    "[[media:video-01-official-trailer]]",
    "## The visual evolution: 1939, 2008 and 2026",
    "The history can be reduced to three moments, provided we remember that neat timelines hide decades of engineering work.",
    "### 1939: Colour becomes a world",
    "Three-strip Technicolor did not invent colour cinema, and The Wizard of Oz was not the first film to use the process. It became one of the clearest demonstrations of what the system could do when colour was treated as storytelling rather than surface decoration.",
    "The camera separated light into colour records. Technicolor's laboratory process later used those records to create richly controlled dye-transfer prints. The result was not neutral realism. It was a designed colour reality with extraordinary saturation and stability.",
    "The machine demanded sacrifice from the production. Sets needed intense illumination. Camera movement required heavy support. Cost and complexity limited who could use the process.",
    "Hollywood accepted those penalties because audiences could see the reward.",
    "### 2008: IMAX enters mainstream narrative cinema",
    "Nolan's The Dark Knight used IMAX film cameras for roughly 28 minutes of its finished running time.",
    "The choice was radical for a mainstream dramatic feature. IMAX cameras were strongly associated with documentaries, museums and speciality presentations. They were large, loud and expensive to operate. Film magazines ran for only a few minutes, and the equipment was not designed around the rhythms of conventional dialogue coverage.",
    "Nolan and cinematographer Wally Pfister used the format where its strengths were most visible, including the opening bank robbery and large action sequences.",
    "The result changed audience expectations. When the image expanded in a true IMAX auditorium, the format shift became part of the drama.",
    "The compromise remained visible. The production still moved between IMAX and smaller film formats because an entire feature seemed impractical.",
    "### 2026: IMAX becomes the whole language",
    "The Odyssey removes that division.",
    "Every scene was captured with an IMAX film camera, including dramatic interactions that would once have been avoided or rebuilt around another camera system.",
    "This is more than a claim about image size. It means the production had to solve sound, movement, heat, eyelines, loading, focus, physical support and workflow at the scale of a complete feature.",
    "The monster was not eliminated.",
    "It was trained.",
    "[[media:image-02-technicolor-camera]]",
    "[[media:image-03-evolution-timeline]]",
    "## What an IMAX film camera is actually doing",
    "The phrase 70mm IMAX camera is widely used and understandable. The more precise capture term is 15-perforation 65mm IMAX film.",
    "The camera negative is 65mm wide. A projection print is commonly described as 70mm because the print format uses additional width beyond the photographed image area.",
    "A conventional 65mm motion-picture camera normally moves film vertically through the gate, exposing a frame five perforations high.",
    "An IMAX film camera turns the geometry sideways.",
    "The stock travels horizontally, and each frame stretches across 15 perforations. That produces an image area far larger than conventional 35mm and significantly larger than five-perforation 65mm capture.",
    "At 24 frames per second, the transport moves roughly 5.6 feet of film every second.",
    "That movement is the source of both the format's image quality and many of its practical problems.",
    "A large frame can record extremely fine spatial detail when the lens, stock, focus, exposure and processing all cooperate. It also requires the camera to start, stabilise and stop a broad strip of film at extraordinary speed, frame after frame.",
    "The camera cannot politely glide the film past the lens. It must pull, register, expose and advance each frame with mechanical precision.",
    "That process makes noise.",
    "A lot of it.",
    "[[media:image-04-film-transport]]",
    "## The roar of the machine",
    "An ordinary digital cinema camera can be made quiet enough that actors hear little beyond fans and normal set movement.",
    "A traditional IMAX film camera contains a high-speed mechanical transport moving a very large strip of film. The sound has been compared to an aggressive lawn mower, a vacuum cleaner and a small engine having an argument with its enclosure.",
    "For action scenes, the noise can be managed. Dialogue can be replaced later through automated dialogue replacement, often called ADR. Microphones can be positioned carefully. Loud environments can mask the mechanism.",
    "Intimate drama is less forgiving.",
    "An actor whispering three feet from another actor cannot compete naturally with a machine roaring beside the lens. The production can replace the dialogue later, but Nolan strongly prefers capturing performance and sound together when possible.",
    "That preference created the central engineering challenge of The Odyssey.",
    "How do you silence a machine whose basic photographic process is mechanical violence?",
    "You do not make it silent.",
    "You isolate it.",
    "## The Keighley camera and the blimp",
    "IMAX developed a next-generation camera called the Keighley, named for longtime IMAX quality leaders David and Patricia Keighley.",
    "The Keighley is part of a wider effort to modernise IMAX film production. It is lighter, quieter and more operationally advanced than previous models, while retaining 15-perforation 65mm capture.",
    "The camera alone did not solve every dialogue problem.",
    "The production also used a purpose-built acoustic enclosure known as a blimp. A camera blimp is a sound-insulated housing designed to keep mechanical noise away from microphones.",
    "The principle is old. The scale here was not.",
    "The combined assembly has been reported at approximately 300 pounds. It required strengthened support, careful movement and constant attention to heat. Sound insulation wants a sealed box. A working camera produces heat. Film, electronics and mechanical components prefer controlled temperatures.",
    "The enclosure therefore had to reduce sound without turning the camera into an oven or making ordinary operation impossible.",
    "IMAX describes the result as a breakthrough that enabled synchronised dialogue to be recorded on IMAX film at feature scale.",
    "The wording matters.",
    "The achievement was not that the camera became delicate. The achievement was that the camera's hostility became manageable enough for actors to perform through it.",
    "[[media:video-02-imax-featurette]]",
    "[[media:image-05-keighley-blimp-cutaway]]",
    "## The three-minute clock",
    "A standard 1,000-foot IMAX magazine provides roughly two and a half to three minutes of continuous shooting at 24 frames per second.",
    "That is not much time for drama.",
    "A conventional production can let a digital camera run through rehearsal, improvisation and several emotional beats. Storage is not free, but the operator is not watching physical film vanish at more than five feet per second.",
    "On The Odyssey, every take carried a visible limit.",
    "Actors knew the reel would end. Camera assistants needed to prepare magazines and reload. Nolan had to plan dialogue and action around a machine that could not continue indefinitely.",
    "The restriction can sound artistically romantic after the fact. On set, it creates real pressure.",
    "A failed focus pull consumes film. A delayed cue consumes film. A costume issue consumes film. A horse deciding that Homer's epic should pause for personal reasons consumes film.",
    "The production reportedly exposed more than two million feet of film across its shoot.",
    "That number should not be confused with the release print. It represents the raw material captured across takes, angles, tests and alternate performances.",
    "It also reveals the scale of the industrial system supporting the film: Kodak manufacturing stock, laboratories processing negative, assistants handling magazines, editors tracking material, technicians maintaining cameras and specialists preparing prints.",
    "Digital filmmaking hides much of its infrastructure inside data centres, storage arrays and software.",
    "Film places part of the cost in your hands and lets you watch it leave the magazine.",
    "[[media:image-06-three-minute-clock]]",
    "## When the solution creates another problem",
    "The blimp reduced noise, but its physical size interfered with one of cinema's simplest requirements: actors looking at each other.",
    "Place a very large camera enclosure between two performers and their natural eyelines move too far from the lens. The audience can feel the separation even when it cannot identify the cause.",
    "The production's answer was a mirror system.",
    "Actors could look toward a reflected scene partner while the camera maintained the required position. The arrangement worked like a sideways periscope, restoring a believable relationship between gaze and lens.",
    "This is a beautiful example of filmmaking engineering because the final result should not draw attention to itself.",
    "The audience sees two people in a scene.",
    "Behind the image sits a 300-pound camera system, acoustic insulation, reinforced support and mirrors carefully redirecting human attention around a box.",
    "The technology succeeds by disappearing.",
    "[[media:image-07-mirror-eyeline]]",
    "## Why The Dark Knight was the necessary first battle",
    "The Odyssey did not arrive as a sudden act of technical bravery.",
    "Nolan's relationship with IMAX film developed across nearly two decades.",
    "The Dark Knight demonstrated that a mainstream narrative audience would notice and value the format. Later films expanded its use. Interstellar brought it into cosmic scale and intimate family drama. Dunkirk used IMAX to create physical immediacy. Tenet pushed complicated action and location photography. Oppenheimer placed faces, scientific ideas and quiet moral tension inside the format, including newly developed black-and-white IMAX film stock.",
    "Each production exposed another weakness and created another tool.",
    "Lenses were modified for close focus. Camera bodies were mounted in unusual positions. Film stock and processing workflows evolved. Projection limits were tested. Crews learned how to move the equipment through aircraft, water, streets and confined sets.",
    "The Odyssey is the point at which those experiments became a complete capture strategy.",
    "This is why the historical arc matters more than a resolution number.",
    "Nolan did not prove that one film frame contains a magical quantity of digital pixels.",
    "He helped prove that IMAX film cameras could carry spectacle, dialogue, faces, movement and quietness across an entire feature.",
    "## The Technicolor comparison, with the romance removed",
    "Comparing The Odyssey to The Wizard of Oz is useful if we avoid pretending the technologies are equivalent.",
    "Three-strip Technicolor solved colour separation and reproduction at a moment when dependable full-colour production remained complex.",
    "IMAX 15-perf film solves a different problem: how to capture an exceptionally large image area and project it at monumental scale.",
    "The shared pattern is human stubbornness.",
    "Both systems imposed costs that appeared unreasonable from an efficiency perspective.",
    "They needed specialist equipment, trained crews, careful exposure, laboratories and presentation systems. Each could be replaced by a cheaper or simpler process for most productions.",
    "Filmmakers accepted the burden because the medium created a specific emotional effect.",
    "Technicolor could turn colour into myth.",
    "IMAX can turn scale into physical presence.",
    "That does not mean every film needs either format.",
    "It means cinema sometimes advances when an artist finds a story large enough to justify an inconvenient machine.",
    "[[media:video-03-cast-director-interview]]",
    "## Film versus digital is the wrong cage fight",
    "The most overheated version of this story claims that film is real and digital is fake.",
    "That argument collapses quickly.",
    "Digital cameras record real light. Film images can include visual effects, compositing and extensive manipulation. Both media pass through lenses, exposure decisions, colour work, editing and presentation systems.",
    "An IMAX film print is not a transparent window onto ancient Greece.",
    "It is a constructed cinematic image.",
    "The meaningful differences concern texture, workflow and presentation.",
    "Large-format film offers:",
    "- A very large negative area",
    "- Fine detail under good conditions",
    "- Subtle grain structure",
    "- Photochemical colour characteristics",
    "- Strong highlight behaviour",
    "- A physical original that can be archived",
    "- A distinctive discipline during production",
    "- A spectacular experience when projected from a well-prepared film print",
    "Digital capture offers:",
    "- Longer recording times",
    "- Immediate monitoring",
    "- Smaller and quieter cameras",
    "- Greater low-light flexibility",
    "- Faster iteration",
    "- Lower stock and processing costs",
    "- Easier integration with digital visual-effects pipelines",
    "- More accessible production and distribution",
    "Neither list produces a universal winner.",
    "The Odyssey matters because Nolan selected the more difficult system for reasons connected to the experience he wanted, then helped remove one of the system's oldest limitations.",
    "That is more interesting than claiming digital sensors have been defeated in combat.",
    "## What does IMAX film resolution really mean?",
    "Film does not contain pixels.",
    "For a precise definition of the digital term being borrowed here, read the tecMAMBO [resolution glossary](/glossary/resolution). It helps explain why one K-value cannot describe every stage of an analogue film chain.",
    "When people describe 15-perf IMAX as 14K, 16K or 18K equivalent, they are translating analogue detail into a digital vocabulary.",
    "The result depends on:",
    "- Film stock",
    "- Lens sharpness",
    "- Focus accuracy",
    "- Exposure",
    "- Camera stability",
    "- Processing",
    "- Scanner",
    "- Print generation",
    "- Projector alignment",
    "- Screen size",
    "- Viewing distance",
    "- The contrast level used to define resolved detail",
    "A theoretical estimate is not the same as what every audience member sees.",
    "The strongest case for IMAX film is experiential rather than numerical.",
    "A well-exposed frame projected through a properly maintained 15/70 system can fill a giant 1.43:1 screen with detail, colour and a sense of depth that feels unusually immediate.",
    "The image reaches into peripheral vision. Fine grain becomes difficult to notice at normal viewing distance. Faces can become landscapes, and landscapes can become environments.",
    "That is the practical meaning of the format.",
    "A number printed with a K is merely the internet's preferred way of turning awe into a specification contest.",
    "[[media:image-08-capture-presentation-formats]]",
    "## The cruel truth: most viewers will not see the complete format",
    "The Odyssey was captured entirely on IMAX film, but only a limited number of cinemas can project 15-perforation IMAX 70mm prints.",
    "The projectors are enormous, mechanically complicated and increasingly rare. They need trained projectionists, replacement parts, careful alignment and dedicated maintenance.",
    "A release print is itself a massive physical object.",
    "Many audiences will see The Odyssey through digital IMAX, standard 70mm, conventional digital cinema or later home formats.",
    "Those versions can still look excellent. They do not reproduce the full 1.43:1 film presentation available in a true 15/70 auditorium.",
    "For the home end of that presentation chain, tecMAMBO's [Mini LED television explainer](/explainers/samsung-2026-mini-led-vision-ai-tv-kenya-m80h) shows why brightness, local dimming and viewing conditions matter as much as a display label.",
    "This creates an odd tension.",
    "Nolan and IMAX expanded what the capture system can do just as the projection system remains scarce.",
    "The engineering achievement may therefore matter more for future filmmakers than the number of people who experience its purest version today.",
    "If the film's success persuades IMAX and theatre operators to maintain, restore or expand large-format presentation, The Odyssey will have affected infrastructure as well as production.",
    "If not, it risks becoming a masterpiece of capture compressed into formats built for convenience.",
    "## Why this matters in an AI-saturated media culture",
    "The Odyssey arrives while much of the technology industry is promising synthetic abundance.",
    "Images can be generated instantly. Worlds can be extended through software. Faces, voices and environments can be fabricated at increasing speed.",
    "Nolan's production represents the opposite economic and creative instinct.",
    "It uses scarce material, heavy machines, real locations, trained specialists and a process that punishes carelessness.",
    "That does not make it morally superior.",
    "Expensive physical production can be wasteful. Practical methods can become marketing mythology. Digital tools can enable extraordinary artistry, accessibility and creative freedom.",
    "The importance lies in preserving more than one way to make images.",
    "A healthy cinema culture should contain efficient digital production, experimental virtual filmmaking, animation, visual effects and difficult photochemical craft.",
    "The danger is not AI itself.",
    "Our analysis of [Meta Muse Image and public Instagram posts](/explainers/meta-muse-image-instagram-opt-out-privacy) examines the consent and control questions created when generated imagery enters everyday media.",
    "The danger is a future in which every image is produced through the same optimised pipeline because alternative skills and infrastructure were allowed to disappear.",
    "The Odyssey keeps one demanding branch of cinema alive by giving it a commercially undeniable reason to exist.",
    "## The hidden network behind the auteur",
    "Nolan is the recognisable name, but the achievement belongs to a technical network.",
    "It includes:",
    "- Hoyte van Hoytema and the camera department",
    "- IMAX engineers",
    "- David and Patricia Keighley's decades of quality work",
    "- Kodak's film manufacturing",
    "- Panavision's optical engineering",
    "- FotoKem's laboratory and print work",
    "- Camera assistants loading short magazines",
    "- Grips moving and supporting the rigs",
    "- Sound teams working around the camera",
    "- Performers adapting to strict timing and physical machinery",
    "- Projectionists maintaining rare film systems",
    "Calling the film a triumph of one director's will is narratively satisfying and technically incomplete.",
    "The machine was tamed by an ecosystem.",
    "That distinction matters because craft survives through institutions, apprenticeships and supply chains, not inspiration alone.",
    "A director can demand film.",
    "The same infrastructure lesson appears in [the VLC preservation story](/explainers/vlc-free-software-story-money-is-jail): cultural tools survive because people, institutions and maintenance practices remain in place, not because a format is automatically permanent.",
    "Someone must still know how to make, process, cut and project it.",
    "[[media:image-09-behind-scenes]]",
    "[[media:video-04-technical-interview]]",
    "## Did The Odyssey change cinema forever?",
    "The phrase is tempting and impossible to prove in the present tense.",
    "Most films will not move to 15-perf IMAX capture. The cameras remain rare. Film stock and processing are expensive. The magazines remain short. The projection network is limited. Many stories gain nothing from the format.",
    "The breakthrough is narrower and more credible.",
    "The Odyssey expanded the range of scenes that filmmakers can practically capture with IMAX film cameras.",
    "Before the Keighley and blimp workflow, the format's noise made sustained synchronised dialogue exceptionally difficult. After this production, another filmmaker can approach IMAX knowing that intimate dramatic scenes are possible, provided the budget, crew and physical setup can support them.",
    "That is how cinema usually changes.",
    "Not every production adopts the invention.",
    "The boundary of what can be attempted moves.",
    "## How to choose a screening format",
    "The ideal order depends on what is available locally.",
    "### 1. IMAX 70mm film in a 1.43:1 auditorium",
    "This is the fullest version of the intended large-format presentation.",
    "### 2. Dual-laser IMAX capable of 1.43:1",
    "A strong digital option that can preserve the tall image area when the venue and supplied version support it.",
    "### 3. Standard 70mm film",
    "This retains photochemical projection but uses a different frame format and presentation geometry.",
    "### 4. High-quality digital IMAX",
    "Screen size, sound, projector generation and local maintenance can vary significantly.",
    "### 5. A well-run conventional premium cinema",
    "A bright, properly focused projector with good sound can beat a poorly maintained screen carrying a famous label.",
    "The theatre matters.",
    "Check the screen's aspect ratio, projection type and reputation rather than assuming every IMAX sign represents the same system.",
    "## The tecMAMBO take",
    "The Odyssey is not important because film has defeated digital or because one frame can be converted into the largest resolution number.",
    "It is important because a camera designed for overwhelming scale became capable of sustained human intimacy.",
    "The three-minute magazine still runs out. The film still races through the gate. The blimp remains enormous. The projectors remain rare.",
    "Nothing about the process became easy.",
    "Nolan, van Hoytema and IMAX made the difficulty expressive.",
    "That connects The Odyssey to the oldest pattern in cinema technology. Artists encounter a machine that appears too heavy, too hot, too loud, too expensive or too limited. They do not wait for the machine to become reasonable.",
    "They build a rig, alter the lens, add a mirror, reinforce the floor and teach the monster new manners.",
    "In 1939, the beast separated light into colour records and carried Dorothy into Oz.",
    "In 2008, it chased Batman through Chicago for 28 minutes.",
    "In 2026, it finally learned how to sit in a room and listen.",
    "[[media:image-10-closing]]",
    "[[media:video-05-technicolor-explainer]]"
  ],
  "publishedAt": "2026-08-03T13:22:00+03:00",
  "updatedAt": "2026-08-03T13:22:00+03:00",
  "readTime": "18 min read",
  "image": {
    "src": "/articles/imax-the-odyssey-2026-tecmambo.jpg",
    "alt": "Armoured Odysseus in a promotional image explaining that The Odyssey was shot with IMAX film cameras.",
    "credit": "IMAX",
    "width": 1040,
    "height": 520,
    "type": "image/jpeg"
  },
  "mediaSlots": [
    {
      "id": "image-01-hero",
      "type": "image",
      "status": "ready",
      "placement": "after-introduction",
      "caption": "From three-strip Technicolor to the Keighley IMAX camera, cinema's largest visual leaps have often begun with machines that resisted ordinary filmmaking.",
      "alt": "Armoured Odysseus in a promotional image explaining that The Odyssey was shot with IMAX film cameras.",
      "licensingNote": "Supplied for publication with attribution to IMAX.",
      "aspectRatio": "16:9",
      "src": "/articles/imax-the-odyssey-2026-tecmambo.jpg",
      "credit": "IMAX",
      "width": 1040,
      "height": 520
    },
    {
      "id": "video-01-official-trailer",
      "type": "youtube",
      "status": "ready",
      "placement": "after-introduction",
      "caption": "Universal Pictures' official trailer introduces Nolan's mythic epic and its large-format visual language.",
      "title": "The Odyssey official trailer",
      "url": "https://www.youtube.com/watch?v=Mzw2ttJD2qQ"
    },
    {
      "id": "image-02-technicolor-camera",
      "type": "image",
      "status": "placeholder",
      "placement": "after-visual-evolution-intro",
      "caption": "Three-strip Technicolor captured separate colour records through a beam-splitting optical system.",
      "alt": "Restored three-strip Technicolor camera mounted on a heavy studio dolly.",
      "licensingNote": "Prefer a licensed museum image from the Smithsonian National Museum of American History or George Eastman Museum. Confirm reuse rights before publishing.",
      "aspectRatio": "4:3"
    },
    {
      "id": "image-03-evolution-timeline",
      "type": "infographic",
      "status": "placeholder",
      "placement": "after-visual-evolution-section",
      "caption": "Three moments in cinema's continuing attempt to turn difficult machinery into expressive freedom.",
      "alt": "Timeline comparing three-strip Technicolor in 1939, partial IMAX capture in The Dark Knight in 2008 and complete IMAX film capture in The Odyssey in 2026.",
      "credit": "tecMAMBO",
      "licensingNote": "Produce as an original tecMAMBO infographic.",
      "aspectRatio": "16:9"
    },
    {
      "id": "image-04-film-transport",
      "type": "infographic",
      "status": "placeholder",
      "placement": "after-imax-transport-explanation",
      "caption": "IMAX uses 15-perforation 65mm film moving horizontally, creating a much larger frame than conventional vertical film formats.",
      "alt": "Diagram comparing horizontal 15-perforation IMAX 65mm film with vertical five-perforation 65mm and four-perforation 35mm film.",
      "credit": "tecMAMBO",
      "licensingNote": "Produce as an original technical diagram. Verify dimensions before publishing.",
      "aspectRatio": "16:9"
    },
    {
      "id": "video-02-imax-featurette",
      "type": "youtube",
      "status": "ready",
      "placement": "after-keighley-and-blimp",
      "caption": "IMAX and Universal show the Keighley camera, the blimp and the production work needed to use IMAX film throughout the feature.",
      "title": "The Odyssey completely in IMAX featurette",
      "url": "https://www.youtube.com/watch?v=pHE9kcQOfQE"
    },
    {
      "id": "image-05-keighley-blimp-cutaway",
      "type": "infographic",
      "status": "placeholder",
      "placement": "after-keighley-and-blimp",
      "caption": "The acoustic blimp reduced camera noise while creating new challenges around weight, cooling, movement and actor sightlines.",
      "alt": "Cutaway diagram of an IMAX Keighley camera inside a large sound-insulated blimp with airflow, film magazine and lens positions labelled.",
      "credit": "tecMAMBO",
      "licensingNote": "Produce as an original explanatory diagram based only on publicly documented features. Do not imply access to confidential engineering drawings.",
      "aspectRatio": "16:9"
    },
    {
      "id": "image-06-three-minute-clock",
      "type": "infographic",
      "status": "placeholder",
      "placement": "after-three-minute-clock",
      "caption": "A 1,000-foot IMAX magazine provides only a few minutes of capture, forcing every department to prepare before the camera rolls.",
      "alt": "Circular three-minute countdown surrounding a 1,000-foot IMAX film magazine and a film path moving at about 5.6 feet per second.",
      "credit": "tecMAMBO",
      "licensingNote": "Produce as an original tecMAMBO infographic.",
      "aspectRatio": "16:9"
    },
    {
      "id": "image-07-mirror-eyeline",
      "type": "infographic",
      "status": "placeholder",
      "placement": "after-mirror-system",
      "caption": "Mirrors allowed performers to maintain convincing eyelines even when the blimped IMAX camera occupied the physical space between them.",
      "alt": "Top-down diagram showing two actors, a large IMAX camera blimp and mirrors redirecting their sightlines around the enclosure.",
      "credit": "tecMAMBO",
      "licensingNote": "Produce as an original tecMAMBO explanatory diagram.",
      "aspectRatio": "16:9"
    },
    {
      "id": "video-03-cast-director-interview",
      "type": "youtube",
      "status": "ready",
      "placement": "after-technicolor-comparison",
      "caption": "The cast and director discuss the discipline, practical work and scale behind the production.",
      "title": "The Odyssey cast and Christopher Nolan discuss the filmmaking process",
      "url": "https://www.youtube.com/watch?v=9rO0FGivAvQ"
    },
    {
      "id": "image-08-capture-presentation-formats",
      "type": "infographic",
      "status": "placeholder",
      "placement": "after-resolution-section",
      "caption": "Shooting on IMAX film does not guarantee that every audience sees a 15/70 film print. Presentation format remains a major part of the experience.",
      "alt": "Comparison of 15-perforation 65mm camera capture, IMAX 70mm film projection, dual-laser digital IMAX and conventional digital cinema presentation.",
      "credit": "tecMAMBO",
      "licensingNote": "Produce as an original tecMAMBO comparison graphic. Avoid unsupported resolution equivalence claims.",
      "aspectRatio": "16:9"
    },
    {
      "id": "image-09-behind-scenes",
      "type": "image",
      "status": "placeholder",
      "placement": "after-hidden-network-section",
      "caption": "The all-IMAX production depended on camera crews, engineers, laboratories, optical specialists and projectionists as much as directorial ambition.",
      "alt": "Christopher Nolan and Hoyte van Hoytema working beside an IMAX film camera with crew members on set.",
      "licensingNote": "Use an official Universal Pictures, IMAX or authorised press image after confirming editorial usage rights.",
      "aspectRatio": "16:9"
    },
    {
      "id": "video-04-technical-interview",
      "type": "youtube",
      "status": "placeholder",
      "placement": "after-hidden-network-section",
      "caption": "Add an official IMAX, Kodak, ASC, Universal or reputable filmmaking publication video when selected.",
      "title": "Technical interview about the Keighley camera and IMAX production workflow"
    },
    {
      "id": "image-10-closing",
      "type": "image",
      "status": "placeholder",
      "placement": "before-faq",
      "caption": "Film remains valuable not because it is old, but because artists continue finding new things to demand from it.",
      "alt": "A strip of large-format film crossing a beam of projector light toward an empty cinema screen.",
      "credit": "tecMAMBO",
      "licensingNote": "Create an original editorial still life or licensed photograph.",
      "aspectRatio": "21:9"
    },
    {
      "id": "video-05-technicolor-explainer",
      "type": "youtube",
      "status": "placeholder",
      "placement": "before-faq",
      "caption": "Add a museum, archive or respected film-education explainer that accurately demonstrates the beam-splitting camera and dye-transfer process.",
      "title": "How three-strip Technicolor worked"
    }
  ],
  "tagSlugs": [
    "christopher-nolan",
    "the-odyssey",
    "imax",
    "hoyte-van-hoytema",
    "film-cameras",
    "70mm-film",
    "cinema-technology",
    "technicolor",
    "entertainment",
    "film-technology",
    "cameras",
    "cinema"
  ],
  "faq": [
    {
      "question": "Was The Odyssey really shot entirely with IMAX film cameras?",
      "answer": "Yes. IMAX and the film's official materials describe The Odyssey as the first feature film captured entirely with IMAX film cameras."
    },
    {
      "question": "Is the camera film 65mm or 70mm?",
      "answer": "The camera captures on 65mm film. IMAX film projection prints are commonly described as 70mm. The phrase IMAX 70mm is widely used for the overall exhibition format, while 15-perf 65mm is the more precise capture description."
    },
    {
      "question": "Why are IMAX film cameras so loud?",
      "answer": "They move a very large frame of film horizontally through the gate at roughly 5.6 feet per second. The high-speed transport, registration and mechanical movement create substantial noise."
    },
    {
      "question": "How long can an IMAX film camera record continuously?",
      "answer": "A 1,000-foot magazine normally provides approximately two and a half to three minutes at 24 frames per second before it must be changed."
    },
    {
      "question": "What is the Keighley IMAX camera?",
      "answer": "The Keighley is IMAX's next-generation 15-perf 65mm film camera, named for David and Patricia Keighley. It was used on The Odyssey alongside other IMAX film cameras."
    },
    {
      "question": "What is an IMAX camera blimp?",
      "answer": "It is a large acoustically insulated enclosure placed around the camera to reduce mechanical noise reaching the microphones. The Odyssey's blimp helped make synchronised dialogue recording practical at feature scale."
    },
    {
      "question": "Why did the production need mirrors?",
      "answer": "The blimp was so large that it interfered with natural actor eyelines. A mirror system allowed performers to look toward reflected scene partners while the camera remained close to the correct visual axis."
    },
    {
      "question": "Did Nolan shoot more than two million feet of finished movie?",
      "answer": "No. The figure refers to raw film exposed during production across takes and setups. The finished film is a small fraction of that length."
    },
    {
      "question": "Is IMAX film really 18K?",
      "answer": "Film has no fixed pixel count. Digital-equivalent resolution estimates vary according to stock, lens, exposure, processing, scanning and measurement method. It is safer to discuss the large negative area and presentation quality than claim one universal K value."
    },
    {
      "question": "Is IMAX 70mm always better than digital IMAX?",
      "answer": "A well-presented IMAX 70mm print offers a distinctive large-format film experience. A poorly maintained film projection can still underperform a properly calibrated digital system. Venue quality, screen geometry, projection technology and maintenance all matter."
    }
  ],
  "sources": [
    {
      "label": "IMAX: The Odyssey official film page",
      "url": "https://www.imax.com/movie/the-odyssey"
    },
    {
      "label": "IMAX Corporation: The Odyssey opening and Keighley camera announcement",
      "url": "https://investors.imax.com/news-releases/news-release-details/christopher-nolans-odyssey-delivers-record-breaking-52-million"
    },
    {
      "label": "CBS News and 60 Minutes: Why Christopher Nolan shot The Odyssey entirely on IMAX film",
      "url": "https://www.cbsnews.com/news/why-christopher-nolan-shot-the-odyssey-entirely-on-imax-film-60-minutes/"
    },
    {
      "label": "Associated Press: The Odyssey by the numbers",
      "url": "https://apnews.com/article/8c1cf09a24c623098bfe220e28a4b92d"
    },
    {
      "label": "George Eastman Museum: Technicolor three-strip camera",
      "url": "https://www.eastman.org/technicolor/technology/three-strip-camera"
    },
    {
      "label": "George Eastman Museum: Technicolor's 1935 to 1955 period",
      "url": "https://www.eastman.org/technicolor/decades/1935-1955"
    },
    {
      "label": "Smithsonian: IMAX 1,000-foot film magazine",
      "url": "https://www.si.edu/object/magazine-displacement-imax%3Anasm_A20120258006"
    },
    {
      "label": "American Society of Cinematographers: IMAX and large-format production history",
      "url": "https://theasc.com/articles/dunkirk-wrangling-two-large-formats"
    },
    {
      "label": "Kodak: The Odyssey listed among productions shot on film",
      "url": "https://www.kodak.com/en/motion/page/shot-on-film/"
    },
    {
      "label": "RedShark News: Mirror system used around the IMAX blimp",
      "url": "https://www.redsharknews.com/the-odyssey-imax-camera-mirror-system"
    },
    {
      "label": "Universal Pictures official trailer on YouTube",
      "url": "https://www.youtube.com/watch?v=Mzw2ttJD2qQ"
    },
    {
      "label": "IMAX official trailer on YouTube",
      "url": "https://www.youtube.com/watch?v=iklicVKcoI8"
    },
    {
      "label": "IMAX production featurette on YouTube",
      "url": "https://www.youtube.com/watch?v=pHE9kcQOfQE"
    }
  ],
  "itemList": [
    "IMAX 70mm film in a 1.43:1 auditorium",
    "Dual-laser IMAX capable of 1.43:1",
    "Standard 70mm film",
    "High-quality digital IMAX",
    "A well-run conventional premium cinema"
  ],
  "publicationStatus": "publish",
  "editorialStatus": "published",
  "indexingStatus": "index",
  "contentFormat": "opinion",
  "hasOriginalPhotography": false
};

export function buildOdysseyImaxArticle({ authors, topics, brands }: BuildOdysseyImaxArticleArgs): Article {
  const terms = [...topics, ...brands];
  return {
    ...odysseyRecord,
    author: bySlug(authors, "tim-humphreys"),
    tags: odysseyRecord.tagSlugs.map((slug) => bySlug(terms, slug))
  };
}
