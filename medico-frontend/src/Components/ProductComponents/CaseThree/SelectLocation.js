import React, { useEffect, useState } from "react";
import { CustomInput, CustomTextArea } from "../../OfferComponents/Input";
import LocationBox from "./LocationBox";
import {
  getDistricts,
  getStates,
  getTalukas,
} from "../../../Services/location";

function SelectLocation({ register, errors, setsTaluka }) {
  const [LoadDistrict, setLoadDistrict] = useState(false);
  const [LoadTaluka, setLoadTaluka] = useState(false);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  const [distActive, setdistActive] = useState(false);
  const [talukaActive, settalukaActive] = useState(false);

  const [selectedTaluka, setselectedTaluka] = useState([]);

  // console.log(selectedTaluka);

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

  useEffect(() => {
    setsTaluka(selectedTaluka);
  }, [selectedTaluka]);

  const getDistrictsbyState = async (states) => {
    setLoadDistrict(true);
    setDistricts([]);
    try {
      await Promise.all(
        states.map(async (s, i) => {
          try {
            const resp = await getDistricts(s);
            setDistricts((prevDistricts) => [...prevDistricts, ...resp]);
            if (i === states.length - 1) {
              setLoadDistrict(false);
              setdistActive(true);
            }
            console.log(districts);
          } catch (err) {
            console.log(err);
            setLoadDistrict(false);
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getTalukasByDistrict = async (districts) => {
    setLoadTaluka(true);
    setTalukas([]);
    try {
      let temp = [];
      await Promise.all(
        districts.map(async (s) => {
          try {
            const resp = await getTalukas(s);
            temp.push(...resp);
          } catch (err) {
            console.log(err);
          }
        })
      );
      console.log(temp);
      setTalukas(temp);
      setLoadTaluka(false);
      settalukaActive(true);
    } catch (error) {
      console.log(error);
    }
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
            curr={"State"}
          />
        </div>
        <div className="mt-6">
          {distActive && (
            <LocationBox
              isLoading={LoadTaluka}
              data={districts}
              next={"Talukas"}
              loadNext={getTalukasByDistrict}
              curr={"District"}
            />
          )}
        </div>
        <div className="mt-6">
          {talukaActive && (
            <LocationBox
              isLoading={LoadTaluka}
              data={talukas}
              curr={"Taluka"}
              next={""}
              setselectedTaluka={setselectedTaluka}
              //   loadNext={LoadTaluka}
            />
          )}
        </div>
      </fieldset>
    </>
  );
}

export default SelectLocation;
