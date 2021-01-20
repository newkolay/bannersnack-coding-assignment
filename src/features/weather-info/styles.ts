import styled from "styled-components";

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;
  margin-bottom: 25px;
`;

const InitialBlock = styled.div`
  font-size: 44px;
  text-align: center;
`;

const ResultWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 250px;
  border-radius: 25px;
  background-color: #f3f3f3;
`;

const InfoState = styled.div`
  font-size: 32px;
`;

const InfoWrapper = styled.div`
  font-size: 20px;
`;

const CityName = styled.div`
  font-size: 28px;
  font-weight: bold;
  text-align: center;
`;

export {
  SearchBarWrapper,
  InitialBlock,
  ResultWrapper,
  InfoState,
  InfoWrapper,
  CityName,
};
