import { useEffect, useState } from "react";

import HotelCard from "./HotelCard";
import styled from "styled-components";
import Category from "./Category";
const Hotels = () => {
  const [value, setValue] = useState("All");
  const [hotels, setHotels] = useState([]);
  //get hotels with category
  useEffect(() => {
    fetch(`/api/get-Hotels/${value}`)
      .then((res) => res.json())
      .then((data) => {
        setHotels(data.result);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, [value]);

  return (
    <PageDiv>
      {hotels.length === 0 && <p>Please wait...</p>}
      {hotels.length > 1 && (
        <>
          <CategoryDiv>
            <Category value={value} setValue={setValue} />
          </CategoryDiv>
          <HotelPage>
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel._id}
                _id={hotel._id}
                imageSrc={hotel.image}
                address={hotel.address}
                name={hotel.name}
                rating={hotel.rating}
                qualitativeBadgeText={hotel.qualitativeBadgeText}
                summary={hotel.summary}
                caption={hotel.caption}
                description={hotel.description}
                latlng={hotel.latlng}
                url={hotel.url}
                id={hotel.id}
              />
            ))}
          </HotelPage>
        </>
      )}
    </PageDiv>
  );
};
const PageDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const CategoryDiv = styled.div``;
const HotelPage = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-left: 10%;
`;
export default Hotels;
