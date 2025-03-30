/api/postTask.js

// タブ選択状態を保持（デフォルトは篤志）
let currentUser = "atsushi";

// タブの切り替え処理
document.getElementById("atsushiTab").addEventListener("click", () => {
  currentUser = "atsushi";
  document.getElementById("atsushiTab").classList.add("active");
  document.getElementById("chihiroTab").classList.remove("active");
});

document.getElementById("chihiroTab").addEventListener("click", () => {
  currentUser = "chihiro";
  document.getElementById("chihiroTab").classList.add("active");
  document.getElementById("atsushiTab").classList.remove("active");
});


// フォーム送信処理
document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const year = document.getElementById("yearInput").value;
  const month = document.getElementById("monthInput").value;
  const day = document.getElementById("dayInput").value;
  const time = document.getElementById("timeInput").value;
  const task = document.getElementById("taskInput").value;

  const postData = {
    year,
    month,
    day,
    time,
    task,
    user: currentUser
  };

  try {
    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });

    const result = await response.text();
    document.getElementById("result").textContent = "✅ 登録完了：" + result;
  } catch (err) {
    document.getElementById("result").textContent = "❌ エラー：" + err;
  }
});