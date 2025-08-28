console.log("Writting JS.");

const cardHeartIcons = document.getElementsByClassName("card-heart-icon");
const cards = document.getElementsByClassName("card");
const coin = document.getElementById("coin");

const callHistoryData = [];
const callHistoryConainer = document.getElementById("call-history-container");

let count = 0;
for (const heart of cardHeartIcons) {
  heart.addEventListener("click", function () {
    count++;
    document.getElementById("heart-count").innerText = count;
  });
}

let coinNumber = parseInt(coin.innerText);
for (const card of cards) {
  card.addEventListener("click", function (e) {
    if (e.target.classList.contains("call-btn")) {
      if (coinNumber >= 20) {
        alert(
          `Calling ${card.childNodes[3].childNodes[1].innerText} ${card.childNodes[5].childNodes[1].innerText}...`
        );
        coinNumber -= 20;
        coin.innerText = coinNumber;

        const currentDate = new Date().toLocaleTimeString();
        const data = {
          title: card.childNodes[3].childNodes[1].innerText,
          number: card.childNodes[5].childNodes[1].innerText,
          time: currentDate,
        };
        callHistoryData.push(data);

        callHistoryConainer.innerHTML = "";
        for (const data of callHistoryData) {
          callHistoryConainer.innerHTML += `<div class="history flex items-center justify-between bg-[#f5f2f2] p-4 rounded-xl text-[18px]">
                                              <div class="history-title">
                                                <h1 class=" font-semibold lg:text-[16px] text-[14px]">${data.title}</h1>
                                                <p class="text-[#5C5C5C] lg:text-[16px] text-[14px]">${data.number}</p>
                                              </div>
                                              <div class="history-time lg:text-[16px] text-[14px]">${data.time}</div>
                                            </div>`;
        }
      } else {
        alert("You don’t have enough coins. It takes at least 20 coins to make a call.");
      }
    }
  });
}
