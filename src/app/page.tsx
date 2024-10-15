import React, { useState, useEffect } from 'react';

import { SERVER } from '@/lib/server';

export default async function Page() {
	const { status } = await SERVER.status.query();

	return (
		<div>
			<h1 className="text-3xl font-extrabold">{status}</h1>
		</div>
	);
}
