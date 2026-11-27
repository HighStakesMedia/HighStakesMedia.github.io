/*
  HIGH STAKES MEDIA — ARTICLE LIST
  ---------------------------------
  Every article you publish gets one entry here. The homepage reads this list
  and fills in "Latest", "Most Read" and the "Breaking" bar automatically.

  To add an article:
    1. Upload the article page (for example: vermilion-pavilion.html).
    2. Copy the example below, paste it inside the [ ] brackets, and fill it in.
    3. Put a comma between entries.

  Fields:
    title     Headline (required)
    url       The article's file name (required)
    date      "YYYY-MM-DD". Newest dates show first. Use the IN-GAME date
              (1 real day = 4 in-game days).
    section   Which section page it appears on. Use one of these exactly:
              "World", "Zenchou", "Business", "Conflicts", "Politics",
              "Investigations", "Opinion", "Life & Arts"
    also      Optional extra sections it also appears on, e.g. ["Politics"].
              The article's tag and "More from" still use "section".
    summary   One-sentence teaser
    author    Byline name
    image     Optional picture file, e.g. "images/pavilion.png"
    breaking  true = show it in the scrolling Breaking bar
    mostRead  Optional rank for Most Read (1 = top). Unranked articles fill in by date.
    lead      true = the big front-page story at the top (only one shows; newest wins)
    topStory  true = one of the three Top Stories under it (newest 3 show)
    exclusive true = shows a gold "Exclusive" label instead of the section name
    caption   Optional caption for the picture on the lead story
    quote     Opinion pieces only: a line to feature in the homepage Opinion box

  Example (copy everything between the { and }, including them):

  {
    title: "Inside the Night the Vermilion Pavilion Burned",
    url: "vermilion-pavilion.html",
    date: "2019-05-11",
    section: "Investigations",
    summary: "Three survivors break their silence on the duel that left the hall in ashes.",
    author: "Your Journalist",
    image: "",
    breaking: true,
    mostRead: 1,
    lead: true,
    exclusive: true
  },
*/

window.ARTICLES = [

  {
    title: "Residential Rampage: Tranquil Blades Member Bombs City Block Outside Shindou Investigative",
    url: "akiko-residential-rampage.html",
    date: "2019-05-05",
    section: "Conflicts",
    also: ["Zenchou", "Politics"],
    summary: "A woman known as Akiko of the Tranquil Blades set off a string of explosions near the Shindou Investigative building, wounding at least six people who were trying to get her victim to a doctor. Witnesses are now asking why she is walking free.",
    author: "Kivriel",
    image: "images/akiko-aftermath-aerial.jpg",
    caption: "Emergency crews comb through what remains of the block outside Shindou Investigative after Akiko's rampage.",
    breaking: true,
    topStory: true
  },

  {
    title: "Sanmittai Pledge Ongoing Aid as City Struggles to Respond",
    url: "sanmittai-relief-tournament-grounds.html",
    date: "2019-05-04",
    section: "Zenchou",
    also: ["Politics"],
    summary: "As the city struggles to answer for last week's outbreak, the Sternritter and Noragami have set up relief tents on the ruined tournament grounds, and say they intend to stay.",
    author: "Kivriel",
    image: "images/sanmittai-relief-sunset.jpg",
    caption: "The sun sets over what remains of the tournament grounds, one week after the outbreak.",
    lead: true
  }

];
