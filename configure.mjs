const name = document.getElementById("name");
const pass = document.getElementById("pass");

const { name: n, pass: p } = await browser.storage.local.get(["name", "pass"]);

if (n) {
	name.value = n;
}
if (p) {
	pass.value = p;
}

name.addEventListener("input", (e) => {
	const val = name.value;
	browser.storage.local.set({ name: val });
});

pass.addEventListener("input", (e) => {
	const val = pass.value;
	browser.storage.local.set({ pass: val });
});
