import { Page } from '@playwright/test';


export async function ensureLoggedOut(page: Page) {
// try to find a sign out link and click it
const signOut = page.getByRole('link', { name: /sign out/i });
if (await signOut.isVisible().catch(() => false)) {
await signOut.click();
}
}