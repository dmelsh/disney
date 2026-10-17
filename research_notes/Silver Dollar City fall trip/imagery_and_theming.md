# Silver Dollar City: reference imagery sources and per-area visual identity (for a private family keepsake web app)

## Verification status (read first)

In this session every direct fetch of the relevant hosts was blocked by the egress policy (curl returned "CONNECT tunnel failed, response 403"; WebFetch returned "getaddrinfo ENOTFOUND"). The proxy status endpoint logged `connect_rejected` for commons.wikimedia.org, upload.wikimedia.org, en.wikipedia.org, www.silverdollarcity.com, www.flickr.com and others. I did not try to route around the block.

- No Commons page, API response or image was loaded or visually inspected. "Confirmed" below means only: the exact URL was returned as a result by WebSearch, with a title ending "- Wikimedia Commons" or similar. It does not mean I opened it or saw the pixels.
- Licence, author and date details come from the WebSearch tool's summary of the page, not from my own reading of the file page. Re-check each on the file page before shipping.
- upload.wikimedia.org direct URLs (hash path) could not be determined. Do not invent them. The `Special:FilePath/<File name>` form is a standard MediaWiki redirect that resolves to the original file. I list it only as a form derived from a confirmed File: name. Treat it as unconfirmed, because I could not test it.
- Color palettes are my design inferences from the textual descriptions, not sampled from photos.

---

## 1. Which Wikimedia Commons files exist for Silver Dollar City?

### Takeaway
The Commons category is small. The park-level category is reported to hold about six files plus ride subcategories, and the best-covered subjects are rides (Wildfire, Outlaw Run, Fire in the Hole, Powder Keg, Electro Spin, Firefall) and the Frisco Silver Dollar Line locomotives. I found no Commons file pages for Grand Exposition, Craft Valley, Echo Hollow, Rivertown, Wilderness Crossing, Mystic River Falls or a Main Street panorama. The only Time Traveler image is a CC BY-SA 4.0 PNG whose connection to the park is unverified.

### Cited Findings

**A. Category pages (URLs seen in search results)**
- Category:Silver Dollar City: reported to list Branson, Taney County, Missouri; owner Herschend Family Entertainment; opened 1 May 1960; six files (including "Silver Dollar City entrance sign 1.jpg", "Silver Dollar City Train Depot.jpg", "Silver Dollar City Steam Tractor May 2015.jpg") and subcategories for rides and for the Frisco Silver Dollar Line locomotives (Nos. 13, 14, 43, 504, 76). — [Category:Silver Dollar City](https://commons.wikimedia.org/wiki/Category:Silver_Dollar_City)
- Category:Wildfire (Silver Dollar City): B&M steel coaster, start date 4 April 2001, reported 21 files. — [Category:Wildfire (Silver Dollar City)](https://commons.wikimedia.org/wiki/Category:Wildfire_(Silver_Dollar_City))
- Category:Outlaw Run: RMC wooden coaster, opened 15 March 2013, reported 23 files. — [Category:Outlaw Run](https://commons.wikimedia.org/wiki/Category:Outlaw_Run)
- Category:Fire in the Hole (Silver Dollar City): exists. — [Category:Fire in the Hole (Silver Dollar City)](https://commons.wikimedia.org/wiki/Category:Fire_in_the_Hole_(Silver_Dollar_City))
- Category:Marvel Cave: show cave, National Natural Landmark; exists, and the Branson category reports a Marvel Cave subcategory with 4 files. — [Category:Marvel Cave](https://commons.wikimedia.org/wiki/Category:Marvel_Cave)
- Category:Branson, Missouri — [link](https://commons.wikimedia.org/wiki/Category:Branson,_Missouri)

**B. File pages (File: names seen in search results)**

Special:FilePath form is `https://commons.wikimedia.org/wiki/Special:FilePath/<exact name with underscores>`. It is unconfirmed for every row.

| File name | Page URL (seen) | Shows | Licence / author (per search summary, not verified on page) |
|---|---|---|---|
| File:Silver Dollar City (22854131313).jpg | [page](https://commons.wikimedia.org/wiki/File:Silver_Dollar_City_(22854131313).jpg) | Christmas wreath in the park, 1,949 x 1,949 px, dated 21 Nov 2015 | CC BY 2.0, Nan Fry (Flickr import). Seasonal detail only, not an area shot |
| File:Fire in the Hole at Silver Dollar City (Main Street).jpg | [page](https://commons.wikimedia.org/wiki/File:Fire_in_the_Hole_at_Silver_Dollar_City_(Main_Street).jpg) | Fire in the Hole, apparently on the Main Street / entrance-area facade | Licence and author not shown in results. Check |
| File:Wildfire (Silver Dollar City) 1.jpg | [page](https://commons.wikimedia.org/wiki/File:Wildfire_(Silver_Dollar_City)_1.jpg) | Wildfire coaster, April 2022, 2,736 x 1,824 px | CC BY 2.0, Jeremy Thompson |
| File:Outlaw Run (18416341946).jpg | [page](https://commons.wikimedia.org/wiki/File:Outlaw_Run_(18416341946).jpg) | Outlaw Run (details not shown) | Not shown. Check |
| File:Outlaw Run (17788255584).jpg | named in the Outlaw Run category summary; file-page URL not seen | Outlaw Run; one Outlaw Run file is described as taken 26 May 2015 from a Frisco Silver Dollar Line train | CC BY 2.0, Jeremy Thompson (the summary does not say which filename carries this. Unconfirmed) |
| File:Powder Keg at Silver Dollar City 6.jpg | [page](https://commons.wikimedia.org/wiki/File:Powder_Keg_at_Silver_Dollar_City_6.jpg) | Powder Keg, 2006, Flickr upload | CC BY 2.0 (author not shown) |
| File:Firefall (Silver Dollar City) 1.jpg | [page](https://commons.wikimedia.org/wiki/File:Firefall_(Silver_Dollar_City)_1.jpg) | Firefall ride, October 2021 | Not shown. Check |
| File:Electro Spin at Silver Dollar City 1.jpg | [page](https://commons.wikimedia.org/wiki/File:Electro_Spin_at_Silver_Dollar_City_1.jpg) | Electro Spin | Not shown. Check |
| File:Electro Spin at Silver Dollar City 3.jpg | [page](https://commons.wikimedia.org/wiki/File:Electro_Spin_at_Silver_Dollar_City_3.jpg) | Electro Spin | Not shown. Check |
| File:Frisco Silver Dollar Line Locomotive No. 43 - July 2011 - 13.jpg | [page](https://commons.wikimedia.org/wiki/File:Frisco_Silver_Dollar_Line_Locomotive_No._43_-_July_2011_-_13.jpg) | Frisco Silver Dollar Line steam locomotive No. 43 (2-foot gauge, built 1934) | Not shown. Check |
| File:WV banner SW Missouri Wildfire rollercoaster at Silver Dollar City theme park in Branson.jpg | [page](https://commons.wikimedia.org/wiki/File:WV_banner_SW_Missouri_Wildfire_rollercoaster_at_Silver_Dollar_City_theme_park_in_Branson.jpg) | Wikivoyage banner of Wildfire | Not shown. Check |
| File:Wildfire From The Air.jpg | [page](https://commons.wikimedia.org/wiki/File:Wildfire_From_The_Air.jpg) | Title suggests aerial view. Park not verified (could be a different "Wildfire") | Unknown |
| File:Time Traveler.png | [page](https://commons.wikimedia.org/wiki/File:Time_Traveler.png) | Time Traveler on a vertical loop. Used on en-wiki Time Traveler article and de-wiki SDC pages | CC BY-SA 4.0 (per summary). Whether it is a photo of the park or a render is unverified |

Not seen in search results, so the "no file found" answer is only from what the search surfaced: any Commons file for Mystic River Falls, Time Traveler (photo), Grand Exposition, Echo Hollow, Rivertown, Wilderness Crossing, Craft Valley, Main Street overall, or the Marvel Cave entrance. The category summary does list a "Silver Dollar City entrance sign 1.jpg" and "Silver Dollar City Train Depot.jpg", but I did not see their file-page URLs, so I am not recording URLs for them.

**C. Coasterpedia mirrors (same photographers, useful leads)**
Coasterpedia file pages for Mystic River Falls, Fire in the Hole, Racing Regatta, Elephant March, Magnificent Wave Carousel (2026 photos, reported CC BY 4.0, author "sheffieldb") and Outlaw Run 2021 / Elephant March 2010 (reported CC BY-NC-SA 2.0, author C. E. Beavers). Coasterpedia terms differ from Commons, and the CC BY-NC-SA files are not compatible with a re-licensed project, though a private non-commercial family app may still meet NC. These URLs were seen in search results only:
- [File:Mystic River Falls (Silver Dollar City) 2026 01.jpg](https://coasterpedia.net/wiki/File:Mystic_River_Falls_(Silver_Dollar_City)_2026_01.jpg)
- [File:Fire in the Hole (Silver Dollar City) 2026 01.jpg](https://coasterpedia.net/wiki/File:Fire_in_the_Hole_(Silver_Dollar_City)_2026_01.jpg)
- [File:Silver Dollar City 2026 01.jpg](https://coasterpedia.net/wiki/File:Silver_Dollar_City_2026_01.jpg)
- [File:Outlaw Run (Silver Dollar City) 2021 01.jpg](https://coasterpedia.net/wiki/File:Outlaw_Run_(Silver_Dollar_City)_2021_01.jpg)
- [Category:Silver Dollar City on Coasterpedia](https://coasterpedia.net/wiki/Category:Silver_Dollar_City) (reported 17 subcategories, including Outlaw Run 17 files, Time Traveler 22 files, Wildfire 13 files)

### Inferences
- A designer should plan for Commons covering rides, the train and a few park-level shots, and for the area/background art to be hand-illustrated from the palettes in section 5 rather than traced from Commons photos.
- The Jeremy Thompson CC BY 2.0 images (Wildfire, Outlaw Run from the train) look like the most reusable verified-by-snippet content. Attribution format: "Photo by Jeremy Thompson, CC BY 2.0, via Wikimedia Commons".
- For a private family app, the family's own photos from the trip will be better and licence-free.

### Gaps
- Could not load any Commons page, the Commons API, or Wikipedia (blocked). Complete file list and subcategory contents are unknown. Re-run `action=query&list=categorymembers&cmtitle=Category:Silver_Dollar_City&cmtype=file|subcat&cmlimit=500` and `prop=imageinfo&iiprop=url|extmetadata` from an unrestricted machine. That returns the true `upload.wikimedia.org` URLs, licence and author in one call.
- No direct upload.wikimedia.org URLs for any file.
- Licences marked "Check" are unknown.

---

## 2. Official press kit / media centre

### Takeaway
I did not find any official Silver Dollar City or Herschend press-room image gallery, and I could not read silverdollarcity.com or hfecorp.com (blocked). Terms for personal non-commercial use are therefore unknown.

### Cited Findings
- A search for a Herschend / SDC press room or media kit returned no media-library page. It surfaced only Herschend's corporate history page. — [hfecorp.com history](https://hfecorp.com/about/history/)
- A search for silverdollarcity.com press/media downloads returned no page from that domain (only unrelated press kits). — search only, no source page
- Park's own pages exist at silverdollarcity.com (e.g. [Grand Exposition](https://www.silverdollarcity.com/theme-park/attractions/rides/The-Grand-Exposition), [Demonstrating Craftsmen](https://www.silverdollarcity.com/theme-park/attractions/craftsmen/), [Shopping](https://www.silverdollarcity.com/theme-park/attractions/shopping/)). These are copyrighted marketing pages, not licensed galleries. I saw only their URLs and summaries.

### Inferences
- Default assumption: official photos are all-rights-reserved. For a private family keepsake, hot-linking or copying them is not covered by a licence I could find. The safe route is to ask Herschend/SDC media relations in writing or to use only CC-licensed or the family's own photos.

### Gaps
- Existence and terms of an official press room (try hfecorp.com press/newsroom and silverdollarcity.com footer "Media") unverified.

---

## 3. Other sources with clear licences (Flickr CC, Unsplash, Pexels)

### Takeaway
No Unsplash or Pexels pages for Silver Dollar City surfaced. Flickr itself was unreachable, but Commons and Coasterpedia mirror CC-licensed Flickr photos (Nan Fry, Jeremy Thompson, sheffieldb, C. E. Beavers).

### Cited Findings
- Search for Unsplash/Pexels SDC photos returned none. Results instead were the Arkansas State Archives (1969 photos, reproduction without written permission prohibited), photographer Paul Drabek's negative-g.com (copyright notice 1999-2025), Theme Park Archive and syndicated TV gallery pages, all without reuse licences. — [Arkansas Digital Heritage example](https://digitalheritage.arkansas.gov/ozark-photos/1893), [negative-g.com example](https://negative-g.com/silver-dollar-city/2020/june/silver-dollar-city-june-2020-12.htm), [Theme Park Archive](https://www.themeparkarchive.com/parks/silver-dollar-city)
- Coasterpedia 2026 photos by "sheffieldb" are reported as CC BY 4.0 (see section 1C). Older C. E. Beavers photos CC BY-NC-SA 2.0.
- Historical maps/brochures are archived at [themeparkbrochures.net](https://www.themeparkbrochures.net/old-silver-dollar-city-maps/). Copyright is held by the park, so these are useful for visual reference of area layout and typography but not for reuse.

### Inferences
- Do not use negative-g.com, Theme Park Archive or TV galleries in the app. They show "all rights reserved" signals.

### Gaps
- No Flickr CC search could be run. No direct Flickr photo IDs verified.

---

## 4. Confirmed vs unconfirmed summary

**Seen as a search-result URL (page itself not opened):** every Commons category and file page in section 1A and 1B that has a link, and the Coasterpedia URLs in 1C.

**Unconfirmed:** that any URL currently loads, that any image displays, all upload.wikimedia.org paths (none obtained), all Special:FilePath forms, filename `Outlaw Run (17788255584).jpg` as a standalone page, the Commons "Silver Dollar City entrance sign 1.jpg" / "Train Depot.jpg" / "Steam Tractor May 2015.jpg" page URLs (names only from a search summary), and every licence/author not in the table.

---

## 5. Visual identity per park area, with suggested palettes

### Takeaway
Park-wide: an Ozarks 1880s craft-village look (weathered wood, hand-lettered signs, shaded porches, working craftspeople), with the 2006 Grand Exposition as a brighter "world's fair" pocket, the 2020 Rivertown as a pier-like 1880s river town, and the Fire District / Frisco railway as soot-and-iron accents. Documentation I could read is thin on colors and materials, so the palettes are design inferences.

### Cited Findings (descriptions I could source)
- Official area list: Marvel Cave, Main Street, Homestead Ridge, Midtown, Valley Road, Grand Exposition, Rivertown, Fire District, Hugo's Hill Street, Wilson's Farm (per a search summary of park/Wikipedia-derived pages). "Craft Valley" and "Wilderness Crossing" were not found as SDC area names. Craftsman's Valley with Daredevil Falls is a Dollywood area. — [Daredevil Falls](https://en.wikipedia.org/wiki/Daredevil_Falls); [themeparkbrochures area search result](https://www.themeparkbrochures.net/?p=1057337). Treat the app's area list as needing confirmation against the current park map.
- Main Street: Main Street Square was added as an entrance plaza in 1988 with shaded porches and seating; General Store and Phoebe Snapp's Taffy shop are here. — [Wikipedia-derived search summaries](https://www.themeparkbrochures.net/brochures/silver-dollar-city)
- Grand Exposition: two acres themed on late-1800s World's Fairs and Expositions, ten family rides, elaborate gardens, dancing fountains, a calliope and a galleon; inspiration from the St. Louis World's Fair and P. T. Barnum. — [official Grand Exposition page](https://www.silverdollarcity.com/theme-park/attractions/rides/The-Grand-Exposition)
- Rivertown: 1880s theme, pier-like design of river towns of yesteryear, anchored by Mystic River Falls (storyline: explorer Pearl Brazen, Marvel Cave legend); Rivertown Smokehouse overlooks the river; Hillcreek Pottery located here. — [Blooloop](https://blooloop.com/theme-park/news/silver-dollar-city-mystic-river-falls/), [InPark](https://www.inparkmagazine.com/sdc-mystic-river-falls-opening/)
- Echo Hollow: 4,000-seat amphitheatre opened 1983 with a wrap-around porch. — [BransonShows](https://www.bransonshows.com/pointsOfInterest/EchoHollowAmphitheatreatSilverDollarCityinBransonMO.cfm)
- Midtown: Grandfather's Mansion, Sullivan's Mill, woodcarvers and candle craftsmen. Hugo's Hill Street (1990): craft area on a bluff above the riverfront (leather, soap). — [Demonstrating Craftsmen](https://www.silverdollarcity.com/theme-park/attractions/craftsmen/)
- Fire in the Hole is the park's Main Street / Fire District-adjacent burning-town dark ride. Powder Keg, Wildfire, Outlaw Run, Time Traveler: coasters and signature rides (Commons categories above).
- The Frisco Silver Dollar Line is a 2-foot-gauge steam train (No. 43 built 1934). Its route encircles part of the park (per the Commons file title and search summary).

### Inferences: suggested palettes (hex, designer starting points)

Typography cues for all areas (design inference, not sourced): 1880s Victorian wood-type and hand-painted show-card lettering (Tuscan, Clarendon / slab-serif, condensed gothic), cream-on-dark-green or gold-on-red signboards; on a web page use free equivalents such as Rye, Alfa Slab One, Abril Fatface, Sancreek, or Playfair Display for headings, and a plain readable serif or sans for body text.

| Area | Mood / materials | Primary | Secondary | Surface |
|---|---|---|---|---|
| Main Street / entrance (Ozarks village) | Weathered gray-brown board-and-batten, shaded porches, hand-painted signs, general-store red and cream | #7A3E22 (barn red / aged cedar) | #C99A3B (signboard gold) | #F3E7CF (parchment cream) |
| Grand Exposition (World's Fair) | Brighter, whimsical: striped canopies, gardens, brass calliope, galleon, white trim, fountains | #B3262E (fair red) | #1F5E7A (peacock blue) | #FBF4E4 (ivory) |
| Rivertown / Mystic River Falls | Pier timbers, weathered planking, river-teal water, smokehouse brick, lantern amber | #2F6B6A (river teal) | #8C5A2B (pier wood) | #E8E1D0 (driftwood sand) |
| Craftsmen areas (Midtown / Valley Road / Hugo's Hill Street) | Log and plank cabins, stone chimneys, pottery clay, glassblowing orange, candle wax | #8A5A33 (clay-brown) | #D17B2C (forge amber) | #F0E2C8 (oatmeal) |
| Fire District / Fire in the Hole | Charred timbers, ember orange, soot, brick | #A8321D (ember red) | #3A2A24 (char brown) | #E9D9C0 (smoke-aged paper) |
| Echo Hollow (amphitheatre) | Wooded hollow, wrap-around porch, evening stage light | #3E5B3A (hollow green) | #B8873A (lantern gold) | #EFE6D2 (warm paper) |
| Marvel Cave / Wildfire-Outlaw Run adventure rides | Limestone, cave dark, lantern glow, steel and weathered wood | #3B3A38 (limestone shadow) | #C98B2E (lantern) | #E7E0D3 (limestone pale) |
| Frisco Silver Dollar Line | Locomotive black, brass, red caboose | #1F1F1F (engine black) | #A64B2A (rust red) | #EEE3CE (ticket cream) |

Fall-trip note (inference): this trip is in autumn, so a shared accent of pumpkin (#D9822B) and cornstalk gold (#CBA135) across areas would tie the keepsake to the season. The other note file in this folder, fall_festival_2026.md, covers the event.

### Gaps
- No official brand guidelines or color specs were found. No area-specific architectural descriptions for Main Street, Echo Hollow, Fire District or Wilson's Farm beyond the above. "Craft Valley" and "Wilderness Crossing" names are unverified for SDC; the app's area list should be checked against the current official map.
- Palettes not sampled from photographs; recommend sampling from the family's own photos or from the Jeremy Thompson CC BY 2.0 images once they can be loaded.

---

## Next steps for a machine with open internet
1. Run the Commons API query in section 1 Gaps to get true `imageinfo` URLs, licences and authors.
2. Open each File: page and record the licence template (CC BY 2.0 / 4.0 / BY-SA / PD) and author string.
3. Check hfecorp.com and silverdollarcity.com footers for a Media/Press page and its terms, or email the park for written permission for personal use.
