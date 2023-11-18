import puppeteer from "puppeteer";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      userDataDir: "./cache",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disabled-dev-shm-usage",
        "--disable-gpu",
      ],
    });
    const page = await browser.newPage();
    await page.goto(
      "https://www.hackerrank.com/contests/ai-secb-lab3/leaderboard"
    );
    

    const link = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a"), (e) => ({ link: e.href }))
    );
    console.log(link);

    const textS = await page.evaluate(() => {
      const text = document.querySelectorAll(
        "#leaders .leaderboard-list-view .row.padding-small.top.bottom.leaderboard-row.row-alt .span-flex-4 p a"
      );
      const aa = [];
      text.forEach((txt) => {
        aa.push(text.innerText);
      });
      return aa;
    });
    console.log(textS);

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
