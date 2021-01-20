import { useState } from "react";
import { Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setIsLoading, setData } from "./weatherSlice";
import client from "../../app/apolloClient";
import { SearchBarWrapper } from "./styles";
import getShortUnitName from "../../utils/getShortUnitName";
import GET_CITY_WEATHER_INFO from "./queries";

const { Option } = Select;

export default function SearchBar() {
	const dispatch = useDispatch();
	const [searchValue, setSearchValue] = useState("");
	const [units, setUnits] = useState("metric");

	const searchCity = async () => {
		dispatch(setIsLoading(true));
		const result = await client.query({
			query: GET_CITY_WEATHER_INFO,
			variables: {
				name: searchValue,
				config: {
					units,
				},
			},
		});
		const dataToSave = {
			result,
			searchParams: {
				searchValue,
				units,
			},
		};
		dispatch(setData(dataToSave));
	};

	return (
		<SearchBarWrapper>
			<Input
				style={{ marginRight: 15 }}
				size="large"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
				placeholder="type a city name"
			/>
			<Select
				onChange={(value) => setUnits(value)}
				value={units}
				style={{ width: 180, marginRight: 15 }}
			>
				<Option value="metric">{getShortUnitName("metric")}</Option>
				<Option value="imperial">{getShortUnitName("imperial")}</Option>
				<Option value="kelvin">{getShortUnitName("kelvin")}</Option>
			</Select>

			<Button type="primary" icon={<SearchOutlined />} onClick={searchCity}>
				Search
			</Button>
		</SearchBarWrapper>
	);
}
