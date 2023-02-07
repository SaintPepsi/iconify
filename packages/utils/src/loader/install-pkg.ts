import { installPackage } from '@antfu/install-pkg';
import { sleep } from '@antfu/utils';
import { cyan } from 'kolorist';
import { warnOnce } from './warn';

let pending: Promise<void> | undefined;
const tasks: Record<string, Promise<void> | undefined> = {};

export async function tryInstallPkg(
	name: string,
	autoInstall: boolean | ((name: string) => Promise<void | undefined>)
): Promise<void | undefined> {
	if (pending) {
		await pending;
	}

	if (!tasks[name]) {
		// eslint-disable-next-line no-console
		console.log(cyan(`Installing ${name}...`));
		if (typeof autoInstall === 'function') {
			tasks[name] = pending = autoInstall(name)
				.then(() => sleep(300))
				.finally(() => {
					pending = undefined;
				});
		} else {
			tasks[name] = pending = installPackage(name, {
				dev: true,
				preferOffline: true,
			})
				.then(() => sleep(300))
				// eslint-disable-next-line
				.catch((e: any) => {
					warnOnce(`Failed to install ${name}`);
					console.error(e);
				})
				.finally(() => {
					pending = undefined;
				});
		}
	}

	return tasks[name];
}
