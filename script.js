
const sellerForm = document.querySelector("#seller-form");
const formMessage = document.querySelector("#form-message");

sellerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(sellerForm);

  const instagram = formData.get("instagram").trim();
  const followers = Number(formData.get("followers"));
  const category = formData.get("category");
  const price = Number(formData.get("price"));
  const contact = formData.get("contact").trim();

  const cleanInstagram = instagram.replace(/^@/, "");

  if (!/^[a-zA-Z0-9._]+$/.test(cleanInstagram)) {
    showMessage("آیدی اینستاگرام معتبر نیست.", true);
    return;
  }

  if (!Number.isSafeInteger(followers) || followers < 1) {
    showMessage("تعداد فالوورها باید یک عدد صحیح مثبت باشد.", true);
    return;
  }

  if (!Number.isSafeInteger(price) || price < 1) {
    showMessage("قیمت پیشنهادی باید یک عدد صحیح مثبت باشد.", true);
    return;
  }

  if (!category || !contact) {
    showMessage("لطفاً فیلدهای ضروری را تکمیل کن.", true);
    return;
  }

  const categoryNames = {
  entertainment: "سرگرمی",
  education: "آموزشی",
  fashion: "مد و زیبایی",
  business: "کسب‌وکار",
  food: "غذا و آشپزی",
  other: "سایر"
};

const submittedData = document.querySelector("#submitted-data");
const dataContent = document.querySelector("#data-content");
console.log("submittedData:", submittedData);
console.log("dataContent:", dataContent);

const details = [
  ["آیدی پیج", "@" + cleanInstagram],
  ["تعداد فالوورها", followers.toLocaleString("fa-IR")],
  ["موضوع پیج", categoryNames[category]],
  ["قیمت پیشنهادی", price.toLocaleString("fa-IR") + " تومان"],
  ["اطلاعات تماس", contact],
  ["توضیحات", formData.get("description").trim() || "ثبت نشده"]
];

dataContent.replaceChildren();

details.forEach(([label, value]) => {
  const row = document.createElement("p");
  const title = document.createElement("strong");

  title.textContent = label + ": ";
  row.append(title, document.createTextNode(value));
  dataContent.appendChild(row);
});

submittedData.hidden = false;

showMessage(
  "اطلاعات فرم دریافت شد؛ این اطلاعات فعلاً فقط در همین صفحه نمایش داده می‌شوند.",
  false
);

submittedData.scrollIntoView({
  behavior: "smooth",
  block: "nearest"
});
});

function showMessage(message, isError) {
  formMessage.textContent = message;
  formMessage.hidden = false;

  formMessage.style.color = isError ? "#b42318" : "#176b47";
}
