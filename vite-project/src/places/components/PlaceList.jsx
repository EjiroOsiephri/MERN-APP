import React from "react";

import Card from "../../shared/components/UIElements/Card";
import "./PlaceList.css";
import PlaceItem from "./PlaceItem";

const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <Card>
        <div className="place-list center">
          <h2>No place found. Why not create one?</h2>
          <button>Share place</button>
        </div>
      </Card>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map((item) => {
        return (
          <PlaceItem
            key={item.id}
            id={item.id}
            image={item.imageUrl}
            title={item.title}
            description={item.description}
            address={item.address}
            creatorId={item.creator}
            coordinates={item.location}
          />
        );
      })}
    </ul>
  );
};

export default PlaceList;
