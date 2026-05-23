import type { Day } from '../types';

// Content source-of-truth: Disneyland_May_22_2026_The_Day.docx
// Narrative paragraphs are lifted/adapted from that document. Avengers Campus
// content is reconstructed from Dan's notes (Ant-Man + Iron Man meets, morning),
// since the doc did not cover it.
//
// Lands are ordered chronologically by firstVisitTime. Within each land,
// activities are listed in the order they happened, even if the family left and
// returned (per PRD §4 decision).

export const day: Day = {
  id: 'may-22-2026',
  date: 'Friday, May 22, 2026',
  title: 'The Day at Disneyland',
  intro:
    'This is a day that was planned for weeks and improvised for fourteen hours. It involved a retired Salesforce employee transferring tickets at exactly eight in the morning, a four-year-old who is the right height for almost everything for the first time, a closed Pirates of the Caribbean, a closed Buzz Lightyear, a Frozen princess, a Mickey Mouse who signs autographs, a Millennium Falcon that needed a gunner, a parade that ended with the family dancing behind it out the gates, and a fireworks show that never happened. It also involved hot dogs from Award Wieners, blue alien slushies, and the realization midway through the afternoon that they had somehow gotten ninety minutes ahead of schedule. This is the record of all of it.',
  closing:
    'Grayson rode sixteen rides, met three princesses and a mouse, drove a car, fired the guns of the Millennium Falcon, ate alien milk, danced out of a Disney park behind a parade of LED light, and went home before midnight in the back of a car with his eyes already closed. Three of the three top-tier priorities — Anna and Elsa, Radiator Springs Racers via Single Pass, Mickey at Mickey’s House — were completed before two in the afternoon. Everything that followed was a bonus. The fireworks didn’t run. The parade dance back to Main Street made up for it.',
  lands: [
    {
      id: 'cars-land',
      name: 'Cars Land',
      park: 'DCA',
      theme: 'cars',
      firstVisitTime: '8:30 AM',
      blurb:
        'California Adventure was practically empty at 8:30. Cars Land in the morning, lit by sunrise on the painted rocks of the Cadillac Range, is one of the most photogenic places in any Disney park — desert Route 66, neon, and a tractor towing a four-year-old in circles. Two rides, one family photo, and the first green-tier win of the day.',
      activities: [
        {
          id: 'cars-maters-jamboree',
          name: "Mater's Junkyard Jamboree",
          time: '8:30 AM',
          type: 'ride',
          priority: 'yellow',
          summary:
            'The spinning tractor ride, made for a kid whose favorite Cars character might be Mater himself.',
          narrative:
            'They went straight to Mater’s Junkyard Jamboree — the spinning tractor ride. Mater is one of Grayson’s two favorite Cars characters (the other being Lightning McQueen himself), and a ride where you sit in a small trailer being towed in circles by a singing tractor was made for him. He sat on the outside of the trailer, where the spin pulls hardest, and grinned the whole time.',
          details: [
            'Outside seat — where the spin pulls hardest',
            'Walked on; park nearly empty at 8:30 a.m.',
            'Grayson laughing the whole ride',
          ],
          photos: [],
        },
        {
          id: 'cars-rsr',
          name: 'Radiator Springs Racers',
          time: '9:05 AM',
          type: 'ride',
          priority: 'green',
          summary:
            'The headline. A Single Pass booked in the 8 a.m. ticket scramble — slow scenic first half, side-by-side desert race second half. "You are racing Lightning McQueen." They won.',
          narrative:
            'At 9:05 a.m., they walked across the Cars Land plaza to Radiator Springs Racers and entered through the Single Pass Lightning Lane line. The wait was effectively zero. Radiator Springs Racers is the centerpiece of Cars Land and arguably the best dark-ride-into-coaster transition in any Disney park. The first half is a slow track through Ornament Valley with Sally, Mater, Ramone, and Luigi; the second half is a side-by-side race with another car around the painted desert. Dan had told Grayson, on the walk over: "You are racing Lightning McQueen." Grayson took this literally. They won.',
          details: [
            'Booked via Single Pass during the 8:00 a.m. ticket scramble',
            'Return window: 9:05 a.m. — wait effectively zero',
            'Green-tier priority #1 of 3',
          ],
          photos: [],
        },
        {
          id: 'cars-mcqueen-mater-photo',
          name: 'McQueen & Mater Photo',
          time: '~9:00 AM',
          type: 'photo-op',
          priority: 'none',
          summary:
            'A Cars Land photographer caught a family shot near the Cadillac Range — which later made the formal McQueen meet redundant and freed up time.',
          narrative:
            'A photographer in Cars Land had taken a family shot near the Cadillac Range earlier in the morning. Having already gotten the McQueen-and-Mater photo opportunity made the formal McQueen meet redundant later — one of the small decisions that, added up, bought the family the early park hop and an unplanned trip to Galaxy’s Edge.',
          details: [
            'Shot near the Cadillac Range',
            'Made the later formal McQueen meet unnecessary',
          ],
          photos: [],
        },
      ],
    },
    {
      id: 'avengers-campus',
      name: 'Avengers Campus',
      park: 'DCA',
      theme: 'avengers',
      firstVisitTime: '9:30 AM',
      blurb:
        'Tucked into the morning between Cars Land and the Anna & Elsa meet, Avengers Campus was a quick super-hero detour. Industrial sci-fi architecture, a recruit-the-next-generation energy, and two character meets that a four-year-old will not soon forget.',
      activities: [
        {
          id: 'avengers-ant-man',
          name: 'Meeting Ant-Man',
          time: '~9:30 AM',
          type: 'meet',
          priority: 'none',
          summary:
            'Grayson met Ant-Man on the Avengers Campus grounds — a friendly, kid-sized introduction to a real Avenger.',
          narrative:
            'On the Avengers Campus grounds, Grayson met Ant-Man. The shrinking-and-growing hero is one of the more approachable Avengers for young kids, and the meet was relaxed and playful — exactly the right first super-hero handshake for a four-year-old.',
          details: ['Morning, before the Anna & Elsa meet'],
          photos: [],
        },
        {
          id: 'avengers-iron-man',
          name: 'Meeting Iron Man',
          time: '~9:40 AM',
          type: 'meet',
          priority: 'none',
          summary:
            'Then Iron Man — armor, repulsors, and all. A second hero meet to round out the Avengers Campus stop.',
          narrative:
            'A few steps later came Iron Man, in full armor. Between Ant-Man and Iron Man, the short Avengers Campus visit delivered two genuine super-hero meetings before the family moved on to Hollywood Land for the day’s top priority.',
          details: ['Morning, before the Anna & Elsa meet'],
          photos: [],
        },
      ],
    },
    {
      id: 'hollywood-land',
      name: 'Hollywood Land',
      park: 'DCA',
      theme: 'hollywood',
      firstVisitTime: '9:50 AM',
      blurb:
        'Art deco and marquee lights — home to the Animation Building, where the day’s top-tier priority lived. They arrived early, the line had not yet stretched, and by 10:00 a.m. the most important meet of the day was done. Later, on the way out of the park, Hollywood Land also served lunch.',
      activities: [
        {
          id: 'hollywood-anna-elsa',
          name: 'Anna & Elsa Royal Welcome',
          time: '9:50 AM',
          type: 'meet',
          priority: 'green',
          summary:
            'The top priority. A staged Arendelle parlor, Anna doing the talking, and Elsa leaning down to tell Grayson a secret about Olaf. The defining frame of the trip.',
          narrative:
            'They arrived at the Royal Welcome about fifteen minutes early, which at Disney character meets is exactly right. The meet itself is staged inside a small Arendelle-themed parlor — wooden beams, painted backdrop, soft lighting. Anna and Elsa appear together. Anna does most of the talking, asking what brought you to Arendelle today. Elsa stands beside her in the famous ice-blue dress and asks Grayson if he wanted to know a secret about Olaf. He nodded with the full gravity of a four-year-old being addressed by an actual queen. The photo from the meet — Grayson between Anna and Elsa, both leaning down to him, Elsa’s hand at his shoulder — is one of the trip’s defining frames.',
          details: [
            'Arrived ~15 minutes early',
            'Both princesses in one meet',
            'Elsa told Grayson a secret about Olaf',
            'Green-tier priority #2 of 3 — complete by 10:00 a.m.',
          ],
          photos: [],
        },
        {
          id: 'hollywood-award-wieners',
          name: 'Award Wieners (lunch)',
          time: '11:35 AM',
          type: 'food',
          priority: 'none',
          summary:
            'The pivot from a planned sit-down lunch at Flo’s: foot-long hot dogs eaten on the move in Hollywood Land, on the route out of the park. Saved forty-five minutes.',
          narrative:
            'The original plan had a sit-down lunch at Flo’s V8 Cafe in Cars Land at 12:15 p.m. The booked Runaway Railway window at 12:50 forced an earlier park hop than planned, and a sit-down lunch would have eaten 45 minutes they no longer had. The pivot: hot dogs at Award Wieners in Hollywood Land, on the route out of the park. Fast, kid-friendly, eaten standing or walking, on schedule.',
          details: [
            'Replaced the planned Flo’s V8 Cafe sit-down lunch',
            'Foot-long hot dogs, eaten on the move',
            'Saved ~45 minutes',
          ],
          photos: [],
        },
      ],
    },
    {
      id: 'pixar-pier',
      name: 'Pixar Pier',
      park: 'DCA',
      theme: 'pixar',
      firstVisitTime: '10:15 AM',
      blurb:
        'Bright midway carnival stripes over Paradise Bay. A gentle mermaid dark ride, the interactive Toy Story shooter where Grayson learned the cart-spin trick, and a calm Ferris wheel gondola with a thirty-mile view to the mountains — the last quiet stretch of a frantic morning.',
      activities: [
        {
          id: 'pixar-little-mermaid',
          name: "The Little Mermaid: Ariel's Undersea Adventure",
          time: '~10:15 AM',
          type: 'ride',
          priority: 'none',
          summary:
            'A slow, well-lit, air-conditioned omnimover dark ride with Sebastian, Flounder, Ursula, and a beach finale. Twenty minutes well spent.',
          narrative:
            'They slipped onto The Little Mermaid: Ariel’s Undersea Adventure, a slow-moving omnimover dark ride with Sebastian, Flounder, Ursula, and a final scene of Ariel and Eric on the beach. It is gentle, well-lit, and air-conditioned. Twenty minutes well spent. (The 10:15 Disney Junior Dance Party got dropped — too far away, and Anna & Elsa had run long.)',
          details: ['Omnimover dark ride', 'A cool, gentle AC break'],
          photos: [],
        },
        {
          id: 'pixar-tsmm',
          name: 'Toy Story Midway Mania!',
          time: '10:35 AM',
          type: 'ride',
          priority: 'yellow',
          summary:
            'The interactive 3D carnival shooter. Grayson, up front with Dan, learned the trick of twisting the cart hard to unlock bonus targets.',
          narrative:
            'At 10:35 they tapped into Toy Story Midway Mania through the Lightning Lane queue. TSMM is an interactive shooter ride — guests wear 3D glasses and sit in motorized carnival carts that rotate to face a series of animated mini-games. Grayson, in the front of the cart with Dan, learned the trick where twisting the cart hard at the right moment unlocks bonus targets. At the moment they tapped in, Dan booked the next Multi Pass: Mickey & Minnie’s Runaway Railway, return time 12:50 p.m. This locked in the afternoon.',
          details: [
            'Lightning Lane Multi Pass',
            '3D glasses, rotating carnival carts',
            'Learned the cart-spin bonus trick',
          ],
          photos: [],
        },
        {
          id: 'pixar-pal-a-round',
          name: 'Pixar Pal-A-Round (non-swinging)',
          time: '~10:55 AM',
          type: 'ride',
          priority: 'none',
          summary:
            'The Ferris wheel, non-swinging line. From the top: Paradise Bay, the Tower of Terror, and the San Bernardino mountains thirty miles off in clear morning air.',
          narrative:
            'Grayson asked specifically for the Pixar Pal-A-Round Ferris wheel. Half its gondolas swing along internal tracks for a freefall sensation; the other half are stationary. They took the non-swinging line. The view from the top — Paradise Bay below, the Hollywood Tower of Terror to the east, the San Bernardino mountains thirty miles off in clear morning air — was a quiet moment in a frantic morning.',
          details: ['Non-swinging gondola', 'Thirty-mile mountain views'],
          photos: [],
        },
      ],
    },
    {
      id: 'main-street',
      name: 'Main Street, U.S.A.',
      park: 'DLP',
      theme: 'mainstreet',
      firstVisitTime: '12:15 PM',
      blurb:
        'The park hop. At 12:15 they walked out of California Adventure’s gates, crossed the esplanade, and tapped into Disneyland Park. Main Street was crowded but moving — no time to linger, with a Runaway Railway window opening in thirty-five minutes at the far back of the park.',
      activities: [
        {
          id: 'mainstreet-park-hop',
          name: 'The Park Hop',
          time: '12:15 PM',
          type: 'transition',
          priority: 'none',
          summary:
            'Crossing the esplanade from DCA into Disneyland Park, then a brisk walk up Main Street and through Fantasyland toward Toontown.',
          narrative:
            'They crossed the esplanade — the open plaza between the two parks, lined with monorail tracks and the curving entry walls of Disneyland — and tapped into Disneyland Park. The Park Hopper option unlocked at 11:00 a.m. Main Street, U.S.A. was crowded but moving; they did not stop at City Hall or Disney Clothiers, because the Runaway Railway return window opened in thirty-five minutes and Mickey’s Toontown is at the far back of the park. They walked Main Street north past the Plaza Inn and the castle, cut through Fantasyland past King Arthur Carrousel, and entered Toontown by the back gate.',
          details: [
            'Park Hopper unlocked at 11:00 a.m.',
            'Esplanade crossing between the two parks',
            'No time to linger — heading for Toontown',
          ],
          photos: [],
        },
      ],
    },
    {
      id: 'toontown',
      name: "Mickey's Toontown",
      park: 'DLP',
      theme: 'toontown',
      firstVisitTime: '12:35 PM',
      blurb:
        'The re-imagined 2023 Toontown — bright cartoon architecture, primary colors, smooth surfaces. Home to a trackless technical marvel, a wheel-spinning taxi ride, and the meet that had been on the priority list since the trip was first sketched: Mickey, in his own house.',
      activities: [
        {
          id: 'toontown-runaway-railway',
          name: "Mickey & Minnie's Runaway Railway",
          time: '12:50 PM',
          type: 'ride',
          priority: 'yellow',
          summary:
            'The technical marvel of recent Disneyland additions — trackless vehicles that spin and pivot through a cartoon misadventure with Mickey, Minnie, Goofy, and Daisy.',
          narrative:
            'This ride is the technical marvel of recent Disneyland additions. Trackless dark-ride vehicles roam a series of rooms inside the Engine Ezra train station, throwing guests into a cartoon misadventure with Mickey, Minnie, Goofy, and Daisy. The vehicles spin, pivot, and follow no fixed path — at one point you find yourself in a Goofy-driven car careening through a curveball cartoon city. Grayson, who had grown comfortable with motion thanks to RSR and Mater’s, handled it cleanly. The moment they tapped in, Dan booked the next Multi Pass — for Autopia, return time 1:35 p.m.',
          details: [
            'Lightning Lane Multi Pass',
            'Trackless dark-ride vehicles',
            'Inside the Engine Ezra train station',
          ],
          photos: [],
        },
        {
          id: 'toontown-roger-rabbit',
          name: "Roger Rabbit's Car Toon Spin",
          time: '~1:00 PM',
          type: 'ride',
          priority: 'none',
          summary:
            'A cars-themed dark ride that lets you spin the steering wheel of your taxi as it travels. Jerky and erratic; Grayson loved it.',
          narrative:
            'Off Runaway Railway by 1:00 p.m., they walked the fifty feet to Roger Rabbit’s Car Toon Spin — a cars-themed dark ride that lets you spin the steering wheel of your taxi as it travels. It is jerky and erratic; Grayson loved it.',
          details: ['Spin-your-own-taxi dark ride', 'Fifty feet from Runaway Railway'],
          photos: [],
        },
        {
          id: 'toontown-mickey-house',
          name: "Mickey at Mickey's House",
          time: '2:00 PM',
          type: 'meet',
          priority: 'green',
          summary:
            'The platonic Mickey meet: a walk-through of Mickey’s house ending with a real introduction — autograph, hug, handshake. The second defining frame of the day.',
          narrative:
            'Mickey’s House is a walk-through experience: you enter the front door, pass through Mickey’s living room, his kitchen with cereal-box gags on the counter, and exit through the back yard into a small stage area where Mickey himself stands waiting. He poses, signs autographs in oversized handwriting, hugs every child, and shakes hands with every parent. For a four-year-old, this is the platonic Mickey meet: not the brief street wave, but a real introduction in his own house. Grayson handed over his autograph book; Mickey signed. The hug photo is the second defining frame of the day.',
          details: [
            'Walk-through of Mickey’s house',
            'Autograph in the book + a hug',
            'Green-tier priority #3 of 3',
          ],
          photos: [],
        },
      ],
    },
    {
      id: 'fantasyland',
      name: 'Fantasyland',
      park: 'DLP',
      theme: 'fantasyland',
      firstVisitTime: '1:15 PM',
      blurb:
        'Soft pastels and fairy-tale storybook charm — the day’s connective tissue. The family passed through Fantasyland again and again: a fourteen-minute cooldown on the boats, ice cream on a stick, a tiny circus train, gentle teacups, and finally a Beast-themed dinner. By 3:00 p.m. they were ninety minutes ahead of schedule.',
      activities: [
        {
          id: 'fantasyland-small-world',
          name: '"it\'s a small world"',
          time: '~1:15 PM',
          type: 'ride',
          priority: 'none',
          summary:
            'The slow fourteen-minute boat ride past hundreds of dolls — with hidden character cameos. Grayson found four of them. A cooldown between the morning sprint and what came next.',
          narrative:
            'From Toontown they walked south into Fantasyland for "it’s a small world," the slow, fourteen-minute boat ride past hundreds of dolls in national costumes from every corner of the world. Inside the dolls are hidden cameos: Anna, Elsa, Olaf, Lightning McQueen, Woody, and Mickey. Grayson found four of them. The ride functioned as a cooldown — air conditioning, sitting still, gentle music — between the morning sprint and what came next.',
          details: ['Fourteen-minute boat ride', 'Spotted Anna, Elsa, Olaf, McQueen'],
          photos: [],
        },
        {
          id: 'fantasyland-ice-cream',
          name: 'Ice Cream Break',
          time: '~2:30 PM',
          type: 'food',
          priority: 'none',
          summary:
            'Mickey-shaped ice cream bars on a stick, chocolate-coated vanilla — a Disneyland staple, eaten while walking.',
          narrative:
            'After Mickey, they took a breath. They grabbed ice cream from a Fantasyland snack cart — Mickey-shaped ice cream bars on a stick, chocolate-coated vanilla, a Disneyland staple — and ate while walking.',
          details: ['Mickey-shaped ice cream bars'],
          photos: [],
        },
        {
          id: 'fantasyland-casey-jr',
          name: 'Casey Jr Circus Train',
          time: '~2:45 PM',
          type: 'ride',
          priority: 'none',
          summary:
            'The small steam locomotive that loops through scenes from Dumbo. A five-minute wait.',
          narrative:
            'Casey Jr Circus Train, the small steam locomotive that loops through scenes from Dumbo, was a five-minute wait.',
          details: ['Five-minute wait', 'Loops through Dumbo scenes'],
          photos: [],
        },
        {
          id: 'fantasyland-mad-tea-party',
          name: 'Mad Tea Party',
          time: '~3:00 PM',
          type: 'ride',
          priority: 'none',
          summary:
            'The spinning teacups, where Dan deliberately left the center wheel alone so Grayson could spin it himself, gently.',
          narrative:
            'Then Mad Tea Party, the spinning teacups, where Dan deliberately did not crank the center wheel so Grayson could spin it himself, gently. By 3:00 p.m. they were about ninety minutes ahead of the original schedule.',
          details: ['Grayson controlled the wheel', 'Now ~90 minutes ahead of schedule'],
          photos: [],
        },
        {
          id: 'fantasyland-red-rose-taverne',
          name: 'Red Rose Taverne (dinner)',
          time: '~5:30 PM',
          type: 'food',
          priority: 'none',
          summary:
            'The Beauty and the Beast-themed dinner pivot after the train went down — fried chicken, a Gaston burger, and the famous "Gray Stuff" dessert.',
          narrative:
            'The next plan had been a sit-down dinner at New Orleans Square. With the Disneyland Railroad temporarily out of service, they pivoted to the original dinner plan: Red Rose Taverne in Fantasyland, themed to Beauty and the Beast — fried chicken, a vegetarian Gaston burger, and the famous "Gray Stuff" dessert, a cookies-and-cream mousse named for the Lumiere song. Grayson ate a kids’ meal and most of the Gray Stuff.',
          details: [
            'Beauty and the Beast theme',
            'The "Gray Stuff" dessert',
            'Pivot from the New Orleans Square dinner plan',
          ],
          photos: [],
        },
      ],
    },
    {
      id: 'tomorrowland',
      name: 'Tomorrowland',
      park: 'DLP',
      theme: 'tomorrowland',
      firstVisitTime: '1:35 PM',
      blurb:
        'Mid-century-modern futurism. With Buzz Lightyear closed for the day, one of the original 1955 attractions stepped up to become Grayson’s Tomorrowland headliner — and a chance to "drive."',
      activities: [
        {
          id: 'tomorrowland-autopia',
          name: 'Autopia',
          time: '1:35 PM',
          type: 'ride',
          priority: 'yellow',
          summary:
            'Small gas-powered cars on a rail-guided track. With Buzz Lightyear closed, this became the substitute headliner — and a perfect fit. Grayson drove.',
          narrative:
            'At 1:35 p.m. they tapped into Autopia in Tomorrowland. Autopia is one of the original 1955 Disneyland attractions: small gas-powered cars on a rail-guided track. With Buzz Lightyear closed, Autopia became Grayson’s substitute Tomorrowland headliner — and it turned out to be a perfect fit. Dan worked the pedals; Grayson held the wheel, steering with his elbows out, and proudly told everyone afterward that he had driven a car.',
          details: [
            'Lightning Lane Multi Pass',
            'An original 1955 attraction',
            'Replaced the closed Buzz Lightyear',
            'Grayson "drove"',
          ],
          photos: [],
        },
      ],
    },
    {
      id: 'galaxys-edge',
      name: "Galaxy's Edge",
      park: 'DLP',
      theme: 'galaxysedge',
      firstVisitTime: '3:35 PM',
      blurb:
        'Not in the original plan — added mid-afternoon when Grayson declared he wanted a Star Wars ride. The visual transition into Batuu is engineered to feel like stepping into the films: rust-streaked sandstone, the full-scale Millennium Falcon in its docking bay, constant alien chatter. Blue Milk, a Falcon photo, patrolling Stormtroopers, and the unplanned best decision of the day.',
      activities: [
        {
          id: 'galaxys-edge-batuu-plaza',
          name: 'Blue Milk & the Falcon Plaza',
          time: '~3:35 PM',
          type: 'photo-op',
          priority: 'none',
          summary:
            'Frozen Blue and Green Milk to share ("alien drink," per Grayson), the canonical Falcon docking-bay photo, a Chewbacca wave, and Stormtroopers eyeing the new recruit.',
          narrative:
            'They found the Milk Stand first. The Blue Milk and Green Milk are the canonical Galaxy’s Edge food items — frozen plant-based drinks, one fruit-forward (the blue), the other tropical and tangy (the green). They got one of each to share. Grayson tried blue first, asked for more, then declared it "alien drink." Then the Falcon photo, standing on the deck in front of the docking bay with the ship’s underside hanging above. Stormtroopers patrolled in pairs, stopping to address children — sometimes accusing them of being spies for the Resistance. Chewbacca appeared at the back of the Resistance Encampment; Grayson kept his distance but waved.',
          details: [
            'Blue + Green Milk, shared',
            'Full-scale Millennium Falcon photo',
            'Stormtrooper patrols; Chewbacca wave',
          ],
          photos: [],
        },
        {
          id: 'galaxys-edge-smugglers-run',
          name: 'Millennium Falcon: Smugglers Run',
          time: '3:50 PM',
          type: 'ride',
          priority: 'yellow',
          summary:
            'A movie-accurate cockpit and a coaxium-smuggling mission. Dan asked the cast member to make Grayson a Gunner — the easiest role for young kids. He hit his targets, and asked to do it again.',
          narrative:
            'At 3:50 p.m. they tapped into Smugglers Run. You wait in rooms inside the ship — including a lounge with the famous holographic chess board — before being assigned a role: two Pilots, two Gunners, two Engineers. Dan asked the cast member for Grayson to be a Gunner, the easiest role for young kids, just pressing flashing red buttons when they light up, and got him a left-side gunner seat. The cockpit is movie-accurate: round windscreen, glowing control panels. Hondo Ohnaka briefs you, then the cockpit lurches into hyperspace, through Cloud City, into a TIE fighter ambush. Grayson hit his targets. Walking out, he asked if they could do it again. It became one of his three favorite rides of the trip.',
          details: [
            'Lightning Lane Multi Pass',
            'Grayson assigned to Gunner',
            'The unplanned best decision of the day',
          ],
          photos: [],
        },
      ],
    },
    {
      id: 'critter-country',
      name: 'Critter Country',
      park: 'DLP',
      theme: 'critter',
      firstVisitTime: '4:30 PM',
      blurb:
        'Earth tones and a hand-crafted feel. A gentle dark ride through the Hundred Acre Wood, taken at the easy late-afternoon pace of a kid who, by this point, was riding everything calmly.',
      activities: [
        {
          id: 'critter-winnie-pooh',
          name: 'The Many Adventures of Winnie the Pooh',
          time: '~4:30 PM',
          type: 'ride',
          priority: 'none',
          summary:
            'A gentle dark ride through Hundred Acre Wood, with light effects, music, and the famous "heffalumps and woozles" dream sequence.',
          narrative:
            'From Galaxy’s Edge they walked east through Critter Country and rode The Many Adventures of Winnie the Pooh — a gentle dark ride through Hundred Acre Wood with light effects, music, and one famous "heffalumps and woozles" dream sequence. Grayson, by this point, was riding everything calmly.',
          details: ['Gentle dark ride', 'The "heffalumps and woozles" sequence'],
          photos: [],
        },
      ],
    },
    {
      id: 'new-orleans-square',
      name: 'New Orleans Square',
      park: 'DLP',
      theme: 'neworleans',
      firstVisitTime: '6:30 PM',
      blurb:
        'Wrought iron and jazz. The Disneyland Railroad station here was the launch point for the full park loop — once the train’s service issue cleared. Andrea and Grayson rode the whole ~20-minute circuit, and Grayson finally saw the dinosaurs.',
      activities: [
        {
          id: 'neworleans-railroad',
          name: 'Disneyland Railroad (full loop)',
          time: '~6:30 PM',
          type: 'ride',
          priority: 'yellow',
          summary:
            'The full ~20-minute loop after the train came back into service — past the Grand Canyon diorama and the Primeval World dinosaurs. Grayson saw the dinosaurs.',
          narrative:
            'They had walked to the Disneyland Railroad station at New Orleans Square earlier to take a quick loop, but the train had an operational issue — service paused, no clear timeline — and they left. Later, while Dan staked out a parade spot near "it’s a small world," Andrea took Grayson back. The train was running again. They boarded at New Orleans Square and rode the full ~20-minute loop: north up the western side of the park, into the Toontown station, down past Tomorrowland, and through the famous Grand Canyon diorama and Primeval World dinosaur scene between Tomorrowland and Main Street. Grayson saw the dinosaurs. They rode the whole way back to New Orleans Square.',
          details: [
            '~20-minute full loop',
            'Grand Canyon diorama + Primeval World dinosaurs',
            'Andrea + Grayson; the train came back into service',
          ],
          photos: [],
        },
      ],
    },
    {
      id: 'parade-finale',
      name: 'Parade Finale',
      park: 'DLP',
      theme: 'parade',
      firstVisitTime: '8:45 PM',
      blurb:
        'Night, LED light, and magic. They claimed a curb near "it’s a small world" at 7:30, ate popcorn, and bought fleece jackets against the cool Anaheim evening. Then Paint the Night rolled past — and instead of watching it disappear, the family got up and danced out behind it. (The Wondrous Journeys fireworks were canceled that night, most likely by wind.)',
      activities: [
        {
          id: 'parade-paint-the-night',
          name: 'Paint the Night Parade',
          time: '8:45 PM',
          type: 'parade',
          priority: 'green',
          summary:
            'Every float wrapped in tens of thousands of programmable LEDs. The fully-lit Lightning McQueen rolled past twenty feet from where Grayson sat on Andrea’s lap. That was the moment.',
          narrative:
            'The parade started promptly at 8:45 p.m. Paint the Night is the LED-light parade — every float wrapped in tens of thousands of programmable lights, rolling past slowly with synchronized music and units representing Monsters Inc., Cars, Toy Story, Beauty and the Beast, Little Mermaid, and a finale Mickey unit. The Cars unit — a fully LED-illuminated Lightning McQueen — went past in front of them, lit up, the Cars theme music playing, twenty feet from where Grayson was sitting on Andrea’s lap. That was the moment.',
          details: [
            'Started promptly at 8:45 p.m.',
            'Tens of thousands of LEDs per float',
            'The lit Lightning McQueen float, twenty feet away',
          ],
          photos: [],
        },
        {
          id: 'parade-dancing-main-street',
          name: 'Dancing Out Down Main Street',
          time: '~9:10 PM',
          type: 'parade',
          priority: 'none',
          summary:
            'The thing nobody plans: as the last float passed, they got up and walked behind it — dancing the parade’s wake out of Fantasyland and down Main Street. Grayson walked the whole way, holding both parents’ hands.',
          narrative:
            'And then they did the thing nobody plans but everybody should: as the last float of the parade rolled past, instead of standing still and watching it disappear, they got up and walked behind it. The parade route exits through the Fantasyland entryway and pours toward Main Street. The family fell in behind the float, danced along to the music, and rode the parade’s wake out of Fantasyland, down the castle promenade, and partway down Main Street before it turned off backstage. Grayson walked the whole way, holding both his parents’ hands, dancing. The Wondrous Journeys fireworks did not run that night — most likely wind — but dancing out behind Paint the Night was its own finale.',
          details: [
            'Walked behind the last float',
            'Out of Fantasyland, down Main Street',
            'Wondrous Journeys fireworks canceled (wind)',
          ],
          photos: [],
        },
      ],
    },
  ],
};

export default day;
