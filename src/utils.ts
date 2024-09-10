export type MaybePromise<T> = T | Promise<T>;

export function viewTransition(cb: () => MaybePromise<void>) {
	if ('startViewTransition' in document && typeof document.startViewTransition === 'function') {
		document.startViewTransition(cb);
		return;
	}
	cb();
}

export function getElement(id: string): HTMLElement {
	const el = document.getElementById(id);
	if (!el) {
		throw new Error(`Element with id ${id} not found`);
	}
	return el;
}

export function cosineSimilarity(a: number[], b: number[]) {
	let dotProduct = 0;
	let mA = 0;
	let mB = 0;

	for (let i = 0; i < a.length; i++) {
		dotProduct += a[i] * b[i];
		mA += a[i] * a[i];
		mB += b[i] * b[i];
	}

	mA = Math.sqrt(mA);
	mB = Math.sqrt(mB);
	const similarity = dotProduct / (mA * mB);

	return similarity;
}
