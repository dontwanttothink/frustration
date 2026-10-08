async function main() {
	const passwordFields = document.querySelectorAll("input[type='password']");

	if (passwordFields.length == 1) {
		const { name, pass } = await browser.storage.local.get({ "name": null, "pass": null});

		if (name && pass) {
			const field = passwordFields[0];
			const text = findUserField(field);

			if (text) {
				text.value = name;

				field.value = pass;
				field.form.requestSubmit();
			}
		}
	}
}

function findUserField(pw) {
	const selector = "input:not([type=password]):not([type=hidden]):not([type=submit]):not([type=button]):not([type=checkbox])";

	const form = pw.form || pw.closest('form') || document;
	const hinted = form.querySelector(
		"input[autocomplete~='username'], input[type=email], input[name*=user i], input[id*=user i]"
	);
	if (hinted && hinted !== pw) return hinted;

	// scan all candidate text fields in the same form
	const candidates = [...form.querySelectorAll(selector)]
		.filter(el => el.type === "text" || el.type === "email");

	// pick the closest one that precedes the password field in document order
	let best = null;
	for (const el of candidates) {
		if (pw.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_PRECEDING) {
			best = el;
		}
	}
	return best || candidates[0] || null;
}

main();
