$(document).ready(function() {
  var articles = [
    {
      article: "My winding road from security guard to back-end developer",
      link:
        "https://medium.freecodecamp.org/from-self-taught-coder-to-professional-backend-developer-my-long-winding-road-d8f7c428b637"
    },
    {
      article:
        "Google not, learn not: why searching can sometimes be better than knowing",
      link:
        "https://medium.freecodecamp.org/google-not-learn-not-why-searching-can-be-better-than-knowing-79838f7a0f06"
    },

    {
      article: "Lessons from my first year of live coding on Twitch",
      link:
        "https://medium.freecodecamp.org/lessons-from-my-first-year-of-live-coding-on-twitch-41a32e2f41c1"
    },
    {
      article: "Teaching Programming is Hard",
      link:
        "https://medium.com/le-wagon/teaching-programming-is-hard-f4ad74e702d0"
    },
    {
      article:
        "7 Things I learned in my journey from coding bootcamp to Senior Developer",
      link:
        "https://codeburst.io/7-things-i-learned-in-my-journey-from-coding-bootcamp-to-senior-developer-645ab7c2fea0"
    },
    {
      article:
        "Lessons learned from passing the Associate Android Developer(AAD) certification by Google",
      link:
        "https://hackernoon.com/lessons-learned-from-passing-the-associate-android-developer-aad-certification-by-google-e192224c6c3b"
    },
    {
      article: "How I got accepted into the best remote working platforms",
      link:
        "https://medium.com/@caroso1222/how-i-got-accepted-into-the-best-remote-working-platforms-a9250041531f"
    },
    {
      article: "My First Hackathon and What I Learned",
      link:
        "https://hackernoon.com/my-first-hackathon-and-what-i-learned-c694230190ce"
    },
    {
      article: "So you want to be a Software Engineer?!?",
      link:
        "https://medium.com/@eduardovedes/so-you-want-to-be-a-software-engineer-7f1a3626dda8"
    },
    {
      article: "What I learned from my first #100DaysOfCode",
      link:
        "https://medium.freecodecamp.org/what-i-learned-from-my-first-100daysofcode-13ac805ff0a9"
    },
    {
      article: "How to Go From Hobbyist to Professional Developer",
      link:
        "https://medium.freecodecamp.org/how-to-go-from-hobbyist-to-professional-developer-11a8b8a52b5f"
    },
    {
      article: "A Better Way to Compare Yourself",
      link:
        "https://medium.freecodecamp.org/a-better-way-to-compare-yourself-43cf37616570"
    },
    {
      article: "The 12 YouTube videos new developers mention the most",
      link:
        "https://medium.freecodecamp.org/the-12-youtube-videos-new-developers-mention-the-most-f2d1fce337ca"
    },
    {
      article:
        "Why I left a big, prestigious law firm to become a product manager at a startup",
      link:
        "https://medium.freecodecamp.org/why-i-left-a-big-prestigious-law-firm-to-become-a-product-manager-at-a-startup-a7afd8c3e708"
    },
    {
      article:
        "How I went from zero to San Francisco software engineer in 12 months",
      link:
        "https://medium.freecodecamp.org/how-i-learned-to-code-and-earned-a-job-in-silicon-valley-changing-my-life-along-the-way-a3af854855fa"
    }
  ];
  $("#mediumArticle").on("click", function() {
    var randomArticle = articles[Math.floor(Math.random() * articles.length)];
    $("#displayArticle").html(
      '<a target="_blank" href = ' +
        randomArticle.link +
        ">" +
        randomArticle.article +
        "</a>"
    );
  });
});
