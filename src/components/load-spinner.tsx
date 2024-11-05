import React, { useState, useEffect } from 'react';
import { LoaderCircle } from 'lucide-react';

const LoadSpinner = ({
	className,
	classNameSVG,
}: {
	className?: string;
	classNameSVG?: string;
}) => {
	return (
		<div className={`svg-spinner ${className}`}>
			<LoaderCircle className={classNameSVG} />
		</div>
	);
};

export default LoadSpinner;
