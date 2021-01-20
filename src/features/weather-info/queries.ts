import { gql } from "@apollo/client";

const GET_CITY_WEATHER_INFO = gql`
	query GetCityWeatherInfo($name: String!, $config: ConfigInput) {
		getCityByName(name: $name, config: $config) {
			weather {
				temperature {
					actual
				}
				summary {
					description
				}
				wind {
					speed
					deg
				}
			}
		}
	}
`;

export default GET_CITY_WEATHER_INFO;
