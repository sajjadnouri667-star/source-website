
const SUPABASE_URL = "  https://bydxlwxudyhhfzhbwhic.supabase.co ";
const SUPABASE_KEY = " sb_publishable_c_li1WwT798lwxvNVGbCPQ_CSSxNxpt  ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const requestsContainer = document.querySelector("#requests-container");
const totalRequests = document.querySelector("#total-requests");
const newRequests = document.querySelector("#new-requests");
const logoutButton = document.querySelector("#logout-button");

// بررسی ورود مدیر
async function checkAdmin() {
  const { data, error } = await supabaseClient.auth.getUser();

  if (error || !data.user) {
    window.location.href = "admin.html";
    return false;
  }

  return true;
}

// دریافت درخواست‌ها
async function loadRequests() {
  const { data, error } = await supabaseClient
    .from("requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    requestsContainer.textContent = "خطا در دریافت درخواست‌ها.";
    console.error("Supabase error:", error);
    return;
  }

  totalRequests.textContent = data.length;
  newRequests.textContent = data.filter(item => item.status === "new").length;

  if (data.length === 0) {
    requestsContainer.textContent = "هنوز درخواستی ثبت نشده است.";
    return;
  }

  requestsContainer.innerHTML = "";

  data.forEach(request => {
    const card = document.createElement("div");
    card.className = "request-card";

    const fields = [
      ["آیدی اینستاگرام", request.instagram],
      ["تعداد فالوورها", Number(request.followers).toLocaleString("fa-IR")],
      ["دسته‌بندی", request.category || "ثبت نشده"],
      ["قیمت پیشنهادی", Number(request.price).toLocaleString("fa-IR")],
      ["راه ارتباطی", request.contact],
      ["توضیحات", request.description || "بدون توضیحات"],
      ["وضعیت", request.status]
    ];

    fields.forEach(([label, value]) => {
      const row = document.createElement("p");
      row.textContent = `${label}: ${value}`;
      card.appendChild(row);
    });

    requestsContainer.appendChild(card);
  });
}

// خروج مدیر
logoutButton.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  window.location.href = "admin.html";
});

// شروع داشبورد
async function startDashboard() {
  const isAdmin = await checkAdmin();

  if (isAdmin) {
    await loadRequests();
  }
}

startDashboard();
