import React, { useEffect, useState } from "react";
import { CustomInput, CustomTextArea } from "../../OfferComponents/Input";
import LocationBox from "./LocationBox";
import {
  getDistricts,
  getStates,
  getTalukas,
} from "../../../Services/location";

function SelectLocation({ register, errors }) {
  const [LoadDistrict, setLoadDistrict] = useState(false);
  const [LoadTaluka, setLoadTaluka] = useState(false);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  const [distActive, setdistActive] = useState(false);
  const [talukaActive, settalukaActive] = useState(false);

  useEffect(() => {
    getStates()
      .then((response) => {
        console.log(response);
        setStates(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getDistrictsbyState = (states) => {
    setLoadDistrict(true);
    states.forEach((s, i) => {
      getDistricts(s)
        .then((resp) => {
          if (
            districts.length &&
            resp[0].stateId != districts[districts.length - 1].stateId
          ) {
            setDistricts([...districts, ...resp]);
          } else {
            setDistricts([...resp]);
          }
          //   setDistricts([...resp]);
          if (i == states.length - 1) {
            setLoadDistrict(false);
            setdistActive(true);
          }
          console.log(districts);
        })
        .catch((err) => {
          console.log(err);
          setLoadDistrict(false);
        });
    });
  };

  const getTalukasByDistrict = (districts) => {
    setLoadTaluka(true);
    districts.forEach((s, i) => {
      getTalukas(s)
        .then((resp) => {
          if (
            talukas.length &&
            resp[0].districtId != talukas[talukas.length - 1].districtId
          ) {
            setTalukas([...talukas, ...resp]);
          } else {
            setTalukas([...resp]);
          }
          if (i == districts.length - 1) {
            setLoadTaluka(false);
            settalukaActive(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoadTaluka(false);
        });
    });
  };

  return (
    <>
      <fieldset>
        <div className="flex items-center gap-6">
          <div>
            <CustomInput
              placeholder="Enter Group Name"
              inputProps={register("groupName", {
                // required: "groupNameis required",
              })}
              error={errors.groupName}
            />
          </div>
          <div>
            <CustomTextArea
              placeholder="Enter Group Description"
              inputProps={register("groupDescription", {
                // required: "Group Description is required",
              })}
              small={true}
              error={errors.groupDescription}
            />
          </div>
        </div>
        <div className="mt-6">
          <LocationBox
            loadNext={getDistrictsbyState}
            isLoading={LoadDistrict}
            data={states}
            next={"Districts"}
          />
        </div>
        <div className="mt-6">
          {distActive && (
            <LocationBox
              isLoading={LoadTaluka}
              data={districts}
              next={"Talukas"}
              loadNext={getTalukasByDistrict}
            />
          )}
        </div>
        <div className="mt-6">
          {talukaActive && (
            <LocationBox
              isLoading={LoadTaluka}
              data={talukas}
              //   next={""}
              //   loadNext={LoadTaluka}
            />
          )}
        </div>
      </fieldset>
    </>
  );
}

export default SelectLocation;
