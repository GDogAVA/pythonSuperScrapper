const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: false, // false if you can see the browser
  });
  const page = await browser.newPage();

  // navigate and wait until network is idle
  await page.goto(
    "https://social.msdn.microsoft.com/Forums/azure/en-US/user/threads?user=Gary%20Gallanes%20%5BHCL%20Technologies%5D",
    { waitUntil: "networkidle" }
  );

  await page.waitForSelector(".page-numbers"); // wait for the element
  // get the elements in pagination
  const numberPages = await page.$$eval(".page-numbers", (numberpages) => {
    return numberpages.map((numberPage) => {
      return parseInt(numberPage.innerText);
    });
  });
  // get total pages in pagination
  const totalPages = Math.max(...numberPages.filter((p) => !isNaN(p)));

  // get the articles per page
  let articles = [];
  for (let i = 1; i <= totalPages; i++) {
    try {
      await page.waitForSelector(".entry-title"); // wait for the element
      // get the title and link of each article
      const articlesPerPage = await page.$$eval(
        ".entry-title",
        (headerArticle) => {
          return headerArticle.map((article) => {
            const title = article.getElementsByTagName("a")[0].innerText;
            const link = article.getElementsByTagName("a")[0].href;

            return JSON.stringify({
              title,
              link,
            });
          });
        }
      );

      if (i != totalPages) {
        // by clicking the Next button
        await page.click(".next.page-numbers");
        // for this website, another option to navigate is to use URL
        // await page.goto(`https://www.ytravelblog.com/category/travel-planning/travel-tips/page/${i}/`)
      }

      articles.push({
        page: i,
        articles: articlesPerPage,
      });
    } catch (error) {
      console.lof({ error });
    }

    // optional, to see more clearly how the browser works
    // wait 4000ms
    await delay(4000);
  }

  console.log(articles);

  // close page and browser
  await page.close();
  await browser.close();
})();

// function to wait a while
function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}