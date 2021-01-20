import styled from "styled-components";
import SearchBar from "./features/weather-info/SearchBar";
import WeatherInfo from "./features/weather-info/WeatherInfo";

const Layout = styled.div`
  padding: 40px;
`;

function App() {
  return (
    <div className="App">
      <Layout>
        <SearchBar />
        <WeatherInfo />
      </Layout>
    </div>
  );
}

export default App;
