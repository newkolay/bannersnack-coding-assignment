import React from "react";
import { fireEvent, render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "react-redux";
import App from "./App";
import GET_CITY_WEATHER_INFO from "./features/weather-info/queries";
import { store } from "./app/store";

const mocks = [
	{
		request: {
			query: GET_CITY_WEATHER_INFO,
			variables: {
				name: "Moscow",
				config: {
					units: "metric",
				},
			},
		},
		result: {
			data: {
				getCityByName: {
					weather: {
						temperature: {
							actual: -5,
						},
						summary: {
							description: "Cold",
						},
						wind: {
							speed: 3,
							deg: 4,
						},
					},
				},
			},
		},
	},
];

const MockedApp = () => (
	<Provider store={store}>
		<MockedProvider mocks={mocks} addTypename={false}>
			<App />
		</MockedProvider>
	</Provider>
);

test("renders loading state", async () => {
	render(<MockedApp />);
	const searchButton = screen.getByText("Search");
	fireEvent.click(searchButton);
	expect(screen.getByText("Loading data...")).toBeInTheDocument();
});

test("renders not found state", async () => {
	render(<MockedApp />);
	const searchButton = screen.getByText("Search");
	fireEvent.click(searchButton);
	await waitForElementToBeRemoved(() => screen.getByText("Loading data..."), {
		timeout: 30000,
	});
	expect(screen.getByText("Not Found")).toBeInTheDocument();
});

test("renders successfully", async () => {
	render(<MockedApp />);
	const searchButton = screen.getByText("Search");
	const input = screen.getByPlaceholderText("type a city name");
	fireEvent.change(input, { target: { value: "Moscow" } });
	fireEvent.click(searchButton);
	await waitForElementToBeRemoved(() => screen.getByText("Loading data..."), {
		timeout: 30000,
	});
	expect(screen.getByTestId("city-info")).toBeInTheDocument();
});
