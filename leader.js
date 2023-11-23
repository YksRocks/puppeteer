import puppeteer from "puppeteer";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      // userDataDir: "./cache",
      // args: [
      //   "--no-sandbox",
      //   "--disable-setuid-sandbox",
      //   "--disabled-dev-shm-usage",
      //   "--disable-gpu",
      // ],
    });
    const page = await browser.newPage();
    await page.goto(
      "https://www.hackerrank.com/contests/ai-secb-lab5/leaderboard"
    );

    const link = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          "#leaders .leaderboard-list-view .leaderboard-row"
        ),
        (e) => ({
          rank: e.querySelector("div:nth-child(1) p").innerText,
          username: e.querySelector("div:nth-child(2) .leaderboard-hackername")
            .innerText,
          score: e.querySelector("div:nth-child(4) p").innerText,
          time: e.querySelector("div:nth-child(5) p").innerText,
        })
      )
    );
    console.log(link);

    // const textS = await page.evaluate(() => {
    //   const text = document.querySelectorAll(
    //     "#leaders .leaderboard-list-view .leaderboard-hackername"
    //   );
    //   const aa = [];
    //   text.forEach((txt) => {
    //     aa.push(text.innerText);
    //   });
    //   return aa;
    // });
    // console.log(textS);

    // const textS = await page.evaluate(() =>
    //   Array.from(
    //     document.querySelectorAll("#leaders .leaderboard-list-view"),
    //     (e) => ({
    //       username: e.querySelector(".row .span-flex-4 p").innerText,
    //     })
    //   )
    // );

    // const textS = await page.$$eval("#leaders .leaderboard-list-view", (el) =>
    //   el.map((e) => ({
    //     username: e.querySelector(".leaderboard-hackername").innerText,
    //   }))
    // );
    // console.log(textS);

    await browser.close();
  } catch (e) {
    console.log(e);
  }
})();
