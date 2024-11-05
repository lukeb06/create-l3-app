import React from 'react';
import LoadSpinner from '@/components/load-spinner';

function Load({ className }: { className?: string }) {
	return (
		<div className={className}>
			<LoadSpinner />
		</div>
	);
}

export default function Loading({
	children,
	type,
	text,
}: {
	children: React.ReactNode;
	type?: 'navbar' | 'default' | 'text';
	text?: string;
}) {
	if (!type) type = 'default';

	const classes = {
		default: 'w-full h-full flex justify-center items-center text-9xl',
		navbar: 'w-full h-[56px] flex justify-center items-center text-3xl',
        text: ''
	};

	if (type == 'text' && text) {
		return <React.Suspense fallback={<>{text}</>}>{children}</React.Suspense>;
	}

	return (
		<React.Suspense fallback={<Load className={classes[type]} />}>{children}</React.Suspense>
	);
}
