
const SUPABASE_URL = " https://bydxlwxudyhhfzhbwhic.supabase.co ";
const SUPABASE_KEY = "sb_publishable_c_li1WwT798lwxvNVGbCPQ_CSSxNxpt  ";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");
const loginButton = document.querySelector("#login-button");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;

  loginButton.disabled = true;
  loginButton.textContent = "در حال بررسی...";
  loginMessage.hidden = true;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    loginMessage.textContent = "ایمیل یا رمز عبور صحیح نیست.";
    loginMessage.hidden = false;
    loginButton.disabled = false;
    loginButton.textContent = "ورود به پنل";
    return;
  }

  loginMessage.textContent = "ورود موفقیت‌آمیز بود.";
  loginMessage.hidden = false;
  loginButton.textContent = "ورود موفق";
});
