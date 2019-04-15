import React from "react";
import Consumer from "../utils/context";

import "../styles/sort.css";

const Sort = () => {
	const handleSortChange = (e, ctx) => {
		ctx.setSortVal(e.target.value);
	};

	return (
		<Consumer>
			{ctx => (
				<div className="sort-wrapper">
					<p className="header">SORT BY</p>
					<div className="sort-input-wrapper">
						<select
							name="sort"
							id="sort"
							onChange={e => {
								handleSortChange(e, ctx);
							}}
							defaultValue={ctx.sortVal}>
							<option value="price_asc">Lowest Price</option>
							<option value="price_desc">Highest Price</option>
							<option value="miles_asc">Lowest Mileage</option>
							<option value="dist_asc">Nearest to me</option>
							<option value="year_desc">Model Year</option>
						</select>
					</div>
				</div>
			)}
		</Consumer>
	);
};

export default Sort;
