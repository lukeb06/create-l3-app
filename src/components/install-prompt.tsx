'use client';

import { Button } from './ui/button';
import { useIOS } from '@/hooks/use-ios';
import { useStandalone } from '@/hooks/use-standalone';
import { useMounted } from '@/hooks/use-mounted';
import { usePersistentState } from '@/hooks/use-persistent-state';
import { TITLE } from '@/data/static';

export default function InstallPrompt() {
    const isIOS = useIOS();
    const isStandalone = useStandalone();
    const isMounted = useMounted();

    const [noInstall, setNoInstall] = usePersistentState('prefer-no-install', false);

    if (((isStandalone || !isIOS) && isMounted) || noInstall) return null;

    return (
        <div className="grid place-items-center w-full h-full bg-background absolute z-50 inset-0 p-4">
            {isMounted ? (
                <div className="flex flex-col w-full items-center gap-4">
                    <h3 className="text-4xl">Install {TITLE}</h3>
                    {isIOS ? (
                        <span className="w-full text-center">
                            To install {TITLE} on your iOS device, tap the share button and then
                            "Add to Home Screen".
                        </span>
                    ) : (
                        <span className="w-full text-center">
                            To install {TITLE} on your device, tap the 3 dots or share icon and then
                            "Add to Home Screen".
                        </span>
                    )}

                    <Button className="mt-4" onClick={() => setNoInstall(true)}>
                        Continue on browser
                    </Button>
                </div>
            ) : null}
        </div>
    );
}
