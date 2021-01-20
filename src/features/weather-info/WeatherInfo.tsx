import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../app/store";
import getShortUnitName from "../../utils/getShortUnitName";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import { ResultWrapper, InitialBlock, InfoState, InfoWrapper, CityName } from "./styles";

export default function WeatherInfo() {
	const { isLoading, data, searchParams } = useSelector(
		(state: RootState) => ({
			isLoading: state.weather.isLoading,
			data: state.weather.data,
			searchParams: state.weather.searchParams,
		}),
		shallowEqual
	);

	if (!data && !isLoading) {
		return <InitialBlock>Please enter a city name</InitialBlock>;
	}

	return (
		<ResultWrapper>
			{isLoading ? (
				<InfoState>Loading data...</InfoState>
			) : (
				<div>
					{data && data.getCityByName ? (
						<InfoWrapper data-testid="city-info">
							<CityName>{searchParams.searchValue}</CityName>
							<div>
								{capitalizeFirstLetter(
									data.getCityByName.weather.summary.description
								)}
							</div>
							<div>
								{data.getCityByName.weather.temperature.actual}{" "}
								{getShortUnitName(searchParams.units)}
							</div>
							<div>Wind speed: {data.getCityByName.weather.wind.speed} m/s</div>
							<div>Wind deg: {data.getCityByName.weather.wind.deg}°</div>
						</InfoWrapper>
					) : (
						<InfoState>Not Found</InfoState>
					)}
				</div>
			)}
		</ResultWrapper>
	);
}
