import React, { useState, useEffect } from "react";
import { getMakes, getModels, getVehicles } from "../utils/api";
import Consumer from "../utils/context";

import "../styles/vehicle-search.css";

const VehicleSearch = ({ errorHandler, loadingHandler }) => {
	const [makeOptions, setMakeOptions] = useState([]);
	const [modelOptions, setModelOptions] = useState([]);
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [zip, setZip] = useState("");
	const [radius, setRadius] = useState("");

	// React Lifecycle methods
	useEffect(() => {
		const fetchMakes = async () => {
			const res = await getMakes();

			if (!res.success) {
				errorHandler(res.message);
			} else {
				setMakeOptions(res.makes);
			}
		};
		fetchMakes();
	}, []);

	// Methods ---
	const handleMakeChange = e => {
		const leMake = e.target.value;
		getModels(leMake).then(res => {
			if (!res.success) {
				errorHandler(res.message);
			} else {
				setModelOptions(res.models);
				setMake(leMake);
			}
		});
	};

	const handleModelChange = e => {
		setModel(e.target.value);
	};
	const handleZipChange = e => {
		setZip(e.target.value);
	};
	const handleRadiusChange = e => {
		setRadius(e.target.value);
	};

	const handleSearch = ctx => {
		const searchData = {
			make,
			model,
			zip,
			radius
		};
		loadingHandler(true);
		getVehicles(searchData).then(res => {
			if (!res.success) {
				errorHandler(res.message);
			} else {
				const { results } = res.vehicles;
				ctx.setVehicles(results);
			}
			loadingHandler(false);
		});
	};

	return (
		<Consumer>
			{ctx => {
				return (
					<div className="vehicle-search-wrapper">
						<div className="input-group">
							<select
								onChange={handleMakeChange}
								name="make"
								id="make"
								defaultValue={"optMake"}>
								<option
									value="null"
									name="optMake"
									id="optMake">
									Make
								</option>
								{makeOptions.length !== 0 &&
									makeOptions.map((_make, key) => {
										const [val, m] = _make;
										return (
											<option key={key} value={val}>
												{m}
											</option>
										);
									})}
							</select>
						</div>
						<div className="input-group">
							<select
								onChange={handleModelChange}
								name="model"
								id="model"
								defaultValue={"optModel"}>
								<option
									value="null"
									name="optModel"
									id="optModel">
									Model
								</option>
								{modelOptions.length !== 0 &&
									modelOptions.map((_model, key) => {
										const [val, m] = _model;
										return (
											<option key={key} value={val}>
												{m}
											</option>
										);
									})}
							</select>
						</div>
						<div className="input-group">
							<input
								type="text"
								name="zip"
								id="zip"
								placeholder={"Enter Zip Code.."}
								value={zip}
								onChange={handleZipChange}
							/>
						</div>
						<div className="input-group">
							<select
								onChange={handleRadiusChange}
								name="radius"
								id="radius"
								defaultValue={"optRadius"}>
								<option
									value="null"
									name="optRadius"
									id="optRadius">
									Radius
								</option>
								<option value="25">25 miles</option>
								<option value="50">50 miles</option>
								<option value="75">75 miles</option>
								<option value="100">100 miles</option>
								<option value="150">150 miles</option>
								<option value="200">200 miles</option>
								<option value="250">250 miles</option>
								<option value="300">300 miles</option>
								<option value="400">400 miles</option>
								<option value="500">500 miles</option>
								<option value="750">750 miles</option>
								<option value="1000">1000 miles</option>
								<option value="1250">1250 miles</option>
								<option value="1500">1500 miles</option>
								<option value="2000">2000 miles</option>
								<option value="any">Any</option>
							</select>
						</div>
						<div className="search-btn-wrapper">
							<input
								onClick={() => {
									handleSearch(ctx);
								}}
								type="button"
								value="Search"
							/>
						</div>
					</div>
				);
			}}
		</Consumer>
	);
};

export default VehicleSearch;
