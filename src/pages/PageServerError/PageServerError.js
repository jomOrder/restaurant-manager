import React, { useEffect } from 'react';

const PageServerError = () => {
    useEffect(() => {

    }, []);

    return (
        <div id="notfound">
		<div className="notfound">
			<div className="notfound-404"></div>
			<h1>500</h1>
			<h2>Oops! Internal Server Error</h2>
			<p>Sorry temporarily unavailable</p>
		</div>
	</div>
    )
}

export default PageServerError;